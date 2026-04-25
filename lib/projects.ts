export interface Project {
  slug: string
  title: string
  tagline: string
  category: string
  cover: string
  accent: string
  featured: boolean
  description: string
  features: string[]
  links: { github?: string; live?: string; repo?: string }
  tools: string[]
  gallery: string[]
}

export const projects: Project[] = [
  {
    slug: 'miwbot',
    title: 'Miwbot',
    tagline: 'Bot de Discord open source, moderno e leve para servidores',
    category: 'Backend · Open Source',
    cover: '/portifoliogustavo/cover-miwbot.png',
    accent: '#7C3AED',
    featured: true,
    description:
      'Bot de Discord open source construído sobre a opencord, uma codebase modular e extensível. Focado em leveza, facilidade de uso e uma experiência moderna para servidores.',
    features: [
      'Comandos slash nativos com resposta rápida',
      'Arquitetura modular — fácil adicionar ou remover funcionalidades',
      'Codebase separada (opencord) para quem quiser criar o próprio bot',
      'Deploy simplificado via variáveis de ambiente',
      'Landing page com convite direto ao servidor',
    ],
    links: {
      github: 'https://github.com/gustavoareis/miwbot',
      repo: 'https://github.com/gustavoareis/opencord',
      live: 'https://miwbot.vercel.app/',
    },
    tools: ['TypeScript', 'Python', 'Node.js', 'Discord.js', 'GitHub Actions'],
    gallery: [
      '/portifoliogustavo/cover-miwbot.png',
    ],
  },
  {
    slug: 'anest-calc',
    title: 'AnestCalc',
    tagline: 'Calculadora de anestesia odontológica para uso clínico',
    category: 'Flutter · Saúde',
    cover: '/portifoliogustavo/cover-anest.png',
    accent: '#2D6A4F',
    featured: true,
    description:
      'Ferramenta clínica para cálculo de anestésicos odontológicos. Filtra os anestésicos seguros com base no perfil do paciente — cardiopata, hipertenso, diabético, gestante, criança, idoso — em um fluxo guiado de 5 etapas.',
    features: [
      'Seleção de perfil clínico do paciente (7 perfis suportados)',
      'Filtragem automática de anestésicos seguros por perfil',
      'Fluxo guiado em 5 etapas com validação a cada passo',
      'Interface limpa focada em uso clínico rápido',
    ],
    links: {
      github: 'https://github.com/gustavoareis/anest-calc',
      live: 'https://gustavoareis.github.io/anest-calc/',
    },
    tools: ['Flutter', 'Dart'],
    gallery: [
      '/portifoliogustavo/cover-anest.png',
    ],
  },
  {
    slug: 'yt-downloader',
    title: 'YT Downloader',
    tagline: 'Baixe vídeos e músicas do YouTube via terminal',
    category: 'Backend · CLI',
    cover: '/portifoliogustavo/cover-ytd.png',
    accent: '#8B5CF6',
    featured: true,
    description:
      'Ferramenta de linha de comando feita em Go para baixar vídeos e músicas do YouTube. Interface TUI com estética retro, navegação por teclado e suporte a múltiplos formatos.',
    features: [
      'Download de vídeo e áudio separadamente',
      'Interface TUI com navegação por teclado ([Enter] / [q])',
      'Suporte a múltiplos formatos de saída',
      'Estética retro com tipografia pixel no terminal',
    ],
    links: {
      github: 'https://github.com/gustavoareis/yt-downloader',
    },
    tools: ['Go'],
    gallery: [
      '/portifoliogustavo/cover-ytd.png',
    ],
  },
  {
    slug: 'qr-code-gen',
    title: 'QR Code Gen',
    tagline: 'Gerador de QR Code rápido e minimalista feito com Next.js',
    category: 'Frontend · Ferramenta',
    cover: '/portifoliogustavo/cover-qrcode.png',
    accent: '#0EA5E9',
    featured: true,
    description:
      'Aplicação web para geração de QR Codes de forma rápida. Interface limpa, resultado instantâneo e download direto.',
    features: [
      'Geração de QR Code instantânea a partir de qualquer texto ou URL',
      'Download do QR Code em PNG com um clique',
      'Interface minimalista focada em velocidade de uso',
    ],
    links: {
      github: 'https://github.com/gustavoareis/qr-code-generator',
      live: 'https://qr-code-generator-three-xi.vercel.app/',
    },
    tools: ['Next.js', 'React', 'TypeScript'],
    gallery: [
      '/portifoliogustavo/cover-qrcode.png',
    ],
  },
  {
    slug: 'nefi-ink',
    title: 'Nefi Ink',
    tagline: 'Landing page para artista tatuador',
    category: 'Frontend · Landing Page',
    cover: '/portifoliogustavo/cover-nefi.png',
    accent: '#C41E1E',
    featured: true,
    description:
      'Landing page desenvolvida para um artista tatuador, com foco em apresentar o portfólio, estilo e contato de forma visualmente impactante.',
    features: [
      'Apresentação do portfólio de tatuagens com galeria',
      'Seção de estilos e especialidades do artista',
      'Formulário ou link direto para agendamento',
      'Design responsivo e otimizado para mobile',
    ],
    links: {
      github: 'https://github.com/gustavoareis/nefi-ink',
      live: 'https://gustavoareis.github.io/nefi-ink/',
    },
    tools: ['Next.js', 'React', 'TypeScript'],
    gallery: [
      '/portifoliogustavo/cover-nefi.png',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
