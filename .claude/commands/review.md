# Review de Código

Revisa o código atual antes de commitar ou abrir PR, verificando qualidade,
padrões e boas práticas do [elvisea_portfolio](https://github.com/elvisea/elvisea_portfolio).

## Quando Usar

- Antes de criar um commit (`/commit`)
- Antes de abrir um pull request (`/pr`)
- Ao receber uma solicitação de revisão de código

## Workflow

1. **Coletar diff** — executar `git diff` e `git diff --cached` para ver todas as mudanças
2. **Identificar escopo** — entender quais módulos/features foram afetados
3. **Aplicar checklist** — verificar cada categoria relevante às mudanças
4. **Reportar problemas** — listar issues encontrados com arquivo e linha
5. **Sugerir correções** — propor solução para cada problema encontrado
6. **Aguardar aprovação** — não prosseguir com commit/PR sem resolução dos problemas críticos

Problemas são classificados em:

- **Crítico** — bloqueia commit (segurança, bug, quebra de contrato)
- **Aviso** — recomenda correção, mas não bloqueia
- **Sugestão** — melhoria opcional

## Checklist

### TypeScript

- [ ] Sem uso de `any` desnecessário — tipos explícitos ou inferência segura
- [ ] Tipos em `src/app`, `src/lib`, `src/components` coerentes com o domínio
- [ ] Props de componentes tipadas corretamente
- [ ] Retorno de funções assíncronas tipado (`Promise<T>`) quando relevante
- [ ] Sem `@ts-ignore` sem comentário justificando

### Next.js (App Router)

- [ ] Componentes com hooks/estado/browser APIs marcados com `"use client"`
- [ ] Server Components não importam módulos exclusivamente client-only indevidamente
- [ ] Metadados SEO: `metadata.ts` ou `generateMetadata` nas rotas que precisam
- [ ] Imagens preferencialmente com `next/image` quando aplicável
- [ ] Tratamento de erros em fluxos assíncronos (actions, loaders)

### Dados e mutações

- [ ] **Preferência:** Server Actions em `src/app/actions/` — ver `src/app/actions/README.md`
- [ ] Route Handlers em `src/app/api/` apenas quando necessário (webhook, integração externa, proxy)
- [ ] Validação de entrada com Zod em actions ou rotas; tipos serializáveis no retorno das actions

### Firebase (neste repo)

- [ ] Uso alinhado ao que existe: client SDK / `src/lib/firebase-config.ts`, providers em `src/app/providers`
- [ ] Sem credenciais ou tokens hardcoded; variáveis via `src/lib/env` (público vs servidor)

### Formulários

- [ ] React Hook Form + Zod onde há formulários
- [ ] Schemas partilhados em `src/lib/validation/` quando fizer sentido (evitar drift cliente/servidor)
- [ ] Estados de loading/disabled durante submissão

### Testes

- [ ] Vitest: `*.test.ts` junto ao código testado (ex.: `src/app/actions/**/action.test.ts`)
- [ ] Mocks de `fetch`, env, `next/headers`, ou dependências externas conforme o caso

### i18n

- [ ] Strings de UI via `react-i18next`; chaves em `public/locales/` (pt, en, es, etc.)
- [ ] Evitar strings hardcoded em português/inglês em componentes traduzíveis (salvo exceção documentada)

### UI e layout

- [ ] Componentes em `src/app/components` ou `src/components/ui` (shadcn); estilos com Tailwind
- [ ] Mobile first: breakpoints `sm:`, `md:`, `lg:` onde importa
- [ ] Contraste e tema claro/escuro (`next-themes`) quando tocado

### Segurança e env

- [ ] `NEXT_PUBLIC_*` apenas para dados que devem ser públicos no browser
- [ ] Segredos e SMTP só em variáveis server-side (não expor no client)
- [ ] Sem `dangerouslySetInnerHTML` sem sanitização

### Performance

- [ ] Code splitting com `dynamic()` quando um bloco é pesado e opcional
- [ ] Listas longas: paginação ou estratégia clara (virtualização se necessário)
- [ ] Evitar imports desnecessários de bibliotecas grandes
