import { ArticleModel } from "../models/article.model.js";

// Crear un article
export const createArticle = async (req, res) => {
  const { title, content, excerpt, status, author, tags } = req.body;
  try {
    const article = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      author,
      tags,
    });
    res.status(201).json({
      ok: true,
      message: "Article creado exitosamente",
      data: article,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer todos los articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate("author", " username email role")
    .populate("tags", " name description");
    if (!articles)
      return res
        .status(404)
        .json({ msg: "No hay articles en la base de datos" });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer article por ID
export const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id)
    .populate("author", "-_id username email role")
    .populate("Comments", "-_id content")
    .populate("tags", " -_id name description")
    if (!article)
      return res
        .status(404)
        .json({ msg: "No se encontro el article en la base de datos" });
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer todos los comentarios del usuario logueado
export const getMyArticles = async (req,res) => {
  try {
    const usuarioLogueado = req.usuarioLogueado;
    const getMyArticles = await ArticleModel.find({author: usuarioLogueado.id})
    if (getMyArticles.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontraron articulos en la base de datos"
      })
    }

    res.status(200).json({
      ok: true,
      message: "Estos son tus articulos",
      comments: getMyArticles
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
  
}

// Actualizar un article
export const updateArticle = async (req, res) => {
  const { title, content, excerpt, status, author } = req.body;
  const { id } = req.params;
  try {
    const updated = await ArticleModel.findByIdAndUpdate(
      id,
      { title, content, excerpt, status, author },
      { new: true }
    );
    res
      .status(200)
      .json({ ok: true, msg: "Article actualizada con exito", data: updated });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Eliminar un article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ArticleModel.findByIdAndDelete(id, { new: true });
    res.status(200).json({
      ok: true, 
      message: "Usuario borrado exitosamente",
      deleted: deleted
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor"
    });
  }
};
