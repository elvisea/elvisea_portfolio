# Criar Pull Request

Cria um pull request seguindo o padrão do projeto, vinculado à issue e ao
GitHub Project da organização atzaero.

## Pré-requisitos

Antes de criar o PR:

1. Executar `/review` para garantir qualidade do código
2. Garantir que todos os commits seguem Conventional Commits (`/commit`)
3. Estar em uma branch no formato `tipo/numero-da-issue`

## Workflow

1. **Coletar contexto** — ler a issue vinculada e os commits da branch atual
2. **Determinar base** — confirmar se o PR vai para `develop` ou `main`
3. **Redigir título e descrição** — baseado nos commits e na issue
4. **Confirmar com o usuário** — apresentar o PR antes de criar
5. **Criar o PR** — via `gh pr create`
6. **Vincular ao projeto** — adicionar o PR ao GitHub Project #2
7. **Reportar** — retornar a URL do PR criado

## Branch Base

- PRs de feature/fix/chore/refactor → `develop`
- PRs de hotfix urgente → `main`
- Releases → `main` (via PR de `develop`)

## Estrutura do PR

### Título

Seguir Conventional Commits: `tipo(escopo): descrição`
Exemplos:

- `feat(dashboard): adiciona cards de resumo para o piloto`
- `fix(auth): corrige posicionamento do toast no reset de senha`

### Descrição

```markdown
## O que foi feito

- Descrição clara das mudanças implementadas
- Bullets concisos, foco no "o quê" e "por quê"

## Issue relacionada

Closes #[numero]

## Tipo de mudança

- [ ] Nova funcionalidade (feat)
- [ ] Correção de bug (fix)
- [ ] Refatoração (refactor)
- [ ] Manutenção (chore)
- [ ] Documentação (docs)

## Checklist

- [ ] Código revisado (`/review` executado)
- [ ] Funciona em mobile e desktop
- [ ] Sem credenciais ou dados sensíveis
- [ ] Commits seguem Conventional Commits
```

## Comandos

```bash
# 1. Garantir que a branch está atualizada
git pull origin develop --rebase

# 2. Push da branch
git push origin feat/230

# 3. Criar o PR (usar HEREDOC para formatação)
gh pr create \
  --title "feat(escopo): descrição" \
  --base develop \
  --body "$(cat <<'EOF'
## O que foi feito

- ...

## Issue relacionada

Closes #230

## Tipo de mudança

- [x] Nova funcionalidade (feat)

## Checklist

- [x] Código revisado
- [x] Funciona em mobile e desktop
- [x] Sem credenciais ou dados sensíveis
- [x] Commits seguem Conventional Commits
EOF
)"

# 4. Adicionar PR ao GitHub Project
gh project item-add 2 --owner atzaero --url <URL_DO_PR>
```

## Projeto GitHub

- **Organização:** atzaero
- **Projeto:** https://github.com/orgs/atzaero/projects/2
- Todo PR deve ser adicionado ao projeto após criação
- A issue vinculada (via `Closes #N`) também deve estar no projeto
