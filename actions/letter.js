"use server";
import connectDB from "@/lib/mongodb";
import Letter from "@/models/Letter";

export async function getLetter() {
  await connectDB();
  const letter = await Letter.findOne({}).sort({ createdAt: -1 }).lean();
  if (!letter) return null;
  return { ...letter, _id: letter._id.toString() };
}

export async function saveLetter(formData) {
  await connectDB();
  const content   = formData.get("content");
  const author    = formData.get("author") || "Your Biggest Admirer";
  const recipient = formData.get("recipient") || "My dearest friend";

  const existing = await Letter.findOne({});
  if (existing) {
    await Letter.findByIdAndUpdate(existing._id, { content, author, recipient, updatedAt: new Date() });
  } else {
    await Letter.create({ content, author, recipient });
  }
  return { success: true };
}
