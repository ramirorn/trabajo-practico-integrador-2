import { model, Schema } from "mongoose";

const UserSchema = new Schema(
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
      required: false,
    },
    deleted_at: {
      type: Date,
      default: null,
      required: false,
    },
    profile: {
      firstName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      lastName: {
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

// Ignora documentos con el deleted_at distinto de null
UserSchema.pre(/^find/, function (next) {
  this.where({ deleted_at: { $eq: null } });
  next();
});

export const UserModel = model("User", UserSchema);
