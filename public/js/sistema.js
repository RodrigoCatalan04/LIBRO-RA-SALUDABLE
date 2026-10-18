/*
  Componente "plato-saludable"
  Construye con A-Frame el plato (base y proporciones) y los grupos de
  alimentos que lo recorren. El movimiento y las trayectorias provienen del
  componente "orbita" de orbita.js, programado con Three.js.

  Esquema:
    etiquetas: muestra el nombre de cada grupo (se usa en vista3d.html).

  Los tamanos, distancias y velocidades son recursos didacticos: no
  representan porciones ni cantidades reales de alimento.
*/
AFRAME.registerComponent("plato-saludable", {
  schema: {
    etiquetas: {type: "boolean", default: false}
  },

  init: function () {
    const crear = (tag, atributos, padre) => {
      const e = document.createElement(tag);
      Object.entries(atributos).forEach(([k, v]) => e.setAttribute(k, v));
      padre.appendChild(e);
      return e;
    };
    this.crear = crear;

    // Base del plato. Siempre visible, como referencia del libro.
    crear("a-cylinder", {
      radius: 0.92, height: 0.03,
      color: "#f4f6f8", material: "shader: flat"
    }, this.el);

    // Proporciones del plato saludable. Nombre, inicio, angulo, color.
    const porciones = [
      ["Verduras y frutas 50%",      0, 180, "#3f9b4f"],
      ["Cereales y tuberculos 25%", 180,  90, "#d2a661"],
      ["Proteinas 25%",             270,  90, "#b5654a"]
    ];

    porciones.forEach(([nombre, inicio, angulo, color]) => {
      crear("a-entity", {
        "sector-plato": `radio: 0.84; inicio: ${inicio}; angulo: ${angulo}; color: ${color}`,
        position: "0 0.018 0",
        "data-porcion": nombre
      }, this.el);
    });

    // Nombre, figura, radio visual, distancia, color, grados/s, paginas.
    const grupos = [
      ["Verduras",   "brocoli", 0.20, 1.30, "#3f9b4f", 16, "1 2 5"],
      ["Frutas",     "manzana", 0.19, 1.62, "#d64545", 20, "1 2 5"],
      ["Cereales",   "pan",     0.19, 1.94, "#d2a661", 13, "1 2 5"],
      ["Proteinas",  "pescado", 0.19, 2.26, "#b5654a", 11, "1 2 5"],
      ["Grasas",     "palta",   0.19, 2.58, "#4e7a3a",  9, "2 5"],
      ["Gaseosa",    "gaseosa", 0.19, 2.90, "#c0392b",  7, "3 5"],
      ["Snack",      "snack",   0.19, 3.22, "#8e6bb0",  6, "3 5"],
      ["Agua",       "vaso",    0.19, 3.54, "#4aa8d8",  5, "4 5"],
      ["Movimiento", "figura",  0.19, 3.86, "#f0a63a",  4, "4 5"]
    ];

    grupos.forEach(([nombre, figura, radio, d, color, v, paginas], i) => {
      // Entidad que gira: lleva el anillo de trayectoria (Three.js).
      const giro = crear("a-entity", {
        orbita: `radio: ${d}; velocidad: ${v}`,
        rotation: `0 ${i * 40} 0`,
        "data-paginas": paginas,
        "data-grupo": nombre
      }, this.el);

      // Posicion del grupo sobre su trayectoria.
      const sitio = crear("a-entity", {position: `${d} 0.2 0`}, giro);

      // Cuerpo que rota sobre su propio eje.
      const cuerpo = crear("a-entity", {
        animation: "property: rotation; to: 0 360 0; " +
          "dur: 8000; loop: true; easing: linear"
      }, sitio);

      this.dibujar(figura, radio, color, cuerpo);

      if (this.data.etiquetas) {
        crear("a-text", {
          value: nombre, align: "center", color: "#ffffff",
          width: 2.4, position: "0 0.26 0"
        }, sitio);
      }
    });
  },

  // Construye cada alimento con primitivas de A-Frame.
  dibujar: function (figura, r, color, padre) {
    const crear = this.crear;
    const plano = "shader: flat";

    if (figura === "brocoli") {
      crear("a-sphere", {radius: r, color, material: plano}, padre);
      crear("a-sphere", {radius: r * 0.55, position: `${r * 0.7} ${r * 0.4} 0`,
        color: "#52ad63", material: plano}, padre);
      crear("a-sphere", {radius: r * 0.5, position: `${-r * 0.7} ${r * 0.3} 0`,
        color: "#52ad63", material: plano}, padre);
      crear("a-cylinder", {radius: r * 0.3, height: r * 1.1,
        position: `0 ${-r * 0.9} 0`, color: "#bcd98f", material: plano}, padre);
      return;
    }

    if (figura === "manzana") {
      crear("a-sphere", {radius: r, color, material: plano}, padre);
      crear("a-cylinder", {radius: r * 0.08, height: r * 0.6,
        position: `0 ${r * 1.1} 0`, color: "#6b4b2a", material: plano}, padre);
      crear("a-box", {width: r * 0.7, height: r * 0.06, depth: r * 0.35,
        position: `${r * 0.35} ${r * 1.25} 0`, rotation: "0 0 20",
        color: "#4f9b45", material: plano}, padre);
      return;
    }

    if (figura === "pan") {
      crear("a-box", {width: r * 2.1, height: r * 1.1, depth: r * 1.3,
        color, material: plano}, padre);
      crear("a-box", {width: r * 2.15, height: r * 0.2, depth: r * 1.35,
        position: `0 ${r * 0.6} 0`, color: "#a9763f", material: plano}, padre);
      crear("a-sphere", {radius: r * 0.12, position: `${r * 0.5} ${r * 0.72} 0`,
        color: "#f2e2bb", material: plano}, padre);
      return;
    }

    if (figura === "pescado") {
      crear("a-sphere", {radius: r, scale: "1.4 0.85 0.7", color,
        material: plano}, padre);
      crear("a-cone", {"radius-bottom": r * 0.7, "radius-top": 0.001,
        height: r * 0.9, position: `${-r * 1.7} 0 0`, rotation: "0 0 -90",
        color: "#9c5340", material: plano}, padre);
      crear("a-sphere", {radius: r * 0.1,
        position: `${r * 0.9} ${r * 0.25} ${r * 0.35}`,
        color: "#1b2a38", material: plano}, padre);
      return;
    }

    if (figura === "palta") {
      crear("a-sphere", {radius: r, scale: "0.85 1.25 0.85", color,
        material: plano}, padre);
      crear("a-sphere", {radius: r * 0.62, scale: "0.85 1.2 0.2",
        position: `0 0 ${r * 0.75}`, color: "#c7d98a", material: plano}, padre);
      crear("a-sphere", {radius: r * 0.3, position: `0 0 ${r * 0.8}`,
        color: "#8a5a2b", material: plano}, padre);
      return;
    }

    if (figura === "gaseosa") {
      crear("a-cylinder", {radius: r * 0.6, height: r * 2.4, color,
        material: plano}, padre);
      crear("a-cylinder", {radius: r * 0.3, height: r * 0.5,
        position: `0 ${r * 1.4} 0`, color: "#b7bdc4", material: plano}, padre);
      this.octogono("ALTO EN AZUCAR", r, padre);
      return;
    }

    if (figura === "snack") {
      crear("a-box", {width: r * 1.5, height: r * 2.1, depth: r * 0.5, color,
        material: plano}, padre);
      crear("a-box", {width: r * 1.5, height: r * 0.3, depth: r * 0.52,
        position: `0 ${r * 1.1} 0`, color: "#6d4f8c", material: plano}, padre);
      this.octogono("ALTO EN SODIO", r, padre);
      return;
    }

    if (figura === "vaso") {
      crear("a-cylinder", {radius: r * 0.6, height: r * 2,
        color: "#dff1fb", material: "shader: flat; opacity: 0.45; transparent: true"},
        padre);
      crear("a-cylinder", {radius: r * 0.55, height: r * 1.4,
        position: `0 ${-r * 0.25} 0`, color, material: plano}, padre);
      return;
    }

    if (figura === "figura") {
      crear("a-sphere", {radius: r * 0.42, position: `0 ${r * 1.4} 0`,
        color: "#f6d8a8", material: plano}, padre);
      crear("a-box", {width: r * 0.8, height: r * 1.3, depth: r * 0.45,
        position: `0 ${r * 0.35} 0`, color, material: plano}, padre);
      crear("a-box", {width: r * 0.25, height: r * 1.1, depth: r * 0.25,
        position: `${r * 0.3} ${-r * 0.8} 0`, rotation: "0 0 15",
        color: "#3f556b", material: plano}, padre);
      crear("a-box", {width: r * 0.25, height: r * 1.1, depth: r * 0.25,
        position: `${-r * 0.3} ${-r * 0.8} 0`, rotation: "0 0 -20",
        color: "#3f556b", material: plano}, padre);
      crear("a-box", {width: r * 1.1, height: r * 0.2, depth: r * 0.2,
        position: `0 ${r * 0.8} ${r * 0.2}`, rotation: "0 0 35",
        color: "#f6d8a8", material: plano}, padre);
      return;
    }
  },

  // Octogono de advertencia de la Ley 30021 (etiquetado frontal peruano).
  octogono: function (texto, r, padre) {
    const crear = this.crear;

    crear("a-circle", {
      radius: r * 0.75, segments: 8, rotation: "0 0 22.5",
      position: `0 ${r * 0.2} ${r * 0.63}`,
      color: "#111111", material: "shader: flat"
    }, padre);

    crear("a-text", {
      value: texto, align: "center", color: "#ffffff", width: r * 11,
      position: `0 ${r * 0.2} ${r * 0.65}`
    }, padre);
  }
});
