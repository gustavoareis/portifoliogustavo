'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'] },
  { category: 'Banco de Dados', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma ORM'] },
  { category: 'DevOps & Tools', items: ['Git', 'Docker', 'CI/CD', 'Vercel', 'AWS'] },
]

const tools = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'Docker', level: 75 },
  { name: 'AWS', level: 70 },
  { name: 'GraphQL', level: 72 },
  { name: 'React Native', level: 65 },
]

const timeline = [
  { year: '2024–Atual', role: 'Desenvolvedor Web Full Stack', company: 'Freelance', desc: 'Projetos web para startups e empresas — do MVP ao produto em produção.' },
  { year: '2022–2024', role: 'Desenvolvedor Frontend Sr.', company: 'Agência Digital', desc: 'Liderança técnica de interfaces React em +20 projetos.' },
  { year: '2020–2022', role: 'Desenvolvedor Full Stack Jr.', company: 'Startup SaaS', desc: 'Construção de features em Next.js, Node.js e PostgreSQL.' },
  { year: '2016–2020', role: 'Graduação em Ciência da Computação', company: 'USP — São Paulo', desc: 'Foco em algoritmos, sistemas distribuídos e engenharia de software.' },
]

export default function SobrePage() {
  return (
    <div className="pt-28">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="section-label mb-6">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Sobre mim
              </div>
              <h1 className="text-heading mb-6" style={{ color: 'var(--text)' }}>
                Código com atenção a cada
                <em className="not-italic" style={{ color: 'var(--accent)' }}> detalhe</em>
              </h1>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  Sou Gustavo Reis, desenvolvedor web full stack com mais de 6 anos de experiência construindo aplicações modernas, rápidas e escaláveis.
                </p>
                <p>
                  Trabalho principalmente com o ecossistema React e Next.js no frontend, Node.js no backend, e tenho atenção especial à performance, acessibilidade e qualidade de código.
                </p>
                <p>
                  Acredito que bom desenvolvimento web vai além de fazer funcionar — é sobre criar experiências fluidas que as pessoas realmente gostam de usar.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="btn-primary">
                  Iniciar projeto <ArrowRight size={16} />
                </Link>
                <a href="#" className="btn-outline">
                  Baixar currículo <Download size={16} />
                </a>
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Gustavo Reis"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 p-5 rounded-xl shadow-xl"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <p className="font-display text-3xl font-light" style={{ color: 'var(--accent)' }}>80+</p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>projetos entregues</p>
              </motion.div>
              <div
                className="blob w-64 h-64 -z-10"
                style={{ background: 'var(--accent)', right: '-8%', bottom: '15%' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <div className="section-label mb-4">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
              Competências
            </div>
            <h2 className="text-heading" style={{ color: 'var(--text)' }}>
              Habilidades
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map(({ category, items }, i) => (
              <AnimatedSection key={category} delay={i * 0.08}>
                <div
                  className="p-6 rounded-xl h-full"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                >
                  <h3 className="font-display text-lg font-medium mb-4" style={{ color: 'var(--text)' }}>
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div className="section-label mb-4">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Stack
              </div>
              <h2 className="text-heading mb-4" style={{ color: 'var(--text)' }}>
                Tecnologias
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Escolho as ferramentas certas para cada problema — sem hype desnecessário.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-5">
                {tools.map(({ name, level }, i) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{name}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--accent)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <div className="section-label mb-4">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
              Trajetória
            </div>
            <h2 className="text-heading" style={{ color: 'var(--text)' }}>
              Experiência
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-4 top-3 bottom-3 w-px" style={{ background: 'var(--border)' }} />
            <div className="space-y-8 pl-12">
              {timeline.map(({ year, role, company, desc }, i) => (
                <AnimatedSection key={year} delay={i * 0.1} className="relative">
                  <div
                    className="absolute -left-[2.35rem] top-1.5 w-3 h-3 rounded-full border-2"
                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
                  />
                  <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                    {year}
                  </p>
                  <h3 className="font-display text-xl font-medium" style={{ color: 'var(--text)' }}>
                    {role}
                  </h3>
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                    {company}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {desc}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
