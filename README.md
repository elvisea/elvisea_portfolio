# Portfolio - Elvis E. Amancio

Um portfólio profissional moderno construído com Next.js 15, apresentando projetos, habilidades e experiências de forma elegante e responsiva. Projetado para destacar competências técnicas e experiências profissionais, com foco em recrutadores e oportunidades de trabalho.

## 🚀 Tecnologias

- [Next.js 15](https://nextjs.org/) - Framework React com SSR/SSG
- [React 19](https://react.dev/) - Biblioteca JavaScript para interfaces
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [i18next](https://www.i18next.com/) - Internacionalização
- [React Markdown](https://github.com/remarkjs/react-markdown) - Renderização de markdown
- [Lucide React](https://lucide.dev/) - Ícones modernos
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Zod](https://zod.dev/) - Validação de esquemas
- [Nodemailer](https://nodemailer.com/) - Envio de emails

## ✨ Funcionalidades

- 🎨 Design moderno e responsivo
- 🌙 Tema claro/escuro (next-themes)
- 🌐 Suporte a múltiplos idiomas (PT-BR, EN, ES)
- 📱 Layout otimizado para mobile
- 📊 Integração com a API do GitHub
- 📝 Renderização de READMEs dos projetos
- ⚡ Animações suaves com Framer Motion
- 🔍 SEO otimizado
- 📨 Sistema de contato profissional com Nodemailer
- 🎯 Validação robusta de formulários com Zod
- 👨‍💼 Perfil LinkedIn integrado
- 📝 Formulário para propostas de trabalho
- 🌍 Localização com Google Maps (vista da cidade)
- 💬 Botão WhatsApp com mensagens multilíngues

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/elvisea/elvisea_portfolio
```

2. Instale as dependências:

```bash
pnpm install
# ou
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
```

O servidor iniciará na porta 3003 - abra [http://localhost:3003](http://localhost:3003) no seu navegador.

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# Configuração do Docker
NEXT_PUBLIC_COMPOSE_PROJECT_NAME=portfolio

# Configuração do Site
NEXT_PUBLIC_SITE_URL=http://localhost:3003
NEXT_PUBLIC_SITE_NAME=Elvis E. A. | Portfolio

# Configuração do Criador
NEXT_PUBLIC_CREATOR_NAME=Elvis E. A.
NEXT_PUBLIC_CREATOR_ROLE=Desenvolvedor Full-Stack

# Informações da Empresa
COMPANY_NAME=BytefulCode
NEXT_PUBLIC_COMPANY_NAME=BytefulCode

# Configuração de Email
EMAIL_CONTACT=contato@bytefulcode.tech
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
PHONE_NUMBER=5541992190528

# GitHub
NEXT_PUBLIC_GITHUB_URL=https://github.com/elvisea

# URLs das APIs
NEXT_PUBLIC_API_URL=http://localhost:3003/api

# Social Media URLs
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/elvisea

# Localização
MAP_COORDINATES=-25.4322266,-49.2811471
```

## 🐳 Docker

O projeto também pode ser executado usando Docker:

```bash
# Desenvolvimento
pnpm dev:docker

# Produção
pnpm build:docker
```

## 📁 Estrutura do Projeto

```
src/
├── app/                  # Rotas e páginas
│   ├── api/              # Rotas de API
│   ├── components/       # Componentes específicos de página
│   ├── contact/          # Formulário de contato profissional
│   ├── projects/         # Visualização de projetos
│   └── styles/           # Estilos específicos
├── components/           # Componentes reutilizáveis
├── lib/                  # Utilitários e configurações
│   ├── env.ts            # Validação de variáveis de ambiente
│   └── i18n.ts           # Configuração de internacionalização
└── public/               # Arquivos estáticos
    └── locales/          # Traduções (PT, EN, ES)
```

## 🌍 Internacionalização

O projeto suporta três idiomas:

- 🇧🇷 Português (Brasil)
- 🇺🇸 Inglês
- 🇪🇸 Espanhol

As traduções estão localizadas em `public/locales/` e cobrem:

- Interface do usuário
- Perfil profissional
- Formulário de contato
- Mensagens de validação
- Perfil LinkedIn

## 📧 Sistema de Contato Profissional

O projeto possui um sistema completo para recrutadores entrarem em contato:

- Formulário de proposta de trabalho com campos especializados
- Validação robusta com mensagens de erro em vários idiomas
- Envio de emails para ambos recrutador e candidato
- Templates de email personalizados e responsivos
- Proteção contra spam com rate limiting

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Elvis E. Amancio**

- Website: [elvisea.dev](https://elvisea.dev)
- Github: [@elvisea](https://github.com/elvisea)
- LinkedIn: [@elvisea](https://linkedin.com/in/elvisea)

## 🚀 Deploy

O projeto está configurado para deploy em VPS própria na [Hostinger](https://hostinger.com.br), utilizando Docker para containerização e Nginx como servidor web.

Para mais informações sobre implantação de aplicações Next.js em servidores próprios, consulte a [documentação de auto-hospedagem do Next.js](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
