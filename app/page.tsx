'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getFeaturedProjects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import AnimatedSection from '@/components/AnimatedSection'
import AsciiBackground from '@/components/AsciiBackground'

const PHRASES = [
  'Full-stack web developer.',
  'Digital wizard.',
  'Crafting code and automating the future.',
]

function useTypewriter(phrases: string[], typingSpeed = 60, deletingSpeed = 35, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(i => i + 1), typingSpeed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(i => i - 1), deletingSpeed)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setPhraseIndex(i => (i + 1) % phrases.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}

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
  const typed = useTypewriter(PHRASES)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <AsciiBackground />
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div variants={stagger} initial="initial" animate="animate">
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
              {typed}
              <span
                style={{
                  animation: 'hero-blink 1s step-start infinite',
                  color: 'var(--accent)',
                }}
              >|</span>
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
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div
              className="p-12 md:p-16 text-center"
            >
              <p className="text-sm font-medium uppercase tracking-widest mb-6 opacity-70" style={{ color: 'var(--text-muted)' }}>
                Pronto para começar?
              </p>
              <h2
                className="font-display text-4xl md:text-6xl font-light mb-8 max-w-2xl mx-auto"
                style={{ color: 'var(--text)', lineHeight: '1.05' }}
              >
                Vamos construir algo incrível juntos
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'var(--accent)', color: '#F7F4EF' }}
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
