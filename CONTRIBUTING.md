# Como contribuir

## Fluxo de branches (GitFlow)

```
main ────●─────────────────────────●──────── produção (cada merge gera deploy)
          \                       / \
develop ───●───●───────●───●─────●───●────── integração
            \     /     \     /
feature/x    ●───●       \   /
feature/y                 ●─●
```

1. Atualize a `develop`: `git checkout develop && git pull`.
2. Crie a branch: `git checkout -b feature/nome-curto` (ou `fix/...` para correções que não são urgentes).
3. Faça commits pequenos, seguindo o padrão abaixo.
4. Rode `npm test` e `npm run build` antes de enviar.
5. Abra um pull request **para `develop`** usando o modelo de PR. O CI precisa passar.
6. Depois da revisão, faça o merge com **merge commit** (`--no-ff`), para o histórico mostrar onde cada funcionalidade entrou.

### Lançando uma versão

1. `git checkout -b release/X.Y.Z develop`
2. Atualize `version` no `package.json` e mova os itens de "Não lançado" para `[X.Y.Z]` no `CHANGELOG.md`.
3. Abra um PR de `release/X.Y.Z` para `main`. Após o merge, crie a tag `vX.Y.Z` e faça o merge de volta da `main` para a `develop`.

### Correção urgente em produção

1. `git checkout -b hotfix/descricao main`
2. Corrija, abra um PR para `main` e, após o merge, leve a correção para a `develop`.

## Padrão de commits (Conventional Commits)

```
tipo(escopo opcional): descrição no imperativo, em minúsculas

Corpo opcional explicando o porquê da mudança.
```

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade para o usuário |
| `fix` | Correção de bug (`fix(a11y)` para acessibilidade) |
| `perf` | Melhoria de desempenho |
| `refactor` | Mudança de código sem alterar comportamento |
| `test` | Testes novos ou ajustados |
| `docs` | Somente documentação |
| `build` | Sistema de build e dependências |
| `ci` | Configuração de integração contínua |
| `chore` | Tarefas de manutenção que não entram nos tipos acima |

Exemplos reais do projeto:

```
fix(a11y): permite fechar o submenu com Esc (WCAG 1.4.13)
perf: reserva a altura do conteúdo para eliminar o deslocamento do rodapé (CLS)
build: adiciona build de produção com esbuild, sharp e SVGO
```

## Checklist antes de abrir o PR

- [ ] `npm test` passando
- [ ] `npm run build` sem erros
- [ ] Testado em 320px e em desktop
- [ ] Navegável só pelo teclado, com foco visível
- [ ] Cores novas com contraste medido (texto ≥ 4,5:1, componentes ≥ 3:1)
- [ ] Textos vindos do usuário passam por `escapar()` ou `textContent`
