var juegos = [
    {
        imagenDePortada: "../imagenes/ejemplo1.jpg",
        titulo: "THE MEDIUM",
        descripcion: "Loremes ipsum dolor sit amet, consectetur adipiscing elit.",
        fichaTecnica: {
            plataforma: "PCc",
            idiomaTextos: "Español (MX/ES), Inglés, Francés",
            idiomaVoces: "Inglés",
            ano: 2022,
            tamano: "2.5GB",
            formato: "7Zip",
            genero: "Aventura"
        },
        capturas: ["../imagenes/demostracion1.jpeg", "../imagenes/demostracion2.jpg", "../imagenes/demostracion3.png"],
        videoYT: "https://www.youtube.com/embed/Y7lxZ_bEGNM?si=4TMSV1V5egmFP1aa",
        requisitosMinimos: "Sistema Operativo: Windows 10, Procesador: Intel Core i5, RAM: 8 GB, Tarjeta Gráfica: NVIDIA GTX 970",
        precio: 59.99,
        genero: "Aventura",
        plataforma: "PC",
        idioma: "Español, Inglés",
        tipoAdquisicion: "Virtual",
        fechaEstreno: "2022-01-01"
    },
    // Agrega más juegos según sea necesario
];

// Función para generar dinámicamente las tarjetas en el catálogo
function generarTarjetas() {
    var catalogo = document.querySelector('.grid-catalogo');
    
    juegos.forEach(function (juego) {
        var tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta');

        // Agrega la información del juego al atributo data
        tarjeta.dataset.juego = JSON.stringify(juego);

        var imagen = document.createElement('img');
        imagen.classList.add('img-tarjeta');
        imagen.src = juego.imagenDePortada;

        var titulo = document.createElement('p');
        titulo.classList.add('titulo-tarjeta');
        titulo.textContent = juego.titulo;

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);

        // Añade la tarjeta al catálogo
        catalogo.appendChild(tarjeta);

        // Evento clic para redireccionar a la página del producto
        tarjeta.addEventListener('click', function() {
            // Recupera la información del juego desde el atributo data
            var juegoSeleccionado = JSON.parse(this.dataset.juego);

            // Redirige a la página del producto y pasa la información del juego como parámetros
            window.location.href = 'producto.html?' + Object.keys(juegoSeleccionado).map(function(key) {
                return key + '=' + encodeURIComponent(juegoSeleccionado[key]);
            }).join('&');
        });
    });
}

// Función para llenar la página del producto con la información del juego
function llenarPaginaProducto() {
    var params = new URLSearchParams(window.location.search);
    var vmt = document.getElementById("contenedor-vmodal");
    if (params.has('titulo') && window.location.pathname.includes('producto.html')) {
        var titulo = params.get('titulo');
        var juegoSeleccionado = juegos.find(function (juego) {
            return juego.titulo === titulo;
        });

        if (juegoSeleccionado) {
            // Llena la página con la información del juego
            vmt.querySelector('.titulo').textContent=juegoSeleccionado.titulo;
            document.querySelector('.titulo').textContent = juegoSeleccionado.titulo;
            document.querySelector('.imgp img').src = juegoSeleccionado.imagenDePortada;
            document.querySelector('.descrip').textContent = juegoSeleccionado.descripcion;

            // Llena la ficha técnica
            document.querySelector('.f1').textContent = juegoSeleccionado.fichaTecnica.plataforma;
            document.querySelector('.f2').textContent = juegoSeleccionado.fichaTecnica.idiomaTextos;
            document.querySelector('.f3').textContent = juegoSeleccionado.fichaTecnica.idiomaVoces;
            document.querySelector('.f4').textContent = juegoSeleccionado.fichaTecnica.ano;
            document.querySelector('.f5').textContent = juegoSeleccionado.fichaTecnica.tamano;
            document.querySelector('.f6').textContent = juegoSeleccionado.fichaTecnica.formato;
            document.querySelector('.f7').textContent = juegoSeleccionado.fichaTecnica.genero;
            document.querySelector('.prec').textContent = juegoSeleccionado.precio;
            document.querySelector('.gen').textContent = juegoSeleccionado.genero;
            document.querySelector('.idio').textContent = juegoSeleccionado.idioma; // Corregido aquí
            document.querySelector('.tipoAd').textContent = juegoSeleccionado.tipoAdquisicion;
            document.querySelector('.feEs').textContent = juegoSeleccionado.fechaEstreno;
            vmt.querySelector('.plat').textContent = juegoSeleccionado.plataforma;
            document.querySelector('.descripp').textContent = juegoSeleccionado.descripcion; // Corregido aquí
            vmt.querySelector('.img-vm').src = juegoSeleccionado.imagenDePortada;
            vmt.querySelector('.idio').textContent = juegoSeleccionado.idioma
            // Llena las capturas
            var capturasContainer = document.querySelector('.capturas');
            // Limpia el contenedor antes de agregar nuevas capturas
            capturasContainer.innerHTML = "";
            juegoSeleccionado.capturas.forEach(function (captura) {
                var img = document.createElement('img');
                img.src = captura;
                capturasContainer.appendChild(img);
            });

            // Llena el trailer
            document.querySelector('.videoYT iframe').src = juegoSeleccionado.videoYT;

            // Llena los requisitos mínimos
            document.querySelector('.requisitos h4').insertAdjacentHTML('afterend', juegoSeleccionado.requisitosMinimos);
        }
    }
}

// Llama a la función correspondiente según la página que se esté cargando
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('catalogo.html')) {
        generarTarjetas();
    } else if (window.location.pathname.includes('producto.html')) {
        llenarPaginaProducto();
    }
});