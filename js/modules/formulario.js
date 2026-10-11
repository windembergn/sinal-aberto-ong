// Ligação entre o formulário (DOM) e as regras de validacao.js:
// lê os valores, mostra o feedback em cada campo e monta o resumo de erros.

import { validarCampo, validarFormulario } from './validacao.js';
import { escapar } from './templates.js';

// Converte o formulário num objeto simples { nomeDoCampo: valor }.
export function lerFormulario(form) {
  const dados = Object.fromEntries(new FormData(form));
  dados.termos = form.elements.termos?.checked ?? false;
  dados['tipo-participacao'] = dados['tipo-participacao'] ?? '';
  return dados;
}

export function preencherFormulario(form, campos) {
  for (const [nome, valor] of Object.entries(campos)) {
    const elemento = form.elements[nome];
    if (!elemento) continue;
    if (elemento instanceof RadioNodeList) {
      elemento.forEach((radio) => { radio.checked = radio.value === valor; });
    } else {
      elemento.value = valor;
    }
  }
}

const caixaDoCampo = (form, nome) => form.querySelector(`[data-campo="${nome}"]`);

// Mostra (ou limpa) o erro de um campo: classe visual, aria-invalid e texto.
export function exibirFeedback(form, nome, mensagem) {
  const caixa = caixaDoCampo(form, nome);
  if (!caixa) return;
  const controles = caixa.querySelectorAll('input, select, textarea');
  caixa.classList.toggle('campo--erro', Boolean(mensagem));
  caixa.classList.toggle('campo--ok', !mensagem);
  controles.forEach((c) => c.setAttribute('aria-invalid', String(Boolean(mensagem))));
  caixa.querySelector('.campo__erro').textContent = mensagem;
}

export function limparFeedback(form) {
  form.querySelectorAll('[data-campo]').forEach((caixa) => {
    caixa.classList.remove('campo--erro', 'campo--ok');
    caixa.querySelectorAll('[aria-invalid]').forEach((c) => c.removeAttribute('aria-invalid'));
    caixa.querySelector('.campo__erro').textContent = '';
  });
}

// Valida um campo isolado (usado nos eventos de blur/input/change).
export function validarEExibir(form, nome) {
  const mensagem = validarCampo(nome, lerFormulario(form));
  exibirFeedback(form, nome, mensagem);
  return mensagem;
}

// Valida tudo no envio. Devolve a lista de erros para o resumo.
export function validarTudo(form) {
  const erros = validarFormulario(lerFormulario(form));
  form.querySelectorAll('[data-campo]').forEach((caixa) => {
    const nome = caixa.dataset.campo;
    exibirFeedback(form, nome, erros[nome] ?? '');
  });
  return Object.entries(erros);
}

// Resumo no topo com um link para cada campo com erro (padrão recomendado pelo gov.uk/WCAG).
export function renderizarResumo(resumo, erros, rotulos) {
  if (!erros.length) {
    resumo.hidden = true;
    resumo.innerHTML = '';
    return;
  }
  resumo.innerHTML = `
    <span class="alerta__icone" aria-hidden="true">!</span>
    <div class="alerta__conteudo">
      <p><strong>${erros.length === 1 ? '1 campo precisa' : `${erros.length} campos precisam`} de correção:</strong></p>
      <ul class="resumo-erros">
        ${erros.map(([nome, msg]) => `<li><a href="#" data-ir-para="${escapar(nome)}">${escapar(rotulos[nome] ?? nome)}: ${escapar(msg)}</a></li>`).join('')}
      </ul>
    </div>`;
  resumo.hidden = false;
}
