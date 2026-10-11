// Integração com a biblioteca externa Chart.js para o resumo dos cadastros.
// A biblioteca (~70 KB comprimida) só é baixada quando a tela de cadastros abre,
// via import() dinâmico: quem visita só a página inicial não paga esse custo.

const CHART_JS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/auto/+esm';

export const ROTULOS_TIPO = { doador: 'Doadores', voluntario: 'Voluntários', ambos: 'Doadores e voluntários' };

// Função pura (testável no Node): conta os cadastros por tipo de participação.
export function contarPorTipo(lista) {
  const contagem = { doador: 0, voluntario: 0, ambos: 0 };
  for (const cadastro of lista) {
    if (cadastro.tipo in contagem) contagem[cadastro.tipo]++;
  }
  return contagem;
}

let carregamento = null;

// O import fica guardado: abrir a tela várias vezes não baixa a biblioteca de novo.
// Se falhar (sem internet), a promessa é descartada para tentar de novo depois.
export function carregarChart() {
  carregamento ??= import(CHART_JS)
    .then((modulo) => modulo.default)
    .catch((erro) => {
      carregamento = null;
      throw erro;
    });
  return carregamento;
}

// As cores vêm das variáveis do design system, não de valores fixos no JS.
const corDoTema = (variavel) => getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();

// Cores das barras, do texto e da grade lidas do tema ativo. Todas com contraste
// mínimo de 3:1 contra o fundo nos três temas (WCAG 1.4.11).
const coresDoTema = () => ({
  barras: [corDoTema('--cor-sucesso'), corDoTema('--cor-primaria'), corDoTema('--cor-aviso')],
  texto: corDoTema('--cor-texto-suave'),
  grade: corDoTema('--cor-borda'),
});

export async function criarGraficoTipos(canvas, lista) {
  const Chart = await carregarChart();
  const contagem = contarPorTipo(lista);
  const cores = coresDoTema();

  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: Object.values(ROTULOS_TIPO),
      datasets: [{
        label: 'Cadastros',
        data: Object.values(contagem),
        // O amarelo do tema (2,01:1 no claro) foi trocado pelo tom de aviso (5,93:1).
        backgroundColor: cores.barras,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 400 },
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: cores.texto }, grid: { color: cores.grade } },
        y: { beginAtZero: true, ticks: { precision: 0, color: cores.texto }, grid: { color: cores.grade } },
      },
    },
  });
}

// Chamado quando o usuário troca de tema com o gráfico na tela.
export function aplicarCoresDoTema(grafico) {
  const cores = coresDoTema();
  grafico.data.datasets[0].backgroundColor = cores.barras;
  for (const eixo of ['x', 'y']) {
    grafico.options.scales[eixo].ticks.color = cores.texto;
    grafico.options.scales[eixo].grid.color = cores.grade;
  }
  grafico.update();
}

export function atualizarGraficoTipos(grafico, lista) {
  grafico.data.datasets[0].data = Object.values(contarPorTipo(lista));
  grafico.update();
}
