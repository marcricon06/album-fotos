let dataGlobal = {};
let currentSection = "";

const galeria = document.getElementById("galeria");
const menu = document.getElementById("menu");
const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagenGrande");
const cerrar = document.getElementById("cerrar");

fetch("imagenes.json")
.then(res => res.json())
.then(data => {
  dataGlobal = data;
  const secciones = Object.keys(data);
  currentSection = secciones[0];

  // Generar botones del menú
  secciones.forEach(seccion => {
    const btn = document.createElement("button");
    btn.innerText = seccion;
    btn.onclick = () => {
      currentSection = seccion;
      mostrarFotos();
    };
    menu.appendChild(btn);
  });

  mostrarFotos();
});

// Función que muestra las fotos de la sección actual
function mostrarFotos() {
  galeria.innerHTML = "";
  const fotos = dataGlobal[currentSection];
  fotos.forEach((foto, index) => {
    const img = document.createElement("img");
    img.src = "imagenes/" + foto;

    setTimeout(() => img.classList.add("visible"), index*120);

    img.onclick = () => {
      imagenGrande.src = img.src;
      lightbox.style.display = "flex";
    };

    galeria.appendChild(img);
  });
}

cerrar.onclick = () => lightbox.style.display = "none";
lightbox.onclick = () => lightbox.style.display = "none";
