# Changelog

Todas as mudanças relevantes do projeto. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado
- Modos de cor Automático, Claro, Escuro e Alto contraste, com seletor no menu e escolha salva.
- Teste automatizado de contraste WCAG AA para as cores dos três temas.

## [1.0.0] — 2026-10-11 — Experiência Prática IV

### Adicionado
- Build de produção com esbuild (bundle único minificado, com sourcemap), sharp e SVGO.
- Workflows de CI (testes e build em PRs) e de deploy contínuo no GitHub Pages.
- README com instalação, utilização e manutenção; CONTRIBUTING com GitFlow e padrão de commits; modelo de pull request; favicon.

### Corrigido
- Submenu agora pode ser fechado com Esc (WCAG 1.4.13).
- Links do submenu sempre alcançáveis por Tab (WCAG 2.1.1).
- Rolagem horizontal em 320px no cadastro (WCAG 1.4.10).
- Barra do gráfico com contraste de 2,01:1, agora 5,93:1 (WCAG 1.4.11).
- Rascunho recuperado e contagem de cadastros agora anunciados a leitores de tela (WCAG 4.1.3).
- Deslocamento do rodapé ao carregar a SPA (CLS de 0,559 para 0).
- Site não abria direto do disco (`file://`); a versão de `dist/` abre com dois cliques.

## [0.3.0] — Experiência Prática III

### Adicionado
- SPA com roteamento por hash, templates em JavaScript e tela de cadastros salvos.
- Validação de consistência (CPF, idade, telefone, regra cruzada de horas) com feedback por campo e resumo de erros.
- Rascunho automático e cadastros no localStorage; gráfico com Chart.js carregado sob demanda.
- 18 testes automatizados com node:test.

## [0.2.0] — Experiência Prática II

### Adicionado
- Design system em variáveis CSS, grid de 12 colunas com 5 breakpoints e componentes com Flexbox.
- Menu responsivo com submenu e hambúrguer, cartões, estados de botão, alertas e modal.

## [0.1.0] — Experiência Prática I

### Adicionado
- Páginas início, projetos e cadastro em HTML5 semântico.
- Formulário com validação nativa e máscaras; imagem em SVG, WebP e PNG.
