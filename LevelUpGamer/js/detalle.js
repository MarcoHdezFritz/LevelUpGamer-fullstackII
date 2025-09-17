document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // CARRITO
  // ============================
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();         
    actualizarCarritoCount(); 
  }

  function agregarAlCarrito(id, cantidad = 1) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    const item = carrito.find(p => p.id === id);

    if (item) {
      item.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
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

    if (!carritoLista || !carritoVacio || !carritoTotal) return;

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

  function actualizarCarritoCount() {
    const carritoSpan = document.getElementById("carritoCount");
    if (!carritoSpan) return;
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    carritoSpan.textContent = total;
  }

  window.agregarAlCarrito = agregarAlCarrito;
  window.eliminarDelCarrito = eliminarDelCarrito;
  window.vaciarCarrito = vaciarCarrito;

  mostrarCarrito();
  actualizarCarritoCount();

  // ============================
  // DETALLE DEL PRODUCTO
  // ============================
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const producto = productos.find(p => p.id === productId) || productos[0];

  const pdImg = document.getElementById("pd-img");
  const pdNombre = document.getElementById("pd-nombre");
  const pdPrecio = document.getElementById("pd-precio");
  const pdDescripcion = document.getElementById("pd-descripcion");
  const pdQuantity = document.getElementById("pd-quantity");
  const pdAddBtn = document.getElementById("pd-add-btn");
  const pdMessage = document.getElementById("pd-message");
  const breadcrumbNombre = document.getElementById("breadcrumb-nombre");
  const pdMiniaturas = document.getElementById("pd-miniaturas");

  if (producto && pdImg && pdNombre && pdPrecio && pdDescripcion) {
    pdImg.src = producto.img;
    pdImg.alt = producto.nombre;
    pdNombre.textContent = producto.nombre;
    pdPrecio.textContent = `$${producto.precio.toLocaleString()} CLP`;
    pdDescripcion.textContent = producto.descripcion || "Descripción del producto pendiente...";
    if (breadcrumbNombre) breadcrumbNombre.textContent = producto.nombre;

    if (pdMiniaturas) {
      pdMiniaturas.innerHTML = "";
      const mini = document.createElement("img");
      mini.src = producto.img;
      mini.alt = producto.nombre;
      mini.classList.add("img-thumbnail");
      mini.style.width = "60px";
      mini.style.height = "60px";
      mini.style.cursor = "pointer";
      mini.addEventListener("click", () => {
        pdImg.src = producto.img;
      });
      pdMiniaturas.appendChild(mini);
    }
  }

    // BOTÓN AÑADIR AL CARRITO
    if (pdAddBtn) {
    pdAddBtn.addEventListener("click", () => {
        const cantidad = parseInt(pdQuantity?.value) || 1;
        if (!producto) return;
        agregarAlCarrito(producto.id, cantidad);
        if (pdMessage) {
        pdMessage.textContent = cantidad === 1 
            ? `Se agregó 1 unidad al carrito.` 
            : `Se agregaron ${cantidad} unidades al carrito.`;
        }
        if (pdQuantity) pdQuantity.value = 1;
    });
    }

  // ============================
  // PRODUCTOS RELACIONADOS
  // ============================
  const relatedContainer = document.getElementById("related-products");
  if (relatedContainer) {
    productos
      .filter(p => p.id !== producto.id)
      .slice(0, 4)
      .forEach(p => {
        const card = document.createElement("div");
        card.classList.add("related-card");
        card.style.width = "200px";
        card.innerHTML = `
          <img src="${p.img}" alt="${p.nombre}" class="img-fluid rounded">
          <h3>${p.nombre}</h3>
          <p class="rp-price">$${p.precio.toLocaleString()} CLP</p>
          <button class="btn-ir related-add" data-id="${p.id}">Añadir</button>
          <button class="btn-ir" onclick="location.href='detalle.html?id=${p.id}'">Ver Detalle</button>
        `;
        relatedContainer.appendChild(card);
      });

    // BOTON AÑADIR
    relatedContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.related-add');
      if (!btn) return;
      const id = btn.dataset.id;
      agregarAlCarrito(id, 1); // AÑADIR 1 UNIDAD
    });
  }

});
