# API Route (Route Handler) — uso opcional

Este repositório **não** usa `src/app/api/` por omissão. Para formulários e mutações disparadas pela própria app Next, a convenção é **Server Actions** em `src/app/actions/` — ver `src/app/actions/README.md`.

Use um **Route Handler** (`src/app/api/.../route.ts`) apenas quando fizer sentido, por exemplo:

- Webhooks de terceiros (Stripe, GitHub, etc.)
- Integração que exige um endpoint HTTP estável para sistemas externos
- Proxy mínimo ou download que não caiba bem numa action

## Se adicionares uma rota em `src/app/api/`

Estrutura mínima sugerida (podes simplificar ou expandir conforme a complexidade):

```
src/app/api/[domínio]/[rota]/
├── route.ts       # GET/POST/… — parse, validação Zod, NextResponse
├── schema.ts      # opcional — Zod para query/body
└── route.test.ts  # opcional — Vitest com Request/Response mockados
```

### `route.ts` (boas práticas)

- `export const runtime = "nodejs";` quando precisares de APIs Node (ex.: algumas libs de email/crypto)
- Validar entrada com Zod; responder com `NextResponse.json` e status adequados (400, 401, 429, 500, …)
- Lógica pesada ou reutilizável: extrair para funções em `src/lib/` **sem** importar de ficheiros com `"use server"` se precisares da mesma lógica noutros sítios

### Segurança

- Não expor segredos em respostas JSON
- Autenticação/autorização explícitas se a rota não for pública

## Comandos de verificação

```bash
npm run lint
npm run test:run
# ou: bun run lint / bun run test:run

npm run build
```

## Quando não criar `app/api`

- Submissão de formulários internos → Server Action + Zod (padrão atual, ex.: contacto)
- Dados só para a UI deste site → fetch em Server Components ou actions, não endpoint REST obrigatório
