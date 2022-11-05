let btn = document.querySelectorAll("#botoes button");
let operaçaoAnteriorTela = document.querySelector("#operaçao-anterior");
let operaçaoAtualTela = document.querySelector("#operaçao-atual");

class Calcular {
  constructor(operaçaoAnteriorTela, operaçaoAtualTela) {
    this.operaçaoAtual = "";
    this.operaçaoAnteriorTela = operaçaoAnteriorTela;
    this.operaçaoAtualTela = operaçaoAtualTela;
    
  }

  operaçoes(simbolos) {
    if (this.operaçaoAtualTela.innerText === "" && simbolos !== "C") {
      if (this.operaçaoAnteriorTela.innerText !== "") {
        this.changeOperation(simbolos);
      }
      return;
    }

    let valor;
    let anterior = +this.operaçaoAnteriorTela.innerText.split(" ")[0];
    let atual = +this.operaçaoAtualTela.innerText;

    switch (simbolos) {
      case "-":
        valor = anterior - atual;
        this.atualizarTela(valor, simbolos, atual, anterior);
        break;
      case "+":
        valor = anterior + atual;
        this.atualizarTela(valor, simbolos, atual, anterior);
        break;
      case "*":
        valor = anterior * atual;
        this.atualizarTela(valor, simbolos, atual, anterior);
        break;
      case "/":
        valor = anterior / atual;
        this.atualizarTela(valor, simbolos, atual, anterior);
        break;
      case "DEL":
        this.apagarUltimoNumero();
        break;
      case "CE":
        this.apagarNumeroAtual();
        break;
      case "C":
        this.apagarTudo();
        break;
      case "=":
        this.igual();
        break;
      default:
        return;
    }
  }

  AddDigito(digito) {
    console.log(digito);
    if (digito === "." && this.operaçaoAtualTela.innerText.includes(".")) {
      return;
    }

    this.operaçaoAtual = digito;
    this.atualizarTela();
  }

  atualizarTela(
    valor = null,
    simbolos = null,
    atual = null,
    anterior = null
  ) {
    if (valor === null) {
      this.operaçaoAtualTela.innerText += this.operaçaoAtual;
    } else {

      if (anterior === 0) {
        valor = atual;
      }

      this.operaçaoAnteriorTela.innerText = `${valor} ${simbolos}`;
      this.operaçaoAtualTela.innerText = "";
    }
  }

  changeOperation(simbolos) {
    let mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(simbolos)) {
      return;
    }

    this.operaçaoAnteriorTela.innerText =
      this.operaçaoAnteriorTela.innerText.slice(0, -1) + simbolos;
  }

  apagarUltimoNumero() {
    this.operaçaoAtualTela.innerText =
      this.operaçaoAtualTela.innerText.slice(0, -1);
  }

  apagarNumeroAtual() {
    this.operaçaoAtualTela.innerText = "";
  }

  apagarTudo() {
    this.operaçaoAtualTela.innerText = "";
    this.operaçaoAnteriorTela.innerText = "";
  }

  igual() {
    let simbolos = this.operaçaoAnteriorTela.innerText.split(" ")[1];

    this.operaçoes(simbolos);
  }
}

let calc = new Calcular(operaçaoAnteriorTela, operaçaoAtualTela);

btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.AddDigito(value);
    } else {
      calc.operaçoes(value);
    }
  });
});