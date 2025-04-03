// Variables

const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const botonBuscador = document.querySelector('#submit-buscador')
const precioTotal = document.querySelector('#total-carrito')

let articulosCarrito = []

// Eventos

llamarEventos();

function llamarEventos(){

    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarrito.addEventListener('click', e => {
        e.preventDefault();
        articulosCarrito = [];

        carritoHtml();
        addLocalstorage();
    })

    botonBuscador.addEventListener('click', e => {
        e.preventDefault();
    })

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []

        carritoHtml();
    })
}

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


function leerDatosCurso(curso){

    const datosCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some(curso => curso.id === datosCurso.id )

    if (existe){
        articulosCarrito.forEach(curso => {
            if(curso.id === datosCurso.id){
                curso.cantidad++;
            }
        })
    } else {
        articulosCarrito = [...articulosCarrito, datosCurso] //sino agregamos el nuevo curso
    }

// Otra forma semi-inmutable
/*   if (existe){
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === datosCurso.id){
                return { ...curso, cantidad: curso.cantidad + 1 }; // ← Nueva copia del objeto
            }
            return curso; // Los demás se devuelven sin cambios
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, datosCurso]
    } */

    carritoHtml();
}

function eliminarCurso(e){

    const borrar = e.target.classList.contains('borrar-curso');

    if(borrar){
        e.preventDefault();
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHtml();
        addLocalstorage();
    }
}

function carritoHtml(){

    limpiarHtml();

    let total = 0;

    // Recorremos el array y por cada elemento creamos la tabla y pintamos el html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const precioNumerico = parseFloat(precio.replace('$', ''))
        const precioMp = precioNumerico * cantidad
        total += precioMp;

        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100px"/>
        </td>
        <td>
        <p>${titulo}</p>
        </td>
        <td>
        <span>$${precioMp.toFixed(2)}</span>
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
        contenedorCarrito.appendChild(row);
        
        addLocalstorage();
    })

    // Mostrar el total en el span
    precioTotal.textContent = `$${total.toFixed(2)}`;
}

function addLocalstorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}