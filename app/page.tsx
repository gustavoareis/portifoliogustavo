'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import AnimatedSection from '@/components/AnimatedSection'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
}


export default function HomePage() {
  const featured = getFeaturedProjects()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div variants={stagger} initial="initial" animate="animate">
            {/* Label */}
            <motion.div variants={fadeUp} className="section-label mb-8">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
              Desenvolvedor Web Full Stack
            </motion.div>

            {/* Display name */}
            <motion.h1
              variants={fadeUp}
              className="text-display mb-6"
              style={{ color: 'var(--text)' }}
            >
              Gustavo
              <br />
              <em className="not-italic" style={{ color: 'var(--accent)' }}>Reis</em>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-subheading font-display font-light max-w-2xl mb-12"
              style={{ color: 'var(--text-muted)' }}
            >
              Construo interfaces modernas e aplicações web de alto desempenho — do design ao deploy.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/portfolio" className="btn-primary">
                Ver projetos <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-outline">
                Sobre mim
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Featured projects ────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <AnimatedSection className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-label mb-4">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Projetos selecionados
              </div>
              <h2 className="text-heading" style={{ color: 'var(--text)' }}>
                Trabalho recente
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
              style={{ color: 'var(--text-muted)' }}
            >
              Ver todos <ArrowUpRight size={16} />
            </Link>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} large={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div
              className="relative rounded-2xl p-12 md:p-16 overflow-hidden text-center"
              style={{ background: 'var(--accent)' }}
            >
              {/* Background leaf */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="300" height="400" viewBox="0 0 180 240" fill="none">
                  <path d="M90 230 C90 230 10 180 10 100 C10 40 50 10 90 10 C130 10 170 40 170 100 C170 180 90 230 90 230Z" fill="white" />
                </svg>
              </div>

              <p className="text-sm font-medium uppercase tracking-widest mb-6 opacity-70" style={{ color: '#F7F4EF' }}>
                Pronto para começar?
              </p>
              <h2
                className="font-display text-4xl md:text-6xl font-light mb-8 max-w-2xl mx-auto"
                style={{ color: '#F7F4EF', lineHeight: '1.05' }}
              >
                Vamos construir algo incrível juntos
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ background: '#F7F4EF', color: 'var(--accent)' }}
              >
                Iniciar conversa <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
