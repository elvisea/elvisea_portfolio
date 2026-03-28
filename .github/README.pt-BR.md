# Estratégia de CI/CD — elvisea-portfolio

Documentação do pipeline do **elvisea-portfolio**, alinhado ao padrão do barber-shop-web: workflows separados, release semântico e deploy ao publicar release.

## Visão geral

O pipeline divide-se em **3 workflows** com responsabilidade única:

| Workflow                 | Arquivo       | Gatilho                                     | Função                           |
| ------------------------ | ------------- | ------------------------------------------- | -------------------------------- |
| **Integrity Checks**     | `ci.yml`      | Push em `develop`, PR para `main`/`develop` | Qualidade (lint, format, build)  |
| **Production Release**   | `release.yml` | Push em `main`                              | Versão semântica + imagem Docker |
| **Deploy to Production** | `deploy.yml`  | Release publicada                           | Deploy SSH no servidor           |

## Fluxo

```
develop (push)          main (merge)              release (publicada)
     │                       │                           │
     ▼                       ▼                           ▼
 ┌─────────┐          ┌───────────┐               ┌───────────┐
 │  ci.yml │          │release.yml│               │ deploy.yml│
 │         │          │           │               │           │
 │ • Lint  │    PR    │ • semrel  │   dispara     │ • SSH     │
 │ • Format│ ──────►  │ • tag     │ ───────────►  │ • .env    │
 │ • Build │  merge   │ • Docker  │   ao publicar │ • compose │
 │         │          │ • GHCR    │               │ • deploy  │
 └─────────┘          └───────────┘               └───────────┘
```

### Passo a passo

1. **`develop`**: cada push executa `ci.yml` (Node 22, npm: lint, format, build).
2. **PR para `main` ou `develop`**: `ci.yml` como gate antes do merge.
3. **Merge em `main`**: `release.yml` roda `semantic-release` (mensagens convencionais), cria tag/release, atualiza `CHANGELOG.md` e `package.json`, constrói a imagem Docker (estágio `runner`) e envia para o **GHCR**.
4. **Evento release published**: `deploy.yml` faz deploy da versão exata via SSH (sem vazar `.env` nos logs).

## Detalhes dos workflows

### ci.yml

| Etapa        | Comando                |
| ------------ | ---------------------- |
| Dependências | `npm ci`               |
| Lint         | `npm run lint`         |
| Formatação   | `npm run format:check` |
| Build        | `npm run build`        |

### release.yml

- **Semantic release**: `.releaserc.json`, secret `GH_TOKEN` (PAT).
- **Docker** (só se houver nova versão): tags `<versão>` e `latest`, imagem `ghcr.io/<dono>/elvisea-portfolio`, cache GHA, `build-args` Firebase + `ACCESS_TOKEN_GITHUB`.

### deploy.yml

- Checkout na tag da release.
- Gera `.env` localmente e envia por SCP (sem `cat .env`).
- `ssh-keyscan` na porta do servidor.
- `docker login` no remoto com `GH_TOKEN` (`read:packages`).
- Até 3 tentativas em `docker compose pull`, depois `up -d --force-recreate`.
- Ambiente GitHub `production` opcional para aprovação manual.

## Versionamento semântico

| Prefixo                       | Bump        |
| ----------------------------- | ----------- |
| `feat:`                       | minor       |
| `fix:`                        | patch       |
| `feat!:` / `BREAKING CHANGE:` | major       |
| `chore:`, `docs:`, etc.       | sem release |

## Registry e compose local

```
ghcr.io/<dono>/elvisea-portfolio:<versão>
ghcr.io/<dono>/elvisea-portfolio:latest
```

No `docker-compose.yml`: `image: ${REGISTRY}/${IMAGE_NAME}:${TAG:-latest}`. Para desenvolvimento local com GHCR, defina `REGISTRY`, `IMAGE_NAME`, `TAG` e `CONTAINER_NAME_APP` no `.env`.

## Secrets obrigatórios

Os mesmos listados em [README.md](./README.md) (tabela completa): `GH_TOKEN`, SSH/remoto, `CONTAINER_NAME_APP`, SMTP, site público, GitHub API/token, Firebase, etc.

## Estratégia de branches

- **`main`**: código pronto para produção; push dispara `release.yml`.
- **`develop`**: desenvolvimento ativo; push e PRs disparam `ci.yml`.

Fluxo recomendado: branches de feature a partir de `develop`, PR para `develop`, depois merge de `develop` em `main` para liberar release.

**Repositório só com `main`:** ajuste `ci.yml` para `pull_request` apenas em `main` e documente.

## English

See [README.md](./README.md) for the English version.
