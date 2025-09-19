import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 200,
    },
  },
  { timestamps: true }
);

export const TagModel = model("Tag", tagSchema);
