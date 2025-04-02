// Variables

const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const botonBuscador = document.querySelector('#submit-buscador')

let articulosCarrito = []

// Eventos

llamarEventos();

function llamarEventos(){

    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHtml();
    })

    botonBuscador.addEventListener('click', e => {
        e.preventDefault();
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
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHtml();
    }
}

function carritoHtml(){

    limpiarHtml();

    // Recorremos el array y por cada elemento creamos la tabla y pintamos el html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100px"/>
        </td>
        <td>
        <p>${titulo}</p>
        </td>
        <td>
        <span>${precio}</span>
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
