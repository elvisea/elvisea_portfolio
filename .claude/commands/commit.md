# Commit Inteligente

Cria commits seguindo boas práticas de Git, agrupando arquivos relacionados
por funcionalidade e usando Conventional Commits.

## Boas Práticas

✅ **Commits por grupo de arquivos relacionados** (recomendado)

- Um commit = uma mudança completa e funcional
- Facilita revisão, rollback e entendimento do histórico

❌ **Evitar commits por arquivo individual**

- Fragmenta o histórico e dificulta entender o contexto completo

## Convenção (Conventional Commits)

Formato: `tipo(escopo opcional): descrição`

| Tipo       | Uso                                     |
| ---------- | --------------------------------------- |
| `feat`     | Nova funcionalidade                     |
| `fix`      | Correção de bug                         |
| `chore`    | Manutenção, dependências, configuração  |
| `docs`     | Documentação                            |
| `style`    | Formatação sem mudança de lógica        |
| `refactor` | Refatoração sem nova feature ou bug fix |
| `test`     | Adição ou correção de testes            |
| `perf`     | Melhorias de performance                |

**Escopo** é opcional e indica o módulo/área afetada:
`feat(ui): adiciona animação no hero`

**Corpo** — use quando a mudança não é óbvia pelo título:

```
fix(contact): corrige validação do telefone opcional

O schema Zod rejeitava string vazia; alinhado com o formulário.
```

## Contexto do Projeto

Este é o portfólio **Next.js** ([elvisea/elvisea_portfolio](https://github.com/elvisea/elvisea_portfolio)). Áreas principais:

- `src/app/` — App Router (páginas, layouts, `components/` específicos da app)
- `src/app/actions/` — Server Actions (ver `src/app/actions/README.md`)
- `src/components/` — componentes partilhados e `ui/` (shadcn)
- `src/lib/` — utilitários, env (`lib/env`), validação, email, etc.
- `public/` — assets estáticos e `locales/` (i18n)
- `.github/` — CI/CD
- `.cursor/`, `.claude/` — comandos e configuração de agentes

**Scripts** (ver `package.json`): `npm run …` ou `bun run …` — ambos válidos (`lint`, `test:run`, `build`, `format`, etc.).

**Escopos comuns neste repo:**

- `actions`, `contact`, `github`, `ui`, `i18n`, `metadata`, `projects`, `experiences`, `ci`, `deploy`, `config`, `env`, `hooks`

## Workflow

1. **Analisar mudanças** — executar `git status` e `git diff` para entender o que mudou
2. **Agrupar por contexto** — arquivos do mesmo módulo/feature formam um grupo
3. **Propor grupos e mensagens** — apresentar os grupos ao usuário com mensagens sugeridas
4. **Aguardar confirmação** — só commitar após aprovação explícita
5. **Executar commits** — `git add [arquivos]` + `git commit -m "..."`

## Regras de Agrupamento

- Arquivos no mesmo módulo/diretório → mesmo commit
- Testes relacionados → mesmo commit que o código testado
- Arquivos de configuração → commit separado (`chore`)
- Mudanças de dependências / lockfile → commit separado (`chore`)
- Arquivos `.cursor/` ou `.claude/` → commit separado (`chore(cursor)` ou `chore(claude)`)

## Exemplos do Projeto

### Nova feature

```
src/app/components/Portfolio.tsx
src/app/content/page-content.ts
```

→ `feat(projects): destaque para projeto X no portfólio`

### Refatoração (Server Action)

```
src/app/actions/contact/submit-contact-form/action.ts
src/app/components/contact-form.tsx
```

→ `refactor(contact): simplifica tratamento de erros na submissão`

### Configuração

```
.cursor/commands/commit.md
.claude/commands/commit.md
```

→ `chore(cursor): alinha comandos de commit ao repositório`

## Checklist antes de commitar

- [ ] Mensagem segue o formato `tipo(escopo): descrição`
- [ ] Tipo é um dos válidos
- [ ] Descrição é clara e concisa (máximo 72 caracteres)
- [ ] Arquivos agrupados fazem sentido juntos
- [ ] Nenhuma mudança não relacionada no mesmo commit
- [ ] Arquivos sensíveis (.env, credenciais) foram excluídos
