const controller = {
    index: (req, res, next) => {
        res.render("index", { title: "Express" }); // Needs DB
    },
};
module.exports = controller;
