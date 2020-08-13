let arrayColumnas = [
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
  let quienVa=document.getElementById("ronda_jugador");
  let arrayColFila = e.target.id.split("-");
  let fila = arrayColFila[0];
  let columna = arrayColFila[1];
  let imagen = document.createElement("img");
  imagen.setAttribute("class", "imagenesFichas");
  imagen.setAttribute("id", fila + "." + columna);
  //console.log(fila, columna);
  if (!arrayColumnas[fila][columna] == "") {
    console.log("Ya está ocupada");
  } else if (jugadorCirculo == true) {
    arrayColumnas[fila][columna] = "circulo";
    imagen.setAttribute("src", "./assets/img/circulo.png");
    console.log(e.target);
    e.target.appendChild(imagen);
    fichasCirculo--;
    jugadorCirculo = false;
    quienVa.innerHTML= "JUGADOR X"
  } else {
    arrayColumnas[fila][columna] = "aspa";
    imagen.setAttribute("src", "./assets/img/aspa.png");
    e.target.appendChild(imagen);
    fichasAspa--;
    jugadorCirculo = true;
    quienVa.innerHTML="JUGADOR CÍRCULO"
  }
  console.log(arrayColumnas);
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
function darGanador(contadorCirculo,contadorAspa){
  let quienVa=document.getElementById("ronda_jugador");
  if (contadorCirculo == 3) {
    quienVa.innerHTML="GANA EL JUGADOR CÍRCULO"
  } else if (contadorAspa == 3) {
    quienVa.innerHTML="GANA EL JUGADOR ASPA"
  }
  if(contadorCirculo==3 || contadorAspa==3){
    let tablero=document.getElementsByClassName("tdTablero")
    for(let i=0;i<tablero.length;i++){
      tablero[i].removeAttribute("onclick")
      tablero[i].removeAttribute("ondrop")
    }
  } 
}
function comprobarHorizontal(fila) {
  let contadorCirculo = 0;
  let contadorAspa = 0;
  for (let i = 0; i < arrayColumnas[fila].length; i++) {
    if (arrayColumnas[fila][i] == "circulo") {
      contadorCirculo++;
    } else if (arrayColumnas[fila][i] == "aspa") {
      contadorAspa++;
    }
  }
  darGanador(contadorCirculo,contadorAspa)
  
}
function comprobarVertical(columna) {
  let contadorCirculo = 0;
  let contadorAspa = 0;
  for (let i = 0; i < arrayColumnas.length; i++) {
    if (arrayColumnas[i][columna] == "circulo") {
      contadorCirculo++;
    } else if (arrayColumnas[i][columna] == "aspa") {
      contadorAspa++;
    }
  }
  darGanador(contadorCirculo,contadorAspa)
}
function comprobarDiagonal(fila, columna) {
  //Diagonal pte negativa
  if (fila == columna) {
    console.log("Se debe comprobar la diag pte negativa");
    if (
      arrayColumnas[0][0] == "circulo" &&
      arrayColumnas[1][1] == "circulo" &&
      arrayColumnas[2][2] == "circulo"
    ) {
      darGanador(3,0)
    }
    if (
      arrayColumnas[0][0] == "aspa" &&
      arrayColumnas[1][1] == "aspa" &&
      arrayColumnas[2][2] == "aspa"
    ) {
      darGanador(0,3)
    }
  }
  //Diagonal pte positiva
   let contadorCirculo=0;
  let contadorAspa=0;
  if(arrayColumnas[fila][columna]=="circulo") contadorCirculo++;
  else if(arrayColumnas[fila][columna]=="aspa") contadorAspa++;
  console.log(contadorAspa,contadorCirculo)
  for(let i=1;i<arrayColumnas.length;i++){
    console.log(parseInt(columna)+i)
    if(fila-i>=0 && parseInt(columna)+i<=2){
      if(arrayColumnas[fila-i][parseInt(columna)+i]=="circulo") contadorCirculo++;
      else if(arrayColumnas[fila-i][parseInt(columna)+i]=="aspa") contadorAspa++;
    }
     if(parseInt(fila)+i<=2 && columna-i>=0){
      if(arrayColumnas[parseInt(fila)+i][columna-i]=="circulo") contadorCirculo++;
      else if(arrayColumnas[parseInt(fila)+i][columna-i]=="aspa") contadorAspa++;
    } 
  }
  darGanador(contadorCirculo,contadorAspa) 

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
  let quienVa=document.getElementById("ronda_jugador");
  let imagen = document.createElement("img");
  let src = e.dataTransfer.getData("Text");
  let idImagen = e.dataTransfer.getData("Text2");
  let idtd = idImagen.replace(".", "-");
  let arrayColFila = e.target.id.split("-");
  let fila = arrayColFila[0];
  let columna = arrayColFila[1];
  console.log(idtd);
  if(idImagen!=""){
  if (arrayColumnas[fila][columna] == "") {
    e.target.appendChild(imagen);
    imagen.setAttribute("src", src);
    imagen.setAttribute("id", fila + "." + columna);
    imagen.setAttribute("draggable", "true");
    imagen.setAttribute("ondragstart", "arrastrar(event)");
    document
      .getElementById(idtd)
      .removeChild(document.getElementById(idtd).firstChild);

    let arrayidtd = idtd.split("-");
    arrayColumnas[arrayidtd[0]][arrayidtd[1]] = "";
    if (src == "./assets/img/circulo.png") {
      arrayColumnas[fila][columna] = "circulo";
      jugadorCirculo = false;
      quienVa.innerHTML= "JUGADOR X"
    } else if (src == "./assets/img/aspa.png") {
      arrayColumnas[fila][columna] = "aspa";
      jugadorCirculo = true;
      quienVa.innerHTML= "JUGADOR CÍRCULO"
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
  console.log(arrayColumnas);
  }
}

window.onload = function () {
  generarTablero();
  quienEmpieza();
};
