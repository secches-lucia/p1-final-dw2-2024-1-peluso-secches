"use strict"

/* PELUSO MARTINA | SECCHES LUCÍA */

let productos = [
  {
    id: 1,
    nombre: "Hyperdrama — Justice",
    precio: 30000,
    imagenes: [
      "hyperdrama.jpg",
      "justice.jpg"
    ],
    categoria: "Electronica",
    descripcion:
      "Hyperdrama es el cuarto álbum de estudio del dúo francés de música electrónica Justice, lanzado el 26 de abril de 2024 bajo el sello discográfico de Ed Banger Records y Because Music. Es también su primer álbum de estudio después de 7 años sin material nuevo.",
  },
  {
    id: 2,
    nombre: "BRAT — Charli xcx",
    precio: 35000,
    imagenes: [
      "brat.jpg",
      "charli-xcx.jpg"
    ],
    categoria: "Electronica",
    descripcion:
      'BRAT es el sexto álbum de estudio de la cantante inglesa Charli XCX, lanzado por Atlantic Records el 7 de Junio de 2024 y fuertemente inspirado en la escena musical rave inglesa de la década de los 2000. Según Charli misma, BRAT es su "disco más agresivo y conflictivo", pero también el más vulnerable.',
  },
  {
    id: 3,
    nombre: "KISS OF LIFE — KISS OF LIFE",
    precio: 25000,
    imagenes: [
      "kiss-of-life.jpg",
      "kof.jpg"
    ],
    categoria: "K-Pop",
    descripcion:
      "KISS OF LIFE es el primer EP del grupo surcoreano del mismo nombre. Fue lanzado por S2 Entertainment el 5 de julio de 2023. El mini álbum contiene seis pistas, incluido el sencillo principal «Shhh» y cuatro canciones en solitario, una por cada integrante, las cuales también tienen videos complementarios.",
  },
  {
    id: 4,
    nombre: "Armageddon — aespa",
    precio: 30000,
    imagenes: [
      "armageddon.jpg",
      "aespa.jpg"
    ],
    categoria: "K-Pop",
    descripcion:
      'Armageddon es el primer álbum completo del grupo surcoreano femenino "aespa". Es liderado por las canciones "Supernova" y "Armageddon", consideradas por muchos de sus fanáticos como las mejores en toda su discografía.',
  },
  {
    id: 5,
    nombre: "American Dream — 21 Savage",
    precio: 25000,
    imagenes: [
      "american-dream.jpg",
      "21-savage.jpg"
    ],
    categoria: "Hiphop",
    descripcion:
      "American Dream es el tercer álbum de estudio del rapero británico-estadounidense 21 Savage. Fue lanzado por Slaughter Gang Entertainment y Epic Records el 12 de enero de 2024, y tiene colaboraciones con otros artistas muy conocidos de la escena, como Doja Cat y Travis Scott.",
  },
  {
    id: 6,
    nombre: "MEGAN — Megan Thee Stallion",
    precio: 35000,
    imagenes: [
      "megan.jpg",
      "megan-thee-stallion.jpg"
    ],
    categoria: "Hiphop",
    descripcion:
      'MEGAN es el tercer álbum estudio homónimo de la rapera texana Megan Thee Stallion, y fue estrenado el 28 de junio del 2024 mediante Hot Girl Productions y BMG, marcando su primer proyecto desde su salida de 1501 Certified..',
  },
];

let selectFiltro = document.getElementById("filtro");
let listaDeProductos = document.getElementById("productos");

let spanContadorCarrito = document.querySelector("header button span");
let contadorCarrito = 0;

let spanPrecioTotal = document.querySelector("header p span");
let precioTotal = 0;

let peso = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS'}); // Para formatear el precio a pesos


let carrito = obtenerProductosEnCarrito();

carrito.forEach(producto => {
  contadorCarrito += producto.cantidad;
  precioTotal += producto.subtotal;
});

actualizarCarrito();

let botonVerCarrito = document.querySelector("header button");

let main = document.querySelector("main");

// Filtrado por categorías

selectFiltro.addEventListener("change", event => {
  let filtroSeleccionado = event.target.value;
  mostrarBanner(filtroSeleccionado);

  if (filtroSeleccionado === "Todos") {
    listarProductos();
  } else {
    let productosFiltrados = productos.filter(producto => producto.categoria === filtroSeleccionado);
    listarProductos(productosFiltrados);
  }
});

// Función para mostrar el banner al cambiar de categoría

