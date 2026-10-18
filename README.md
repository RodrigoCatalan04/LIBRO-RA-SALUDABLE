# Libro educativo de alimentación saludable con Realidad Aumentada

Proyecto de la **Actividad 2** del curso *Tecnologías Emergentes* (Etapa 4:
proyecto de los estudiantes). Mantiene la arquitectura de la guía del sistema
solar, pero el contenido es un libro de cinco páginas sobre **alimentación
saludable**.

Tecnologías:

- A-Frame 1.6.0
- Three.js mediante `AFRAME.THREE` (sin cargar otro script de Three.js)
- AR.js 3.4.7 con marcador **Hiro**
- HTML, CSS y JavaScript
- GitHub Codespaces

**No se necesita Python, Java ni Spring Boot para ejecutarlo.**

## Estructura

```text
codespaces-blank-main/
├── .vscode/
│   └── extensions.json
├── public/
│   ├── assets/
│   │   ├── hiro.png            marcador para imprimir
│   │   └── LEEME.txt
│   ├── css/
│   │   └── estilos.css         apariencia del panel de controles
│   ├── js/
│   │   ├── orbita.js           componentes Three.js: orbita y sector-plato
│   │   ├── sistema.js          componente plato-saludable (A-Frame)
│   │   └── libro.js            páginas, pausa y mensajes de estado
│   ├── aframe.html             primera escena 3D (plato y manzana)
│   ├── vista3d.html            modelo completo con nombres, sin cámara
│   └── index.html              aplicativo de realidad aumentada
├── referencia-sistema-solar/   ejemplo original de la guía (respaldo)
├── config.md
├── package.json
└── README.md
```

## Ejecutar en GitHub Codespaces

```bash
npx --yes http-server public -p 8000 -a 0.0.0.0
```

En la pestaña **Ports** agregue el puerto **8000** y use *Open in Browser*. La
dirección externa (`https://NOMBRE-8000.app.github.dev`) ya es HTTPS, requisito
para que el navegador pida permiso de cámara.

Rutas disponibles:

- `/aframe.html` → primera escena: plato con una porción y manzana girando.
- `/vista3d.html` → plato completo con los nueve grupos y sus nombres.
- `/index.html` → realidad aumentada sobre el marcador Hiro.

También funciona `npm start`.

## Uso de la realidad aumentada

1. Abra `/index.html` con la URL HTTPS del puerto 8000, en una pestaña completa
   del celular.
2. Autorice el uso de la cámara.
3. Enfoque el marcador Hiro impreso (`public/assets/hiro.png`, 8–10 cm) o
   mostrado en otra pantalla.
4. Seleccione la página del libro en el panel.
5. Use **Pausar / Continuar** para detener los movimientos y observar el modelo.

## Páginas del libro y contenido aumentado

| Página | Tema | Qué aparece en RA |
| --- | --- | --- |
| 1 | El plato saludable | Plato con sus tres proporciones y los cuatro grupos base |
| 2 | Grupos de alimentos y nutrientes | Se añaden las grasas saludables (palta) |
| 3 | Ultraprocesados y octógonos | Gaseosa y snack con octógonos "ALTO EN…" |
| 4 | Agua y movimiento | Vaso de agua y figura en actividad física |
| 5 | Mi plato completo | Los nueve grupos a la vez |

La visibilidad se controla con el atributo `data-paginas` de cada grupo y la
función `mostrarPagina()` de `js/libro.js`.

## Cómo se usa cada herramienta

- **A-Frame** crea la escena, el plato y las figuras de los alimentos
  (`a-sphere`, `a-box`, `a-cylinder`, `a-cone`, `a-circle`, `a-text`).
- **Three.js** (`AFRAME.THREE`) genera las trayectorias con `RingGeometry` y
  las proporciones del plato con `CircleGeometry` usando `thetaStart` y
  `thetaLength`. El movimiento se calcula en `tick` con `delta`.
- **AR.js** detecta el marcador Hiro y actualiza la posición del contenido.

## Ampliaciones previstas

- Un marcador `.patt` distinto por página (Paso 12 de la guía).
- Modelo externo `assets/modelo.glb` con `gltf-model`.
- Narración y video en el panel: el bloque está comentado en `index.html`.

## Fuentes del contenido

- OMS — *Alimentación sana*: al menos 400 g de frutas y verduras al día,
  azúcares libres por debajo del 10 % de la energía diaria, menos de 5 g de sal
  al día, grasas saturadas por debajo del 10 % y grasas trans por debajo del 1 %.
  https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet
- OMS — recomendaciones de actividad física: promedio de 60 minutos diarios
  entre los 5 y 17 años.
  https://www.who.int/es/news-room/fact-sheets/detail/physical-activity
- Minsa con datos de la ENDES 2024: 62 % de personas de 15 y más años con
  exceso de peso (36,5 % sobrepeso y 25,7 % obesidad).
- Ley 30021 y Manual de Advertencias Publicitarias (DS 017-2017-SA): octógonos
  "ALTO EN AZÚCAR", "ALTO EN SODIO", "ALTO EN GRASAS SATURADAS" y la frase
  "CONTIENE GRASAS TRANS".
  https://www.paho.org/es/noticias/16-6-2018-gobierno-peruano-publica-manual-advertencias-productos-procesados-que-pone-vigor

## Importante

Los tamaños, distancias, colores y velocidades son recursos didácticos: no
representan porciones, cantidades ni valores nutricionales reales. El modelo
complementa la explicación escrita del libro.

La carpeta `referencia-sistema-solar/` conserva el ejemplo del sistema solar de
las etapas 1 a 3 de la guía, por si se necesita como evidencia.
