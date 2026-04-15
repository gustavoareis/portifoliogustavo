export interface Project {
  slug: string
  title: string
  tagline: string
  category: string
  year: string
  cover: string
  accent: string
  tags: string[]
  featured: boolean
  description: string
  problem: string
  process: string[]
  outcome: string
  metrics: { label: string; value: string }[]
  tools: string[]
  gallery: string[]
}

export const projects: Project[] = [
  {
    slug: 'nexus',
    title: 'Nexus',
    tagline: 'Dashboard SaaS para gestão de projetos em tempo real',
    category: 'Frontend · Full Stack',
    year: '2024',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    accent: '#3D6B52',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    description:
      'Plataforma SaaS de gestão de projetos com dashboard em tempo real, colaboração entre times e visualizações de dados interativas.',
    problem:
      'Times remotos tinham dificuldade em acompanhar o progresso de projetos em múltiplas ferramentas. A solução precisava centralizar dados, ser rápida e funcionar bem tanto em desktop quanto mobile.',
    process: [
      'Definição de arquitetura com Next.js App Router e Server Components',
      'Modelagem do banco de dados com Prisma e PostgreSQL',
      'Implementação de autenticação com NextAuth.js e OAuth',
      'Construção do design system com Radix UI e Tailwind CSS',
      'Integração de WebSockets com Pusher para atualizações em tempo real',
      'Deploy na Vercel com CI/CD via GitHub Actions',
    ],
    outcome:
      'Dashboard com atualizações ao vivo, drag-and-drop de tarefas, gráficos de burndown e notificações push. Performance de 98 no Lighthouse com SSR e cache otimizados.',
    metrics: [
      { label: 'Lighthouse Performance', value: '98' },
      { label: 'Redução no tempo de carregamento', value: '-72%' },
      { label: 'Usuários ativos no beta', value: '1.2k' },
    ],
    tools: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    ],
  },
  {
    slug: 'merca',
    title: 'Merca',
    tagline: 'E-commerce full stack com checkout otimizado',
    category: 'Full Stack · E-commerce',
    year: '2024',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    accent: '#5C7C8A',
    tags: ['Next.js', 'Stripe', 'Prisma', 'Redis'],
    featured: true,
    description:
      'Plataforma de e-commerce completa com gestão de estoque, pagamentos via Stripe, painel administrativo e integração com sistemas de logística.',
    problem:
      'Cliente com loja física precisava migrar para o digital rapidamente, mas as plataformas prontas tinham taxas altas e pouca flexibilidade para personalizações no fluxo de checkout.',
    process: [
      'Levantamento de requisitos e mapeamento do fluxo de compra',
      'Arquitetura com Next.js e API Routes para o backend',
      'Integração com Stripe Checkout e webhooks para confirmação de pagamento',
      'Cache com Redis para produtos e sessões de carrinho',
      'Painel admin com autenticação por roles e gestão de pedidos',
      'Otimização de imagens com next/image e CDN',
    ],
    outcome:
      'Checkout em 3 etapas com taxa de conversão 40% acima da média do setor. Sistema de cache reduziu o tempo de resposta de listagem de produtos para menos de 80ms.',
    metrics: [
      { label: 'Taxa de conversão no checkout', value: '+40%' },
      { label: 'Tempo de resposta da API', value: '< 80ms' },
      { label: 'Uptime em produção', value: '99.9%' },
    ],
    tools: ['Next.js', 'Stripe', 'Prisma', 'Redis', 'PostgreSQL', 'AWS S3'],
    gallery: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
      'https://images.unsplash.com/photo-1571867424488-4565932edb41?w=1200&q=80',
      'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1200&q=80',
    ],
  },
  {
    slug: 'pulso',
    title: 'Pulso',
    tagline: 'App de analytics em tempo real com visualizações interativas',
    category: 'Frontend · Data Viz',
    year: '2023',
    cover: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    accent: '#7A6B5A',
    tags: ['React', 'D3.js', 'Node.js', 'WebSockets'],
    featured: true,
    description:
      'Plataforma de analytics com gráficos interativos em tempo real, filtros avançados e exportação de relatórios para equipes de marketing e produto.',
    problem:
      'Times de produto precisavam visualizar métricas de comportamento do usuário sem depender de ferramentas caras como Mixpanel ou Amplitude. A solução precisava ser self-hosted e customizável.',
    process: [
      'Definição dos eventos a serem rastreados e estrutura do data pipeline',
      'Backend em Node.js com Express e WebSockets para streaming de eventos',
      'Banco de dados time-series com ClickHouse para consultas de alta performance',
      'Visualizações com D3.js — gráficos de linha, funil, heatmap e cohort',
      'Filtros dinâmicos com URL state management via nuqs',
      'Sistema de alertas com notificações por email e Slack',
    ],
    outcome:
      'Dashboard com latência abaixo de 200ms mesmo com 50k eventos/min. Visualizações customizáveis com drag-and-drop e exportação para CSV/PDF.',
    metrics: [
      { label: 'Latência máxima com 50k eventos/min', value: '< 200ms' },
      { label: 'Economia vs. ferramentas pagas', value: '-85%' },
      { label: 'Tipos de gráfico disponíveis', value: '12' },
    ],
    tools: ['React', 'D3.js', 'Node.js', 'ClickHouse', 'WebSockets', 'Docker'],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ],
  },
  {
    slug: 'forma',
    title: 'Forma',
    tagline: 'Design system e biblioteca de componentes open source',
    category: 'Frontend · Open Source',
    year: '2023',
    cover: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&q=80',
    accent: '#3D6B52',
    tags: ['React', 'TypeScript', 'Storybook', 'Radix UI'],
    featured: false,
    description:
      'Biblioteca de componentes React acessíveis e customizáveis, com documentação interativa no Storybook e suporte a temas via CSS custom properties.',
    problem:
      'Times de produto perdiam tempo recriando os mesmos componentes em projetos diferentes, sem consistência visual e sem atenção à acessibilidade.',
    process: [
      'Auditoria de componentes usados em 8 projetos diferentes',
      'Definição de tokens de design (cores, espaçamento, tipografia)',
      'Implementação com Radix UI Primitives como base acessível',
      'Estilização com CVA (Class Variance Authority) para variantes',
      'Documentação com Storybook e testes com Vitest + Testing Library',
      'Publicação no npm e setup de releases automáticos com Changesets',
    ],
    outcome:
      'Biblioteca com 40+ componentes, 100% acessíveis (WCAG 2.1 AA), com suporte a dark mode nativo e bundle size otimizado com tree-shaking.',
    metrics: [
      { label: 'Componentes disponíveis', value: '40+' },
      { label: 'Cobertura de testes', value: '94%' },
      { label: 'Downloads semanais no npm', value: '3.2k' },
    ],
    tools: ['React', 'TypeScript', 'Radix UI', 'Storybook', 'Vitest', 'Changesets'],
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80',
      'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&q=80',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
