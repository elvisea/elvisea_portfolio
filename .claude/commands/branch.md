# Criar Branch

Cria uma branch seguindo a convenção do projeto, vinculada a uma issue do GitHub
e adicionada ao [GitHub Project #12 (elvisea)](https://github.com/users/elvisea/projects/12).

## Repositório

- **GitHub:** [elvisea/elvisea_portfolio](https://github.com/elvisea/elvisea_portfolio)
- **CLI:** `--repo elvisea/elvisea_portfolio`

## Convenção de Nomenclatura

Formato: `tipo/numero-da-issue`

Exemplos:

- `feat/5` — nova funcionalidade referente à issue #5
- `fix/4` — correção de bug referente à issue #4
- `chore/2` — tarefa de manutenção referente à issue #2
- `refactor/3` — refatoração referente à issue #3
- `docs/6` — documentação referente à issue #6

**Nunca** usar nomes descritivos longos sem número de issue:

- ❌ `feature/adiciona-secao-blog`
- ✅ `feat/5`

## Workflow

1. **Solicitar informações** — perguntar o número da issue e confirmar o tipo (feat, fix, chore, refactor, docs, test, perf)
2. **Buscar detalhes da issue** — ler o título e descrição da issue no GitHub para confirmar o tipo correto
3. **Confirmar nome** — apresentar o nome da branch antes de criá-la e aguardar aprovação
4. **Criar branch localmente** — `git checkout -b tipo/numero` a partir da branch base correta
5. **Vincular branch à issue** — opcional: `gh issue develop` (ver nota abaixo sobre flags)
6. **Adicionar issue ao projeto** — `gh project item-add` para o Project #12 do utilizador `elvisea`
7. **Confirmar** — informar que a branch está pronta para uso

## Branch Base

- Para `feat`, `refactor`, `docs`, `test`, `perf` → partir de `develop`
- Para `fix` urgente (hotfix) → partir de `main`
- Para `chore` → partir de `develop`

## Comandos

```bash
# 1. Atualizar branch base
git checkout develop && git pull origin develop

# 2. Criar e entrar na nova branch (exemplo: issue #3)
git checkout -b refactor/3

# 3. (Opcional) Associar desenvolvimento à issue — usar -n/--name para o nome da branch
gh issue develop 3 -n refactor/3 --repo elvisea/elvisea_portfolio

# 4. Adicionar a issue ao GitHub Project #12
gh project item-add 12 --owner elvisea --url https://github.com/elvisea/elvisea_portfolio/issues/3
```

**Notas:**

- A sintaxe do `gh issue develop` pode variar; em caso de dúvida: `gh issue develop -h`.
- Se a branch já existir localmente, o vínculo pode ser feito ao abrir o PR ou pela UI da issue.
- Se `gh project item-add` falhar, confirmar o projeto com `gh project list --owner elvisea`.

## Projeto GitHub

- **Utilizador:** elvisea
- **Projeto:** https://github.com/users/elvisea/projects/12
- Toda issue relevante deve ser adicionada ao projeto ao iniciar o trabalho
