import { model, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      minLength: 5,
      maxLength: 500,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CommentModel = model("Comment", CommentSchema);
