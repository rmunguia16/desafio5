import { Router } from 'express';
import path from 'path';
import __dirname from "../utils.js";
import PM from '../../productManager.js';

const productsFile = '../products.json';

let pm = new PM.ProductManager(path.resolve(__dirname,productsFile));

const router = Router();

router.get('/', (req, res) => {
    let products = pm.getProducts();
    let {limit} = req.query;
    if (limit == undefined) {
        res.send(products)
    }
    else {
        let productLimit = [];
        for (let i = 0; i < limit; i++) {
            productLimit.push(products[i]);
        }
        res.send(productLimit);
    }
});

router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    console.log("El id solicitado es "+pid);
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

export default router;