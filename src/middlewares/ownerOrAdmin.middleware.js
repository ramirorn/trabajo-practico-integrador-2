import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";

// Middleware para verificar si el usuario autenticado es el dueño del comentario o un admin
export const ownerOrAdminCommentMiddleware = async (req, res, next) => {
    const usuarioLogueado = req.usuarioLogueado;
    try {
        // Encuentra el comentario por su ID
        const comment = await CommentModel.findById({ _id: req.params.id});

        // Verifica si el usuario logueado es admin o el autor del comentario
        if (usuarioLogueado.role !== "admin" && !comment.author.equals(usuarioLogueado.id)) {
            return res.status(401).json({
                ok: false,
                message: "No tienes permisos para realizar esta accion",
            });
        }
        // Continuar con la ejecucion
        next();
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
}

// Middleware para verificar si el usuario autenticado es el dueño del article o un admin
export const ownerOrAdminArticleMiddleware = async (req, res, next) => {
    const usuarioLogueado = req.usuarioLogueado;
    // Se desestructuran dos ID's porque uno es usadad por articlecontrollers y otra usado por articletagcontrollers
    const {id} = req.params;
    const {articleId} = req.params;
    try {
        // Encuentra el article por su ID
        let article
        if(id){
            article = await ArticleModel.findById(id);
        }else if(articleId){
            article = await ArticleModel.findById(articleId);
        }
    
        if(!article){
            return res.status(404).json({
                message: "El articulo no existe"
            })
        }

        // Verifica si el usuario logueado es admin o el autor del article
        if (usuarioLogueado.role !== "admin" && !article.author.equals(usuarioLogueado.id)) {
            return res.status(401).json({
                ok: false,
                message: "No tienes permisos para realizar esta accion",
            });
        }
        // Continuar con la ejecucion
        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
}