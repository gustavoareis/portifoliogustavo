'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'] },
  { category: 'Banco de Dados', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma ORM'] },
  { category: 'DevOps & Tools', items: ['Git', 'Docker', 'CI/CD', 'Vercel', 'AWS'] },
]


export default function SobrePage() {
  return (
    <div className="pt-28">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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

            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="mb-10 md:mb-12">
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

    </div>
  )
}
