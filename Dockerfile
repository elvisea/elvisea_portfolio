# Etapa de construção (Build)
FROM node:22-alpine AS builder

# Define o diretório de trabalho no container
WORKDIR /app

# Instala dependências necessárias
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.5.0 --activate

# Copia os arquivos de configuração
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY next.config.ts ./

# Instala as dependências
RUN pnpm install

# Copia o resto dos arquivos
COPY . .

# Compila a aplicação Next.js
RUN pnpm build

# Etapa de produção
FROM node:22-alpine AS runner

WORKDIR /app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Configuração de ambiente
ENV NODE_ENV production
ENV PORT 3002

# Expõe a porta
EXPOSE 3002

# Inicia a aplicação
CMD ["node", "server.js"]
