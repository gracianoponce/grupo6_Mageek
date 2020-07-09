const fs = require("fs");
const path = require("path");
const pathDB = path.join(__dirname, "..", "data", "products.json");
const { Categorias, Productos } = require("../database/models");

const controller = {
    none: async function (req, res, next) {
        res.redirect("/");
    },
    product: async function (req, res) {
       // load database
       // load product
       const product = await Productos.findByPk(req.params.id, {
          include: [{
             model: Categorias,
             as: "categorias"
       }]});

        res.render("detalle-producto", {
            product: product,
        });
    },
    create: (req, res, next) => {
        //goes to add page, GET
        // middleware should check admin
        res.render("addProduct");
    },
    save: function (req, res, next) {
        // saves the product, POST
        //let products = JSON.parse(fs.readFileSync(pathDB)); // load database
        let products = JSON.parse(
            fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
        );
        //handle the req
        let product = {
            id: 102,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            usage: req.body.usage,
            flavortext: req.body.flavortext,
        };
        console.log(req.body);

        console.log(product);

        // maybe check something here?
        products.push(product);
        fs.writeFileSync(pathDB, JSON.stringify(products, null, 4)); //save, confirm, redirect with 3 seconds.
        res.send(req.body);
    },
};
module.exports = controller;
