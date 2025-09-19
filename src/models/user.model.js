import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstname: { type: String, minLength: 2, maxLength: 50 },
      lastname: { type: String, minLength: 2, maxLength: 50 },
      biography: { type: String, maxLength: 500 },
      avatarUrl: { type: String },
      birthdate: { type: Date },
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
