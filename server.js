const express = require('express')

const Contenedor = require('./container')

const negocio = new Contenedor('./productos.txt')

require('dotenv').config()

const app = express()

app.get('/productos', async (_req, res) => {
    const allProducts = await negocio.getAll()
    const allProductsParse = JSON.stringify(allProducts, null, 2)
    res.status(200).send(`<p>${allProductsParse}</p>`)
})

app.get('/productoRandom', async (_req, res) => {
    const quantity = await negocio.getLength();
    const random = Math.floor(Math.random() * quantity) + 1;
    const productRandom = await negocio.getById(random)
    const productRandomParse = JSON.stringify(productRandom, null, 2)
    res.status(200).send(`<p>${productRandomParse}</p>`)
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})





