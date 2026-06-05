import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { blobs } = await list();
    // Vercel Blob returns an array of objects: { pathname, url, downloadUrl, size, uploadedAt }
    return NextResponse.json(blobs);
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
