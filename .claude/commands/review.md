# Review de Código

Revisa o código atual antes de commitar ou abrir PR, verificando qualidade,
padrões arquiteturais e boas práticas do projeto.

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

- 🔴 **Crítico** — bloqueia commit (segurança, bug, quebra de contrato)
- 🟡 **Aviso** — recomenda correção, mas não bloqueia
- 🔵 **Sugestão** — melhoria opcional

## Checklist

### TypeScript

- [ ] Sem uso de `any` — usar tipos explícitos ou generics
- [ ] Interfaces e types bem definidos em `src/features/domain/`
- [ ] Props de componentes tipadas corretamente
- [ ] Retorno de funções assíncronas tipado (`Promise<T>`)
- [ ] Sem `@ts-ignore` sem comentário justificando

### Next.js (App Router)

- [ ] Componentes que usam hooks/estado marcados com `"use client"`
- [ ] Server Components não importam código client-side
- [ ] Rotas de API em `src/app/api/` retornam `NextResponse` corretamente
- [ ] `next/image` usado para todas as imagens (não `<img>`)
- [ ] Metadados (`generateMetadata`) definidos nas páginas
- [ ] Tratamento de erros nas rotas de API (try/catch + status codes corretos)

### Firebase

- [ ] `firebase-admin` usado **apenas** em Server Components e API routes — nunca no client
- [ ] `firebase` (client SDK) usado apenas com `"use client"` ou em `src/app/firebase/`
- [ ] Queries Firestore com filtros adequados (sem `getDocs` em coleções inteiras sem necessidade)
- [ ] Upload no Storage com validação de tipo e tamanho do arquivo
- [ ] Regras de segurança (`firestore.rules`, `storage.rules`) atualizadas se necessário
- [ ] Sem credenciais ou tokens Firebase hardcoded no código

### Arquitetura MVVM

O projeto segue MVVM dentro de `src/features/[feature]/`:

- [ ] **View** (`view/`) — apenas renderização, sem lógica de negócio
- [ ] **ViewModel** (`view-model/`) — estado, lógica de apresentação, chamadas ao repository
- [ ] **Repository** (`repository/`) — acesso a dados (Firebase, API), sem lógica de UI
- [ ] Hooks customizados em `src/hooks/` ou `src/features/[feature]/view-model/`
- [ ] Zustand store (`src/app/store/`) para estado global, não local compartilhado via prop drilling

### Design Atômico

Componentes em `src/features/components/`:

- [ ] **Atoms** — componentes primitivos sem dependências (botão, input, badge, label)
- [ ] **Molecules** — composição de atoms com lógica simples (campo de formulário, card simples)
- [ ] **Organisms** — composição de molecules com lógica de domínio (formulários, listas, tabelas)
- [ ] **Templates** — estrutura de página sem dados reais
- [ ] Componentes UI reutilizáveis em `src/components/ui/` (shadcn/ui)
- [ ] Nenhum componente organism importado dentro de um atom ou molecule

### Mobile First e Responsividade

- [ ] Classes Tailwind começam pela versão mobile, depois `sm:`, `md:`, `lg:`, `xl:`
- [ ] Nenhum valor fixo de largura/altura que quebre em telas pequenas
- [ ] Layouts usando `flex` ou `grid` com comportamento responsivo
- [ ] Textos legíveis em mobile (tamanho mínimo adequado)
- [ ] Botões e áreas de toque com tamanho mínimo de 44px em mobile
- [ ] Imagens com `width` e `height` responsivos

### Formulários e Validação

- [ ] React Hook Form usado para todos os formulários
- [ ] Schemas Zod definidos para validação (em `src/features/domain/` ou próximo ao form)
- [ ] Mensagens de erro claras e em português
- [ ] Estados de loading/disabled durante submissão

### Segurança

- [ ] Sem variáveis de ambiente client-side expostas indevidamente (`NEXT_PUBLIC_` apenas para o que deve ser público)
- [ ] Inputs do usuário sanitizados antes de queries no Firestore
- [ ] Rotas de API verificam autenticação antes de executar operações
- [ ] Sem `dangerouslySetInnerHTML` sem sanitização

### Performance

- [ ] Componentes pesados com `dynamic()` para code splitting quando adequado
- [ ] Listas longas com virtualização ou paginação
- [ ] `useCallback` / `useMemo` usados onde há re-renders desnecessários identificados
- [ ] Sem imports desnecessários de bibliotecas grandes (tree-shaking)
