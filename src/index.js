import express from 'express';
import fs from 'fs';
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js"; 
import { engine } from 'express-handlebars';
import __dirname from "./utils.js";
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


app.get('/', (req, res) => {
    res.render("home",{}
    );
});


app.listen(8080, () => {
    console.log('\nServidor escuchando en http://localhost:8080');
});