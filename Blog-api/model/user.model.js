import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", authSchema);
