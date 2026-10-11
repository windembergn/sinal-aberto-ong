// Roteador da SPA baseado em hash (#/rota/secao).
// O hash funciona em hospedagem estática como o GitHub Pages: o servidor sempre
// entrega o mesmo index.html e o JavaScript decide qual view mostrar.

import { fecharMenu, marcarRotaAtual } from './menu.js';

const ROTA_PADRAO = '/inicio';

let rotas = {};
let viewNaoEncontrada;
let app;
let anunciador;
let desmontarAtual = null;
let primeiraCarga = true;

// "#/projetos/como-doar" -> { caminho: "/projetos", parametro: "como-doar" }
export function lerHash(hash = location.hash) {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return {
    caminho: partes.length ? `/${partes[0]}` : '',
    parametro: partes[1] ? decodeURIComponent(partes[1]) : null,
  };
}

export function navegar(caminho) {
  location.hash = caminho;
}

function renderizar() {
  const { caminho, parametro } = lerHash();

  // Sem hash (primeiro acesso): troca a URL sem criar entrada extra no histórico.
  if (!caminho) {
    history.replaceState(null, '', `#${ROTA_PADRAO}`);
    return renderizar();
  }

  const view = rotas[caminho] ?? viewNaoEncontrada;

  // A view anterior pode ter deixado listeners globais ou timers: limpa antes de trocar.
  desmontarAtual?.();
  app.innerHTML = view.render(parametro);
  desmontarAtual = view.montar?.(app, parametro) ?? null;

  document.title = `${view.titulo} — Sinal Aberto`;
  marcarRotaAtual(caminho);
  fecharMenu();

  // Parâmetro que corresponde a um id na página: rola até a seção (antigas âncoras).
  const secao = parametro && app.querySelector(`#${CSS.escape(parametro)}`);
  if (secao) {
    secao.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }

  // Ao trocar de "página" sem recarregar, o leitor de tela não percebe a mudança:
  // o foco vai para o título e a região aria-live anuncia a nova página.
  if (!primeiraCarga) {
    const alvo = secao ?? app.querySelector('h1');
    alvo?.setAttribute('tabindex', '-1');
    alvo?.focus({ preventScroll: Boolean(secao) });
    anunciador.textContent = `Página carregada: ${view.titulo}`;
  }
  primeiraCarga = false;
}

export function iniciarRoteador({ rotas: mapa, naoEncontrada, raiz, regiaoAnuncio }) {
  rotas = mapa;
  viewNaoEncontrada = naoEncontrada;
  app = raiz;
  anunciador = regiaoAnuncio;
  window.addEventListener('hashchange', renderizar);
  renderizar();
}
