'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getFeaturedProjects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import AnimatedSection from '@/components/AnimatedSection'
import AsciiBackground from '@/components/AsciiBackground'

const PHRASES = [
  'Full-stack web developer.',
  'Digital wizard.',
  'Crafting code and automating the future.',
]

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function useTypewriter(phrases: string[], typingSpeed = 60, deletingSpeed = 35, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reducedMotion.current) {
      setDisplayed(phrases[phrases.length - 1])
      return
    }

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

export default function HomePage() {
  const featured = getFeaturedProjects()
  const typed = useTypewriter(PHRASES)

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <AsciiBackground />
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.h1 variants={fadeUp} className="text-display mb-6">
              Gustavo
              <br />
              <span className="text-accent">Reis</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-subheading font-display font-light max-w-2xl mb-12 text-muted"
              aria-live="polite"
              aria-atomic="true"
            >
              {typed}
              <span className="typewriter-cursor">|</span>
            </motion.p>

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

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="flex items-end justify-between mb-10 md:mb-12 flex-wrap gap-4">
            <div>
              <div className="section-label mb-4">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Projetos selecionados
              </div>
              <h2 className="text-heading">Trabalho recente</h2>
            </div>
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent text-muted"
            >
              Ver todos <ArrowUpRight size={16} />
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="p-8 sm:p-12 md:p-16 text-center">
              <p className="text-sm font-medium uppercase tracking-widest mb-6 opacity-70 text-muted">
                Pronto para começar?
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-6xl font-light mb-8 max-w-2xl mx-auto"
                style={{ lineHeight: '1.05' }}
              >
                Vamos construir algo incrível juntos
              </h2>
              <Link href="/contact" className="btn-primary">
                Iniciar conversa <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
