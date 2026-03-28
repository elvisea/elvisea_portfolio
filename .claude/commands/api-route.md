# Criar API Route

Cria uma nova rota de API Next.js seguindo o padrão de separação por responsabilidades
adotado no projeto (controller / service / schema / testes / README).

## Estrutura obrigatória

Cada rota fica em sua própria pasta dentro de `src/app/api/`:

```
src/app/api/[domínio]/[rota]/
├── README.md         # contrato, exemplos, estrutura Firestore/serviço externo
├── route.ts          # controller: parse, validação Zod, delegação ao service
├── route.test.ts     # testes unitários do controller (mock do service)
├── schema.ts         # schemas Zod de entrada e/ou saída + tipos inferidos
├── service.ts        # lógica de negócio, acesso a dados, chamadas externas
└── service.test.ts   # testes unitários do service (mock de deps externas)
```

Shared por domínio (quando há múltiplas rotas no mesmo domínio):

```
src/app/api/[domínio]/_shared/
├── [domínio]-api-error.ts      # classe de erro tipada com codes
└── [domínio]-route-errors.ts   # mapeamento erro → NextResponse HTTP
```

Shared global já existente:

```
src/app/api/_shared/
└── zod-field-errors.ts   # zodFlattenedFieldErrorMessage()
```

## Workflow

1. **Entender o requisito** — confirmar método HTTP, inputs, outputs e dependências
2. **Identificar o domínio** — verificar se já existe pasta de domínio com `_shared`; reutilizar se sim
3. **Criar os arquivos** — na ordem: schema → service → route → testes → README
4. **Rodar lint e testes** — `npm run lint` e `npm run test:run -- src/app/api/[domínio]/[rota]`
5. **Corrigir formatação** — `npx prettier --write [arquivos]` se lint apontar erros de prettier
6. **Confirmar build** — `npm run build` se houver mudanças estruturais

## Regras de implementação

### `route.ts` (controller)

- Sempre começa com `export const runtime = 'nodejs';`
- Responsabilidade única: parse do body/query/params → validação Zod → chamar service → retornar NextResponse
- **Nunca** contém lógica de negócio ou acesso a dados
- Trata JSON parse inválido com try/catch e retorna 400
- Usa `zodFlattenedFieldErrorMessage` para mensagens de erro de validação
- Usa a função de erro do `_shared` do domínio para erros do service
- JSDoc com `@param`, `@returns` e status codes possíveis

```ts
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { zodFlattenedFieldErrorMessage } from "@/app/api/_shared/zod-field-errors";
import { dominioServiceErrorResponse } from "../_shared/dominio-route-errors";
import { inputSchema } from "./schema";
import { serviceFunction } from "./service";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Body inválido ou não é JSON" },
      { status: 400 },
    );
  }

  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: zodFlattenedFieldErrorMessage(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const result = await serviceFunction(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return dominioServiceErrorResponse(err, "nome-da-rota");
  }
}
```

### `schema.ts`

- Exporta schemas Zod nomeados: `[recurso]BodySchema`, `[recurso]QuerySchema`, `[recurso]ResponseSchema`
- Exporta tipos inferidos: `type [Recurso]Body = z.infer<typeof [recurso]BodySchema>`
- Mensagens de erro em português
- Schemas de saída opcionais mas recomendados para documentar o contrato

### `service.ts`

- Funções puras sem efeitos colaterais na assinatura (injetam dependências via parâmetro se necessário)
- Lança `[Domínio]ApiError` para erros esperados (rate limit, not found, write failed, etc.)
- Usa `firebase-admin` via `getAdmin()` de `@/app/firebase/admin` (nunca client SDK)
- Nunca importa `NextRequest`/`NextResponse`
- JSDoc com `@throws {[Domínio]ApiError}`

### `[domínio]-api-error.ts`

```ts
export const DOMINIO_API_ERROR_CODES = [
  "RATE_LIMITED",
  "WRITE_FAILED",
  "NOT_FOUND",
] as const;
export type DominioApiErrorCode = (typeof DOMINIO_API_ERROR_CODES)[number];
export type DominioServiceId = "rota-a" | "rota-b";

export class DominioApiError extends Error {
  readonly code: DominioApiErrorCode;
  readonly service: DominioServiceId;
  constructor(
    service: DominioServiceId,
    code: DominioApiErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "DominioApiError";
    this.service = service;
    this.code = code;
    Object.setPrototypeOf(this, DominioApiError.prototype);
  }
}
```

### `[domínio]-route-errors.ts`

```ts
export function dominioServiceErrorResponse(
  err: unknown,
  label: string,
): NextResponse {
  if (err instanceof DominioApiError) {
    if (err.code === "RATE_LIMITED")
      return NextResponse.json({ message: "..." }, { status: 429 });
    if (err.code === "NOT_FOUND")
      return NextResponse.json({ message: "..." }, { status: 404 });
    if (err.code === "WRITE_FAILED")
      return NextResponse.json({ message: "..." }, { status: 500 });
  }
  console.error(`dominio/${label} unexpected error:`, err);
  return NextResponse.json({ message: "Erro interno" }, { status: 500 });
}
```

### Mapeamento de status HTTP

| Situação                          | Status |
| --------------------------------- | ------ |
| Body inválido / campo faltando    | 400    |
| Não autenticado                   | 401    |
| Sem permissão                     | 403    |
| Recurso não encontrado            | 404    |
| Rate limit / duplicata            | 429    |
| Credenciais ausentes no servidor  | 500    |
| Falha ao escrever no Firestore    | 500    |
| Falha em API externa              | 502    |
| Resposta inesperada de API extern | 422    |

## Testes

### `route.test.ts` — deve cobrir:

- 201/200 com body válido (mock do service retornando sucesso)
- 400 body não é JSON
- 400 cada campo obrigatório ausente ou inválido
- Cada código de erro do service → status HTTP correto
- 500 erro genérico inesperado

### `service.test.ts` — deve cobrir:

- Sucesso: dados gravados/retornados corretamente
- Cada `ErrorCode` possível: condição que o dispara + verificação do `code`
- Casos de borda relevantes (normalização de campos, valores opcionais, etc.)

**Padrão de mock para Firestore admin:**

```ts
vi.mock("@/app/firebase/admin", () => ({
  getAdmin: () => ({ firestore: () => ({ collection: mockCollection }) }),
}));
```

**Padrão de mock para service no route.test:**

```ts
vi.mock("./service", () => ({ serviceFunction: vi.fn() }));
```

## Exemplos do projeto

- `src/app/api/aerodrome/feedback/` — POST com Firestore, anti-spam, totais
- `src/app/api/aisweb/rotaer/` — GET com API externa XML + fallback de URL
- `src/app/api/plugfield/login/` — POST com API externa JSON
- `src/app/api/plugfield/device/[deviceId]/` — GET com parâmetro dinâmico

## Checklist antes de commitar

- [ ] `export const runtime = 'nodejs'` em `route.ts`
- [ ] Sem lógica de negócio em `route.ts`
- [ ] Sem `NextRequest`/`NextResponse` em `service.ts`
- [ ] Erros do service mapeados no `_shared` do domínio
- [ ] Mensagens de erro em português
- [ ] `npm run lint` sem erros
- [ ] `npm run test:run -- src/app/api/[domínio]/[rota]` todos passando
- [ ] README com contrato, exemplos de request/response e tabela de erros
