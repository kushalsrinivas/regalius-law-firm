import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { FAQ } from "@/lib/data";

const faqsFilePath = path.join(process.cwd(), "data", "faqs.json");

async function readFAQs() {
  try {
    const fileContent = await fs.readFile(faqsFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data.faqs || [];
  } catch (error) {
    console.error("Error reading FAQs:", error);
    return [];
  }
}

async function writeFAQs(faqs: FAQ[]) {
  try {
    await fs.writeFile(
      faqsFilePath,
      JSON.stringify({ faqs }, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing FAQs:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const faqs = await readFAQs();
    const url = new URL(request.url);
    const includeInactive = url.searchParams.get("includeInactive") === "true";
    const category = url.searchParams.get("category");

    let filteredFAQs = faqs;

    // Filter by status
    if (!includeInactive) {
      filteredFAQs = filteredFAQs.filter((f: FAQ) => f.status === "active");
    }

    // Filter by category
    if (category) {
      filteredFAQs = filteredFAQs.filter((f: FAQ) => f.category === category);
    }

    // Sort by order
    filteredFAQs.sort((a: FAQ, b: FAQ) => a.order - b.order);

    return NextResponse.json({ faqs: filteredFAQs });
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
    const faqs = await readFAQs();

    const now = new Date().toISOString();
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: body.question,
      answer: body.answer,
      category: body.category || "General",
      order: body.order ?? faqs.length,
      status: body.status || "active",
      createdAt: now,
      updatedAt: now,
    };

    faqs.push(newFAQ);
    await writeFAQs(faqs);

    return NextResponse.json({ faq: newFAQ }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/faqs:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

