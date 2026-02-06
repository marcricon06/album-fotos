let dataGlobal = {};
let currentSection = "";

const galeria = document.getElementById("galeria");
const menu = document.getElementById("menu");
const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagenGrande");

const videoContainer = document.getElementById("videoInicio");
const video = document.getElementById("video");
const mainContent = document.getElementById("mainContent");

// Mostrar mainContent al cargar
window.onload = () => { mainContent.style.display = "block"; };

// Cargar JSON
fetch("imagenes.json")
.then(res => res.json())
.then(data => {
  dataGlobal = data;
  const secciones = Object.keys(data);
  currentSection = "Inicio"; // subapartado inicial

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
    videoContainer.style.display = "block";
    mainContent.style.display = "none";
    video.currentTime = 0;
    video.play();
  } else {
    videoContainer.style.display = "none";
    mainContent.style.display = "block";
    video.pause();

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
