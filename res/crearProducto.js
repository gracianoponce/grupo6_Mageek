fs = require('fs');
getProducts = require ('./getProducts');
// Módulos básicos


function crearProducto (url, nombre, clase,...otros) {
    let productos = getProducts (url);
    const producto = productos [0];  // blueprint de objeto, habrá mejor manera de hacerlo?
    var nuevo = Object.create (producto);  // idem anterior
    console.log ('Creando producto...');  // checkpoint, borrar después
    nuevo.name = nombre; //asigna valores según orden de llegada!
    nuevo.class = clase;
    nuevo.price = otros [0];
    nuevo.description = otros [1];
    console.log('Nuevo producto creado!'); // anuncia creación, disposable hasta X
    console.log('Nombre: '+nuevo.name);
    console.log('Tipo: '+nuevo.class);
    console.log('Precio: $'+nuevo.price);
    console.log('Detalles: '+nuevo.description); // X
    productos.push (nuevo);
    fs.writeFileSync (url,JSON.stringify (productos,null,4)); // guarda ordenadamente el producto modificado
    }

module.exports = crearProducto;