// ============================
// CARGAR CARRITO DESDE LOCALSTORAGE
// ============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function agregarCantidad(id) {
  const item = carrito.find(p => p.id === id);
  if (item) { item.cantidad++; guardarCarrito(); }
}

function quitarCantidad(id) {
  const item = carrito.find(p => p.id === id);
  if (item && item.cantidad > 1) { item.cantidad--; guardarCarrito(); }
}

function actualizarCantidad(id, cantidad) {
  const item = carrito.find(p => p.id === id);
  const cant = parseInt(cantidad);
  if (item && !isNaN(cant) && cant > 0) {
    item.cantidad = cant;
    guardarCarrito();
  }
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("carritoLista");
  const totalSpan = document.getElementById("carritoTotal");

  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML = "<p>Tu carrito está vacío.</p>";
    if (totalSpan) totalSpan.textContent = "0";
    return;
  }

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const row = document.createElement("div");
    row.classList.add(
      "producto-carrito",
      "mb-3",
      "p-2",
      "d-flex",
      "align-items-center", 
      "bg-dark",
      "rounded"
    );

    // IMAGEN
    const imgCol = document.createElement("div");
    imgCol.style.minWidth = "120px";
    imgCol.style.marginRight = "15px";
    imgCol.innerHTML = `
      <div class="card bg-dark" style="border:1px solid #39FF14;">
        <img src="${item.img || 'img/placeholder.png'}" alt="${item.nombre}" style="width:120px; height:120px; object-fit:cover; border-radius:5px;">
      </div>
    `;

    // CONTENIDO
    const contentCol = document.createElement("div");
    contentCol.classList.add("flex-grow-1");
    contentCol.innerHTML = `
      <h5 style="margin-bottom:6px; color:#39FF14; font-family: 'Orbitron', sans-serif;">${item.nombre}</h5>
      <p style="color:#ccc; font-size:0.95rem; margin-bottom:8px;">${item.descripcion || ""}</p>
    `;

    // CONTROLES Y PRECIO
    const controlsCol = document.createElement("div");
    controlsCol.style.minWidth = "170px";
    controlsCol.style.display = "flex";
    controlsCol.style.flexDirection = "column";
    controlsCol.style.justifyContent = "center";
    controlsCol.style.alignItems = "flex-end";
    controlsCol.innerHTML = `
      <p style="margin-bottom:8px; color:#D3D3D3; font-weight:bold;">$${(item.precio * item.cantidad).toLocaleString()} CLP</p>
      <div class="d-flex justify-content-end align-items-center gap-1">
        <button class="btn-azul" onclick="quitarCantidad('${item.id}')">-</button>
        <input type="number" min="1" value="${item.cantidad}" style="width:56px; text-align:center; border-radius:4px; border:1px solid #39FF14; background:#222; color:#fff; font-weight:bold;" onchange="actualizarCantidad('${item.id}', this.value)">
        <button class="btn-azul" onclick="agregarCantidad('${item.id}')">+</button>
        <button class="btn-rojo ms-2" onclick="eliminarDelCarrito('${item.id}')">X</button>
      </div>
    `;

    row.appendChild(imgCol);
    row.appendChild(contentCol);
    row.appendChild(controlsCol);

    lista.appendChild(row);
  });

  if (totalSpan) totalSpan.textContent = total.toLocaleString();
}

// ============================
// CUPÓN
// ============================
const aplicarBtn = document.getElementById("aplicarCupon");
if (aplicarBtn) {
  aplicarBtn.addEventListener("click", () => {
    const cuponInput = document.getElementById("inputCupon");
    const cupon = cuponInput ? cuponInput.value.trim().toUpperCase() : "";
    let total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    if (cupon === "LEVELUP10") {
      total = total * 0.9;
      alert("Cupón aplicado: 10% de descuento!");
    } else if (cupon) {
      alert("Cupón inválido");
    }

    const totalSpan = document.getElementById("carritoTotal");
    if (totalSpan) totalSpan.textContent = Math.round(total).toLocaleString();
  });
}

// ============================
// PAGAR
// ============================
const btnPagar = document.getElementById("btnPagar");
if (btnPagar) {
  btnPagar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra!");
    carrito = [];
    guardarCarrito();
  });
}

mostrarCarrito();
