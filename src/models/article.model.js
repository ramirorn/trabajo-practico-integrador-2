import { model, Schema } from "mongoose";
import { CommentModel } from "./comment.model.js";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
      minLength: 50,
    },
    excerpt: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Populate inverso
ArticleSchema.virtual("Comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
  justOne: false,
});

ArticleSchema.set("toJSON", { virtuals: true });

// Eliminacion en cascada
ArticleSchema.pre("findOneAndDelete", async function (next) {
  const article = await this.model.findOne(this.getFilter());

  if (article) {
    await CommentModel.deleteMany({ article: article._id });
  }
  next();
});

export const ArticleModel = model("Article", ArticleSchema);
