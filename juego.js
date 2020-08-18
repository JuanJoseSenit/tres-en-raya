let arrayFilas = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let jugadorCirculo = true;
let fichasCirculo = 3;
let fichasAspa = 3;

function generarTablero() {
  let tablero = document.getElementById("tablero");
  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      let td = document.createElement("td");
      td.setAttribute("id", i + "-" + j);
      td.setAttribute("onclick", "meterFicha(event)");
      td.setAttribute("class", "tdTablero");
      td.setAttribute("onmouseover", "marcar(event)");
      td.setAttribute("onmouseout", "desmarcar(event)");
      tr.appendChild(td);
    }
    tablero.appendChild(tr);
  }
}
function marcar(e) {
  e.target.style.cursor = "pointer";
}
function desmarcar(e) {
  e.target.style.cursor = "none";
}
function quienEmpieza() {
  let numeroAleatorio = Math.floor(Math.random() * (2 - 0)) + 0;
  if (numeroAleatorio === 0) {
    jugadorCirculo = true;
    document.getElementById("ronda_jugador").innerHTML =
      "EMPIEZA EL JUGADOR <span style='color:red'>CÍRCULO</span>";
  } else {
    jugadorCirculo = false;
    document.getElementById("ronda_jugador").innerHTML =
      "EMPIEZA EL JUGADOR <span style='color:blue'>X</span>";
  }
}
function meterFicha(e) {
  let quienVa = document.getElementById("ronda_jugador");
  let arrayColFila = e.target.id.split("-");
  let fila = arrayColFila[0];
  let columna = arrayColFila[1];
  let imagen = document.createElement("img");
  imagen.setAttribute("class", "imagenesFichas");
  imagen.setAttribute("id", fila + "." + columna);
  //console.log(fila, columna);
  if (!arrayFilas[fila][columna] == "") {
    console.log("Ya está ocupada");
  } else if (jugadorCirculo == true) {
    arrayFilas[fila][columna] = "circulo";
    imagen.setAttribute("src", "./assets/img/circulo.png");
    console.log(e.target);
    e.target.appendChild(imagen);
    fichasCirculo--;
    jugadorCirculo = false;
    quienVa.innerHTML = "JUGADOR X"
  } else {
    arrayFilas[fila][columna] = "aspa";
    imagen.setAttribute("src", "./assets/img/aspa.png");
    e.target.appendChild(imagen);
    fichasAspa--;
    jugadorCirculo = true;
    quienVa.innerHTML = "JUGADOR CÍRCULO"
  }
  console.log(arrayFilas);
  if (fichasAspa <= 0 && fichasCirculo <= 0) {
    let arraytd = document.getElementsByClassName("tdTablero");
    for (let i = 0; i < arraytd.length; i++) {
      arraytd[i].removeAttribute("onclick");
      arraytd[i].setAttribute("ondragover", "permitir(event)");
      arraytd[i].setAttribute("ondrop", "soltar(event)");
    }
    let arrayImg = document.getElementsByClassName("imagenesFichas");
    for (let i = 0; i < arrayImg.length; i++) {
      arrayImg[i].setAttribute("draggable", "true");
      arrayImg[i].setAttribute("ondragstart", "arrastrar(event)");
    }
  }
  comprobarHorizontal(fila);
  comprobarVertical(columna);
  comprobarDiagonal(fila, columna);
}
function darGanador(contadorCirculo, contadorAspa, resaltarCirculo = [], resaltarAspa = []) {
  let quienVa = document.getElementById("ronda_jugador");
  if (contadorCirculo == 3) {
    quienVa.innerHTML = "GANA EL JUGADOR CÍRCULO"
  } else if (contadorAspa == 3) {
    quienVa.innerHTML = "GANA EL JUGADOR ASPA"
  }
  if (contadorCirculo == 3 || contadorAspa == 3) {
    let tablero = document.getElementsByClassName("tdTablero")
    for (let i = 0; i < tablero.length; i++) {
      tablero[i].removeAttribute("onclick")
      tablero[i].removeAttribute("ondrop")
    }
  }
  if (resaltarCirculo.length == 3) {
    console.log("Hay que remarcar las casillas ganadoras")
    for (let i = 0; i < resaltarCirculo.length; i++) {
      document.getElementById(resaltarCirculo[i]).style.backgroundColor = "#28bfd3";
    }
  } else if (resaltarAspa.length == 3) {
    console.log("Hay que remarcar las casillas ganadoras")
    for (let i = 0; i < resaltarAspa.length; i++) {
      document.getElementById(resaltarAspa[i]).style.backgroundColor = "#28bfd3";
    }
  }
}
function comprobarHorizontal(fila) {
  let contadorCirculo = 0;
  let contadorAspa = 0;
  let arrayPosicionResaltarCirculo = [];
  let arrayPosicionResaltarAspa = [];
  for (let i = 0; i < arrayFilas[fila].length; i++) {
    if (arrayFilas[fila][i] == "circulo") {
      arrayPosicionResaltarCirculo.push(fila + "-" + i)
      contadorCirculo++;
    } else if (arrayFilas[fila][i] == "aspa") {
      arrayPosicionResaltarAspa.push(fila + "-" + i)
      contadorAspa++;
    }
  }
  darGanador(contadorCirculo, contadorAspa, arrayPosicionResaltarCirculo, arrayPosicionResaltarAspa)

}
function comprobarVertical(columna) {
  let contadorCirculo = 0;
  let contadorAspa = 0;
  let arrayPosicionResaltarCirculo = [];
  let arrayPosicionResaltarAspa = [];
  for (let i = 0; i < arrayFilas.length; i++) {
    if (arrayFilas[i][columna] == "circulo") {
      arrayPosicionResaltarCirculo.push(i + "-" + columna)
      contadorCirculo++;
    } else if (arrayFilas[i][columna] == "aspa") {
      arrayPosicionResaltarAspa.push(i + "-" + columna)
      contadorAspa++;
    }
  }
  darGanador(contadorCirculo, contadorAspa, arrayPosicionResaltarCirculo, arrayPosicionResaltarAspa)
}
function comprobarDiagonal(fila, columna) {
  //Diagonal pte negativa
  if (fila == columna) {
    console.log("Se debe comprobar la diag pte negativa");
    if (
      arrayFilas[0][0] == "circulo" &&
      arrayFilas[1][1] == "circulo" &&
      arrayFilas[2][2] == "circulo"
    ) {
      darGanador(3, 0,["0-0","1-1","2-2"],[])
    }
    if (
      arrayFilas[0][0] == "aspa" &&
      arrayFilas[1][1] == "aspa" &&
      arrayFilas[2][2] == "aspa"
    ) {
      darGanador(0, 3,[],["0-0","1-1","2-2"])
    }
  }
  //Diagonal pte positiva
  let contadorCirculo = 0;
  let contadorAspa = 0;
  let arrayPosicionResaltarCirculo = [];
  let arrayPosicionResaltarAspa = [];
  if (arrayFilas[fila][columna] == "circulo"){
    arrayPosicionResaltarCirculo.push(fila + "-" + columna)
    contadorCirculo++
  }
  else if (arrayFilas[fila][columna] == "aspa"){
    arrayPosicionResaltarAspa.push(fila + "-" + columna)
    contadorAspa++
  }
  console.log(contadorAspa, contadorCirculo)
  for (let i = 1; i < arrayFilas.length; i++) {
    console.log(parseInt(columna) + i)
    if (fila - i >= 0 && parseInt(columna) + i <= 2) {
      if (arrayFilas[fila - i][parseInt(columna) + i] == "circulo"){
        arrayPosicionResaltarCirculo.push(fila - i + "-" + (parseInt(columna) + i))
        contadorCirculo++
      }
      else if (arrayFilas[fila - i][parseInt(columna) + i] == "aspa"){
        arrayPosicionResaltarAspa.push(fila - i + "-" + (parseInt(columna) + i))
        contadorAspa++}
    }
    if (parseInt(fila) + i <= 2 && columna - i >= 0) {
      if (arrayFilas[parseInt(fila) + i][columna - i] == "circulo"){
        arrayPosicionResaltarCirculo.push((parseInt(fila) + i) + "-" + columna - i)
        contadorCirculo++}
      else if (arrayFilas[parseInt(fila) + i][columna - i] == "aspa"){
        arrayPosicionResaltarAspa.push((parseInt(fila) + i) + "-" + columna - i)
        contadorAspa++
      }
    }
  }
  console.log("Diagonal pte positiva cirulo",arrayPosicionResaltarCirculo)
  console.log("Diagonal pte positiva aspa",arrayPosicionResaltarAspa)
  darGanador(contadorCirculo, contadorAspa,arrayPosicionResaltarCirculo,arrayPosicionResaltarAspa)

}
function arrastrar(e) {
  //console.log("jugadorCirculo?", jugadorCirculo);
  if (jugadorCirculo == true && e.target.src.includes("circulo")) {
    e.dataTransfer.setData("Text", "./assets/img/circulo.png");
    e.dataTransfer.setData("Text2", e.target.id);
  } else if (jugadorCirculo == false && e.target.src.includes("aspa")) {
    e.dataTransfer.setData("Text", "./assets/img/aspa.png");
    e.dataTransfer.setData("Text2", e.target.id);
  } else {
    console.log("No le toca a dicho jugador");
  }
}
function permitir(e) {
  e.preventDefault();
}
function soltar(e) {
  let quienVa = document.getElementById("ronda_jugador");
  let imagen = document.createElement("img");
  let src = e.dataTransfer.getData("Text");
  let idImagen = e.dataTransfer.getData("Text2");
  let idtd = idImagen.replace(".", "-");
  let arrayColFila = e.target.id.split("-");
  let fila = arrayColFila[0];
  let columna = arrayColFila[1];
  console.log(idtd);
  if (idImagen != "") {
    if (arrayFilas[fila][columna] == "") {
      e.target.appendChild(imagen);
      imagen.setAttribute("src", src);
      imagen.setAttribute("id", fila + "." + columna);
      imagen.setAttribute("draggable", "true");
      imagen.setAttribute("ondragstart", "arrastrar(event)");
      document
        .getElementById(idtd)
        .removeChild(document.getElementById(idtd).firstChild);

      let arrayidtd = idtd.split("-");
      arrayFilas[arrayidtd[0]][arrayidtd[1]] = "";
      if (src == "./assets/img/circulo.png") {
        arrayFilas[fila][columna] = "circulo";
        jugadorCirculo = false;
        quienVa.innerHTML = "JUGADOR X"
      } else if (src == "./assets/img/aspa.png") {
        arrayFilas[fila][columna] = "aspa";
        jugadorCirculo = true;
        quienVa.innerHTML = "JUGADOR CÍRCULO"
      }
    } else {
      console.log("ocupado");
    }
    comprobarHorizontal(fila);
    comprobarVertical(columna);
    comprobarDiagonal(fila, columna);

    //console.log("jugadorCirculo?", jugadorCirculo);
    //console.log("soltar", e.target);
    //console.log("src", src);
    console.log(arrayFilas);
  }
}

window.onload = function () {
  generarTablero();
  quienEmpieza();
};
