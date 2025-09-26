import { ArticleModel } from "../models/article.model.js";

// Agrega un tag a un article
export const addTagToArticle = async (req, res) => {
    const { articleId, tagId } = req.params;
    try {
        // Agregar tag a article
        const addTagToArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $push: { tags: tagId }, // $push agrega un elemento a un array
            },
            { new: true } // new: true devuelve el documento actualizado
        );

        res.status(200).json({
            ok: true,
            message: "Tag agregado al article",
            addTagToArticle,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
}

// Elimina un tag de un article
export const removeTagFromArticle = async(req, res) => {
    const { articleId, tagId } = req.params;
    try {
        // Eliminar tag de article
        const removeTagFromArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $pull: { tags: tagId }, // $pull elimina un elemento de un array
            },
            { new: true } // new: true devuelve el documento actualizado
        );
        
        res.status(200).json({
            ok: true,
            message: "Tag eliminado del article",
            removeTagFromArticle,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
} 