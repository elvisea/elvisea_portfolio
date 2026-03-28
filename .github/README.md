# CI/CD Strategy — elvisea-portfolio

This document describes the CI/CD pipeline for the **elvisea-portfolio** project (aligned with the barber-shop-web pattern: split workflows, semantic release, deploy on release).

## Overview

The pipeline is split into **3 independent workflows**, each with a single responsibility:

| Workflow                 | File          | Trigger                                   | Purpose                            |
| ------------------------ | ------------- | ----------------------------------------- | ---------------------------------- |
| **Integrity Checks**     | `ci.yml`      | Push to `develop`, PR to `main`/`develop` | Code quality validation            |
| **Production Release**   | `release.yml` | Push to `main`                            | Semantic versioning + Docker image |
| **Deploy to Production** | `deploy.yml`  | Release published                         | SSH deploy to server               |

## Pipeline Flow

```
develop (push)          main (merge)              release (published)
     │                       │                           │
     ▼                       ▼                           ▼
 ┌─────────┐          ┌───────────┐               ┌───────────┐
 │  ci.yml │          │release.yml│               │ deploy.yml│
 │         │          │           │               │           │
 │ • Lint  │    PR    │ • semrel  │   triggers    │ • SSH     │
 │ • Format│ ──────►  │ • tag     │ ───────────►  │ • .env    │
 │ • Build │  merge   │ • Docker  │   on publish  │ • compose │
 │         │          │ • GHCR    │               │ • deploy  │
 └─────────┘          └───────────┘               └───────────┘
```

### Step by step

1. **Development on `develop`**: Every push runs `ci.yml` — lint, format check, and build (Node.js 22, npm).
2. **Pull request to `main` or `develop`**: `ci.yml` runs as a merge gate.
3. **Merge into `main`**: `release.yml` runs `semantic-release`, which analyzes commit messages and:
   - Creates a Git tag (e.g., `v1.2.0`)
   - Generates a GitHub Release with release notes
   - Updates `CHANGELOG.md` and `package.json` version
   - Builds a Docker image tagged with the version (Dockerfile target: `runner`)
   - Pushes the image to **GitHub Container Registry (GHCR)**
4. **Release published event**: `deploy.yml` runs automatically, deploying the exact semantic version to production via SSH (no secrets echoed to logs).

## Workflows in Detail

### ci.yml — Integrity Checks

Runs on: `ubuntu-latest` with **Node.js 22** and **npm**.

| Step                 | Command                | Blocking |
| -------------------- | ---------------------- | -------- |
| Install dependencies | `npm ci`               | Yes      |
| Lint (ESLint)        | `npm run lint`         | Yes      |
| Format check         | `npm run format:check` | Yes      |
| Build (Next.js)      | `npm run build`        | Yes      |

### release.yml — Production Release

**Job 1 — Semantic Release**

