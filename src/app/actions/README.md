# Guia: Server Actions neste projeto

Este diretório concentra **Server Actions** do Next.js (App Router): funções assíncronas executadas no servidor, invocáveis a partir de Client Components e Server Components.

Cada caso de uso combina **código de produção** (`action.ts`, tipos, schemas) com uma **camada de teste** opcional mas recomendada (`action.test.ts`), colocada no mesmo folder.

## Organização por domínio

Agrupe actions relacionadas em uma pasta por **domínio** (ex.: `github/`, `contact/`, `user/`).

### Estrutura (produção + teste)

```
src/app/actions/
  README.md                 # este guia
  <domínio>/
    index.ts                # API pública (re-exports) — não inclui testes
    <nome-da-action>/       # um caso de uso por pasta
      types.ts              # contratos de dados
      schema.ts             # opcional — validação Zod de entrada
      action.ts             # camada de execução: "use server" + lógica exposta à app
      action.test.ts        # camada de teste: Vitest, mocks, asserções
```

- **Camada de execução:** o que o Next trata como Server Action e o resto da app importa via `@/app/actions/<domínio>`.
- **Camada de teste:** valida o comportamento da action em Node (sem browser), com dependências externas substituídas por mocks. Não é publicada no barrel `index.ts` nem importada por UI.

Referência: [`github/`](./github/).

## Um caso de uso = uma pasta

Use **kebab-case** e um nome que descreva a operação (verbo + objeto), por exemplo:

- `fetch-github-repositories`
- `fetch-repository-details`
- `submit-contact-form`

### Ficheiros por camada

| Ficheiro         | Camada    | Obrigatório | Função                                                                    |
| ---------------- | --------- | ----------- | ------------------------------------------------------------------------- |
| `action.ts`      | Execução  | Sim         | `"use server"` e função exportada chamada pela aplicação.                 |
| `types.ts`       | Execução  | Sim         | Tipos de entrada/saída e DTOs serializáveis.                              |
| `schema.ts`      | Execução  | Não         | Zod para argumentos vindos do cliente ou limites claros.                  |
| `action.test.ts` | **Teste** | Não         | Vitest: importa `./action`, moca env e I/O, cobre fluxos felizes e erros. |

### `action.ts` (execução)

- Primeira linha: `"use server"`.
- Validar entrada com Zod (`schema.ts`) quando fizer sentido.
- Podes manter `fetch` e integrações aqui. Se a lógica crescer ou precisares de reuso (ex.: Route Handlers), podes extrair um módulo auxiliar **sem** `"use server"` no mesmo folder — opcional.

### `types.ts`

- Tipos retornados pelas actions devem ser **serializáveis** (o que o Next pode enviar ao cliente).
- Exporte tipos de resultado agregado (ex.: `FetchXxxResult`) quando útil aos consumidores.

### `schema.ts`

- Use [Zod](https://zod.dev) para limites numéricos, formato de strings (slugs, emails), etc.
- Respostas de APIs externas: em geral bastam tipos TypeScript; Zod no JSON completo só se precisares de contrato rígido.

### `action.test.ts` (camada de teste)

- **Ferramenta:** [Vitest](https://vitest.dev), ficheiros `*.test.ts` sob `src/` (ver [`vitest.config.ts`](../../../vitest.config.ts)).
- **Comandos:** `bun run test` (watch) e `bun run test:run` (uma execução / CI).
- **Colocação:** sempre **ao lado** de `action.ts`, com o mesmo prefixo (`action` / `action.test`), para navegação e code review óbvios.
- **Import:** depois dos `vi.mock(...)` hoisted, `import { minhaAction } from "./action"`.
- **O que cobrir:** respostas de sucesso, erros HTTP, rejeição de `fetch`, e efeitos colaterais relevantes (ex.: transformação de texto). Validação Zod pura podes complementar com `schema.test.ts` se quiseres testes só de regras sem mocks.
- **Mocks habituais:**
  - `vi.mock("@/lib/env/server", () => ({ env: { ... } }))` — mockar o **módulo** de env, não o `.env`.
  - `vi.stubGlobal("fetch", vi.fn())` no `beforeEach`; `vi.unstubAllGlobals()` no `afterEach`.
  - `process.env.*` que a action leia diretamente (ex.: `ACCESS_TOKEN_GITHUB`) no `beforeEach` quando necessário.

Exemplos no repositório:

- [`github/fetch-github-repositories/action.test.ts`](./github/fetch-github-repositories/action.test.ts)
- [`github/fetch-repository-details/action.test.ts`](./github/fetch-repository-details/action.test.ts)

## Barrel `index.ts` no domínio

No `index.ts` do domínio, reexporte apenas o que é **API pública de execução**:

- funções exportadas em `action.ts`;
- tipos de `types.ts` necessários aos consumidores.

**Não** reexportes `action.test.ts`, schemas internos nem constantes só para testes.

```ts
import { minhaAction, type MeuTipo } from "@/app/actions/meu-dominio";
```

## Checklist para uma nova action

1. Criar `src/app/actions/<domínio>/<nome-do-caso-de-uso>/` com `types.ts` e `action.ts`.
2. Adicionar `schema.ts` se houver parâmetros vindos do cliente ou que precisem de limites claros.
3. Garantir `"use server"` no topo de `action.ts`.
4. Atualizar `src/app/actions/<domínio>/index.ts` com os novos exports (só execução + tipos públicos).
5. Consumir via `@/app/actions/<domínio>` (evitar import direto de `action.ts` nos componentes, salvo exceção documentada).
6. **Camada de teste:** adicionar `action.test.ts` com mocks de env/`fetch` e casos principais; correr `bun run test:run`.
7. Rodar `bun run build` para validar compilação e tipos.

## Controller vs camada extra de código

- **Não** é necessário um “controller” separado: a Server Action já é o ponto de entrada.
- Um ficheiro `service.ts` (ou similar) **só** se fizer sentido — lógica partilhada, ficheiros muito grandes ou preferência por isolar domínio. A **camada de teste** (`action.test.ts`) existe independentemente disso; podes testar diretamente a action.

## Leitura adicional

- [Next.js — Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
