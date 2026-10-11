import { estados, tiposParticipacao } from '../modules/dados.js';
import { campo, opcao, alerta, formatarData } from '../modules/templates.js';
import { aplicarMascaras } from '../modules/mascaras.js';
import { armazenamento } from '../modules/armazenamento.js';
import { precisaDeHoras } from '../modules/validacao.js';
import {
  lerFormulario, preencherFormulario, validarEExibir, validarTudo,
  renderizarResumo, limparFeedback,
} from '../modules/formulario.js';

const ROTULOS = {
  nome: 'Nome completo', email: 'E-mail', nascimento: 'Data de nascimento',
  telefone: 'Telefone/WhatsApp', cpf: 'CPF', cep: 'CEP', endereco: 'Rua e número',
  cidade: 'Cidade', estado: 'Estado', 'tipo-participacao': 'Tipo de participação',
  disponibilidade: 'Disponibilidade semanal', mensagem: 'Mensagem', termos: 'Termos de uso',
};

const LIMITE_MENSAGEM = 500;

export const cadastro = {
  titulo: 'Cadastro de Doadores e Voluntários',

  render: () => `
    <section id="intro-cadastro" class="secao secao--alt">
      <div class="container">
        <h1>Cadastre-se como Doador ou Voluntário</h1>
        <p class="secao__intro">Preencha o formulário abaixo para fazer parte da rede Sinal Aberto. Todos os campos marcados com <span class="obrigatorio" aria-hidden="true">*</span> são obrigatórios.</p>
        ${alerta('info', '<p>Seus dados são usados apenas para emitir recibos de doação e organizar a mentoria. O rascunho é salvo neste navegador enquanto você digita (sem o CPF).</p>')}
      </div>
    </section>

    <section id="form-cadastro" class="secao">
      <div class="container">
        <h2>Formulário de cadastro</h2>
        <div id="aviso-rascunho"></div>
        <div class="alerta alerta--erro" id="resumo-erros" role="alert" tabindex="-1" hidden></div>

        <form class="formulario" id="formulario-cadastro" novalidate>
          <fieldset>
            <legend>Dados pessoais</legend>
            <div class="grade">
              ${campo({ id: 'nome', rotulo: 'Nome completo', atributos: 'maxlength="100" autocomplete="name" placeholder="Seu nome completo"' })}
              ${campo({ id: 'email', rotulo: 'E-mail', tipo: 'email', colunas: 'col-sm-6', atributos: 'autocomplete="email" placeholder="voce@exemplo.com"' })}
              ${campo({ id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date', colunas: 'col-sm-6', atributos: 'autocomplete="bday"' })}
              ${campo({ id: 'telefone', rotulo: 'Telefone/WhatsApp', tipo: 'tel', colunas: 'col-sm-6', atributos: 'maxlength="15" autocomplete="tel" placeholder="(41) 99999-0000" data-mascara="telefone"' })}
              ${campo({ id: 'cpf', rotulo: 'CPF', colunas: 'col-sm-6', dica: 'Necessário para emitir o recibo de doação. Não fica salvo no rascunho.', atributos: 'inputmode="numeric" maxlength="14" autocomplete="off" placeholder="000.000.000-00" data-mascara="cpf"' })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>
            <div class="grade">
              ${campo({ id: 'cep', rotulo: 'CEP', colunas: 'col-sm-6 col-md-4', atributos: 'inputmode="numeric" maxlength="9" autocomplete="postal-code" placeholder="80000-000" data-mascara="cep"' })}
              ${campo({ id: 'endereco', rotulo: 'Rua e número', colunas: 'col-sm-6 col-md-8', atributos: 'maxlength="120" autocomplete="address-line1" placeholder="Rua das Palmeiras, 120"' })}
              ${campo({ id: 'cidade', rotulo: 'Cidade', colunas: 'col-sm-6 col-md-8', atributos: 'maxlength="80" autocomplete="address-level2"' })}
              ${campo({ id: 'estado', rotulo: 'Estado', tipo: 'select', colunas: 'col-sm-6 col-md-4', atributos: 'autocomplete="address-level1"', opcoes: estados.map((e) => ({ valor: e.sigla, texto: e.nome })) })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Tipo de participação</legend>
            <div class="grade">
              <div class="campo" data-campo="tipo-participacao">
                <div class="opcoes opcoes--linha" role="radiogroup" aria-label="Tipo de participação" aria-describedby="tipo-participacao-erro">
                  ${Object.entries(tiposParticipacao).map(([valor, rotulo], i) => opcao({ id: `tipo-${valor}`, nome: 'tipo-participacao', valor, rotulo, obrigatorio: i === 0 })).join('')}
                </div>
                <span class="campo__erro" id="tipo-participacao-erro"></span>
              </div>

              ${campo({ id: 'disponibilidade', rotulo: 'Disponibilidade semanal (horas)', tipo: 'number', colunas: 'col-md-4', dica: 'Mínimo de 1 hora; o recomendado são 2 horas.', atributos: 'min="1" max="40" step="1" placeholder="Ex.: 2"' })}
              ${campo({ id: 'mensagem', rotulo: 'Mensagem', tipo: 'textarea', colunas: 'col-md-8', obrigatorio: false, dica: `0/${LIMITE_MENSAGEM} caracteres`, atributos: `maxlength="${LIMITE_MENSAGEM}" rows="4" placeholder="Conte um pouco sobre como quer contribuir"` })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Confirmação</legend>
            <div class="campo" data-campo="termos">
              ${opcao({ id: 'termos', nome: 'termos', valor: 'sim', rotulo: 'Li e aceito os termos de uso e a política de privacidade', tipo: 'checkbox', obrigatorio: true })}
              <span class="campo__erro" id="termos-erro"></span>
            </div>
          </fieldset>

          <div class="grupo-botoes">
            <button type="submit" class="botao botao--primario">Enviar cadastro</button>
          </div>
        </form>
      </div>
    </section>

    <dialog class="modal" id="modal-sucesso" aria-labelledby="modal-titulo">
      <div class="modal__icone" aria-hidden="true">✓</div>
      <h2 id="modal-titulo">Cadastro recebido!</h2>
      <p>Obrigado por fazer parte da rede Sinal Aberto, <strong id="modal-nome"></strong>. Seu cadastro foi salvo neste navegador.</p>
      <div class="modal__acoes">
        <a class="botao botao--contorno" href="#/cadastros">Ver cadastros salvos</a>
        <button type="button" class="botao botao--primario" data-fechar>Fechar</button>
      </div>
    </dialog>`,

  // Liga os eventos depois que a view entra no DOM. O parâmetro da rota
  // (#/cadastro/doador ou #/cadastro/voluntario) já deixa a opção marcada.
  montar(raiz, tipoInicial) {
    const form = raiz.querySelector('#formulario-cadastro');
    const resumo = raiz.querySelector('#resumo-erros');
    const avisoRascunho = raiz.querySelector('#aviso-rascunho');
    const modal = raiz.querySelector('#modal-sucesso');
    const botaoEnviar = form.querySelector('[type="submit"]');
    const caixaHoras = form.querySelector('[data-campo="disponibilidade"]');
    const contador = form.querySelector('#mensagem-dica');
    const tocados = new Set();
    let timerRascunho;

    aplicarMascaras(form);

    // Disponibilidade só aparece para quem vai ser voluntário.
    const atualizarHoras = () => {
      const tipo = lerFormulario(form)['tipo-participacao'];
      caixaHoras.hidden = !precisaDeHoras(tipo);
      form.elements.disponibilidade.required = precisaDeHoras(tipo);
    };

    const atualizarContador = () => {
      contador.textContent = `${form.elements.mensagem.value.length}/${LIMITE_MENSAGEM} caracteres`;
    };

    // Rascunho: restaura ao abrir e oferece descartar.
    const rascunho = armazenamento.lerRascunho();
    if (rascunho) {
      preencherFormulario(form, rascunho.campos);
      avisoRascunho.innerHTML = alerta('info', `
        <p>Recuperamos o rascunho salvo em ${formatarData(rascunho.salvoEm)}. O CPF precisa ser digitado de novo.</p>
        <button type="button" class="botao botao--contorno" id="descartar-rascunho">Descartar rascunho</button>`);
    }
    if (tipoInicial && tiposParticipacao[tipoInicial]) {
      preencherFormulario(form, { 'tipo-participacao': tipoInicial });
    }
    atualizarHoras();
    atualizarContador();

    const salvarRascunhoComAtraso = () => {
      clearTimeout(timerRascunho);
      timerRascunho = setTimeout(() => armazenamento.salvarRascunho(lerFormulario(form)), 400);
    };

    // Delegação de eventos: um listener no form atende todos os campos.
    form.addEventListener('focusout', (e) => {
      const nome = e.target.name;
      if (!nome || e.target.type === 'radio') return;
      tocados.add(nome);
      validarEExibir(form, nome);
    });

    form.addEventListener('input', (e) => {
      const nome = e.target.name;
      if (nome === 'mensagem') atualizarContador();
      // Depois do primeiro erro, revalida a cada tecla para o feedback sumir assim que corrigir.
      if (tocados.has(nome)) validarEExibir(form, nome);
      salvarRascunhoComAtraso();
    });

    form.addEventListener('change', (e) => {
      const nome = e.target.name;
      if (nome === 'tipo-participacao') {
        atualizarHoras();
        validarEExibir(form, nome);
        if (tocados.has('disponibilidade')) validarEExibir(form, 'disponibilidade');
      }
      if (nome === 'termos' || nome === 'estado') validarEExibir(form, nome);
      salvarRascunhoComAtraso();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearTimeout(timerRascunho);
      const erros = validarTudo(form);
      Object.keys(ROTULOS).forEach((n) => tocados.add(n));
      renderizarResumo(resumo, erros, ROTULOS);

      if (erros.length) {
        resumo.focus();
        return;
      }

      botaoEnviar.disabled = true;
      botaoEnviar.setAttribute('aria-busy', 'true');
      botaoEnviar.textContent = 'Enviando...';

      // Simula a latência de um servidor antes de confirmar.
      setTimeout(() => {
        const salvo = armazenamento.adicionarCadastro(lerFormulario(form));
        armazenamento.limparRascunho();
        raiz.querySelector('#modal-nome').textContent = salvo?.nome ?? '';
        form.reset();
        limparFeedback(form);
        tocados.clear();
        avisoRascunho.innerHTML = '';
        atualizarHoras();
        atualizarContador();
        botaoEnviar.disabled = false;
        botaoEnviar.removeAttribute('aria-busy');
        botaoEnviar.textContent = 'Enviar cadastro';
        modal.showModal();
      }, 800);
    });

    raiz.addEventListener('click', (e) => {
      const irPara = e.target.closest('[data-ir-para]');
      if (irPara) {
        // O link do resumo não pode mudar o hash, senão o roteador troca de página.
        e.preventDefault();
        const alvo = form.elements[irPara.dataset.irPara];
        (alvo instanceof RadioNodeList ? alvo[0] : alvo)?.focus();
      }
      if (e.target.closest('#descartar-rascunho')) {
        armazenamento.limparRascunho();
        form.reset();
        limparFeedback(form);
        avisoRascunho.innerHTML = '';
        atualizarHoras();
        atualizarContador();
        form.elements.nome.focus();
      }
      if (e.target.closest('[data-fechar]')) modal.close();
    });

    // Ao sair da página, o timer pendente não pode gravar um rascunho antigo.
    return () => clearTimeout(timerRascunho);
  },
};
