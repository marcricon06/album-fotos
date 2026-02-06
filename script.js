fetch("imagenes.json")
.then(response => response.json())
.then(fotos => {

 const galeria = document.getElementById("galeria");

 fotos.forEach(foto => {

   const img = document.createElement("img");

   img.src = "imagenes/" + foto;

   galeria.appendChild(img);

 });

});
