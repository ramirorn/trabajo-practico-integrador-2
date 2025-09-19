import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      minLength: 5,
      maxLength: 500,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  { timestamps: true }
);

export const CommentModel = model("Comment", commentSchema);
