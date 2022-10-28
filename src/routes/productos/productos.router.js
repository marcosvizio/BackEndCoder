const express = require("express")

const router = express.Router()

const Contenedor = require('../../../container')

const negocio = new Contenedor('./productos.txt')

router.get('/', async (_req, res, next) => {
    try{
        const allProducts = await negocio.getAll()
        res.status(200).json(allProducts)
    }catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const selected = await negocio.getById(id)
        res.status(200).json({
            success: true,
            data: selected
        })
    } catch (err) {
        next(err)
    }
})

router.post('/', (req, res, next) => {
    try {
        const { body } = req
        negocio.save(body)
        res.status(200).json({
            success: true,
            data: body
        })
    } catch (err) {
        next(err)
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
            mensaje: 'El post no se pudo editar ',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})

router.delete("/:id", (req, res, next) => {
    try {
        const { id } = req.params
        negocio.deleteById(id)
        res.status(200).json({
            success: true,
            message: `El producto elegido ha sido eliminado`
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;