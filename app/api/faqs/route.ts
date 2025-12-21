import { NextRequest, NextResponse } from "next/server";
import { db, type FAQ } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const includeInactive = url.searchParams.get("includeInactive") === "true";
    const category = url.searchParams.get("category");

    let faqs = includeInactive ? db.faqs.getAll() : db.faqs.getActive();

    // Filter by category
    if (category) {
      faqs = faqs.filter((f: FAQ) => f.category === category);
    }

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("Error in GET /api/faqs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const allFaqs = db.faqs.getAll();

    const newFAQ = db.faqs.create({
      question: body.question,
      answer: body.answer,
      category: body.category || "General",
      order: body.order ?? allFaqs.length,
      status: body.status || "active",
    });

    return NextResponse.json({ faq: newFAQ }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/faqs:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
