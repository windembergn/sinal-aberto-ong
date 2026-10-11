import { armazenamento } from '../modules/armazenamento.js';
import { escapar, etiqueta, formatarData } from '../modules/templates.js';

const ETIQUETAS = {
  doador: { texto: 'Doador', tipo: 'sucesso' },
  voluntario: { texto: 'Voluntário', tipo: '' },
  ambos: { texto: 'Doador e voluntário', tipo: 'destaque' },
};

const cartaoCadastro = (c) => `
  <li class="cartao col-md-6 col-lg-4" data-id="${escapar(c.id)}">
    <div class="cartao__cabecalho">
      <h2 class="cartao__titulo">${escapar(c.nome)}</h2>
      ${etiqueta(ETIQUETAS[c.tipo] ?? { texto: c.tipo, tipo: '' })}
    </div>
    <p>${escapar(c.email)}</p>
    <p>${escapar(c.cidade)} — ${escapar(c.estado)}</p>
    ${c.disponibilidade ? `<p>${escapar(c.disponibilidade)} h por semana</p>` : ''}
    <p class="campo__dica">CPF ${escapar(c.cpf)} · cadastrado em ${escapar(formatarData(c.criadoEm))}</p>
    <div class="cartao__acao">
      <button type="button" class="botao botao--contorno" data-excluir="${escapar(c.id)}">Excluir cadastro</button>
    </div>
  </li>`;

const listaOuVazio = (lista) => (lista.length
  ? `<ul class="grade lista-limpa" id="lista-cadastros">${lista.map(cartaoCadastro).join('')}</ul>`
  : `<div class="vazio">
      <p>Nenhum cadastro salvo neste navegador ainda.</p>
      <a class="botao botao--primario" href="#/cadastro">Fazer o primeiro cadastro</a>
    </div>`);

const contagem = (n) => (n === 1 ? '1 cadastro salvo' : `${n} cadastros salvos`);

export const cadastros = {
  titulo: 'Cadastros salvos',

  render() {
    const lista = armazenamento.listarCadastros();
    return `
      <section class="secao secao--alt">
        <div class="container">
          <h1 tabindex="-1">Cadastros salvos</h1>
          <p class="secao__intro">Cadastros enviados por este navegador e guardados no localStorage. Nesta versão de demonstração, nada é enviado a um servidor.</p>
          <p><strong id="contagem-cadastros">${contagem(lista.length)}</strong></p>
        </div>
      </section>
      <section class="secao">
        <div class="container" id="area-cadastros">${listaOuVazio(lista)}</div>
      </section>

      <dialog class="modal" id="modal-excluir" aria-labelledby="excluir-titulo">
        <h2 id="excluir-titulo">Excluir cadastro?</h2>
        <p>O cadastro de <strong id="excluir-nome"></strong> será removido deste navegador. Esta ação não pode ser desfeita.</p>
        <form method="dialog" class="modal__acoes">
          <button class="botao botao--contorno" value="cancelar" autofocus>Cancelar</button>
          <button class="botao botao--perigo" value="confirmar">Excluir</button>
        </form>
      </dialog>`;
  },

  montar(raiz) {
    const modal = raiz.querySelector('#modal-excluir');
    const area = raiz.querySelector('#area-cadastros');
    let idPendente = null;

    // Excluir é destrutivo: sempre passa pelo modal de confirmação.
    area.addEventListener('click', (e) => {
      const botao = e.target.closest('[data-excluir]');
      if (!botao) return;
      idPendente = botao.dataset.excluir;
      raiz.querySelector('#excluir-nome').textContent = botao.closest('[data-id]').querySelector('h2').textContent;
      modal.showModal();
    });

    modal.addEventListener('close', () => {
      if (modal.returnValue === 'confirmar' && idPendente) {
        const lista = armazenamento.removerCadastro(idPendente);
        area.innerHTML = listaOuVazio(lista);
        raiz.querySelector('#contagem-cadastros').textContent = contagem(lista.length);
        raiz.querySelector('h1').focus();
      }
      idPendente = null;
      modal.returnValue = '';
    });
  },
};
