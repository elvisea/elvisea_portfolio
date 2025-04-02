# Etapa de construção (Build)
FROM node:22-alpine AS builder

# Define o diretório de trabalho no container
WORKDIR /app

# Firebase Configuration
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# GitHub Configuration
ARG ACCESS_TOKEN_GITHUB

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

# Firebase Configuration
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# GitHub Configuration
ARG ACCESS_TOKEN_GITHUB

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# GitHub Configuration
ENV ACCESS_TOKEN_GITHUB=$ACCESS_TOKEN_GITHUB

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Configuração de ambiente
ENV NODE_ENV production
ENV PORT 3003

# Expõe a porta
EXPOSE 3003

# Inicia a aplicação
CMD ["node", "server.js"]
