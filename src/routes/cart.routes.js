import fs from 'fs';
import { Router } from 'express';
import path from 'path';
import __dirname from "../utils.js";
import PM from '../../productManager.js';
import CM from '../../cartManager.js';
import utils from '../utils.js';

const cartFile = '../cart.json';
const productsFile = '../products.json';

let cart = new CM.CartManager(path.resolve(__dirname, cartFile));

const router = Router();

router.get("/", (req, res) => {
    res.send(cart.getCarts());
});

router.get("/:cid", (req, res) => {
    res.send(cart.getCartById(req.params.cid));
});

router.post("/", (req, res) => {
    res.send(cart.addCart());
});

router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    let answer = cart.addProduct(cid, pid, req.body.quantity);
    res.send(answer);
});

export default router; // Permite que otros archivos puedan importar este archivo