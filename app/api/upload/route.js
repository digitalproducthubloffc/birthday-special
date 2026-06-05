import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename');

    if (!file || !filename) {
      return NextResponse.json({ error: 'File and filename are required' }, { status: 400 });
    }

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false, // Ensures we overwrite the existing placeholder
      allowOverwrite: true,   // Required by Vercel to overwrite blobs with identical names
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
