let dataGlobal = {};
let currentSection = "";

const galeria = document.getElementById("galeria");
const menu = document.getElementById("menu");
const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagenGrande");

const videoContainer = document.getElementById("videoInicio");
const video = document.getElementById("video");

// Mostrar mainContent al cargar
window.onload = () => { document.getElementById("mainContent").style.display = "block"; };

// Cargar JSON
fetch("imagenes.json")
.then(res => res.json())
.then(data => {
  dataGlobal = data;
  const secciones = Object.keys(data);
  currentSection = "Inicio";

  // Crear botones del menú
  secciones.forEach(seccion => {
    const btn = document.createElement("button");
    btn.innerText = seccion;
    btn.onclick = () => { cambiarSeccion(seccion); };
    menu.appendChild(btn);
  });

  mostrarSeccion(currentSection);
});

// Cambiar de sección
function cambiarSeccion(seccion) {
  currentSection = seccion;
  mostrarSeccion(currentSection);
}

// Mostrar sección actual
function mostrarSeccion(seccion) {
  galeria.innerHTML = "";

  if(seccion === "Inicio") {
    galeria.style.display = "none";
    videoContainer.style.display = "block";
    video.currentTime = 0;
    video.play();
  } else {
    videoContainer.style.display = "none";
    video.pause();
    galeria.style.display = "block";

    const fotos = dataGlobal[seccion];
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
}

// LIGHTBOX
document.getElementById("cerrar").onclick = () => lightbox.style.display = "none";
lightbox.onclick = () => lightbox.style.display = "none";
