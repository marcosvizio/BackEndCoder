const express = require('express');
const indexRouter = require("./src/routes/index")
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", (_req,res) => {
    res.status(200).render("pages/cargaProductos", {
        nav: "cargaProductos"
    })
})

app.use("/api", indexRouter);

module.exports = app;