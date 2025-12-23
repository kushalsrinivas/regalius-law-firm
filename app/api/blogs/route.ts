import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  status: z.enum(['draft', 'published']),
  readTime: z.string().optional(),
});

// Public endpoint - Get published blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get('includeDrafts') === 'true';

    // Check if admin is requesting (for drafts)
    const session = await verifySession();
    
    let blogs;
    if (includeDrafts && session) {
      // Admin can see all blogs
      blogs = await db.blogs.getAll();
    } else {
      // Public only sees published blogs
      blogs = await db.blogs.getPublished();
    }

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// Admin only - Create blog
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validation = blogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = validation.data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existing = await db.blogs.getBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'A blog with this title already exists' },
        { status: 400 }
      );
    }

    // Calculate read time if not provided
    const readTime = validation.data.readTime || calculateReadTime(validation.data.content);

    const blog = await db.blogs.create({
      ...validation.data,
      slug,
      readTime,
      publishedAt: validation.data.status === 'published' ? new Date() : undefined,
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

