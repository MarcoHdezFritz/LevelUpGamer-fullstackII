// VALIDACIONES FORMULARIOS

const correosValidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

function validarCorreo(correo) {
    return correosValidos.some(dom => correo.endsWith("@" + dom));
}

// REGISTRO
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const confirmCorreo = document.getElementById("confirmCorreo").value.trim();
        const pass = document.getElementById("pass").value.trim();
        const confirmPass = document.getElementById("confirmPass").value.trim();
        const telefono = document.getElementById("telefono").value.trim();


        if (nombre === "" || nombre.length > 100) {
            alert("El nombre es obligatorio y debe tener máximo 100 caracteres.");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (correo !== confirmCorreo) {
            alert("Los correos no coinciden.");
            return;
        }

        if (pass.length < 4 || pass.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        if (pass !== confirmPass) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (telefono !== "" && !/^[0-9]{8,12}$/.test(telefono)) {
            alert("El teléfono debe contener solo números y entre 8 a 12 dígitos.");
            return;
        }

        alert(" Registro exitoso.");
        formRegistro.reset();
    });
}

// LOGIN
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const pass = document.getElementById("pass").value.trim();

        if (!validarCorreo(correo)) {
            alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (pass.length < 4 || pass.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        alert(" Inicio de sesión exitoso.");
        formLogin.reset();
    });
}

// CONTACTO
const formContacto = document.getElementById("formContacto");
if (formContacto) {
    formContacto.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "" || nombre.length > 100) {
            alert("El nombre es obligatorio y debe tener máximo 100 caracteres.");
            return;
        }

        if (!validarCorreo(correo)) {
            alert("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (mensaje === "" || mensaje.length > 500) {
            alert("El mensaje es obligatorio y debe tener máximo 500 caracteres.");
            return;
        }

        alert(" Mensaje enviado correctamente.");
        formContacto.reset();
    });
}

// REGIONES Y COMUNAS DE CHILE
const comunasPorRegion = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Chillán Viejo", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Llanquihue", "Los Muermos", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes y la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

// CARGAR SELECTS REGION/COMUNA
document.addEventListener("DOMContentLoaded", () => {
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    if (regionSelect && comunaSelect) {
        for (let region in comunasPorRegion) {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        }

        regionSelect.addEventListener("change", () => {
            comunaSelect.innerHTML = "<option value=''>--Seleccione una Comuna</option>";
            const comunas = comunasPorRegion[regionSelect.value] || [];
            comunas.forEach(comuna => {
                const option = document.createElement("option");
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
        });
    }

// ADMIN PRODUCTOS - VALIDACIONES
    document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formNuevoProducto");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const codigo = document.getElementById("codigo").value.trim();
        const nombre = document.getElementById("nombreProd").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const precio = parseFloat(document.getElementById("precio").value);
        const stock = parseInt(document.getElementById("stock").value);
        const stockCritico = document.getElementById("stockCritico").value.trim();
        const categoria = document.getElementById("categoria").value;

        // Validaciones
        if (codigo.length < 3) {
        alert("El código debe tener al menos 3 caracteres.");
        return;
        }
        if (!nombre) {
        alert("El nombre es obligatorio.");
        return;
        }
        if (nombre.length > 100) {
        alert("El nombre no puede superar los 100 caracteres.");
        return;
        }
        if (descripcion.length > 500) {
        alert("La descripción no puede superar los 500 caracteres.");
        return;
        }
        if (isNaN(precio) || precio < 0) {
        alert("El precio debe ser un número mayor o igual a 0.");
        return;
        }
        if (!Number.isInteger(stock) || stock < 0) {
        alert("El stock debe ser un número entero mayor o igual a 0.");
        return;
        }
        if (stockCritico) {
        const criticoNum = parseInt(stockCritico);
        if (isNaN(criticoNum) || criticoNum < 0) {
            alert("El stock crítico debe ser un número entero mayor o igual a 0.");
            return;
        }
        }
        if (!categoria) {
        alert("Debe seleccionar una categoría.");
        return;
        }

        alert("Producto registrado correctamente");
        form.reset();
        
    });
    });
});

