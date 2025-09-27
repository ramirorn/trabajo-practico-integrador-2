import { model, Schema } from "mongoose";
import { ArticleModel } from "./article.model.js";

const TagSchema = new Schema(
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
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Eliminacion en cascada de Tags
TagSchema.pre("findOneAndDelete", async function (next) {
  const tag = await this.model.findOne(this.getFilter());

  // Quita las tags borradas del articulo donde estan
  if (tag) {
    await ArticleModel.updateMany(
      { tags: tag._id },
      { $pull: { tags: tag._id } }
    );
  }
});

export const TagModel = model("Tag", TagSchema);
