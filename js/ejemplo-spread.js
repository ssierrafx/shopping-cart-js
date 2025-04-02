// Ejemplo práctico de la diferencia entre usar y no usar spread operator

// Caso 1: Sin spread operator (referencia)
console.log('=== CASO 1: Sin spread operator ===');
let carritoOriginal = [
    { id: 1, nombre: 'Curso 1', cantidad: 1 },
    { id: 2, nombre: 'Curso 2', cantidad: 1 }
];

let carritoReferencia = carritoOriginal;
carritoReferencia[0].cantidad = 2;

console.log('Carrito Original:', carritoOriginal);
console.log('Carrito Referencia:', carritoReferencia);
console.log('Son el mismo array:', carritoOriginal === carritoReferencia);

// Caso 2: Con spread operator (copia)
console.log('\n=== CASO 2: Con spread operator ===');
let carritoOriginal2 = [
    { id: 1, nombre: 'Curso 1', cantidad: 1 },
    { id: 2, nombre: 'Curso 2', cantidad: 1 }
];

let carritoCopia = [...carritoOriginal2];
carritoCopia[0].cantidad = 2;

console.log('Carrito Original:', carritoOriginal2);
console.log('Carrito Copia:', carritoCopia);
console.log('Son el mismo array:', carritoOriginal2 === carritoCopia);

// Caso 3: Ejemplo práctico con tu código
console.log('\n=== CASO 3: Ejemplo con tu código ===');
let articulosCarrito = [
    { id: 1, nombre: 'Curso 1', cantidad: 1 },
    { id: 2, nombre: 'Curso 2', cantidad: 1 }
];

// Simulamos la actualización de cantidad
const cursos = articulosCarrito.map(curso => {
    if (curso.id === 1) {
        curso.cantidad++;
    }
    return curso;
});

// Sin spread operator
let articulosCarritoMal = cursos;
console.log('Sin spread operator:');
console.log('Cursos:', cursos);
console.log('ArticulosCarrito:', articulosCarritoMal);

// Con spread operator
let articulosCarritoBien = [...cursos];
console.log('\nCon spread operator:');
console.log('Cursos:', cursos);
console.log('ArticulosCarrito:', articulosCarritoBien); 