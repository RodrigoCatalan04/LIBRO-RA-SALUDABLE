/*
  Textos del libro. Cada pagina plantea una accion o una pregunta al lector.
  Las cifras provienen de la OMS, de la ENDES 2024 difundida por el Minsa y de
  la Ley 30021 (ver README.md y las fuentes del libro).
*/
const textos = {
  1: "El plato saludable se arma por proporciones: la mitad de verduras y " +
     "frutas, un cuarto de cereales o tubérculos y un cuarto de proteínas. " +
     "Observa las tres zonas del plato. ¿Cuál ocupa la mitad?",

  2: "Cada grupo aporta nutrientes distintos: los cereales dan energía, las " +
     "proteínas (pescado, huevo, menestras) construyen tejidos y aportan " +
     "hierro, y las grasas saludables como la palta cuidan el corazón. La " +
     "OMS recomienda al menos 400 g de frutas y verduras al día. ¿Qué " +
     "alimento del modelo aporta grasa saludable?",

  3: "Los ultraprocesados concentran azúcar, sodio y grasas saturadas. En el " +
     "Perú, los octógonos de la Ley 30021 advierten «ALTO EN…» cuando el " +
     "producto supera los parámetros del DS 017-2017-SA. El 62 % de personas " +
     "de 15 años o más tiene exceso de peso (ENDES 2024). ¿Cuántos " +
     "octógonos ves en el modelo?",

  4: "Hidratación y movimiento completan la alimentación saludable: agua en " +
     "lugar de bebidas azucaradas y un promedio de 60 minutos diarios de " +
     "actividad física entre los 5 y 17 años. Pulsa Pausar y observa el " +
     "modelo con calma. ¿Cuántos vasos de agua tomaste hoy?",

  5: "Para recordar: media ración del plato en verduras y frutas, azúcares " +
     "libres por debajo del 10 % de la energía diaria y menos de 5 g de sal " +
     "al día (OMS). Arma el plato de tu próximo almuerzo. ¿Qué cambiarías " +
     "del que comiste hoy?"
};

const selector = document.querySelector("#pagina");
const plato = document.querySelector("#plato");
const estado = document.querySelector("#estado");
const boton = document.querySelector("#pausa");
const marcador = document.querySelector("#marcador");

// Muestra el texto de la pagina y deja visibles solo sus grupos de alimentos.
function mostrarPagina() {
  document.querySelector("#contenido").textContent = textos[selector.value];

  plato.querySelectorAll("[data-paginas]").forEach(el => {
    const paginas = el.dataset.paginas.split(" ");
    el.setAttribute("visible", paginas.includes(selector.value));
  });
}

if (selector && plato) {
  selector.addEventListener("change", mostrarPagina);
  plato.addEventListener("loaded", mostrarPagina);
  mostrarPagina();

  let enPausa = false;

  boton.addEventListener("click", () => {
    enPausa = !enPausa;

    if (enPausa) {
      plato.pause();
    } else {
      plato.play();
    }

    boton.textContent = enPausa ? "Continuar" : "Pausar";
  });

  // El marcador solo existe cuando AR.js se carga correctamente.
  if (marcador) {
    marcador.addEventListener("markerFound", () => {
      estado.textContent = "Marcador detectado. Selecciona tu página.";
    });

    marcador.addEventListener("markerLost", () => {
      estado.textContent = "Vuelve a enfocar el marcador completo.";
    });
  }

  window.addEventListener("camera-error", () => {
    estado.textContent = "Revisa HTTPS, permisos y disponibilidad de cámara.";
  });
}
