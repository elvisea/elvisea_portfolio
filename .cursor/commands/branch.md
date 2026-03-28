# Criar Branch

Cria uma branch seguindo a convenção do projeto, vinculada a uma issue do GitHub
e adicionada ao projeto no GitHub Projects.

## Convenção de Nomenclatura

Formato: `tipo/numero-da-issue`

Exemplos:

- `feat/230` — nova funcionalidade referente à issue #230
- `fix/145` — correção de bug referente à issue #145
- `chore/89` — tarefa de manutenção referente à issue #89
- `refactor/312` — refatoração referente à issue #312
- `docs/67` — documentação referente à issue #67

**Nunca** usar nomes descritivos longos sem número de issue:

- ❌ `feature/adiciona-login-google`
- ✅ `feat/230`

## Workflow

1. **Solicitar informações** — perguntar o número da issue e confirmar o tipo (feat, fix, chore, refactor, docs, test, perf)
2. **Buscar detalhes da issue** — ler o título e descrição da issue no GitHub para confirmar o tipo correto
3. **Confirmar nome** — apresentar o nome da branch antes de criá-la e aguardar aprovação
4. **Criar branch localmente** — `git checkout -b tipo/numero` a partir da branch base correta
5. **Vincular branch à issue** — usar `gh issue develop` para associar no GitHub
6. **Adicionar issue ao projeto** — adicionar a issue ao GitHub Project #2 da organização atzaero
7. **Confirmar** — informar que a branch está pronta para uso

## Branch Base

- Para `feat`, `refactor`, `docs`, `test`, `perf` → partir de `develop`
- Para `fix` urgente (hotfix) → partir de `main`
- Para `chore` → partir de `develop`

## Comandos

```bash
# 1. Atualizar branch base
git checkout develop && git pull origin develop

# 2. Criar e entrar na nova branch
git checkout -b feat/230

# 3. Vincular branch à issue no GitHub
gh issue develop 230 --branch feat/230 --repo atzaero/aerobi

# 4. Adicionar issue ao projeto GitHub Projects
gh project item-add 2 --owner atzaero --url https://github.com/atzaero/aerobi/issues/230
```

## Projeto GitHub

- **Organização:** atzaero
- **Projeto:** https://github.com/orgs/atzaero/projects/2
- Toda issue deve ser adicionada ao projeto ao iniciar o trabalho
