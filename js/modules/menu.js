// Menu mobile: o botão hambúrguer abre e fecha a navegação principal.
// Sem JavaScript a classe .js não existe e o menu fica sempre visível.
let botaoMenu;
let navegacao;

const definirMenu = (aberto) => {
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  navegacao.dataset.aberto = String(aberto);
};

export const fecharMenu = () => botaoMenu && definirMenu(false);

export function iniciarMenu() {
  document.documentElement.classList.add('js');
  botaoMenu = document.querySelector('.menu-toggle');
  navegacao = document.getElementById(botaoMenu.getAttribute('aria-controls'));
  definirMenu(false);

  botaoMenu.addEventListener('click', () => {
    definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navegacao.dataset.aberto === 'true') {
      definirMenu(false);
      botaoMenu.focus();
    }
  });
}

// Marca o link da rota atual com aria-current (estilo e leitor de tela).
export function marcarRotaAtual(caminho) {
  document.querySelectorAll('.navegacao .menu__link').forEach((link) => {
    const destino = link.getAttribute('href').replace(/^#/, '');
    const atual = destino === caminho;
    if (atual) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
