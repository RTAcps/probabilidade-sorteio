function fatorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function combinacao(n, k) {
  return fatorial(n) / (fatorial(k) * fatorial(n - k));
}

function formatarNumero(numero, porcentagem = false) {
  // Usar Intl.NumberFormat para formatar números
  const opcoes = {
    style: porcentagem ? "percent" : "decimal",
    maximumFractionDigits: porcentagem ? 15 : 50,
  };

  return new Intl.NumberFormat("pt-BR", opcoes).format(numero);
}

function calcularProbabilidade() {
  const totalEscolhidos =
    document.getElementById("totalEscolhidos").valueAsNumber || 0;
  const k = document.getElementById("k").valueAsNumber || 0;
  const totalConjunto =
    document.getElementById("totalConjunto").valueAsNumber || 0;

  if (totalEscolhidos > totalConjunto) {
    // Caso onde o número total de escolhas é maior do que o número total no conjunto
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = `<p>O número total de escolhas não pode ser maior do que o número total no conjunto.</p>`;
    return;
  }

  const numerador =
    combinacao(totalEscolhidos, k) *
    combinacao(totalConjunto - totalEscolhidos, totalEscolhidos - k);
  const denominador = combinacao(totalConjunto, totalEscolhidos);
  const probabilidade = numerador / denominador;

  const chanceEmX = 1 / probabilidade;

  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = `
      <p>A probabilidade de acertar exatamente ${formatarNumero(k)} número${
    k > 1 ? "s" : ""
  } ao escolher ${formatarNumero(
    totalEscolhidos
  )} de um conjunto de ${formatarNumero(
    totalConjunto
  )} é aproximadamente <strong>${formatarNumero(
    probabilidade,
    true
  )}</strong>.</p>
      <p>Isso significa que você tem 1 chance em aproximadamente <strong>1 em ${formatarNumero(
        chanceEmX.toFixed(2)
      )} de acertar</strong>.</p>
    `;
}
