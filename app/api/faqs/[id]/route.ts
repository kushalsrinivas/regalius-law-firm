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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faqs = await readFAQs();
    const faq = faqs.find((f: FAQ) => f.id === params.id);

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ faq });
  } catch (error) {
    console.error("Error in GET /api/faqs/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQ" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const faqs = await readFAQs();
    const index = faqs.findIndex((f: FAQ) => f.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    const updatedFAQ: FAQ = {
      ...faqs[index],
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString(),
    };

    faqs[index] = updatedFAQ;
    await writeFAQs(faqs);

    return NextResponse.json({ faq: updatedFAQ });
  } catch (error) {
    console.error("Error in PUT /api/faqs/[id]:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faqs = await readFAQs();
    const index = faqs.findIndex((f: FAQ) => f.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    faqs.splice(index, 1);
    await writeFAQs(faqs);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/faqs/[id]:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}

