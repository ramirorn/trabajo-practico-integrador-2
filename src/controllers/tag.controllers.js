import { TagModel } from "../models/tag.model.js";

// Crear una tag
export const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    const tag = await TagModel.create({ name, description });
    res.status(201).json({
      ok: true,
      message: "Tag creada exitosamente",
      data: tag,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer todas las tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    if (!tags)
      return res
        .status(404)
        .json({ msg: "No hay etiquetas en la base de datos" });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer tag por ID
export const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagModel.findById(id);
    if (!tag)
      return res
        .status(404)
        .json({ msg: "No se encontro la tag en la base de datos" });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Actualizar Tag
export const updateTag = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const updated = await TagModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res
      .status(200)
      .json({ ok: true, msg: "Tag actualizada con exito", data: updated });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Eliminar una tag
export const deleTag = async (req, res) => {
  const { id } = req.params;
  try {
    await TagModel.findByIdAndDelete(id, { new: true });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
