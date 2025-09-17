// PRODUCTOS DISPONIBLES
const productos = [
  { 
    id: "JM001", 
    nombre: "Catan", 
    precio: 29990, 
    img: "img/prod1.jpg", 
    descripcion: "Catan es un juego de mesa estratégico donde los jugadores colonizan la isla de Catan, intercambian recursos y construyen asentamientos para dominar la isla. Ideal para 3-4 jugadores y partidas de 60-90 minutos."
  },
  { 
    id: "JM002", 
    nombre: "Carcassonne", 
    precio: 24990, 
    img: "img/prod2.jpg", 
    descripcion: "Carcassonne es un juego de mesa donde construyes una ciudad medieval colocando losetas y posicionando seguidores estratégicamente. Perfecto para toda la familia y partidas de 30-45 minutos."
  },
  { 
    id: "AC001", 
    nombre: "Controlador Inalambrico Xbox Series X", 
    precio: 59990, 
    img: "img/prod3.jpg", 
    descripcion: "Control inalámbrico para Xbox Series X con diseño ergonómico, botones sensibles y conectividad de baja latencia, ideal para sesiones largas de juego con máxima comodidad y precisión."
  },
  { 
    id: "AC002", 
    nombre: "Auriculares Gamer HyperX Cloud II", 
    precio: 79990, 
    img: "img/prod4.jpg", 
    descripcion: "Auriculares gamer con sonido envolvente 7.1, micrófono desmontable y almohadillas de espuma viscoelástica para máxima comodidad. Perfectos para gaming y streaming profesional."
  },
  { 
    id: "CO001", 
    nombre: "PlayStation 5", 
    precio: 549990, 
    img: "img/prod5.jpg", 
    descripcion: "Consola gamer de última generación con 1TB de almacenamiento, gráficos 4K, retrocompatibilidad con PS4, y soporte para juegos en alta velocidad con su SSD ultrarrápido. Ideal para gamers exigentes."
  },
  { 
    id: "CG001", 
    nombre: "PC Gamer ASUS ROG Strix", 
    precio: 1299990, 
    img: "img/prod6.jpg", 
    descripcion: "PC gamer de alto rendimiento con procesador Intel Core i7, tarjeta gráfica NVIDIA RTX, 16GB de RAM y almacenamiento SSD de 1TB. Equipado con iluminación RGB y listo para juegos AAA a máxima calidad."
  },
  { 
    id: "SG001", 
    nombre: "Silla Gamer Secretlab Titan", 
    precio: 349990, 
    img: "img/prod7.jpg", 
    descripcion: "Silla ergonómica para gamers con soporte lumbar ajustable, reposabrazos 4D y tapizado de cuero PU premium. Diseñada para largas sesiones de juego con máxima comodidad y estilo."
  },
  { 
    id: "MS001", 
    nombre: "Mouse Gamer Logitech G502 HERO", 
    precio: 49990, 
    img: "img/prod8.jpg", 
    descripcion: "Mouse gamer con sensor HERO 16K de alta precisión, 11 botones programables y diseño ergonómico. Ideal para juegos competitivos y personalización total del rendimiento."
  },
  { 
    id: "MP001", 
    nombre: "Mousepad Razer Goliathus Extended Chroma", 
    precio: 29990, 
    img: "img/prod9.jpg", 
    descripcion: "Mousepad extendido con superficie optimizada para sensores ópticos y láser, iluminación RGB personalizable y base antideslizante. Perfecto para setups gamer completos."
  },
  { 
    id: "PP001", 
    nombre: "Polera Gamer Personalizada 'Level-Up'", 
    precio: 14990, 
    img: "img/prod10.jpg", 
    descripcion: "Polera oficial del equipo Level-Up Gamer, confeccionada con algodón de alta calidad, cómoda y resistente. Ideal para fans del gaming y para mostrar tu estilo gamer."
  }
];


// MOSTRAR PRODUCTOS
const listaProductos = document.getElementById("listaProductos");

productos.forEach(prod => {
  const col = document.createElement("div");
  col.classList.add("col-md-3", "mb-4");

  col.innerHTML = `
    <div class="card producto-card h-100 text-center">
      <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
      <div class="card-body">
        <h5 class="card-title">${prod.nombre}</h5>
        <p class="card-text">$${prod.precio.toLocaleString()} CLP</p>
        <button class="btn-ir mb-2" onclick="agregarAlCarrito('${prod.id}')">Añadir</button>
        <a href="detalle.html?id=${prod.id}" class="btn-ir mb-2">Ver detalle</a>
      </div>
    </div>
  `;
  listaProductos.appendChild(col);
});

// ============================
// CARRITO CON LOCALSTORAGE
// ============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
}

function mostrarCarrito() {
  const carritoLista = document.getElementById("carritoLista");
  const carritoVacio = document.getElementById("carritoVacio");
  const carritoTotal = document.getElementById("carritoTotal");

  carritoLista.innerHTML = "";

  if (carrito.length === 0) {
    carritoVacio.style.display = "block";
    carritoTotal.textContent = "$0 CLP";
    return;
  }

  carritoVacio.style.display = "none";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "bg-dark", "text-white");
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()} CLP
      <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${item.id}')">X</button>
    `;
    carritoLista.appendChild(li);
  });

  carritoTotal.textContent = `$${total.toLocaleString()} CLP`;
}

// EVENTOS
document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);

mostrarCarrito();
