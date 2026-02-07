let dataGlobal = {};
let currentSection = "";

const galeria = document.getElementById("galeria");
const menu = document.getElementById("menu");
const lightbox = document.getElementById("lightbox");
const imagenGrande = document.getElementById("imagenGrande");

const videoContainer = document.getElementById("videoInicio");
const video = document.getElementById("video");

fetch("imagenes.json")
.then(res=>res.json())
.then(data=>{

dataGlobal=data;
const secciones=Object.keys(data);

currentSection="Inicio";

secciones.forEach(seccion=>{

const btn=document.createElement("button");
btn.innerText=seccion;

btn.onclick=()=>cambiarSeccion(seccion);

menu.appendChild(btn);

});

mostrarSeccion(currentSection);

});

function cambiarSeccion(seccion){
currentSection=seccion;
mostrarSeccion(currentSection);
}

function mostrarSeccion(seccion){

document.querySelectorAll("#menu button").forEach(btn=>{
btn.classList.remove("active");
if(btn.innerText===seccion){btn.classList.add("active");}
});

galeria.innerHTML="";

if(seccion==="Inicio"){

galeria.style.display="none";
videoContainer.style.display="block";
video.currentTime=0;
video.play();

}else{

videoContainer.style.display="none";
video.pause();

galeria.style.display="grid";

const archivos=dataGlobal[seccion]||[];

archivos.forEach(archivo=>{

let elemento;

if(archivo.endsWith(".mp4")||archivo.endsWith(".webm")){

elemento=document.createElement("video");
elemento.src="imagenes/"+archivo;
elemento.controls=true;
elemento.loop=true;
elemento.muted=true;
elemento.autoplay=true;

}else{

elemento=document.createElement("img");
elemento.src="imagenes/"+archivo;

elemento.onclick=()=>{
imagenGrande.src=elemento.src;
lightbox.style.display="flex";
};

}

galeria.appendChild(elemento);

});

}

}

document.getElementById("cerrar").onclick=()=>lightbox.style.display="none";
lightbox.onclick=()=>lightbox.style.display="none";

// ===== EFECTO WOW ENTRADA =====

const intro = document.getElementById("introPantalla");
const entrarBtn = document.getElementById("entrarBtn");
const mainContent = document.getElementById("mainContent");

mainContent.style.display="none";

entrarBtn.onclick = () => {

intro.style.opacity="0";
intro.style.transition="1s";

setTimeout(()=>{

intro.style.display="none";
mainContent.style.display="block";

},1000);

};
