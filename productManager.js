import fs from 'fs';

class Product {
    constructor(id, title, description, code, price, status, stock, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail || undefined;
    }
};

const objectKeys = ["id", "title", "description", "code", "price", "status", "stock", "category", "thumbnail"]

const productFormat = {
    "Products": []
}

class ProductManager {
    constructor(path) {
        this.productList = [];
        this.path = path;
    }

    getProducts() {
        this.productList = [];
        let products;
        if (fs.existsSync(this.path)) {
            products = JSON.parse(fs.readFileSync(this.path, "utf-8")).Products;
        }
        else {
            return ({
                "status": "Failure",
                "message": "No se encontro prodcutos porque el tipo no es correcto"
            });
        }
        if (products != undefined) products.forEach(element => this.productList.push(element));
        return (this.productList);
    };


    getProductsById(id) {
        this.getProducts();
        let productById = this.productList.find(element => element.id == id);
        if (productById == undefined) {
            console.log("No existe el producto " + id);
            return ({
                "status": "Failure",
                "message": "No se encontro el producto"
            });
        } else {
            return productById;
        }
    };

    addProduct(product) {
        this.getProducts();
        console.log(product);
        if (product.thumbnail == undefined) product.thumbnail = "Sin imagen";
        if (Object.keys(product).toString() != objectKeys.toString()) {
            console.log("No se puede agregar, porque el producto no tiene las propiedades necesarias");
            return ({
                "status": "Failure",
                "message": "No se pudo agregar el producto"
            });
        };
        this.productList.forEach(element => {
            if (element.code == product.code) {
                console.log("No se puede agregar, porque el producto ya existe");
                return ({
                    "status": "Failure",
                    "message": "No se puede agregar, porque el producto ya existe"
                });
            }
        });
        product.id = Date.now();
        this.productList.push(product);
        try {
            let jsonProdcuts = productFormat;
            jsonProdcuts.Products = this.productList;
            fs.writeFileSync(this.path, JSON.stringify(jsonProdcuts));
            console.log("Producto agregado correctamente");
            return ({
                "id": product.id,
                "title": product.title,
                "status": "Success",
                "message": "Producto agregado correctamente"
            });
        }
        catch (err) {
            console.log("Error al escribir el archivo:\n" + err + "\n");
            return ({
                "status": "Failure",
                "message": err
            })
        };
    };


    updateProduct(id, product) {
        this.getProducts();
        let updateProduct = product;
        updateProduct.id = id;
        if (updateProduct.thumbnail == (undefined || null)) updateProduct.thumbnail = "Sin imagen";
        if (Object.keys(updateProduct).toString() != objectKeys.toString()) {
            console.log("No se puede agregar, porque el producto no tiene las propiedades necesarias");
            return;
        };

        let productIndex = this.productList.findIndex(element => element.id == id);
        if (productIndex == -1) {
            console.log("No existe el producto " + id);
            return ({
                "status": "Failure",
                "message": "No se pudo agregar el producto, porque ya existe"
            });
        } else {
            this.productList[productIndex] = updateProduct;
        };
        try {
                let jsonProdcuts = productFormat;
                jsonProdcuts.Products = this.productList;
                fs.writeFileSync(this.path, JSON.stringify(jsonProdcuts));
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


    deleteProduct(id) {
        this.getProducts();
        let productIndex = this.productList.findIndex(element => element.id == id);
        if (productIndex == -1) {
            console.log("No existe el producto " + id);
            return ({
                "status": "Failure",
                "message": "No existe el producto"
            });
        } else {
            this.productList.splice(productIndex, 1);
        }
        try {
            let jsonProdcuts = productFormat;
            jsonProdcuts.Products = this.productList;
            fs.writeFileSync(this.path, JSON.stringify(jsonProdcuts));
            console.log("Producto borrado correctamente");
            return ({
                "id": id,
                "status": "Success",
                "message": "Producto borrado correctamente"
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

export default { ProductManager, productFormat };