import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  inquiryType: z.string().min(1, 'Inquiry type is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Public endpoint - Create contact submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(err => err.message).join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages}`, details: validation.error.errors },
        { status: 400 }
      );
    }

    // Clean up the data - convert empty phone to null
    const contactData = {
      ...validation.data,
      phone: validation.data.phone || null,
      status: 'new' as const,
    };

    const contact = await db.contacts.create(contactData);

    return NextResponse.json({
      success: true,
      message: 'Contact submission received',
      id: contact.id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

// Admin only - Get all contacts
export async function GET(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await db.contacts.getAll();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

