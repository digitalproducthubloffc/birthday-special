import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename');

    if (!file || !filename) {
      return NextResponse.json({ error: 'File and filename are required' }, { status: 400 });
    }

    console.log(`[Upload API] Received request to upload ${filename}`);
    
    // 1. Find and delete old versions of this file to save space
    try {
      const searchPrefix = filename.split('.')[0]; // e.g., "hero_10"
      const { blobs } = await list();
      const oldBlobs = blobs.filter(b => {
        const nameWithoutExt = b.pathname.split('.')[0];
        const baseName = nameWithoutExt.split('-')[0];
        return baseName === searchPrefix || b.pathname === filename;
      });
      
      if (oldBlobs.length > 0) {
        console.log(`[Upload API] Found ${oldBlobs.length} old versions of ${filename}, deleting...`);
        await del(oldBlobs.map(b => b.url));
        console.log(`[Upload API] Old versions deleted successfully.`);
      }
    } catch (e) {
      console.warn(`[Upload API] Failed to cleanup old blobs:`, e);
    }

    // 2. Upload the new file with a random suffix to bypass Vercel Edge caching bugs!
    console.log(`[Upload API] Uploading new blob to Vercel with addRandomSuffix: true...`);
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true, // THIS IS THE MAGIC FIX FOR THE 404s
    });
    console.log(`[Upload API] Upload complete! New URL: ${blob.url}`);

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
