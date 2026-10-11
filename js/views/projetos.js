import { projetos as listaProjetos, metaDoacao, perguntasFrequentes } from '../modules/dados.js';
import { cartaoProjeto, barraProgresso, escapar } from '../modules/templates.js';

export const projetos = {
  titulo: 'Projetos Sociais',

  render: () => `
    <section id="intro-projetos" class="secao secao--alt">
      <div class="container">
        <h1>Projetos Sociais</h1>
        <p class="secao__intro">Conheça as três frentes de atuação do Sinal Aberto no território, todas conectadas ao mesmo objetivo: transformar restrição material em requisito de projeto, nunca em critério de exclusão.</p>
        <nav class="sumario" aria-label="Sumário desta página">
          <ul>
            <li><a href="#/projetos/frentes">Frentes de atuação</a></li>
            <li><a href="#/projetos/como-doar">Como doar</a></li>
            <li><a href="#/projetos/como-ser-voluntario">Como ser voluntário</a></li>
            <li><a href="#/projetos/perguntas-frequentes">Perguntas frequentes</a></li>
          </ul>
        </nav>
      </div>
    </section>

    <div id="frentes" class="secao">
      <div class="container grade">${listaProjetos.map(cartaoProjeto).join('')}</div>
    </div>

    <div class="secao secao--alt">
      <div class="container grade">
        <section id="como-doar" class="cartao col-lg-6">
          <h2 class="cartao__titulo">Como Doar</h2>
          <p>Sua contribuição financeira mantém os Pontos Sinal ativos e paga bolsas para mentores voluntários. Escolha a modalidade que faz mais sentido para você.</p>
          <h3>Doação única</h3>
          <p>Contribuição pontual via Pix ou cartão, direcionada à manutenção de um Ponto Sinal por até 3 meses.</p>
          <h3>Doação recorrente</h3>
          <p>Apoio mensal recorrente, que garante previsibilidade orçamentária e é a forma mais eficiente de sustentar a operação.</p>
          <ul class="lista-check">
            <li>Pix: sustentar@sinalaberto.org.br</li>
            <li>Cartão de crédito recorrente (via checkout seguro)</li>
            <li>Doação corporativa com nota fiscal e relatório de impacto</li>
          </ul>
          ${barraProgresso(metaDoacao, 'meta')}
          <div class="cartao__acao">
            <a class="botao botao--primario" href="#/cadastro/doador">Quero doar</a>
          </div>
        </section>

        <section id="como-ser-voluntario" class="cartao col-lg-6">
          <h2 class="cartao__titulo">Como Ser Voluntário</h2>
          <p>Voluntários movem a mediação humana do projeto, atuando de forma assíncrona, sem exigir disponibilidade simultânea com o aluno.</p>
          <h3>Mentoria técnica</h3>
          <p>Desenvolvedores respondem dúvidas de programação enviadas offline pelos alunos, dentro do próprio aplicativo.</p>
          <h3>Apoio institucional</h3>
          <p>Profissionais de outras áreas ajudam na articulação com escolas, bibliotecas e CRAS para expandir a rede de Pontos Sinal.</p>
          <ul class="lista-check">
            <li>Disponibilidade mínima: 2 horas semanais, em qualquer horário</li>
            <li>Não é necessário deslocamento presencial</li>
            <li>Treinamento inicial obrigatório, oferecido pela organização</li>
          </ul>
          <div class="cartao__acao">
            <a class="botao botao--contorno" href="#/cadastro/voluntario">Quero ser voluntário</a>
          </div>
        </section>
      </div>
    </div>

    <div class="secao">
      <div class="container grade">
        <section id="perguntas-frequentes" class="col-lg-7 col-xl-8">
          <h2>Perguntas Frequentes</h2>
          <dl class="faq">
            ${perguntasFrequentes.map((f) => `
              <div class="faq__item">
                <dt>${escapar(f.pergunta)}</dt>
                <dd>${escapar(f.resposta)}</dd>
              </div>`).join('')}
          </dl>
        </section>

        <aside id="depoimentos" class="depoimento col-lg-5 col-xl-4">
          <h2>O que dizem sobre o projeto</h2>
          <blockquote>
            <p>"Consegui estudar programação no ônibus, sem gastar meus dados do mês." — participante da coorte piloto</p>
          </blockquote>
        </aside>
      </div>
    </div>`,
};
