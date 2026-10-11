# Sinal Aberto — Plataforma web para ONG

Projeto das Experiências Práticas I (estrutura HTML), II (estilização CSS3) e III (interatividade com JavaScript) da disciplina de Desenvolvimento Front-end (Engenharia de Software — Positivo).

O Sinal Aberto é uma ONG fictícia que oferece uma trilha de qualificação em tecnologia offline-first para jovens de periferia com acesso limitado a dados móveis.

**Site:** https://windembergn.github.io/sinal-aberto-ong/

## Como rodar

A aplicação usa módulos ES (`<script type="module">`), que o navegador não carrega por `file://`. Sirva a pasta por HTTP:

```bash
npx serve .            # ou: python -m http.server
# abra http://localhost:3000/html/index.html
```

Testes automatizados (Node 20+):

```bash
npm test
```

## Rotas da SPA

| Rota | Tela |
|---|---|
| `#/inicio` | Apresentação institucional, desafio, solução, impacto e contato |
| `#/projetos` | Frentes de atuação, como doar, como ser voluntário e perguntas frequentes (`#/projetos/como-doar` rola até a seção) |
| `#/cadastro` | Formulário de doadores e voluntários (`#/cadastro/doador` e `#/cadastro/voluntario` já marcam a opção) |
| `#/cadastros` | Cadastros salvos no localStorage, com exclusão confirmada |

`html/projetos.html` e `html/cadastro.html` redirecionam para as rotas novas, para não quebrar links antigos.

## Estrutura de pastas

```
├── html/          index.html (casca da SPA) e redirecionamentos das páginas antigas
├── css/           style.css (design system, grid, componentes e feedback)
├── img/           imagem institucional em SVG, WebP e PNG
├── js/
│   ├── main.js    ponto de entrada: registra as rotas e inicia menu e roteador
│   ├── modules/   uma área de funcionalidade por arquivo
│   │   ├── roteador.js       navegação por hash, título, foco e anúncio de rota
│   │   ├── templates.js      componentes reutilizáveis (cartões, campos, alertas) e escape de HTML
│   │   ├── dados.js          conteúdo da ONG (projetos, FAQ, impacto)
│   │   ├── validacao.js      regras puras de validação (CPF, idade, regras cruzadas)
│   │   ├── formulario.js     liga as regras ao DOM: feedback por campo e resumo de erros
│   │   ├── armazenamento.js  localStorage: rascunho e cadastros
│   │   ├── mascaras.js       máscaras de CPF, telefone e CEP
│   │   ├── menu.js           menu hambúrguer e marcação da rota atual
│   │   └── grafico.js        integração com Chart.js (carregada sob demanda)
│   ├── views/     uma tela por arquivo (inicio, projetos, cadastro, cadastros, não encontrada)
│   └── tests/     testes de validação, armazenamento e templates (node:test)
└── package.json   script de testes
```

## Destaques técnicos — Experiência Prática III (JavaScript)

- SPA com roteamento por hash, compatível com hospedagem estática (GitHub Pages)
- Templates em template literals gerados a partir de dados; todo conteúdo dinâmico passa por `escapar()` contra XSS
- Acessibilidade na troca de rota: `document.title` atualizado, foco no `h1`, anúncio em `aria-live` e `aria-current` no menu
- Validação de consistência: dígitos verificadores do CPF, idade mínima de 16 anos, celular com 9, horas obrigatórias só para voluntário
- Feedback por campo (`aria-invalid` + mensagem) ao sair do campo, correção ao vivo e resumo de erros com links
- localStorage: rascunho automático (sem CPF) e lista de cadastros com CPF mascarado; tolera navegador sem armazenamento
- Integração com a biblioteca Chart.js (gráfico de cadastros por tipo), carregada sob demanda com `import()` dinâmico e com resumo em texto como alternativa
- 18 testes automatizados com `node:test`

## Destaques técnicos — Experiência Prática II (CSS3)

- Design system em variáveis CSS: 16 cores com contraste medido (WCAG AA), 5 níveis tipográficos em escala 1,25 e espaçamentos modulares de base 8px
- Grid de 12 colunas mobile-first com 5 breakpoints (576, 768, 1024, 1280 e 1440px) e macro layout com grid-template-areas
- Flexbox nos componentes internos: cabeçalho, menu, cartões, botões, opções do formulário e rodapé
- Menu responsivo: submenu por hover/foco no desktop e botão hambúrguer com aria-expanded no celular
- Cartões com etiquetas, estados de botão (hover, active, focus-visible, disabled), modal com `<dialog>` e `prefers-reduced-motion`

## Destaques técnicos — Experiência Prática I (HTML)

- HTML5 semântico: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` e `address`
- Hierarquia de títulos com um único `h1` por página, sem pular níveis
- Formulário com `fieldset`/`legend` e tipos de input HTML5
- Imagem com `<picture>` em três formatos e texto alternativo descritivo
- HTML validado no [W3C Nu Html Checker](https://validator.w3.org/nu/) sem erros nem avisos, inclusive o HTML gerado pelo JavaScript em cada rota

Autor: Windemberg Novais
