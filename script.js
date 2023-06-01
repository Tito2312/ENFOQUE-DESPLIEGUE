const palabras = ["GATO", "PERRO", "CASA", "ARBOL"];
const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

let palabrasEncontradas = [];

function generarSopaDeLetras() {
  const sopaDeLetras = document.getElementById("sopa-de-letras");

  // Generar celdas
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const celda = document.createElement("div");
      celda.className = "celda";
      celda.id = `celda-${i}-${j}`;
      celda.addEventListener("mousedown", seleccionarLetra);
      celda.addEventListener("mouseover", seleccionarLetra);
      sopaDeLetras.appendChild(celda);
    }
  }

  // Insertar palabras
  palabras.forEach((palabra) => {
    const direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
    let fila = Math.floor(Math.random() * 10);
    let columna = Math.floor(Math.random() * 10);

    // Verificar si la palabra cabe en la dirección seleccionada
    if (
      (direccion === "horizontal" && columna + palabra.length > 10) ||
      (direccion === "vertical" && fila + palabra.length > 10)
    ) {
      return;
    }

    // Insertar letras de la palabra
    for (let i = 0; i < palabra.length; i++) {
      let id;
      if (direccion === "horizontal") {
        id = `celda-${fila}-${columna + i}`;
      } else {
        id = `celda-${fila + i}-${columna}`;
      }

      const celda = document.getElementById(id);
      celda.textContent = palabra[i];
    }
  });

  // Rellenar celdas vacías con letras aleatorias
  const celdasVacias = Array.from(document.getElementsByClassName("celda")).filter((celda) => celda.textContent === "");
  celdasVacias.forEach((celda) => {
    const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
    celda.textContent = letraAleatoria;
  });
}

function seleccionarLetra(event) {
  const celda = event.target;

  if (!celda.textContent) {
    return;
  }

  if (event.buttons === 1) { // Botón izquierdo del mouse presionado
    celda.classList.add("seleccionada");
  } else if (event.buttons === 0) { // Mouse sin botones presionados
    const letrasSeleccionadas = Array.from(document.getElementsByClassName("seleccionada"));
    const palabra = letrasSeleccionadas.map((celda) => celda.textContent).join("");

    if (palabras.includes(palabra) && !palabrasEncontradas.includes(palabra)) {
      palabrasEncontradas.push(palabra);
      document.getElementById("palabras-encontradas").textContent = "Palabras encontradas: " + palabrasEncontradas.join(", ");

      letrasSeleccionadas.forEach((celda) => {
        celda.classList.add("palabra-encontrada");
      });
    } else {
      letrasSeleccionadas.forEach((celda) => {
        celda.classList.remove("seleccionada");
      });
    }
  }
}

generarSopaDeLetras();
