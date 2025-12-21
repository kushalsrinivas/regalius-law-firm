import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const practiceAreaSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().min(1, 'Image is required'),
  icon: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  order: z.number().optional(),
});

// Public endpoint - Get active practice areas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    // Check if admin is requesting (for inactive areas)
    const session = await verifySession();
    
    let practiceAreas;
    if (includeInactive && session) {
      // Admin can see all practice areas
      practiceAreas = db.practiceAreas.getAll();
    } else {
      // Public only sees active practice areas
      practiceAreas = db.practiceAreas.getActive();
    }

    return NextResponse.json({ practiceAreas });
  } catch (error) {
    console.error('Get practice areas error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practice areas' },
      { status: 500 }
    );
  }
}

// Admin only - Create practice area
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validation = practiceAreaSchema.safeParse(body);
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
    const existing = db.practiceAreas.getBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'A practice area with this title already exists' },
        { status: 400 }
      );
    }

    // Get the highest order number and add 1
    const allAreas = db.practiceAreas.getAll();
    const maxOrder = allAreas.length > 0 ? Math.max(...allAreas.map(a => a.order)) : 0;
    const order = validation.data.order ?? maxOrder + 1;

    const practiceArea = db.practiceAreas.create({
      ...validation.data,
      slug,
      order,
    });

    return NextResponse.json({ success: true, practiceArea });
  } catch (error) {
    console.error('Create practice area error:', error);
    return NextResponse.json(
      { error: 'Failed to create practice area' },
      { status: 500 }
    );
  }
}

