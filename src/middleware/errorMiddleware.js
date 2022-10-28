const errorMiddleware = (_req, res, err, next) => {
    res.status(500).json({
        success: false,
        error: `${err} || Producto no encontrado`
    })
}

module.exports = errorMiddleware;