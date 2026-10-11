// Conteúdo da ONG separado da marcação: as views só percorrem estes dados
// com os templates. Para incluir um projeto, basta acrescentar um objeto.

export const desafios = [
  { titulo: 'Acesso material', texto: 'Conexão intermitente, aparelho de entrada e franquia de dados limitada.' },
  { titulo: 'Habilidades digitais', texto: 'Domínio do consumo de conteúdo, mas pouca prática de produção e raciocínio computacional.' },
  { titulo: 'Retorno econômico', texto: 'Mesmo acesso, benefícios muito diferentes conforme o capital cultural e a rede de apoio do jovem.' },
];

export const solucoes = [
  { titulo: 'Conteúdo empacotado', texto: 'Módulos de texto e código baixados de uma vez, com peso declarado antes do download.' },
  { titulo: 'Execução local', texto: 'O código roda e é corrigido no próprio celular, sem depender de servidor.' },
  { titulo: 'Mediação assíncrona', texto: 'Dúvidas enfileiradas offline e respondidas por mentores voluntários quando há rede.' },
];

export const impactos = [
  { numero: '30%', texto: 'Meta de conclusão da trilha entre jovens de franquia limitada' },
  { numero: '50 MB', texto: 'Consumo médio de dados por aluno ao mês' },
  { numero: '90%', texto: 'Dos concluintes com portfólio público verificável' },
];

export const projetos = [
  {
    id: 'pontos-sinal',
    titulo: 'Pontos Sinal',
    etiqueta: { texto: 'Em expansão', tipo: 'sucesso' },
    resumo: 'Rede de equipamentos públicos — escolas, bibliotecas e CRAS — transformados em locais de carga, onde o jovem baixa semanas de conteúdo em minutos de Wi-Fi e estuda offline em casa.',
    comoFunciona: 'Parceria com instituições locais que cedem o espaço e o Wi-Fi; o aplicativo detecta a rede e baixa os módulos automaticamente.',
    impacto: 'Ampliar o alcance geográfico sem depender de conexão residencial estável.',
  },
  {
    id: 'mentoria-voluntaria',
    titulo: 'Mentoria Voluntária',
    etiqueta: { texto: 'Remoto', tipo: '' },
    resumo: 'Rede de desenvolvedores voluntários que respondem dúvidas de forma assíncrona, sem exigir conexão simultânea entre aluno e mentor.',
    comoFunciona: 'O aluno grava a dúvida offline; ela sobe na próxima conexão e a resposta desce no ciclo seguinte de sincronização.',
    impacto: 'Reduzir a evasão nas primeiras semanas, hoje o principal ponto de abandono da trilha.',
  },
  {
    id: 'trilha-offline',
    titulo: 'Trilha de Programação Offline',
    etiqueta: { texto: 'Piloto', tipo: 'destaque' },
    resumo: 'Conteúdo em texto e código, com vídeo apenas como complemento opcional, executado inteiramente no próprio celular.',
    comoFunciona: 'Módulos de poucos megabytes, testes automáticos de correção e retomada exata no ponto de parada.',
    impacto: 'Portfólio público verificável ao final, convertendo estudo em evidência de empregabilidade.',
  },
];

export const metaDoacao = { rotulo: 'Meta do semestre: novo Ponto Sinal', percentual: 62 };

export const perguntasFrequentes = [
  { pergunta: 'Recebo comprovante da doação?', resposta: 'Sim, todo doador recebe recibo por e-mail e relatório semestral de impacto.' },
  { pergunta: 'Preciso saber programar para ser voluntário?', resposta: 'Apenas para a mentoria técnica. Para apoio institucional, não é necessário.' },
  { pergunta: 'Onde ficam os dados do meu cadastro?', resposta: 'Nesta versão de demonstração, apenas no seu navegador (localStorage). Nada é enviado a servidores.' },
];

export const estados = [
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'outros', nome: 'Outro estado' },
];

export const tiposParticipacao = {
  doador: 'Quero doar',
  voluntario: 'Quero ser voluntário',
  ambos: 'Quero doar e ser voluntário',
};
