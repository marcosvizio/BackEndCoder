const express = require("express")

const router = express.Router()

const Contenedor = require('../../../container')

const negocio = new Contenedor('./productos.json')

router.get('/', async (_req, res) => {
    try{
        const allProducts = await negocio.getAll()
        const listProducts = allProducts.length > 0;
        res.status(200).render("pages/tablaProductos", {
            listProducts, 
            allProducts,
            nav: "tablaProductos"
        })
    }catch(err){
        console.log(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const selected = await negocio.getById(id)
        res.status(200).json({
            success: true,
            data: selected
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = req
        negocio.save(body)
        const allProducts = await negocio.getAll()
        const listProducts = allProducts.length > 0;
        res.status(200).render("pages/cargaProductos", {
            nav: "cargaProductos",
            allProducts,
            listProducts
        })
    } catch (err) {
        console.log(err);
    }
})

router.put("/:id", async (req, res) => {
    const productoCreado = await negocio.saveById(req.body)
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCreado
        })
    } else {
        res.json({
            ok: false,
            mensaje: 'El POST no se pudo editar',
            error: 'Producto no encontrado',
            id: productoCreado
        })
    }
})

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params
        negocio.deleteById(id)
        res.status(200).json({
            success: true,
            message: `El producto elegido ha sido eliminado`
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;