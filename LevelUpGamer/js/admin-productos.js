// CATEGORÍAS 
const categorias = [
  "Juegos de mesa",
  "Accesorios",
  "Consolas",
  "Computadores gamers",
  "Sillas gamers",
  "Mouse",
  "Mousepad",
  "Poleras personalizadas",
  "Polerones gamers personalizados",
  "Servicio técnico"
];

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// PRODUCTOS
let productos = [
  { id: "JM001", nombre: "Catan", precio: 29990, categoria: "Juegos de mesa", descripcion: "Juego de mesa estratégico para 3-4 jugadores, ideal para pasar horas entretenido." },
  { id: "JM002", nombre: "Carcassonne", precio: 24990, categoria: "Juegos de mesa", descripcion: "Coloca losetas y construye ciudades medievales en este clásico juego familiar." },
  { id: "AC001", nombre: "Controlador Inalambrico Xbox Series X", precio: 59990, categoria: "Accesorios", descripcion: "Control inalámbrico ergonómico para Xbox Series X, con vibración y precisión mejorada." },
  { id: "AC002", nombre: "Auriculares Gamer HyperX Cloud II", precio: 79990, categoria: "Accesorios", descripcion: "Auriculares con sonido envolvente 7.1, confort para largas sesiones de juego." },
  { id: "CO001", nombre: "PlayStation 5", precio: 549990, categoria: "Consolas", descripcion: "Consola de última generación con 1TB de almacenamiento, juegos en 4K y tiempos de carga ultrarrápidos." },
  { id: "CG001", nombre: "PC Gamer ASUS ROG Strix", precio: 1299990, categoria: "Computadores gamers", descripcion: "PC Gamer potente con tarjeta gráfica RTX, ideal para streaming y juegos AAA." },
  { id: "SG001", nombre: "Silla Gamer Secretlab Titan", precio: 349990, categoria: "Sillas gamers", descripcion: "Silla ergonómica con soporte lumbar, perfecta para largas sesiones de gaming." },
  { id: "MS001", nombre: "Mouse Gamer Logitech G502 HERO", precio: 49990, categoria: "Mouse", descripcion: "Mouse con sensor HERO 25K, precisión extrema y botones programables." },
  { id: "MP001", nombre: "Mousepad Razer Goliathus Extended Chroma", precio: 29990, categoria: "Mousepad", descripcion: "Mousepad extendido con iluminación Chroma y superficie optimizada para gaming." },
  { id: "PP001", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, categoria: "Poleras personalizadas", descripcion: "Polera de algodón con diseño gamer exclusivo 'Level-Up', cómoda y estilosa." }
];


const selectCategoria = document.getElementById("categoria");
categorias.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  selectCategoria.appendChild(option);
});

const tablaProductos = document.getElementById("tablaProductos");

// MOSTRAR PRODUCTOS
function mostrarProductos() {
  tablaProductos.innerHTML = "";
  productos.forEach(prod => {
    const tr = document.createElement("tr");
    const precioTexto = prod.precio === 0 ? "FREE" : `$${prod.precio.toLocaleString()} CLP`;
    tr.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>${prod.categoria}</td>
      <td>${precioTexto}</td>
      <td>
        <button class="btn-ir btn-sm me-2" onclick="editarProducto('${prod.id}')">Editar</button>
        <button class="btn-ir btn-sm btn-danger" onclick="eliminarProducto('${prod.id}')">Eliminar</button>
      </td>
    `;
    tablaProductos.appendChild(tr);
  });
}

// EDITAR PRODUCTO
function editarProducto(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  document.getElementById("productoId").value = prod.id;
  document.getElementById("codigo").value = prod.id;
  document.getElementById("nombreProd").value = prod.nombre;
  document.getElementById("categoria").value = prod.categoria;
  document.getElementById("precio").value = prod.precio;
  document.getElementById("descripcionProd").value = prod.descripcion; // <--- aquí

  document.getElementById("modalProductoLabel").textContent = "Editar Producto";
  const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
  modal.show();
}

// GUARDAR PRODUCTO
document.getElementById("formProducto").addEventListener("submit", function(e){
  e.preventDefault();

  const id = document.getElementById("codigo").value.trim();
  const nombre = document.getElementById("nombreProd").value.trim();
  const categoria = document.getElementById("categoria").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcionProd").value.trim(); // <--- aquí

  if (!id || !nombre || !categoria || isNaN(precio) || !descripcion) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos[index] = { id, nombre, categoria, precio, descripcion }; // <--- incluir descripción
  } else {
    productos.push({ id, nombre, categoria, precio, descripcion });
  }

  mostrarProductos();

  const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
  modal.hide();
  this.reset();
  document.getElementById("modalProductoLabel").textContent = "Nuevo Producto";
});


// ELIMINAR PRODUCTO
function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  mostrarProductos();
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
