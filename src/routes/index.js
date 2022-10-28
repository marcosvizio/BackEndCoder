const express = require('express');

const productosRouter = require("./productos/productos.router");

const router = express.Router();

router.get("/health", (_req,res) => {
    res.status(200).json({
        success: true,
        health: "Up",
        environment: process.env.ENVIRONMENT || "not found"
    })
})
.use("/productos", productosRouter);

module.exports = router;