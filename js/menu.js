// Menu mobile: o botão hambúrguer abre e fecha a navegação principal.
// Sem JavaScript a classe .js não existe e o menu fica sempre visível.
document.documentElement.classList.add('js');

const botaoMenu = document.querySelector('.menu-toggle');
const navegacao = document.getElementById(botaoMenu.getAttribute('aria-controls'));

const definirMenu = (aberto) => {
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  navegacao.dataset.aberto = String(aberto);
};

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
