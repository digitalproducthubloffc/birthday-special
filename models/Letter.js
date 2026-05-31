import mongoose from "mongoose";

const LetterSchema = new mongoose.Schema({
  content:   { type: String, required: true },
  author:    { type: String, default: "Your Biggest Admirer" },
  recipient: { type: String, default: "My dearest friend" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Letter || mongoose.model("Letter", LetterSchema);
