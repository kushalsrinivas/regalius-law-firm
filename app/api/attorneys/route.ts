import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const attorneySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  education: z.array(z.string()).min(1, 'At least one education entry required'),
  experience: z.string().min(1, 'Experience is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  photo: z.string().min(1, 'Photo is required'),
  bio: z.string().min(1, 'Bio is required'),
  practiceAreas: z.array(z.string()).min(1, 'At least one practice area required'),
  barAdmissions: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  status: z.enum(['active', 'inactive']),
  order: z.number().default(0),
});

// Public endpoint - Get active attorneys
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    // Check if admin is requesting (for inactive attorneys)
    const session = await verifySession();
    
    let attorneys;
    if (includeInactive && session) {
      // Admin can see all attorneys
      attorneys = db.attorneys.getAll();
    } else {
      // Public only sees active attorneys
      attorneys = db.attorneys.getActive();
    }

    return NextResponse.json({ attorneys });
  } catch (error) {
    console.error('Get attorneys error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attorneys' },
      { status: 500 }
    );
  }
}

// Admin only - Create attorney
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validation = attorneySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = validation.data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existing = db.attorneys.getBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'An attorney with this name already exists' },
        { status: 400 }
      );
    }

    const attorney = db.attorneys.create({
      ...validation.data,
      slug,
    });

    return NextResponse.json({ success: true, attorney });
  } catch (error) {
    console.error('Create attorney error:', error);
    return NextResponse.json(
      { error: 'Failed to create attorney' },
      { status: 500 }
    );
  }
}

