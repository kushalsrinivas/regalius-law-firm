import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  specialty: z.string().optional(),
  education: z.array(z.string()).optional(),
  experience: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  photo: z.string().optional(),
  bio: z.string().optional(),
  practiceAreas: z.array(z.string()).optional(),
  barAdmissions: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  order: z.number().optional(),
});

// Public endpoint - Get single attorney
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attorney = db.attorneys.getById(id);

    if (!attorney) {
      return NextResponse.json({ error: 'Attorney not found' }, { status: 404 });
    }

    // Only return active attorneys to public
    const session = await verifySession();
    if (attorney.status !== 'active' && !session) {
      return NextResponse.json({ error: 'Attorney not found' }, { status: 404 });
    }

    return NextResponse.json({ attorney });
  } catch (error) {
    console.error('Get attorney error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attorney' },
      { status: 500 }
    );
  }
}

// Admin only - Update attorney
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

    const updated = db.attorneys.update(id, validation.data);
    if (!updated) {
      return NextResponse.json({ error: 'Attorney not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, attorney: updated });
  } catch (error) {
    console.error('Update attorney error:', error);
    return NextResponse.json(
      { error: 'Failed to update attorney' },
      { status: 500 }
    );
  }
}

// Admin only - Delete attorney
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
    const deleted = db.attorneys.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Attorney not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete attorney error:', error);
    return NextResponse.json(
      { error: 'Failed to delete attorney' },
      { status: 500 }
    );
  }
}

