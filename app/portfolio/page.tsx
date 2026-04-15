'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/projects'
import ProjectCard from '@/components/ProjectCard'
import AnimatedSection from '@/components/AnimatedSection'

const categories = ['Todos', 'Frontend', 'Full Stack', 'E-commerce', 'Open Source']

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered =
    activeFilter === 'Todos'
      ? projects
      : projects.filter((p) =>
          p.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        )

  return (
    <div className="pt-28">
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="py-16 pb-0 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            {/* Blob */}
            <div
              className="blob w-72 h-72 -z-10"
              style={{ background: 'var(--accent)', right: '-5%', top: '-30%' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-label mb-6">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Portfólio
              </div>
              <h1 className="text-heading mb-4" style={{ color: 'var(--text)' }}>
                Projetos & <em className="not-italic" style={{ color: 'var(--accent)' }}>Cases</em>
              </h1>
              <p className="text-base max-w-xl mb-10" style={{ color: 'var(--text-muted)' }}>
                Uma seleção de projetos que me orgulho — cada um com seus desafios técnicos, decisões de arquitetura e aprendizados.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-2 pb-12 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: activeFilter === cat ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: activeFilter === cat ? 'var(--bg)' : 'var(--text-muted)',
                    border: `1px solid ${activeFilter === cat ? 'var(--accent)' : 'var(--border)'}`,
                    transform: 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="py-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {filtered.length} {filtered.length === 1 ? 'projeto' : 'projetos'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} large={i === 0} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
