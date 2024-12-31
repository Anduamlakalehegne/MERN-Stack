import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "users" },
    body: { type: String, required: true },
    posture: {
      type: String,
      default: "https://cnopt.tn/wp-content/uploads/2023/06/default-image.jpg",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blogs", blogSchema);
