# Sinal Aberto — Plataforma web para ONG

Projeto das Experiências Práticas I (estrutura HTML) e II (estilização CSS3) da disciplina de Desenvolvimento Front-end (Engenharia de Software — Positivo).

O Sinal Aberto é uma ONG fictícia que oferece uma trilha de qualificação em tecnologia offline-first para jovens de periferia com acesso limitado a dados móveis.

**Site:** https://windembergn.github.io/sinal-aberto-ong/

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `html/index.html` | Página inicial: apresentação institucional, desafio, solução, impacto e contato |
| `html/projetos.html` | Frentes de atuação, como doar, como ser voluntário e perguntas frequentes |
| `html/cadastro.html` | Formulário de cadastro de doadores e voluntários |

## Estrutura de pastas

```
├── html/   páginas HTML
├── css/    style.css
├── js/     mascaras.js (máscaras), menu.js (menu mobile), cadastro.js (feedback do formulário)
└── img/    imagem em SVG, WebP e PNG
```

## Destaques técnicos — Experiência Prática II (CSS3)

- Design system em variáveis CSS: 16 cores com contraste medido (WCAG AA), 5 níveis tipográficos em escala 1,25 e espaçamentos modulares de base 8px
- Grid de 12 colunas mobile-first com breakpoints em 768px e 1024px
- Flexbox nos componentes internos: cabeçalho, menu, cartões, botões, opções do formulário e rodapé
- Menu responsivo: submenu por hover/foco no desktop e botão hambúrguer com aria-expanded no celular
- Cartões com etiquetas, hover e botão alinhado ao rodapé
- Feedback de formulário com :user-invalid/:user-valid, mensagens de erro com ícone, resumo de erros, estado de carregamento e modal de confirmação com <dialog>
- Respeito a prefers-reduced-motion, link "Pular para o conteúdo" e alvos de toque de 44px
- CSS validado no W3C CSS Validator sem erros

## Destaques técnicos — Experiência Prática I (HTML)

- HTML5 semântico: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` e `address`
- Hierarquia de títulos com um único `h1` por página, sem pular níveis
- Formulário com `fieldset`/`legend`, tipos de input HTML5 e validação nativa (`required`, `pattern`, `min`/`max`, `minlength`/`maxlength`)
- Máscaras de CPF, telefone e CEP aplicadas durante a digitação
- Imagem com `<picture>` em três formatos e texto alternativo descritivo
- As três páginas validadas no [W3C Nu Html Checker](https://validator.w3.org/nu/) sem erros nem avisos

Autor: Windemberg Novais
