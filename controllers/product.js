const fs = require("fs");
const path = require("path");
const pathDB = path.join(
   __dirname,
   '..',
   'data',
   'products.json'
);


const controller = {
   none: (req, res, next) => {
      res.redirect("/");
   },
   product: (req, res) => {
      const products = JSON.parse(fs.readFileSync(pathDB)); // load database
      const product = products[req.params.id];
      console.log(product);

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
      let products = JSON.parse(fs.readFileSync(pathDB)); // load database
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
      fs.writeFileSync(pathDB,JSON.stringify(products, null, 4)); //save, confirm, redirect with 3 seconds.
      res.send(req.body);
   },
};
module.exports = controller;