- Installs `semantic-release` and plugins globally via npm
- Runs with `.releaserc.json` and `GH_TOKEN` (PAT)
- Uses [Conventional Commits](https://www.conventionalcommits.org/)
- Release commits use `[skip ci]` in the message to avoid redundant workflow noise

**Job 2 — Docker build and push** (only if a new version was published)

- Multi-stage Dockerfile: **builder** → **runner**
- Tags: `<version>` and `latest`
- Image: `ghcr.io/<repository_owner>/elvisea-portfolio`
- Build cache: `type=gha` (GitHub Actions cache)
- Build args: Firebase public env vars and `ACCESS_TOKEN_GITHUB` (same as the former monolithic pipeline)

### deploy.yml — Deploy to Production

- Checks out the release tag
- Writes `.env` on the runner (SCP only — **never** `cat .env` in logs)
- Copies `docker-compose.yml` and `.env` to the server
- `ssh-keyscan` for host key verification (no `StrictHostKeyChecking no`)
- Remote `docker login` to GHCR using **`GH_TOKEN`** (PAT with `read:packages`; username is `github.actor` — the PAT must belong to an account that can read the package)
- Retries `docker compose pull` up to 3 times, then `docker compose up -d --force-recreate`
- Optional: GitHub **environment** `production` for approval gates

## Semantic Versioning

Automated via `@semantic-release` from commit prefixes:

| Prefix                                            | Version bump  | Example                      |
| ------------------------------------------------- | ------------- | ---------------------------- |
| `feat:`                                           | Minor (1.x.0) | `feat(ui): add project card` |
| `fix:`                                            | Patch (1.0.x) | `fix(form): validate email`  |
| `feat!:` or `BREAKING CHANGE:`                    | Major (x.0.0) | `feat!: change API shape`    |
| `chore:`, `docs:`, `style:`, `refactor:`, `test:` | No release    | `chore: update dependencies` |

## Docker registry and local compose

Images:

```
ghcr.io/<owner>/elvisea-portfolio:<version>
ghcr.io/<owner>/elvisea-portfolio:latest
```

`docker-compose.yml` uses:

```yaml
image: ${REGISTRY}/${IMAGE_NAME}:${TAG:-latest}
```

For local runs against GHCR, set `REGISTRY`, `IMAGE_NAME`, `TAG`, and `CONTAINER_NAME_APP` in `.env` (or export them). Default `TAG` is `latest` when unset.

## Required secrets

### GitHub Actions (repository secrets)

| Secret                                     | Description                                                                                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GH_TOKEN`                                 | Classic PAT with `repo` (semantic-release push/tag/release). For remote `docker login`, also needs **`read:packages`**. Prefer the same user as `github.actor` or document a machine user. |
| `SSH_PRIVATE_KEY`                          | SSH private key for the production host                                                                                                                                                    |
| `REMOTE_HOST`                              | Server hostname or IP                                                                                                                                                                      |
| `REMOTE_PORT`                              | SSH port                                                                                                                                                                                   |
| `REMOTE_USER`                              | SSH user                                                                                                                                                                                   |
| `REMOTE_TARGET`                            | Remote directory for `docker-compose.yml` and `.env`                                                                                                                                       |
| `CONTAINER_NAME_APP`                       | Docker Compose `container_name` / app identity                                                                                                                                             |
| `NEXT_PUBLIC_SITE_URL`                     | Public site URL                                                                                                                                                                            |
| `NEXT_PUBLIC_CREATOR_NAME`                 | Creator display name                                                                                                                                                                       |
| `NEXT_PUBLIC_CREATOR_ROLE`                 | Creator role                                                                                                                                                                               |
| `NEXT_PUBLIC_EMAIL_CONTACT`                | Public contact email                                                                                                                                                                       |
| `NEXT_PUBLIC_PHONE_NUMBER`                 | Public phone                                                                                                                                                                               |
| `SMTP_HOST`                                | SMTP host (server-side email)                                                                                                                                                              |
| `SMTP_PORT`                                | SMTP port                                                                                                                                                                                  |
| `SMTP_USER`                                | SMTP user                                                                                                                                                                                  |
| `SMTP_PASSWORD`                            | SMTP password                                                                                                                                                                              |
| `SMTP_USER_NO_REPLY`                       | No-reply address                                                                                                                                                                           |
| `EMAIL_CONTACT`                            | Contact email (server)                                                                                                                                                                     |
| `PHONE_NUMBER`                             | Phone (server)                                                                                                                                                                             |
| `NEXT_PUBLIC_MAP_COORDINATES`              | Map coordinates                                                                                                                                                                            |
| `NEXT_PUBLIC_GITHUB_USERNAME`              | GitHub username (client)                                                                                                                                                                   |
| `NEXT_PUBLIC_GITHUB_API_URL`               | GitHub API URL                                                                                                                                                                             |
| `ACCESS_TOKEN_GITHUB`                      | GitHub token for server-side API use and Docker build                                                                                                                                      |
| `NEXT_PUBLIC_GITHUB_URL`                   | Public GitHub profile URL                                                                                                                                                                  |
| `NEXT_PUBLIC_LINKEDIN_URL`                 | Public LinkedIn URL                                                                                                                                                                        |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase                                                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase                                                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase                                                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase                                                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase                                                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase                                                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`      | Firebase                                                                                                                                                                                   |

## Branch strategy

```
main     ← production-ready code; merge here to trigger release.yml
develop  ← day-to-day development; push and PR targets for ci.yml
```

Recommended (same as barber-shop-web):

- Feature branches from `develop`
- PRs into `develop` first; CI runs on every push to `develop` and on PRs to `main`/`develop`
- Merge `develop` → `main` when ready to ship; `release.yml` runs on `main` and may publish a release
- Avoid direct commits to `main` if you use branch protection

**Solo or main-only workflow:** You can omit `develop` and rely on `pull_request` to `main` only — update `ci.yml` triggers accordingly and document that choice for your team.

## Portuguese

See [README.pt-BR.md](./README.pt-BR.md) for the same content in Brazilian Portuguese.
