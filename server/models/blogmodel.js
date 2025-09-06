import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true, // good to make slug unique
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true, // removes extra spaces
        lowercase: true, // keep consistency ("AI" → "ai")
      },
    ],
  },
  { timestamps: true }
);
export const Blog = mongoose.model("Blog", blogSchema);
