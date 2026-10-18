// Three.js ya viene incluido en A-Frame: se reutiliza la misma version.
const THREE = AFRAME.THREE;

/*
  Componente "orbita"
  Dibuja con Three.js un anillo que representa la trayectoria de un grupo de
  alimentos alrededor del plato y hace girar la entidad que lo contiene.
  La velocidad se expresa en grados por segundo.
*/
AFRAME.registerComponent("orbita", {
  schema: {
    radio: {type: "number", default: 1},
    velocidad: {type: "number", default: 12},
    color: {type: "color", default: "#9fb3c8"}
  },

  init: function () {
    const r = this.data.radio;

    this.geometria = new THREE.RingGeometry(r - 0.006, r + 0.006, 64);
    this.material = new THREE.MeshBasicMaterial({
      color: this.data.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });

    const anillo = new THREE.Mesh(this.geometria, this.material);
    anillo.rotation.x = -Math.PI / 2;

    this.el.setObject3D("trayectoria", anillo);
  },

  tick: function (tiempo, delta) {
    if (!delta || !this.el.getAttribute("visible")) return;

    const radianes = this.data.velocidad * Math.PI / 180;
    this.el.object3D.rotation.y += radianes * delta / 1000;
  },

  remove: function () {
    this.el.removeObject3D("trayectoria");
    this.geometria.dispose();
    this.material.dispose();
  }
});

/*
  Componente "sector-plato"
  Dibuja un sector circular con Three.js (CircleGeometry con thetaStart y
  thetaLength). Se usa para representar las proporciones del plato saludable:
  50 % verduras y frutas, 25 % cereales o tuberculos y 25 % proteinas.
*/
AFRAME.registerComponent("sector-plato", {
  schema: {
    radio: {type: "number", default: 0.58},
    inicio: {type: "number", default: 0},
    angulo: {type: "number", default: 180},
    color: {type: "color", default: "#3f9b4f"}
  },

  init: function () {
    const grados = Math.PI / 180;

    this.geometria = new THREE.CircleGeometry(
      this.data.radio,
      48,
      this.data.inicio * grados,
      this.data.angulo * grados
    );

    this.material = new THREE.MeshBasicMaterial({
      color: this.data.color,
      side: THREE.DoubleSide
    });

    const sector = new THREE.Mesh(this.geometria, this.material);
    sector.rotation.x = -Math.PI / 2;

    this.el.setObject3D("porcion", sector);
  },

  remove: function () {
    this.el.removeObject3D("porcion");
    this.geometria.dispose();
    this.material.dispose();
  }
});
