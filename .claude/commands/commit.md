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
`feat(auth): adiciona login com Google`

**Corpo** — use quando a mudança não é óbvia pelo título:

```
fix(payments): corrige cálculo de juros compostos

O cálculo anterior usava juros simples por engano.
Afeta todas as simulações de parcelamento.
```

## Contexto do Projeto

Este é um projeto **Next.js** com as seguintes áreas principais:

- `app/` — rotas e páginas (App Router)
- `components/` — componentes reutilizáveis
- `lib/` — utilitários, hooks, serviços
- `public/` — assets estáticos
- `.claude/` — configurações e skills do Claude Code

Escopos comuns do projeto:

- `auth`, `dashboard`, `aerodrome`, `pilot`, `api`, `ui`, `config`

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
- Migrações de banco → commit separado
- Mudanças de dependências → commit separado (`chore`)
- Arquivos `.claude/` → commit separado (`chore(claude)`)

## Exemplos do Projeto

### Nova feature

```
app/(pilot)/dashboard/page.tsx
components/pilot/DashboardCard.tsx
lib/hooks/useDashboard.ts
```

→ `feat(dashboard): adiciona cards de resumo para o piloto`

### Correção de bug

```
app/(auth)/reset-password/page.tsx
components/ui/Toast.tsx
```

→ `fix(auth): corrige posicionamento do toast no reset de senha`

### Configuração

```
.claude/commands/commit.md
.mcp.json
```

→ `chore(claude): adiciona skill de commit e configuração MCP`

## Checklist antes de commitar

- [ ] Mensagem segue o formato `tipo(escopo): descrição`
- [ ] Tipo é um dos válidos
- [ ] Descrição é clara e concisa (máximo 72 caracteres)
- [ ] Arquivos agrupados fazem sentido juntos
- [ ] Nenhuma mudança não relacionada no mesmo commit
- [ ] Arquivos sensíveis (.env, credenciais) foram excluídos