function mostrarBanner(categoria){
  let bannerExistente = document.querySelector(".banner");

  if (bannerExistente) {
    main.removeChild(bannerExistente);
  }

  let banner = document.createElement("div");
  banner.classList.add("banner");

  let imagen = document.createElement("img");
  imagen.alt = "Banner publicitario";
  switch (categoria) {
    case "Hiphop":
      imagen.src = "img/banner-hiphop.jpg";
      break;
    case "Electronica":
      imagen.src = "img/banner-electronica.jpg";
      break;
    case "K-Pop":
      imagen.src = "img/banner-kpop.jpg";
      break;
    default:
      imagen.src = "img/banner-todos.jpg";
  }

  let cerrar = document.createElement("a");
  cerrar.classList.add("cerrar");
  cerrar.href = "#";
  cerrar.innerText = "X";
  cerrar.addEventListener("click", event => {
    event.preventDefault();
    main.removeChild(banner);
  });

  setTimeout(function() {
    main.removeChild(banner);
  }, 10000);

  banner.append(imagen, cerrar);
  main.appendChild(banner);
}

// Función para listar productos

function listarProductos(productosAListar = productos) {
    listaDeProductos.innerText = "";
    for (let producto of productosAListar) {
      let li = document.createElement("li");
  
      let img = document.createElement("img");
      img.src = `img/${producto.imagenes[0]}`;
      img.alt = producto.nombre;
  
      let div = document.createElement("div");
  
      let nombreProducto = document.createElement("h3");
      nombreProducto.innerText = producto.nombre;
  
      let precioProducto = document.createElement("p");
      precioProducto.innerText = "Precio: ";
      let spanPrecioProducto = document.createElement("span");
      spanPrecioProducto.innerText = peso.format(producto.precio);
      precioProducto.appendChild(spanPrecioProducto);
  
      let categoriaProducto = document.createElement("p");
      categoriaProducto.innerText = "Género: " + producto.categoria;
  
      let botonAgregar = document.createElement("button");
      botonAgregar.innerText = "Agregar al carrito";
      botonAgregar.dataset.id = producto.id;
      botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
  
      let botonDetalles = document.createElement("button");
      botonDetalles.innerText = "Descripción";
      botonDetalles.addEventListener("click", () => mostrarDetallesProducto(producto));
  
      div.append(nombreProducto, precioProducto, categoriaProducto, botonAgregar, botonDetalles);
  
      li.append(img, div);
      listaDeProductos.appendChild(li);
    }
}

// Función para agregar al carrito

function agregarAlCarrito(producto) {
    let productoExistente = carrito.find(item => item.id === producto.id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
      productoExistente.subtotal += producto.precio;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        subtotal: producto.precio,
        imagen: producto.imagenes[0],
        categoria: producto.categoria,
        cantidad: 1,
      });
    }
  
    contadorCarrito++;
    precioTotal += producto.precio;
  
    actualizarCarrito();
    guardarProductosEnCarrito();
}

// Función para actualizar el carrito

function actualizarCarrito() {
    spanContadorCarrito.innerText = `(${contadorCarrito})`;
    spanPrecioTotal.innerText = peso.format(precioTotal);
}

// Función para mostrar el carrito

function mostrarCarrito() {
  let resultCarrito = document.createElement("div");
  resultCarrito.classList.add("modal");
  resultCarrito.id = "resultCarrito";

  let contenidoCarrito = document.createElement("div");

  let cerrar = document.createElement("a");
  cerrar.classList.add("cerrar");
  cerrar.href = "#";
  cerrar.innerText = "X";
  cerrar.addEventListener("click", event => {
    event.preventDefault();
    main.removeChild(resultCarrito);
  });

  let discosTotal = document.createElement("p");
  discosTotal.innerText = `Items: ${contadorCarrito} — Total: ${peso.format(precioTotal)}`;
  discosTotal.classList.add("totalCarrito");

  let hr = document.createElement("hr");

  let listaCarrito = document.createElement("ul");
  listaCarrito.id = "lista-carrito";

  let botonPagar = document.createElement("button");
  botonPagar.innerText = "Ir a Pagar";
  botonPagar.addEventListener("click", () => mostrarFormularioCheckout());

  let botonVaciar = document.createElement("button");
  botonVaciar.innerText = "Vaciar";
  botonVaciar.addEventListener("click", vaciarCarrito);

  let botonContainer = document.createElement("div");
  botonContainer.classList.add("botonContainer");
  botonContainer.appendChild(botonPagar);
  botonContainer.appendChild(botonVaciar);

  contenidoCarrito.append(cerrar, discosTotal, hr, listaCarrito, botonContainer);

  resultCarrito.appendChild(contenidoCarrito);
  main.appendChild(resultCarrito);

  listarProductosCarrito();
}

// Función para listar productos en el carrito

