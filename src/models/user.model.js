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
      },
      birthdate: {
        type: Date,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Populates inversos (Virtuals)
// Un virtual es un campo temporal que no se almacena en la base de datos y solo se muestra con un populate
UserSchema.virtual("Articles", { // Virtual de Articles
  ref: "Article", // Colecciona a usar
  localField: "_id", // Campo que se va a usar para el match
  foreignField: "author", // Campo que debe coincidir con el localfield
  justOne: false, // Articles sera un array
});

// Virtual de comments
UserSchema.virtual("Comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

// Convertir un documento a JSON y que incluya las virtuals (como Articles) en la salida.
UserSchema.set("toJSON", { virtuals: true });

// Ignora documentos con el deleted_at distinto de null
UserSchema.pre(/^find/, function (next) {
  this.where({ deleted_at: { $eq: null } });
  next();
});

export const UserModel = model("User", UserSchema);
