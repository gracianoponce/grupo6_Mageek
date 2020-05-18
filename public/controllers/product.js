const controller = {
    none: (req, res, next) => {
        res.redirect("/");
    },
    product: (req,res) => {
        //  find product, return it
        res.render("detalle-producto", {producto : producto})
    },
};
module.exports = controller;