function listarProductosCarrito() {
    let listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerText = "";
    let totalCarrito = document.querySelector(".totalCarrito");
    totalCarrito.innerText = `Items: ${contadorCarrito} — Total: ${peso.format(precioTotal)}`;
  
    for (let producto of carrito) {
      let li = document.createElement("li");
      li.classList.add("item-carrito");
  
      let imagenProducto = document.createElement("img");
      imagenProducto.src = `img/${producto.imagen}`;
      imagenProducto.alt = producto.nombre;

      let nombreProducto = document.createElement("span");
      if (producto.cantidad > 1) {
        nombreProducto.innerText = `${producto.nombre} - $${producto.subtotal} — (${producto.cantidad})`;
      } else {
        nombreProducto.innerText = `${producto.nombre} - $${producto.precio}`;
      }
  
      let eliminar = document.createElement("a");
      eliminar.classList.add("eliminar");
      eliminar.href = "#";
      eliminar.innerText = "Eliminar";
      eliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));
  
      li.append(imagenProducto, nombreProducto, eliminar);
  
      listaCarrito.appendChild(li);
    }
  }

// Función para eliminar del carrito

function eliminarDelCarrito(id) {
    let index = carrito.findIndex(item => item.id === id);
  
    if (index !== -1) {
      let productoEliminado = carrito[index];
      precioTotal -= productoEliminado.precio;
      contadorCarrito--;
  
      if (productoEliminado.cantidad > 1) {
        productoEliminado.cantidad--;
        productoEliminado.subtotal -= productoEliminado.precio;
      } else {
        carrito.splice(index, 1);
      }
  
      actualizarCarrito();
      listarProductosCarrito();
      guardarProductosEnCarrito();
    }
}


// Función para vaciar el carrito

function vaciarCarrito() {
    carrito = [];
    contadorCarrito = 0;
    precioTotal = 0;
    actualizarCarrito();
    guardarProductosEnCarrito();
    main.removeChild(document.getElementById("resultCarrito"));
}


// Función para mostrar el formulario de checkout

function mostrarFormularioCheckout() {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "checkoutModal";

  let contenido = document.createElement("div");

  let titulo = document.createElement("h2");
  titulo.innerText = "Checkout";

  let formulario = document.createElement("form");
  formulario.id = "checkoutForm";

  let campos = [
    {label: "Nombre", type: "text", id: "nombre", required: true},
    {label: "Email", type: "email", id: "email", required: true},
    {label: "Dirección", type: "text", id: "direccion", required: true},
    {label: "Medio de pago", type: "select", id: "medioPago", required: true, options: ["Crédito", "Débito"]},
    {label: "Núm. de la tarjeta", type: "number", id: "tarjeta", required: true},
    {label: "Cód. seguridad", type: "number", id: "codigo", required: true},
  ];

  campos.forEach(campo => {
    let div = document.createElement("div");

    let label = document.createElement("label");
    label.setAttribute("for", campo.id);
    label.innerText = campo.label;

    let input;
    if (campo.type === "select") {
      input = document.createElement("select");
      input.id = campo.id;
      input.name = campo.id;
      input.required = campo.required;

      campo.options.forEach(option => {
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.innerText = option;
        input.appendChild(optionElement);
      });
    } else {
      input = document.createElement("input");
      input.type = campo.type;
      input.id = campo.id;
      input.name = campo.id;
      input.required = campo.required;

    }

    div.append(label, input);
    formulario.appendChild(div);
  });

  let mensajeError = document.createElement("p");
  mensajeError.id = "mensajeError";

  let botonEnviar = document.createElement("button");
  botonEnviar.type = "submit";
  botonEnviar.innerText = "Comprar";
  botonEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      procesarCompra();
    } else {
      mensajeError.innerText = "Por favor, completa todos los campos.";
    }
  });

  let botonCerrar = document.createElement("a");
  botonCerrar.classList.add("cerrar");
  botonCerrar.href = "#";
  botonCerrar.innerText = "X";
  botonCerrar.addEventListener("click", event => {
    event.preventDefault();
    main.removeChild(modal);
  });

  contenido.append(titulo, formulario, mensajeError, botonEnviar, botonCerrar);
  modal.appendChild(contenido);
  main.appendChild(modal);

  // Mostrar el modal
  setTimeout(() => modal.classList.remove("ocultar"), 0);
}

// Función para validar el formulario

function validarFormulario() {
  let campos = document.querySelectorAll("#checkoutForm input");
  return Array.from(campos).every(campo => campo.value.trim() !== "");
}

// Función para procesar la compra

function procesarCompra() {
  // Aquí puedes procesar el formulario y enviar la compra
  alert("Compra realizada con éxito.");
  carrito = [];
  contadorCarrito = 0;
  precioTotal = 0;
  actualizarCarrito();
  main.removeChild(document.getElementById("checkoutModal"));
  guardarProductosEnCarrito();
}

// Función para guardar productos en el carrito

function guardarProductosEnCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para obtener productos del carrito

function obtenerProductosEnCarrito() {
  let carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

listarProductos();
botonVerCarrito.addEventListener("click", mostrarCarrito);