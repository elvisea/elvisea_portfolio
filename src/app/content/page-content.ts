import {
  Code,
  Smartphone,
  Users,
  Rocket,
  CheckCircle,
  Clock,
  Briefcase,
  Layers,
  Zap,
  Search,
  PenTool,
  RefreshCw
} from 'lucide-react'

// Interfaces consistentes para todos os tipos de conteúdo
export interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  features: string[];
}

export interface StatItem {
  value: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
export interface ProcessStep {
  title: string;
  subtitle: string;
  description: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface TestimonialItem {
  name: string;
  company: string;
  role: string;
  text: string;
  avatar?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  specialties: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface ProjectTypeOption {
  id: string;
  label: string;
}

const PHONE_NUMBER = process.env.PHONE_NUMBER || "(41) 99219-0528";
const EMAIL_CONTACT = process.env.EMAIL_CONTACT || "contato@bytefulcode.tech";

export const content = {
  header: {
    logo: "BytefulCode",
    menu: {
      services: "Serviços",
      process: "Processo",
      testimonials: "Depoimentos",
      faq: "FAQ",
      contact: "Contato",
    }
  },

  hero: {
    title: "Transformamos Ideias em Código",
    subtitle: "Desenvolvimento de software personalizado para empresas que buscam inovação, qualidade e resultados.",
    buttonText: "Iniciar Projeto",
    stats: [
      { value: "5+", label: "Anos de Experiência" },
      { value: "50+", label: "Projetos Entregues" },
      { value: "98%", label: "Clientes Satisfeitos" },
      { value: "24/7", label: "Suporte Técnico" }
    ] as StatItem[]
  },

  services: {
    title: "Soluções Digitais Completas",
    subtitle: "Oferecemos serviços especializados para atender às necessidades específicas do seu negócio.",
    items: [
      {
        title: "Desenvolvimento Web",
        subtitle: "Sites e aplicações web modernas",
        description: "Criamos aplicações web responsivas, rápidas e escaláveis utilizando as tecnologias mais modernas do mercado.",
        Icon: Code,
        features: [
          "Sites institucionais e landing pages",
          "Aplicações web complexas",
          "E-commerce e marketplaces",
          "Dashboards e painéis administrativos"
        ]
      },
      {
        title: "Aplicativos Mobile",
        subtitle: "Apps nativos e multiplataforma",
        description: "Desenvolvemos aplicativos mobile intuitivos e de alta performance para iOS e Android.",
        Icon: Smartphone,
        features: [
          "Aplicativos nativos (iOS e Android)",
          "Soluções multiplataforma",
          "Integração com APIs e serviços",
          "Notificações push e geolocalização"
        ]
      },
      {
        title: "UX/UI Design",
        subtitle: "Interfaces intuitivas e atraentes",
        description: "Projetamos interfaces que proporcionam a melhor experiência para seus usuários, com foco em usabilidade e conversão.",
        Icon: PenTool,
        features: [
          "Wireframes e protótipos interativos",
          "Design de interfaces responsivas",
          "Testes de usabilidade",
          "Design systems e guias de estilo"
        ]
      },
      {
        title: "Consultoria Técnica",
        subtitle: "Orientação especializada para seu projeto",
        description: "Oferecemos consultoria técnica para ajudar sua empresa a tomar as melhores decisões tecnológicas.",
        Icon: Search,
        features: [
          "Análise de requisitos e viabilidade",
          "Escolha de tecnologias e arquitetura",
          "Otimização de performance",
          "Segurança e conformidade"
        ]
      },
      {
        title: "Integrações e APIs",
        subtitle: "Conectando sistemas e serviços",
        description: "Desenvolvemos e integramos APIs para conectar diferentes sistemas e serviços, criando um ecossistema digital coeso.",
        Icon: Layers,
        features: [
          "Desenvolvimento de APIs RESTful",
          "Integração com serviços de terceiros",
          "Webhooks e microsserviços",
          "Documentação técnica completa"
        ]
      },
      {
        title: "Otimização de Performance",
        subtitle: "Velocidade e eficiência para seu produto",
        description: "Analisamos e otimizamos a performance de aplicações existentes, melhorando a experiência do usuário e reduzindo custos.",
        Icon: Zap,
        features: [
          "Análise de performance e gargalos",
          "Otimização de código e consultas",
          "Caching e estratégias de carregamento",
          "Monitoramento e relatórios"
        ]
      }
    ] as ServiceItem[]
  },

  technologies: {
    title: "Tecnologias",
    subtitle: "Trabalhamos com as tecnologias mais modernas e eficientes do mercado",
    categories: [
      {
        name: "Frontend",
        techs: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "TailwindCSS"]
      },
      {
        name: "Backend",
        techs: ["Node.js", "Python", "Java", "C#", "PHP", "Go"]
      },
      {
        name: "Mobile",
        techs: ["React Native", "Flutter", "Swift", "Kotlin"]
      },
      {
        name: "Database",
        techs: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"]
      },
      {
        name: "DevOps",
        techs: ["Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "CI/CD"]
      }
    ]
  },

  process: {
    title: "Nosso Processo de Desenvolvimento",
    subtitle: "Uma abordagem estruturada para transformar sua visão em realidade digital.",
    steps: [
      {
        title: "Descoberta e Planejamento",
        subtitle: "Entendendo suas necessidades",
        description: "Iniciamos com uma análise profunda dos requisitos do projeto, objetivos de negócio e necessidades dos usuários para criar um plano de ação detalhado.",
        Icon: Search
      },
      {
        title: "Design e Prototipagem",
        subtitle: "Visualizando a solução",
        description: "Criamos wireframes e protótipos interativos que permitem visualizar e validar a solução antes do desenvolvimento, economizando tempo e recursos.",
        Icon: PenTool
      },
      {
        title: "Desenvolvimento",
        subtitle: "Construindo com qualidade",
        description: "Utilizamos metodologias ágeis para desenvolver seu produto em ciclos curtos, permitindo ajustes e melhorias contínuas ao longo do processo.",
        Icon: Code
      },
      {
        title: "Testes e Qualidade",
        subtitle: "Garantindo a excelência",
        description: "Realizamos testes rigorosos de funcionalidade, usabilidade, segurança e performance para garantir um produto final de alta qualidade.",
        Icon: CheckCircle
      },
      {
        title: "Lançamento",
        subtitle: "Entregando valor",
        description: "Preparamos e executamos o lançamento do seu produto, garantindo uma transição suave para o ambiente de produção e uma experiência positiva para os usuários.",
        Icon: Rocket
      },
      {
        title: "Suporte Contínuo",
        subtitle: "Evoluindo constantemente",
        description: "Oferecemos suporte técnico, manutenção e atualizações contínuas para garantir que seu produto digital evolua e se mantenha relevante ao longo do tempo.",
        Icon: RefreshCw
      }
    ] as ProcessStep[]
  },

  portfolio: {
    title: "Nosso Portfólio",
    subtitle: "Conheça alguns dos projetos que desenvolvemos com sucesso",
    projects: [
      {
        title: "Plataforma de E-commerce",
        description: "Desenvolvimento completo de uma plataforma de e-commerce com integração de pagamentos, gestão de estoque e painel administrativo personalizado.",
        image: "/images/portfolio/ecommerce.jpg",
        tags: ["Next.js", "Node.js", "MongoDB", "AWS"],
        results: ["Aumento de 45% nas conversões", "Redução de 30% no tempo de carregamento", "Escalabilidade para milhares de produtos"],
        clientName: "Fashion Store"
      },
      {
        title: "Aplicativo de Delivery",
        description: "Aplicativo mobile para iOS e Android para serviço de delivery com rastreamento em tempo real, pagamentos in-app e sistema de avaliações.",
        image: "/images/portfolio/delivery-app.jpg",
        tags: ["React Native", "Firebase", "Google Maps API", "Node.js"],
        results: ["50.000+ downloads", "Avaliação média de 4.8 estrelas", "Redução de 25% nos custos operacionais"],
        clientName: "FastFood Delivery"
      },
      {
        title: "Sistema de Gestão Empresarial",
        description: "Sistema web completo para gestão de recursos humanos, financeiro, projetos e clientes com dashboards personalizados e relatórios avançados.",
        image: "/images/portfolio/erp-system.jpg",
        tags: ["React", "TypeScript", "Java Spring", "PostgreSQL"],
        results: ["Aumento de 60% na produtividade da equipe", "Centralização de dados em uma única plataforma", "ROI positivo em 6 meses"],
        clientName: "Tech Solutions Inc."
      }
    ]
  },

  stats: {
    title: "BytefulCode em Números",
    subtitle: "Resultados que comprovam nossa excelência",
    items: [
      {
        value: "50+",
        label: "Projetos Entregues",
        Icon: Briefcase
      },
      {
        value: "98%",
        label: "Clientes Satisfeitos",
        Icon: CheckCircle
      },
      {
        value: "5+",
        label: "Anos de Experiência",
        Icon: Clock
      },
      {
        value: "15+",
        label: "Especialistas",
        Icon: Users
      }
    ] as StatItem[]
  },

  testimonials: {
    title: "O Que Nossos Clientes Dizem",
    subtitle: "Conheça as experiências de quem já transformou suas ideias em realidade com a BytefulCode.",
    items: [
      {
        name: "Ana Silva",
        role: "CEO",
        company: "TechStart",
        text: "A BytefulCode foi fundamental para o lançamento do nosso MVP. Eles entenderam perfeitamente nossas necessidades e entregaram um produto que superou nossas expectativas em tempo recorde."
      },
      {
        name: "Carlos Mendes",
        role: "Diretor de Produto",
        company: "InnovateSoft",
        text: "Trabalhamos com a BytefulCode em vários projetos e sempre ficamos impressionados com a qualidade do código, a comunicação clara e o compromisso com prazos. São parceiros de verdade."
      },
      {
        name: "Mariana Costa",
        role: "Fundadora",
        company: "EduTech",
        text: "Nossa plataforma educacional precisava de uma reformulação completa e a BytefulCode entregou uma solução moderna, escalável e fácil de usar que nossos alunos adoraram."
      },
      {
        name: "Roberto Almeida",
        role: "CTO",
        company: "FinanceApp",
        text: "A expertise técnica da equipe da BytefulCode foi crucial para desenvolvermos um sistema financeiro seguro e eficiente. Recomendo fortemente para projetos que exigem alta qualidade."
      }
    ] as TestimonialItem[]
  },

  team: {
    title: "Nossa Equipe",
    subtitle: "Conheça os especialistas por trás dos nossos projetos de sucesso",
    members: [
      {
        name: "Rafael Mendes",
        role: "CTO & Fundador",
        image: "/images/team/rafael.jpg",
        description: "Com mais de 10 anos de experiência em desenvolvimento de software, Rafael lidera nossa equipe técnica com foco em inovação e excelência.",
        specialties: ["Arquitetura de Software", "Cloud Computing", "Liderança Técnica"]
      },
      {
        name: "Camila Rocha",
        role: "Lead UX/UI Designer",
        image: "/images/team/camila.jpg",
        description: "Especialista em design centrado no usuário, Camila transforma requisitos complexos em interfaces intuitivas e visualmente atraentes.",
        specialties: ["Design de Interfaces", "Pesquisa de Usuários", "Prototipagem"]
      },
      {
        name: "Lucas Oliveira",
        role: "Desenvolvedor Full Stack Sênior",
        image: "/images/team/lucas.jpg",
        description: "Desenvolvedor versátil com profundo conhecimento em tecnologias frontend e backend, Lucas é especialista em criar soluções robustas e escaláveis.",
        specialties: ["React/Next.js", "Node.js", "AWS", "TypeScript"]
      }
    ] as TeamMember[]
  },

  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Respostas para as dúvidas mais comuns sobre nossos serviços e processo de trabalho.",
    items: [
      {
        question: "Quanto tempo leva para desenvolver um aplicativo?",
        answer: "O tempo de desenvolvimento varia conforme a complexidade do projeto. Um MVP pode levar de 2 a 3 meses, enquanto aplicações mais complexas podem levar 4 a 6 meses ou mais. Durante a fase de descoberta, fornecemos um cronograma detalhado específico para o seu projeto."
      },
      {
        question: "Quais tecnologias vocês utilizam?",
        answer: "Trabalhamos com um amplo conjunto de tecnologias modernas, incluindo React, React Native, Node.js, Next.js, TypeScript, Python, e diversas soluções de banco de dados. Escolhemos a stack tecnológica mais adequada para cada projeto, considerando requisitos específicos, escalabilidade e manutenção a longo prazo."
      },
      {
        question: "Como funciona o processo de orçamento?",
        answer: "Nosso processo de orçamento começa com uma consulta inicial gratuita para entender seu projeto. Em seguida, realizamos uma análise de requisitos e preparamos uma proposta detalhada com escopo, cronograma e investimento. Trabalhamos com modelos de preço fixo para projetos bem definidos ou time & materials para projetos mais flexíveis."
      },
      {
        question: "Vocês oferecem suporte após o lançamento?",
        answer: "Sim, oferecemos diversos planos de suporte e manutenção pós-lançamento. Estes incluem correção de bugs, atualizações de segurança, melhorias de performance e implementação de novos recursos. Podemos personalizar um plano de suporte que atenda às necessidades específicas do seu negócio."
      },
      {
        question: "É possível fazer modificações durante o desenvolvimento?",
        answer: "Sim, nossa metodologia ágil permite flexibilidade para ajustes durante o desenvolvimento. Trabalhamos em ciclos curtos (sprints) e realizamos revisões regulares, permitindo que você forneça feedback e solicite ajustes ao longo do processo. Mudanças significativas no escopo podem impactar prazos e custos, mas sempre discutimos isso transparentemente."
      },
      {
        question: "Vocês assinam acordos de confidencialidade (NDA)?",
        answer: "Absolutamente. Respeitamos a confidencialidade de suas ideias e informações. Estamos sempre dispostos a assinar acordos de não divulgação (NDAs) antes de discutir detalhes do seu projeto. A confiança e a segurança das informações são fundamentais em nosso relacionamento com os clientes."
      }
    ] as FAQItem[]
  },

  contact: {
    title: "Entre em Contato",
    subtitle: "Estamos prontos para transformar sua ideia em realidade. Preencha o formulário abaixo e iniciaremos uma conversa.",
    formCta: {
      title: "Vamos Trabalhar Juntos",
      subtitle: "Preencha o formulário completo para detalhar seu projeto e receber uma proposta personalizada.",
      buttonText: "Solicitar Orçamento"
    },
    projectTypes: [
      { id: "web", label: "Website/Aplicação Web" },
      { id: "mobile", label: "Aplicativo Mobile" },
      { id: "design", label: "UX/UI Design" },
      { id: "ecommerce", label: "E-commerce" },
      { id: "custom", label: "Sistema Personalizado" },
      { id: "other", label: "Outro" }
    ] as ProjectTypeOption[],
    budgetOptions: [
      { id: "small", label: "Até R$ 10.000" },
      { id: "medium", label: "R$ 10.000 - R$ 30.000" },
      { id: "large", label: "R$ 30.000 - R$ 50.000" },
      { id: "enterprise", label: "Acima de R$ 50.000" },
      { id: "undecided", label: "A definir" }
    ] as ProjectTypeOption[],
    timelineOptions: [
      { id: "urgent", label: "Urgente (< 1 mês)" },
      { id: "short", label: "Curto prazo (1-2 meses)" },
      { id: "medium", label: "Médio prazo (3-6 meses)" },
      { id: "long", label: "Longo prazo (> 6 meses)" },
      { id: "flexible", label: "Flexível" }
    ] as ProjectTypeOption[],
    serviceOptions: [
      { id: "web-dev", label: "Desenvolvimento Web" },
      { id: "mobile-dev", label: "Desenvolvimento Mobile" },
      { id: "ui-design", label: "UI/UX Design" },
      { id: "api", label: "Desenvolvimento de API" },
      { id: "ecommerce", label: "E-commerce" },
      { id: "mvp", label: "MVP" },
      { id: "consulting", label: "Consultoria Técnica" },
      { id: "maintenance", label: "Manutenção/Suporte" }
    ] as ProjectTypeOption[]
  },

  footer: {
    about: {
      title: "Sobre a BytefulCode",
      description: "Somos uma software house especializada em desenvolvimento de aplicações web e mobile de alta qualidade. Nossa missão é transformar ideias em soluções digitais inovadoras que impulsionam o sucesso dos nossos clientes."
    },
    contact: {
      title: "Contato",
      email: EMAIL_CONTACT,
      phone: PHONE_NUMBER,
      address: "Av. Paulista, 1000, São Paulo - SP"
    },
    social: {
      title: "Redes Sociais",
      items: [
        { name: "LinkedIn", url: "https://linkedin.com/company/bytefulcode" },
        { name: "GitHub", url: "https://github.com/bytefulcode" },
        { name: "Instagram", url: "https://instagram.com/bytefulcode" },
        { name: "Twitter", url: "https://twitter.com/bytefulcode" }
      ] as SocialLink[]
    },
    copyright: "© 2023 BytefulCode. Todos os direitos reservados."
  }
}; 