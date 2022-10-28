const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }
    async #readFile() {
        let productos = [];
        let productosJson; 
        try {
            productos = await fs.promises.readFile(this.archivo, 'utf-8');
        }catch(error){
            console.error(`${error}: hay un error en nuestra app`);
        }
        if (productos === '') {
            productos = '[]'
        }
        productosJson = JSON.parse(productos);
        return productosJson;
    }
    save(prod) {
        const productos = fs.readFileSync(this.archivo, 'utf-8')
        const productosJson = JSON.parse(productos)
        let idMax = 0
        try {
            if (productosJson.length == 0) {
                Object.assign(prod, {
                    id: 1
                })
                productosJson.push(prod)
                fs.writeFileSync(this.archivo, JSON.stringify(productosJson,null,2))
                return 1;
            } else {
                productosJson.forEach(i => {
                    if (i.id > idMax) {
                        idMax = i.id
                    }
                })
                Object.assign(prod,{
                    id: idMax + 1
                })
                productosJson.push(prod)
                fs.writeFileSync(this.archivo, JSON.stringify(productosJson, null, 2))
                return (idMax + 1)
            }
        } catch {
            console.error("No se pudo guardar el archivo");
        }
    }
    async getById(id) {
        const productosJson = await this.#readFile();
        const productoId = productosJson.find(prod => prod.id === id);
        if (productoId) {
            console.log(productoId);
            return productoId;
        } else {
            console.log("No se encontro el producto");
            return null;
        }

    }
    async getAll() {
        const productosJson = await this.#readFile();
        if (productosJson !== []) {
            console.log(productosJson);
            return productosJson;
        } else {
            console.log("No hay productos");
            return null;
        }
    }
    async deleteById(id) {
        const productosJson = await this.#readFile();
        const productoDel = productosJson.find(prod => prod.id !== id)
        if (productoDel) {
            try {
                await fs.promises.writeFile(this.archivo, JSON.stringify([...productosJson],null,2), 'utf-8');
                console.log("Producto eliminado");
            } catch(err) {
                console.error(err);
            }
        } else {
            console.log("No se encontro el producto que desea eliminar");
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo,"[]",'utf-8');
            console.log("Se eliminaron los productos");
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Contenedor;    