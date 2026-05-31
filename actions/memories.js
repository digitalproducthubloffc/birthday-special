"use server";
import connectDB from "@/lib/mongodb";
import Memory from "@/models/Memory";
import cloudinary from "@/lib/cloudinary";

export async function getMemories() {
  await connectDB();
  const memories = await Memory.find({}).sort({ order: 1, createdAt: -1 }).lean();
  return memories.map((m) => ({ ...m, _id: m._id.toString() }));
}

export async function addMemory(formData) {
  await connectDB();
  const file = formData.get("file");
  const title = formData.get("title");
  const caption = formData.get("caption");
  const tags = formData.get("tags")?.split(",").map((t) => t.trim()) || [];

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "birthday-memories",
    resource_type: "auto",
  });

  const memory = await Memory.create({
    title,
    caption,
    imageUrl: result.secure_url,
    publicId: result.public_id,
    tags,
    type: result.resource_type === "video" ? "video" : "photo",
  });

  return { success: true, id: memory._id.toString() };
}

export async function deleteMemory(id) {
  await connectDB();
  const memory = await Memory.findById(id);
  if (!memory) return { success: false, error: "Not found" };
  await cloudinary.uploader.destroy(memory.publicId);
  await Memory.findByIdAndDelete(id);
  return { success: true };
}
