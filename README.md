# Sinal Aberto — Plataforma web para ONG

Projeto da Experiência Prática I da disciplina de Desenvolvimento Front-end (Engenharia de Software — Positivo).

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
├── js/     mascaras.js (máscaras de CPF, telefone e CEP)
└── img/    imagem em SVG, WebP e PNG
```

## Destaques técnicos

- HTML5 semântico: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` e `address`
- Hierarquia de títulos com um único `h1` por página, sem pular níveis
- Formulário com `fieldset`/`legend`, tipos de input HTML5 e validação nativa (`required`, `pattern`, `min`/`max`, `minlength`/`maxlength`)
- Máscaras de CPF, telefone e CEP aplicadas durante a digitação
- Imagem com `<picture>` em três formatos e texto alternativo descritivo
- As três páginas validadas no [W3C Nu Html Checker](https://validator.w3.org/nu/) sem erros nem avisos

Autor: Windemberg Novais
