import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  readTime: z.string().optional(),
});

// Public endpoint - Get single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = db.blogs.getById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Only return published blogs to public
    const session = await verifySession();
    if (blog.status !== 'published' && !session) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// Admin only - Update blog
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const validation = updateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    const updates: any = { ...validation.data };

    // If status is changing to published, set publishedAt
    if (validation.data.status === 'published') {
      const existing = db.blogs.getById(id);
      if (existing && existing.status !== 'published') {
        updates.publishedAt = new Date().toISOString();
      }
    }

    // Recalculate read time if content changed
    if (validation.data.content) {
      const wordCount = validation.data.content.split(/\s+/).length;
      updates.readTime = `${Math.ceil(wordCount / 200)} min read`;
    }

    const updated = db.blogs.update(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// Admin only - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = db.blogs.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

