export const naoEncontrada = {
  titulo: 'Página não encontrada',

  render: () => `
    <section class="secao">
      <div class="container">
        <h1>Página não encontrada</h1>
        <p>O endereço acessado não corresponde a nenhuma página do Sinal Aberto.</p>
        <div class="grupo-botoes">
          <a class="botao botao--primario" href="#/inicio">Voltar ao início</a>
        </div>
      </div>
    </section>`,
};
