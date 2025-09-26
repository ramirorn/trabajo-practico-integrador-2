export const adminMiddleware = (req, res, next) => {
    const usuarioLogueado = req.usuarioLogueado;
    try {
        // Verificar que el usuario logueado sea admin
        if (usuarioLogueado.role !== "admin") {
            return res.status(403).json({
                ok: false,
                message: "No tienes permisos para realizar esta accion",
            });
        }

        // Continuar con la ejecucion
        next();
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
            err,
        });
    }
}
