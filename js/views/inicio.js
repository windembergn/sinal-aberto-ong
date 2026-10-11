import { desafios, solucoes, impactos } from '../modules/dados.js';
import { cartaoSimples, cartaoNumero } from '../modules/templates.js';

export const inicio = {
  titulo: 'Tecnologia offline-first para jovens da periferia',

  render: () => `
    <section id="hero" class="hero secao">
      <div class="container grade hero__conteudo">
        <div class="col-lg-7 col-xl-8">
          <h1>Tecnologia offline-first para jovens da periferia</h1>
          <p class="hero__texto">O Sinal Aberto é uma trilha de qualificação em programação que funciona sem depender de internet contínua, franquia de dados alta ou computador — porque a exclusão digital não é falta de vontade, é falta de projeto pensado para a realidade de quem tem pouco.</p>
          <div class="grupo-botoes">
            <a class="botao botao--secundario" href="#/cadastro">Quero ajudar</a>
          </div>
        </div>
        <div class="col-lg-5 col-xl-4">
          <div class="hero__destaque">
            <p><strong>Até 50 MB por mês</strong> é o consumo médio de dados de cada aluno.</p>
            <p><strong>Sem computador:</strong> o código roda e é corrigido no próprio celular.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="sobre" class="secao">
      <div class="container grade">
        <div class="col-lg-6 col-xl-5">
          <picture>
            <source srcset="../img/equipe-sinal-aberto.svg" type="image/svg+xml">
            <source srcset="../img/equipe-sinal-aberto.webp" type="image/webp">
            <img src="../img/equipe-sinal-aberto.png"
              alt="Três mentores voluntários do Sinal Aberto sorrindo ao lado de um notebook, durante atendimento em um Ponto Sinal instalado numa biblioteca comunitária"
              width="800" height="500" loading="lazy">
          </picture>
        </div>
        <div class="col-lg-6 col-xl-7">
          <h2>Quem somos</h2>
          <p>Somos uma associação sem fins lucrativos que desenvolve tecnologia social para jovens de 16 a 24 anos das classes C, D e E, moradores de periferias urbanas e municípios de pequeno porte, sem computador próprio e com acesso à internet apenas pelo celular.</p>
        </div>
      </div>
    </section>

    <section id="desafio" class="secao secao--alt">
      <div class="container">
        <h2>O desafio que enfrentamos</h2>
        <p class="secao__intro">A desigualdade digital no Brasil não é mais ausência de conexão: é conectividade sem autonomia. Atuamos sobre três camadas do problema.</p>
        <div class="grade">${desafios.map((d) => cartaoSimples(d)).join('')}</div>
      </div>
    </section>

    <section id="solucao" class="secao">
      <div class="container">
        <h2>Como funciona o Sinal Aberto</h2>
        <p class="secao__intro">Um aplicativo leve, offline-first, com camadas que garantem estudo mesmo sem sinal.</p>
        <div class="grade">${solucoes.map((s) => cartaoSimples(s)).join('')}</div>
      </div>
    </section>

    <section id="impacto" class="secao secao--alt">
      <div class="container">
        <h2>Nosso impacto em números</h2>
        <ul class="grade lista-limpa">${impactos.map(cartaoNumero).join('')}</ul>
      </div>
    </section>

    <section id="participe" class="secao">
      <div class="container grade">
        <div class="col-lg-8">
          <h2>Como você pode ajudar</h2>
          <p>Doadores financiam Pontos Sinal e bolsas de mentoria. Voluntários atuam como mentores assíncronos. Cadastre-se e faça parte dessa rede.</p>
        </div>
        <div class="col-lg-4">
          <div class="grupo-botoes">
            <a class="botao botao--primario" href="#/cadastro">Fazer cadastro</a>
            <a class="botao botao--contorno" href="#/projetos">Ver projetos</a>
          </div>
        </div>
      </div>
    </section>

    <section id="contato" class="secao secao--alt">
      <div class="container">
        <h2>Fale com a gente</h2>
        <address class="grade">
          <p class="col-sm-6 col-md-4"><strong>E-mail</strong><br><a href="mailto:contato@sinalaberto.org.br">contato@sinalaberto.org.br</a></p>
          <p class="col-sm-6 col-md-4"><strong>Telefone/WhatsApp</strong><br><a href="tel:+5541999990000">(41) 99999-0000</a></p>
          <p class="col-sm-6 col-md-4"><strong>Endereço</strong><br>Rua das Palmeiras, 120 — Curitiba, PR</p>
        </address>
      </div>
    </section>`,
};
