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

// Get single practice area
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const practiceArea = db.practiceAreas.getById(params.id);
    
    if (!practiceArea) {
      return NextResponse.json(
        { error: 'Practice area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ practiceArea });
  } catch (error) {
    console.error('Get practice area error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practice area' },
      { status: 500 }
    );
  }
}

// Admin only - Update practice area
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if slug already exists (excluding current practice area)
    const existing = db.practiceAreas.getBySlug(slug);
    if (existing && existing.id !== params.id) {
      return NextResponse.json(
        { error: 'A practice area with this title already exists' },
        { status: 400 }
      );
    }

    const practiceArea = db.practiceAreas.update(params.id, {
      ...validation.data,
      slug,
    });

    if (!practiceArea) {
      return NextResponse.json(
        { error: 'Practice area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, practiceArea });
  } catch (error) {
    console.error('Update practice area error:', error);
    return NextResponse.json(
      { error: 'Failed to update practice area' },
      { status: 500 }
    );
  }
}

// Admin only - Delete practice area
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = db.practiceAreas.delete(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Practice area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete practice area error:', error);
    return NextResponse.json(
      { error: 'Failed to delete practice area' },
      { status: 500 }
    );
  }
}

