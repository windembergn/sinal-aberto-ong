// Garante, a cada execução do CI, que as cores dos três temas continuam com
// contraste WCAG AA. Lê as variáveis direto do style.css: mudou uma cor, o teste mede de novo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../../css/style.css', import.meta.url), 'utf8');

// Extrai as variáveis hexadecimais de um bloco CSS (o primeiro que casar com o seletor).
function variaveis(seletor) {
  const inicio = css.indexOf(seletor);
  assert.ok(inicio >= 0, `bloco ${seletor} não encontrado`);
  const bloco = css.slice(inicio, css.indexOf('}', inicio));
  return Object.fromEntries([...bloco.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})\b/g)].map((m) => [m[1], m[2]]));
}

const luminancia = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contraste = (a, b) => {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
};

const claro = variaveis(':root {');
const temas = {
  claro,
  escuro: { ...claro, ...variaveis(':root[data-tema="escuro"]') },
  'alto contraste': { ...claro, ...variaveis(':root[data-tema="alto-contraste"]') },
};

// [cor do texto/elemento, cor de fundo, mínimo, onde aparece]
const pares = [
  ['cor-texto', 'cor-fundo', 4.5, 'texto do corpo'],
  ['cor-texto', 'cor-fundo-alt', 4.5, 'texto em seção alternada'],
  ['cor-texto-suave', 'cor-fundo', 4.5, 'dicas'],
  ['cor-primaria', 'cor-fundo', 4.5, 'links'],
  ['cor-primaria', 'cor-fundo-alt', 4.5, 'links em seção alternada'],
  ['cor-primaria-escura', 'cor-fundo', 4.5, 'títulos h2'],
  ['cor-primaria-escura', 'cor-primaria-clara', 4.5, 'etiqueta e alerta informativo'],
  ['cor-texto', 'cor-primaria-clara', 4.5, 'opção marcada'],
  ['cor-texto-inverso', 'cor-primaria', 4.5, 'botão primário'],
  ['cor-texto-inverso', 'cor-primaria-escura', 4.5, 'hover do botão e depoimento'],
  ['cor-texto-sobre-secundaria', 'cor-secundaria', 4.5, 'botão secundário'],
  ['cor-aviso', 'cor-secundaria-clara', 4.5, 'etiqueta de destaque'],
  ['cor-sucesso', 'cor-sucesso-clara', 4.5, 'etiqueta de sucesso'],
  ['cor-erro', 'cor-fundo', 4.5, 'mensagem de erro'],
  ['cor-erro', 'cor-erro-clara', 4.5, 'alerta de erro'],
  ['cor-texto', 'cor-erro-clara', 4.5, 'campo com erro'],
  ['cor-texto-inverso', 'cor-erro', 4.5, 'botão excluir'],
  ['cor-borda-campo', 'cor-fundo', 3, 'borda dos campos'],
  ['cor-sucesso', 'cor-fundo', 3, 'barra do gráfico'],
  ['cor-aviso', 'cor-fundo', 3, 'barra do gráfico'],
  ['hero-texto', 'hero-fim', 4.5, 'texto do hero'],
  ['rodape-texto', 'rodape-fundo', 4.5, 'rodapé'],
];

for (const [nome, cores] of Object.entries(temas)) {
  test(`tema ${nome}: todos os pares atingem WCAG AA`, () => {
    for (const [texto, fundo, minimo, onde] of pares) {
      const razao = contraste(cores[texto], cores[fundo]);
      assert.ok(razao >= minimo, `${onde}: ${cores[texto]} sobre ${cores[fundo]} = ${razao.toFixed(2)}:1 (mínimo ${minimo}:1)`);
    }
  });
}
