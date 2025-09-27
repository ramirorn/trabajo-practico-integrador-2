import { CommentModel } from "../models/comment.model.js";

// Crear un Comment
export const createComment = async (req, res) => {
  const { content, author, article } = req.body;
  try {
    const comment = await CommentModel.create({
      content,
      author,
      article,
    });
    res.status(201).json({
      ok: true,
      message: "Comment creado exitosamente",
      data: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer todos los comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    if (!comments)
      return res
        .status(404)
        .json({ msg: "No hay articles en la base de datos" });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer comment por ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findById(id);
    if (!comment)
      return res
        .status(404)
        .json({ msg: "No se encontro el comment en la base de datos" });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer todos los comentarios del usuario logueado
export const getMyComments = async (req,res) => {
  try {
    const usuarioLogueado = req.usuarioLogueado;
    const getMyComments = await CommentModel.find({author: usuarioLogueado.id})
    if (getMyComments.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontraron comentarios en la base de datos"
      })
    }

    res.status(200).json({
      ok: true,
      message: "Estos son tus comentarios",
      comments: getMyComments
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
  
}

// Actualizar un comment
export const updateComment = async (req, res) => {
  const { content, author, article } = req.body;
  const { id } = req.params;
  try {
    const updated = await CommentModel.findByIdAndUpdate(
      id,
      { content, author, article },
      { new: true }
    );
    res
      .status(201)
      .json({ ok: true, msg: "Comment actualizado con exito", data: updated });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Eliminar un comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted= await CommentModel.findByIdAndDelete(id, {new: true});
    res.status(200).json({
      ok: true,
      message: "Comentario borrado exitosamente",
      deleted
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
