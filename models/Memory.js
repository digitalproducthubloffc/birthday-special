import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
  title:     { type: String, required: true },
  caption:   { type: String, default: "" },
  imageUrl:  { type: String, required: true },
  publicId:  { type: String, required: true },
  date:      { type: Date, default: Date.now },
  tags:      { type: [String], default: [] },
  type:      { type: String, enum: ["photo", "video"], default: "photo" },
  order:     { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Memory || mongoose.model("Memory", MemorySchema);
