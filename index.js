fs = require ('fs');
crearProducto = require ('./res/crearProducto');
getProduct = require ('./res/getProducts')



const linea = [, , process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]];
const [prog, main, comm, par1, par2, par3, par4] = linea;

switch (comm) {
    case 'nuevo' : crearProducto ('./res/productos.JSON', par1, par2, par3, par4);
    break;
}
// crearProducto('./res/productos.JSON', 'Raging goblin', 'magic', '0.29', 'Haste.    He raged at the world, at his family, at his life. But mostly he just raged.    1/1');
