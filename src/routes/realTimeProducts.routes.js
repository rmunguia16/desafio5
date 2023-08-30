import { Router } from 'express';
import express from 'express';
import path from 'path';
import __dirname from "../utils.js";
import PM from '../../productManager.js';

const productsFile = '../products.json';
const app = express();

let pm = new PM.ProductManager(path.resolve(__dirname, productsFile));

const router = Router();

router.get('/', (req, res) => {
    let products = pm.getProducts();
    let { limit } = req.query;
    if (limit == undefined) {
        res.render("realTimeProducts", {
            products: products,
            rutaJs: "realTimeProducts",
            rutaCss: "realTimeProducts"
        });
    }
    else {
        let productLimit = [];
        for (let i = 0; i < limit; i++) {
            productLimit.push(products[i]);
        }
        res.render("realTimeProducts", {
            products: productLimit,
            rutaJs: "realTimeProducts",
            rutaCss: "realTimeProducts"
        });
    }
}); 

router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    console.log("El id solicitado es " + pid);
    res.send(pm.getProductsById(pid));
});

router.post('/', (req, res) => {
    let answer = pm.addProduct(req.body);
    res.send(answer);
});



router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    let answer = pm.updateProduct(pid, req.body);
    res.send(answer);
});



router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    pm.deleteProduct(pid);
    res.send({ status: 'success', message: 'Product deleted.' });
});

/*io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on('newProduct', (product) => {
        socket.emit('agregar',pm.addProduct(product));
    });
});*/

let io = app.get('io')
console.log(app.get('views'));
console.log(io);
/* io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on('newProduct', (product) => {
        console.log(product);
        socket.emit('agregar', pm.addProduct(product));
    });
});
console.log(io); */

export default router;