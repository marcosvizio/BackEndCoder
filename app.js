const express = require('express');
const {Server: HttpServer} = require("http");
const {Server: IoServer} = require("socket.io");
const logger = require("morgan");
const indexRouter = require("./src/routes/index");
require('dotenv').config();

const app = express();

const http = new HttpServer(app);

const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static( __dirname + '/public'));



app.get("/", async (_req,res) => {
    try{
        const allProducts = await productos.getAll()
        const listProducts = allProducts.length > 0;
        res.status(200).render("pages/cargaProductos", {
        nav: "cargaProductos",
        allProducts,
        listProducts
        })
    }catch(err){
        console.log(err);
    }
});

app.use("/api", indexRouter);

const Contenedor = require('./container')

const productos = new Contenedor('./productos.json')

const messages = new Contenedor('./messages.json')

io.on("connection", async socket => {
    console.log("Nuevo cliente conectado! ID: ", socket.id)
    socket.emit("UPDATE_DATA", await messages.getAll())
    socket.on("NEW_MESSAGE_CLI", data => {
        const messageData = {id: data.email, content: data.message, date: data.date}
        messages.saveMessage(messageData)
        io.sockets.emit("NEW_MESSAGE", messageData)
    })
    socket.emit("UPDATE_PRODUCTS", await productos.getAll())
})

module.exports = http;