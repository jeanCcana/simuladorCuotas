import { excelFormulas } from "./excelFormulas.js";

(() => {
  let moneda = "";
  let moneRepr = "";
  let monto = 0.0;
  let numCuotas = 0;
  let tea = 0.0;
  let textoRpta = "";

  do {
    moneda = prompt(`Ingrese 'S' para Soles o 'D' para dolares`);
  } while (moneda !== "S" && moneda !== "D");

  if (moneda === "S") {
    moneRepr = "S/";
    do {
      monto = parseFloat(prompt(`Ingrese el monto (mínimo 100 soles)`));
    } while (monto < 100.0);
  } else {
    moneRepr = "$";
    do {
      monto = parseFloat(prompt(`Ingrese el monto (mínimo a 33 dolares)`));
    } while (monto < 33.0);
  }

  do {
    numCuotas = parseInt(prompt(`Ingrese el número de cuotas (2 a 36)`));
  } while (numCuotas < 2 || numCuotas > 36);

  do {
    tea = parseFloat(prompt(`Ingrese su TEA (mínimo 70%)`)) / 100;
  } while (tea < 0.7);

  const tem = Math.pow(1 + tea, 1 / 12) - 1;

  textoRpta += `Su tasa mensual: ${(tem * 100).toFixed(2)}%\n\n`;

  let deuda = monto;

  let acumuladorCuotas = 0;

  for (let i = 0; i < numCuotas; i++) {
    let amort;
    let interes;
    let cuota;

    amort = -excelFormulas.PPMT(tem, i + 1, numCuotas, monto, 0, 0);

    interes = deuda * tem;

    cuota = amort + interes;

    textoRpta += `Cuota ${i + 1}:
      Deuda: ${moneRepr} ${deuda.toFixed(2)}
      Amortización: ${moneRepr} ${amort.toFixed(2)}
      Interés: ${moneRepr} ${interes.toFixed(2)}
      Cuota total a pagar: ${moneRepr} ${cuota.toFixed(2)}\n`;

    //Actualiza la deuda para la proxima cuota
    deuda = deuda - amort;

    // Acumula la cuota para la suma de todas las cuotas
    acumuladorCuotas += cuota;
    console.log(acumuladorCuotas);
  }

  textoRpta += `\nDatos:
  Monto inicial: ${moneRepr} ${monto}
  Total a pagar: ${moneRepr} ${acumuladorCuotas.toFixed(2)}
  Diferencia: ${moneRepr} ${(acumuladorCuotas - monto).toFixed(2)}`;

  alert(textoRpta);
})();
