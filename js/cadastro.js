// Feedback do formulário: resumo de erros, estado de carregamento e modal de confirmação.
const formulario = document.getElementById('formulario-cadastro');
const resumoErros = document.getElementById('resumo-erros');
const modal = document.getElementById('modal-sucesso');
const botaoEnviar = formulario.querySelector('[type="submit"]');

// O evento invalid dispara para cada campo inválido quando o envio é bloqueado.
formulario.addEventListener('invalid', () => {
  resumoErros.hidden = false;
}, true);

formulario.addEventListener('submit', (e) => {
  // Site estático: simula o envio e confirma com o modal.
  e.preventDefault();
  resumoErros.hidden = true;
  botaoEnviar.disabled = true;
  botaoEnviar.setAttribute('aria-busy', 'true');
  botaoEnviar.textContent = 'Enviando...';

  setTimeout(() => {
    document.getElementById('modal-email').textContent = formulario.email.value;
    formulario.reset();
    botaoEnviar.disabled = false;
    botaoEnviar.removeAttribute('aria-busy');
    botaoEnviar.textContent = 'Enviar cadastro';
    modal.showModal();
  }, 800);
});
