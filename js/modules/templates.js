// Componentes visuais reutilizáveis. Cada função recebe dados e devolve a
// marcação HTML com as classes do design system da Experiência Prática II.

// Todo texto que pode vir do usuário (ex.: localStorage) passa por aqui antes de
// entrar no innerHTML, para impedir injeção de HTML/script (XSS).
export function escapar(valor) {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const etiqueta = ({ texto, tipo }) =>
  `<span class="etiqueta${tipo ? ` etiqueta--${tipo}` : ''}">${escapar(texto)}</span>`;

export const cartaoSimples = ({ titulo, texto }, colunas = 'col-md-4') => `
  <div class="cartao ${colunas}">
    <h3 class="cartao__titulo">${escapar(titulo)}</h3>
    <p>${escapar(texto)}</p>
  </div>`;

export const cartaoNumero = ({ numero, texto }) => `
  <li class="cartao cartao--destaque col-sm-6 col-md-4">
    <span class="cartao__numero">${escapar(numero)}</span>
    <p>${escapar(texto)}</p>
  </li>`;

export const cartaoProjeto = (projeto) => `
  <article id="${escapar(projeto.id)}" class="cartao col-md-6 col-lg-4">
    <div class="cartao__cabecalho">
      <h2 class="cartao__titulo">${escapar(projeto.titulo)}</h2>
      ${etiqueta(projeto.etiqueta)}
    </div>
    <p>${escapar(projeto.resumo)}</p>
    <h3>Como funciona</h3>
    <p>${escapar(projeto.comoFunciona)}</p>
    <h3>Impacto esperado</h3>
    <p>${escapar(projeto.impacto)}</p>
  </article>`;

export const barraProgresso = ({ rotulo, percentual }, id = 'progresso') => `
  <div class="progresso">
    <div class="progresso__rotulo" id="${id}-rotulo">
      <span>${escapar(rotulo)}</span>
      <span>${Number(percentual)}%</span>
    </div>
    <div class="progresso__barra" role="progressbar" aria-labelledby="${id}-rotulo"
      aria-valuenow="${Number(percentual)}" aria-valuemin="0" aria-valuemax="100">
      <div class="progresso__preenchimento" style="width: ${Number(percentual)}%"></div>
    </div>
  </div>`;

export const alerta = (tipo, conteudo, extra = '') => `
  <div class="alerta alerta--${tipo}" ${extra}>
    <span class="alerta__icone" aria-hidden="true">${tipo === 'erro' ? '!' : tipo === 'sucesso' ? '✓' : 'i'}</span>
    <div class="alerta__conteudo">${conteudo}</div>
  </div>`;

// Campo de formulário completo: rótulo, controle, dica opcional e área de erro,
// já ligados por id/aria-describedby. Usado por todos os campos do cadastro.
export function campo({ id, rotulo, tipo = 'text', colunas = '', obrigatorio = true, dica = '', atributos = '', opcoes = null }) {
  const descricao = [dica && `${id}-dica`, `${id}-erro`].filter(Boolean).join(' ');
  const asterisco = obrigatorio ? ' <span class="obrigatorio" aria-hidden="true">*</span>' : '';
  const comum = `id="${id}" name="${id}" aria-describedby="${descricao}" ${obrigatorio ? 'required' : ''} ${atributos}`;

  let controle;
  if (tipo === 'select') {
    controle = `<select ${comum}>
      <option value="" selected disabled>Selecione...</option>
      ${opcoes.map((o) => `<option value="${escapar(o.valor)}">${escapar(o.texto)}</option>`).join('')}
    </select>`;
  } else if (tipo === 'textarea') {
    controle = `<textarea ${comum}></textarea>`;
  } else {
    controle = `<input type="${tipo}" ${comum}>`;
  }

  return `
    <div class="campo ${colunas}" data-campo="${id}">
      <label for="${id}">${escapar(rotulo)}${asterisco}</label>
      ${controle}
      ${dica ? `<span class="campo__dica" id="${id}-dica">${escapar(dica)}</span>` : ''}
      <span class="campo__erro" id="${id}-erro"></span>
    </div>`;
}

export const opcao = ({ id, nome, valor, rotulo, tipo = 'radio', obrigatorio = false }) => `
  <div class="opcao">
    <input type="${tipo}" id="${id}" name="${nome}" value="${escapar(valor)}" ${obrigatorio ? 'required' : ''}>
    <label for="${id}">${escapar(rotulo)}</label>
  </div>`;

export const formatarData = (iso) =>
  new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
