const controller = {
    cart: (req, res, next) => {
    res.render("cart", { title: "Express" }); // Needs DB
},
};
module.exports = controller;