import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().min(1, 'Image is required'),
  icon: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  features: z.array(z.string()),
  status: z.enum(['active', 'inactive']),
  order: z.number().optional(),
});

// Public endpoint - Get active services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';

    // Check if admin is requesting (for inactive services)
    const session = await verifySession();
    
    let services;
    if (includeInactive && session) {
      // Admin can see all services
      services = db.services.getAll();
    } else {
      // Public only sees active services
      services = db.services.getActive();
    }

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// Admin only - Create service
export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const validation = serviceSchema.safeParse(body);
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
    const existing = db.services.getBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'A service with this title already exists' },
        { status: 400 }
      );
    }

    // Get the highest order number and add 1
    const allServices = db.services.getAll();
    const maxOrder = allServices.length > 0 ? Math.max(...allServices.map(s => s.order)) : 0;
    const order = validation.data.order ?? maxOrder + 1;

    const service = db.services.create({
      ...validation.data,
      slug,
      order,
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

