import fs from 'fs';
import PM from './productManager.js';
import path from 'path';

const pm = new PM.ProductManager(path.resolve("./products.json"), "Products");

const cartKeys = ["id", "quantity"]
const cartFormat = {
    "id": null,
    "products": []
}

class CartManager {

    constructor(path) {
        this.cartsList = [];
        this.path = path;
    }

    getCarts() {
        this.cartsList = [];
        if (fs.existsSync(this.path)) {
            this.cartsList = JSON.parse(fs.readFileSync(this.path, "utf-8")).Carts;
            return (this.cartsList)
        }
        else {
            return ({
                "status": "Failure",
                "message": " No existe el archivo"
            });
        }
    };


    getCartById(id) {
        this.getCarts();
        let cartById = this.cartsList.find(element => element.id == id);
        if (cartById == undefined) {
            console.log("No existe el carrito " + id);
            return ({
                "status": "Failure",
                "message": "No se encontro el producto"
            });
        } else {
            return cartById;
        }
    };


    addCart() {
        this.getCarts();
        let newCart = cartFormat;
        newCart.id = Date.now();
        this.cartsList.push(newCart);
        try {
            fs.writeFileSync(this.path, JSON.stringify({ "Carts": this.cartsList }));
            return ({
                "status": "Success",
                "message": `Se creo un nuevo carrito`
            });
        }
        catch (err) {
            return ({
                "status": "Failure",
                "message": err
            });
        };
    };


    addProduct(cid,pid, quantity) {
        this.getCarts();
        let cartIndex = this.cartsList.findIndex(element => element.id == cid);
        if (cartIndex == -1) {
            return ({
                "status": "Failure",
                "message": "No se pudo agregar el producto, el carrito no existe"
            });
        }
        let cart = this.cartsList[cartIndex];
        let productList = pm.getProducts();
        let productIndex = productList.findIndex(element => element.id == pid);
        if (productIndex == -1) {
            return ({
                "status": "Failure",
                "message": "No se pudo agregar el producto, porque no existe"
            });            
        }
        let cartItemIndex = cart.products.findIndex(element => element.id == pid);
        if (cartItemIndex == -1) {
            cart.products.push({
                "id": pid,
                "quantity": quantity
            });
        } else {
            cart.products[cartItemIndex].quantity += quantity;
        }

        try {
            fs.writeFileSync(this.path, JSON.stringify({ "Carts": this.cartsList }));
            console.log("Producto actualizado correctamente");
            return ({
                "id": product.id,
                "title": product.title,
                "status": "Success",
                "message": "Producto actualizado correctamente"
            })
        }
        catch (err) {
            console.log("Error al escribir el archivo:\n" + err + "\n");
            return ({
                "status": "Failure",
                "message": err
            });
        };

    };
};

export default { CartManager, cartFormat };