// Ponto de entrada da SPA: registra as rotas e inicia menu e roteador.
// Cada área de funcionalidade fica no seu módulo (js/modules) e cada tela na sua view (js/views).

import { iniciarMenu } from './modules/menu.js';
import { iniciarRoteador } from './modules/roteador.js';
import { inicio } from './views/inicio.js';
import { projetos } from './views/projetos.js';
import { cadastro } from './views/cadastro.js';
import { cadastros } from './views/cadastros.js';
import { naoEncontrada } from './views/nao-encontrada.js';

iniciarMenu();

// O "pular para o conteúdo" não pode alterar o hash (o roteador entenderia como rota):
// move o foco direto para o <main>.
document.querySelector('[data-pular]').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('app').focus();
});

iniciarRoteador({
  rotas: {
    '/inicio': inicio,
    '/projetos': projetos,
    '/cadastro': cadastro,
    '/cadastros': cadastros,
  },
  naoEncontrada,
  raiz: document.getElementById('app'),
  regiaoAnuncio: document.getElementById('anuncio-rota'),
});
