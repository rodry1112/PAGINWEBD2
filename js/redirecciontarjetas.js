var articulo = document.querySelectorAll(".tarjeta");
articulo.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function(){
        window.location.href= "producto.html";
    });
});
