const express = require("express")

const router = express.Router()

const Contenedor = require("../../../container")

const carrito = new Contenedor('./carrito.json')

const negocio = new Contenedor("./productos.json")

router.post('/', (req, res) => {
    try{
        const { body } = req;
        const idCarritoCreado = carrito.save(body)
        res.status(200).json({
            ok: true,
            id: idCarritoCreado
        })
    }catch(err){
        console.log(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        carrito.deleteById(id)
        res.status(200).json({
            success: true,
            message: `El carrito con ID:${id} fue eliminado`
        })
    } catch (err) {
        console.log(err);
    }
})

router.get("/:id/productos", async (_req, res) => {
    try {
        const allProductsCarrito = await carrito.getByUserId()
        res.status(200).json({
            success: true,
            products: allProductsCarrito
        })
    } catch (err) {
        console.log(err);
    }
})

router.post("/:id/productos", async (req, res) => {
    try {
        let getProducto = await negocio.getById(req.params.id)
        const carritoProductoGuardar = await carrito.saveById(getProducto, req.params.id)
        res.status(200).json({
            success: true,
            message: `Agrego el carrito ${carritoProductoGuardar}`
        })
    } catch (err) {
        console.log(err);
    }
})

router.delete("/:id/productos/:id_prod", async (req, res) => {
    try {
        const carritoProductoDelete = await carrito.deleteByUserAndIdProduct(req.params.id, req.params.id_prod)
        if (carritoProductoDelete) {
            res.status(200).json({
                success: true,
                message: `El producto ha sido eliminado del carrito`
            })
        }
    } catch (err) {
        console.log(err);
    }
})


module.exports = router