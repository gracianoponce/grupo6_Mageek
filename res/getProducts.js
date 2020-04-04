fs = require ('fs');

function getProducts (url) {
    let product = JSON.parse (fs.readFileSync (url));
    return product;
}

module.exports = getProducts;