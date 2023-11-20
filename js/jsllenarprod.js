function llenarPaginaProducto() {
    var params = new URLSearchParams(window.location.search);
    
    if (params.has('titulo') && window.location.pathname.includes('producto.html')) {
        var titulo = params.get('titulo');
        var juegoSeleccionado = juegos.find(function(juego) {
            return juego.titulo === titulo;
        });

        if (juegoSeleccionado) {
            // Llena la página con la información del juego
            document.querySelector('.titulo').textContent = juegoSeleccionado.titulo;
            document.querySelector('.imgp').innerHTML = '<img src="' + juegoSeleccionado.imagenDePortada + '">';
            document.querySelector('.descrip').textContent = juegoSeleccionado.descripcion;

            // Llena la ficha técnica
            document.querySelector('.f1').textContent = juegoSeleccionado.fichaTecnica.plataforma;
            document.querySelector('.f2').textContent = juegoSeleccionado.fichaTecnica.idiomaTextos;
            document.querySelector('.f3').textContent = juegoSeleccionado.fichaTecnica.idiomaVoces;
            document.querySelector('.f4').textContent = juegoSeleccionado.fichaTecnica.ano;
            document.querySelector('.f5').textContent = juegoSeleccionado.fichaTecnica.tamano;
            document.querySelector('.f6').textContent = juegoSeleccionado.fichaTecnica.formato;
            document.querySelector('.f7').textContent = juegoSeleccionado.fichaTecnica.genero;

            // Llena las capturas
            var capturasContainer = document.querySelector('.capturas');
            juegoSeleccionado.capturas.forEach(function(captura) {
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