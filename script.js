let dataGlobal = {};
let currentSection = "";

const galeria = document.getElementById("galeria");
const menu = document.getElementById("menu");
const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagenGrande");

const videoContainer = document.getElementById("videoInicio");
const video = document.getElementById("video");

// Mostrar contenido al cargar
window.onload = () => {
  document.getElementById("mainContent").style.display = "block";
};

// Cargar JSON
fetch("imagenes.json")
.then(res => res.json())
.then(data => {

  dataGlobal = data;
  const secciones = Object.keys(data);

  currentSection = "Inicio";

  // Crear botones menú
  secciones.forEach(seccion => {

    const btn = document.createElement("button");
    btn.innerText = seccion;

    btn.onclick = () => {
      cambiarSeccion(seccion);
    };

    menu.appendChild(btn);
  });

  mostrarSeccion(currentSection);
});

// Cambiar sección
function cambiarSeccion(seccion) {
  currentSection = seccion;
  mostrarSeccion(currentSection);
}

// Mostrar sección
function mostrarSeccion(seccion) {
  galeria.innerHTML = ""; // Limpiar galería

  if (seccion === "Inicio") {
    galeria.style.display = "none";
    videoContainer.style.display = "block";

    video.currentTime = 0;
    video.play();
  } else {
    videoContainer.style.display = "none";
    video.pause();

    galeria.style.display = "block";

    const archivos = dataGlobal[seccion] || [];

    archivos.forEach((archivo) => {
      let elemento;

      // VIDEO
      if (archivo.endsWith(".mp4") || archivo.endsWith(".webm")) {
        elemento = document.createElement("video");
        elemento.src = "imagenes/" + archivo;
        elemento.controls = true;
        elemento.loop = true;
        elemento.muted = true;
        elemento.autoplay = true;
      } else {
        // IMAGEN
        elemento = document.createElement("img");
        elemento.src = "imagenes/" + archivo;
        elemento.classList.add("visible"); // Ahora se ve la imagen

        elemento.onclick = () => {
          imagenGrande.src = elemento.src;
          lightbox.style.display = "flex";
        };
      }

      // Estilos generales
      elemento.style.width = "100%";
      elemento.style.marginBottom = "15px";
      elemento.style.borderRadius = "20px";
      elemento.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";

      galeria.appendChild(elemento);
    });
  }
}



// LIGHTBOX
document.getElementById("cerrar").onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = () => {
  lightbox.style.display = "none";
};
