fetch("imagenes.json")
.then(res => res.json())
.then(fotos => {

  const galeria = document.getElementById("galeria");
  const lightbox = document.getElementById("lightbox");
  const imagenGrande = document.getElementById("imagenGrande");
  const cerrar = document.getElementById("cerrar");

  fotos.forEach((foto, index) => {

    const img = document.createElement("img");
    img.src = "imagenes/" + foto;

    setTimeout(() => {
      img.classList.add("visible");
    }, index * 120);

    img.onclick = () => {
      imagenGrande.src = img.src;
      lightbox.style.display = "flex";
    };

    galeria.appendChild(img);

  });

  cerrar.onclick = () => lightbox.style.display="none";
  lightbox.onclick = () => lightbox.style.display="none";

});
