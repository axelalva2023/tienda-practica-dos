





























//Capturar elementos htlm y agegarles eventos escucha click

const fondos = ["comida.jpg", "comida2.jpg", "comida3.jpg", "comida4.jpg", "comida5.jpg", "comida6.jpg","comida7.jpg","comida8.jpg"]
const productos = JSON.parse(localStorage.getItem("productos")) || []
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

let frase = "Bienvenidos"
i= 0

setInterval(()=>{
    if(i < frase.length){
        titulo.textContent += frase[i]
        i++
    }else{
        titulo.textContent = ""
        i= 0
    }
}, 200)

const contenedor = document.getElementById("contenedor")
const contenedorFondo = document.getElementById("contenedorFondo")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const inputNombre = document.getElementById("campoNombre")
const inputImagen = document.getElementById("campoImagen")
const inputPrecio = document.getElementById("campoPrecio")
const inputBuscar = document.getElementById("campoBuscar")
const boton = document.getElementById("boton")
const botonBuscar = document.getElementById("botonBuscar")
const botonVaciarCarrito = document.getElementById("vaciarCarrito")
const total = document.getElementById("total")
const contador = document.getElementById("contador")
const titulo = document.getElementById("titulo")

function renderProducto(lista = productos) {
    contenedor.innerHTML = ""
    lista.map((el, index) => {
        const {id, nombre, precio, img} = el
        contenedor.innerHTML += `<div>
        <img src=${img} alt="foto-producto">
        <h3>${nombre} id:${id}</h3>
        <p>${precio}</p>
        <button onclick="agregarCarrito(${index})">Agregar al carrito</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
    </div>
`
    })
}

function agregarProducto() {
    productos.push({id: productos.length + 1, nombre: inputNombre.value, precio: inputPrecio.value, img: inputImagen.value})
    localStorage.setItem("productos", JSON.stringify(productos))
    renderProducto()
}

function eliminarProducto(index) {
    productos.splice(index, 1)
    localStorage.setItem("productos", JSON.stringify(productos))
    renderProducto()
}

function agregarCarrito(index) {
    alert(`${productos[index].nombre} agregado al carrito`)
    carrito.push({id: productos[index].id, nombre: productos[index].nombre, precio: productos[index].precio, img: productos[index].img})
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
    totalCarrito()
    contadorCarrito()
}

function cambiarFondo(arr) {
    let random = Math.floor(Math.random() * arr.length)
    contenedorFondo.style.backgroundImage = ` url(./img/${arr[random]})`
}

function renderCarrito() {
    contenedorCarrito.innerHTML = ""
    carrito.map((el, index) =>{
        const { nombre, precio, img} = el
        contenedorCarrito.innerHTML += `<div class="carrito-item">
        <img src=${img} alt="foto-producto">
        <h3>${nombre}</h3>
        <p>${precio}</p>
        <button onclick="eliminarItem(${index})">Eliminar</button>
    </div>
`
    })
}

function vaciarCarrito() {
    carrito.splice(0,carrito.length)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
    contadorCarrito()
}

function eliminarItem(index) {
    carrito.splice(index, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
    totalCarrito()
    contadorCarrito()
}

function totalCarrito() {
    let resultado = carrito.reduce((acc, el) => acc + parseInt(el.precio), 0)
    total.textContent = `Total: ${resultado}`
}

function buscarProducto() {
    let resultado = productos.find(el => el.nombre.includes(inputBuscar.value))
    let objeto = JSON.stringify(resultado)
    alert(objeto)
}

function contadorCarrito() {
    contador.textContent = carrito.length
}



if (boton) {
    boton.addEventListener("click", (e) => {
        e.preventDefault()
        agregarProducto()
        inputImagen.value = ""
        inputNombre.value = ""
        inputPrecio.value = ""
    })
}

if (botonBuscar) {
    botonBuscar.addEventListener("click", (e) =>{
        e.preventDefault()
        buscarProducto()
        inputBuscar.value = ""
    })
}

if (inputBuscar) {
    inputBuscar.addEventListener("input", (e) =>{
    e.preventDefault()
    const frase = inputBuscar.value.toLowerCase()
    const arr = productos.filter(el => el.nombre.toLowerCase().includes(frase))
    renderProducto(arr)
})
}


if (botonVaciarCarrito) {
    botonVaciarCarrito.addEventListener("click", (e) =>{
        e.preventDefault()
        vaciarCarrito()
        totalCarrito()
    })
}

if (contenedorCarrito) {
        renderCarrito()
        totalCarrito()
        contadorCarrito()
    }

if (contenedor) {
    renderProducto()
}

if (contador) {
    contador.textContent = carrito.length
}

if(contenedorFondo){
    window.addEventListener("DOMContentLoaded",(e) =>{
        e.preventDefault()
        cambiarFondo(fondos)
    })
}
