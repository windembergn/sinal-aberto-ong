# Sinal Aberto — Plataforma web para ONG

[![CI](https://github.com/windembergn/sinal-aberto-ong/actions/workflows/ci.yml/badge.svg)](https://github.com/windembergn/sinal-aberto-ong/actions/workflows/ci.yml)
[![Deploy](https://github.com/windembergn/sinal-aberto-ong/actions/workflows/deploy.yml/badge.svg)](https://github.com/windembergn/sinal-aberto-ong/actions/workflows/deploy.yml)

Aplicação de página única (SPA) da ONG fictícia **Sinal Aberto**, que oferece uma trilha de qualificação em tecnologia offline-first para jovens de periferia com acesso limitado a dados móveis. A plataforma apresenta a organização e os projetos sociais e cadastra doadores e voluntários.

**Produção:** https://windembergn.github.io/sinal-aberto-ong/

Projeto das Experiências Práticas I a IV da disciplina de Desenvolvimento Front-end (Engenharia de Software — Positivo).

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Testes e qualidade](#testes-e-qualidade)
- [Acessibilidade](#acessibilidade)
- [Build e deploy](#build-e-deploy)
- [Manutenção](#manutenção)
- [Fluxo de trabalho (GitFlow)](#fluxo-de-trabalho-gitflow)
- [Histórico do projeto](#histórico-do-projeto)

## Funcionalidades

| Rota | Tela |
|---|---|
| `#/inicio` | Apresentação institucional, desafio, solução, impacto e contato |
| `#/projetos` | Frentes de atuação, como doar, como ser voluntário e perguntas frequentes. `#/projetos/como-doar` rola até a seção |
| `#/cadastro` | Formulário de doadores e voluntários com validação em tempo real e rascunho automático. `#/cadastro/doador` e `#/cadastro/voluntario` já marcam a opção |
| `#/cadastros` | Cadastros salvos no navegador, gráfico por tipo de participação e exclusão com confirmação |

- Navegação sem recarregar a página, com histórico do navegador funcionando (voltar/avançar).
- Validação de consistência: dígitos verificadores do CPF, idade mínima de 16 anos, celular com 9 e horas semanais obrigatórias só para voluntários.
- Dados persistidos no `localStorage`; o CPF nunca é salvo no rascunho e fica mascarado nos cadastros.
- Layout responsivo de 320px a monitores panorâmicos, com menu hambúrguer no celular.
- Modos de cor **Automático**, **Claro**, **Escuro** e **Alto contraste**, escolhidos no menu e lembrados entre visitas.

## Tecnologias

- **HTML5 semântico**, **CSS3** (variáveis, Grid, Flexbox) e **JavaScript** (módulos ES), sem framework.
- **Chart.js 4.4.1**, carregado sob demanda pelo CDN jsDelivr.
- **esbuild**, **sharp** e **SVGO** no build de produção.
- **node:test** para testes automatizados.
- **GitHub Actions** e **GitHub Pages** para integração e deploy contínuos.

## Instalação

Pré-requisitos: [Node.js](https://nodejs.org/) 20 ou superior e Git.

```bash
git clone https://github.com/windembergn/sinal-aberto-ong.git
cd sinal-aberto-ong
npm install
```

O `npm install` instala apenas as ferramentas de build (`devDependencies`); o site em si não tem dependências de execução.

## Utilização

### Desenvolvimento

O código-fonte usa módulos ES (`<script type="module">`), que o navegador só carrega por HTTP. Sirva a pasta raiz:

```bash
npx serve .
# abra http://localhost:3000/html/index.html
```

As alterações em `html/`, `css/` e `js/` aparecem ao recarregar a página, sem precisar de build.

### Versão de produção

```bash
npm run build     # gera dist/
npm run preview   # serve dist/ em http://localhost:3000
```

A versão em `dist/` também pode ser aberta com dois cliques em `dist/html/index.html`, porque o build transforma os módulos em um único script comum.

### Scripts

| Comando | O que faz |
|---|---|
| `npm test` | Roda os 21 testes automatizados |
| `npm run build` | Gera a versão otimizada em `dist/` e imprime o relatório de tamanhos |
| `npm run preview` | Serve `dist/` localmente |

## Estrutura do projeto

```
├── .github/
│   ├── workflows/ci.yml       testes e build em todo push/PR para develop e main
│   ├── workflows/deploy.yml   build e publicação no GitHub Pages a cada push na main
│   └── pull_request_template.md
├── html/
│   ├── index.html             casca da SPA (cabeçalho, <main id="app">, rodapé)
│   └── projetos.html, cadastro.html   redirecionam para as rotas novas
├── css/style.css              design system, grid de 12 colunas, componentes e estados
├── img/                       imagem institucional (SVG, WebP, PNG) e favicon
├── js/
│   ├── main.js                ponto de entrada: registra rotas e inicia menu e roteador
│   ├── modules/               uma área de funcionalidade por arquivo
│   │   ├── roteador.js        navegação por hash, título, foco e anúncio de rota
│   │   ├── templates.js       componentes reutilizáveis e escape de HTML (anti-XSS)
│   │   ├── dados.js           conteúdo da ONG (projetos, FAQ, impacto)
│   │   ├── validacao.js       regras puras de validação
│   │   ├── formulario.js      liga as regras ao DOM (feedback e resumo de erros)
│   │   ├── armazenamento.js   localStorage: rascunho e cadastros
│   │   ├── grafico.js         integração com Chart.js
│   │   ├── mascaras.js        máscaras de CPF, telefone e CEP
│   │   ├── menu.js            menu hambúrguer, submenu e rota atual
│   │   └── tema.js            modos de cor (automático, claro, escuro, alto contraste)
│   ├── views/                 uma tela por arquivo: { titulo, render(), montar() }
│   └── tests/                 testes de validação, armazenamento, templates, gráfico e contraste
├── scripts/build.mjs          build de produção
├── CHANGELOG.md               histórico de versões
└── CONTRIBUTING.md            GitFlow, padrão de commits e checklist de PR
```

## Testes e qualidade

```bash
npm test
```

21 testes com `node:test` cobrem as partes sem DOM: validação (CPF real e falso, idade no limite, regra cruzada das horas), armazenamento com um `localStorage` falso (incluindo armazenamento bloqueado), escape de HTML nos templates, contagem do gráfico e o **contraste WCAG AA das cores dos três temas**, lidas direto do `style.css`.

Verificações feitas na versão 1.0.0:

- **Lighthouse (mobile):** 100 em desempenho, acessibilidade, boas práticas e SEO nas rotas início, projetos e cadastro; 99 em desempenho em cadastros (Chart.js). CLS 0.
- **W3C:** HTML estático e HTML gerado pelo JavaScript em cada rota sem erros nem avisos no Nu Html Checker; CSS sem erros no CSS Validator.
- **npm audit:** 0 vulnerabilidades.

## Acessibilidade

Meta: **WCAG 2.1 nível AA**.

- **axe-core 4.10:** 0 violações em 8 estados (todas as rotas, formulário com erros, modal de sucesso e menu mobile aberto).
- **Teclado:** todo o site funciona com Tab, Shift+Tab, Enter e Esc; link "Pular para o conteúdo"; foco sempre visível; Esc fecha o submenu e o menu mobile.
- **Leitores de tela:** a cada troca de rota, o título da página muda, o foco vai para o `h1` e uma região `aria-live` anuncia a página; erros ligados aos campos por `aria-describedby` e `aria-invalid`; mensagens de status com `role="status"`.
- **Visual:** contraste medido de todas as cores (texto ≥ 4,5:1, componentes ≥ 3:1); erros com ícone e texto, não só cor; sem rolagem horizontal em 320px; respeito a `prefers-reduced-motion`.
- **Modos de cor:** o seletor "Tema" alterna entre Automático (segue `prefers-color-scheme` e `prefers-contrast` do sistema), Claro, Escuro e Alto contraste. Os temas só redefinem as variáveis do design system; os 22 pares de cores de cada tema são verificados por teste automatizado. No modo de cores forçadas do Windows (`forced-colors`), barras e etiquetas ganham borda.

## Build e deploy

O build (`scripts/build.mjs`) gera `dist/`:

| Recurso | Antes | Depois |
|---|---|---|
| JavaScript (15 módulos → `js/app.js`) | 53,2 KB | 34,6 KB |
| CSS | 25,6 KB | 16,7 KB |
| PNG | 20,0 KB | 6,8 KB |
| SVG | 5,3 KB | 4,2 KB |

O deploy é contínuo: todo merge na `main` dispara o workflow `deploy.yml`, que instala as dependências, roda os testes, gera o build e publica `dist/` no GitHub Pages. Se um teste falhar, nada é publicado.

## Manutenção

- **Alterar textos da ONG** (projetos, FAQ, números de impacto): edite `js/modules/dados.js`. As telas são geradas a partir desses dados.
- **Nova tela:** crie `js/views/minha-tela.js` exportando `{ titulo, render(), montar() }` e registre a rota em `js/main.js`.
- **Nova regra de validação:** adicione uma função em `regras` (`js/modules/validacao.js`) e um teste em `js/tests/validacao.test.js`.
- **Cores, tipografia e espaçamentos:** altere as variáveis do `:root` em `css/style.css` e confira o contraste de qualquer cor nova (mínimo 4,5:1 para texto).
- **Dependências:** rode `npm audit` periodicamente e mantenha as versões fixadas no `package.json`.
- **Limpar dados de teste no navegador:** DevTools → Application → Local Storage → chaves `sinal-aberto:*`.

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
|---|---|
| `main` | Produção. Só recebe merges de `release/*` e `hotfix/*`; cada merge gera deploy |
| `develop` | Integração das funcionalidades prontas |
| `feature/*` | Uma funcionalidade por branch, criada a partir de `develop` |
| `release/*` | Preparação de versão (número, CHANGELOG), de `develop` para `main` |
| `hotfix/*` | Correção urgente em produção, a partir da `main` |

Commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/). Detalhes em [CONTRIBUTING.md](CONTRIBUTING.md).

## Histórico do projeto

| Versão | Experiência prática | Entrega |
|---|---|---|
| 0.1.0 | I — HTML | Estrutura semântica, formulário com validação nativa e imagem em três formatos |
| 0.2.0 | II — CSS3 | Design system, grid de 12 colunas, Flexbox, menu responsivo e componentes de feedback |
| 0.3.0 | III — JavaScript | SPA, templates, validação de consistência, localStorage, Chart.js e testes |
| 1.0.0 | IV — Produção | GitFlow, acessibilidade WCAG 2.1 AA, build otimizado e deploy contínuo |
| 1.1.0 | IV — Produção | Modos escuro e alto contraste, teste automatizado de contraste |

Veja o [CHANGELOG](CHANGELOG.md) para o detalhamento de cada versão.

---

Autor: Windemberg Novais
