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
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstname: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      lastname: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      biography: {
        type: String,
        maxLength: 500,
        required: false,
      },
      avatarUrl: {
        type: String,
        required: false,
        match: /^(https?:\/\/)([\w.-]+)\.([a-z\.]{2,})([\/\w .-])\/?$/i,
      },
      birthdate: {
        type: Date,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", userSchema);
