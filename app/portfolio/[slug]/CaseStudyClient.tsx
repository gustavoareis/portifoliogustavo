'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import AnimatedSection from '@/components/AnimatedSection'

interface Props {
  project: Project
}

export default function CaseStudyClient({ project }: Props) {
  return (
    <div className="pt-24">
      {/* ── Back ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={15} /> Voltar ao portfólio
        </Link>
      </div>

      {/* ── Hero Cover ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[16/8] rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
          />

          {/* Title overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {project.category} · {project.year}
            </p>
            <h1 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '300' }}>
              {project.title}
            </h1>
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* ── Overview grid ────────────────────────────────────── */}
        <AnimatedSection className="grid md:grid-cols-3 gap-5 mb-20">
          {/* Description */}
          <div
            className="md:col-span-2 p-8 rounded-xl"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <p className="section-label mb-4">
              <span className="w-6 h-px" style={{ background: 'var(--accent)' }} />
              Visão geral
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>
          </div>

          {/* Meta */}
          <div
            className="p-8 rounded-xl flex flex-col justify-between gap-6"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Ferramentas</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span key={tool} className="tag-chip">{tool}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Metrics ──────────────────────────────────────────── */}
        <AnimatedSection className="mb-20">
          <div className="section-label mb-6">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            Resultados
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {project.metrics.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-xl text-center"
                style={{ background: 'var(--accent)', border: '1px solid var(--accent)' }}
              >
                <p className="font-display text-4xl font-light mb-2" style={{ color: 'var(--bg)' }}>{value}</p>
                <p className="text-sm" style={{ color: 'rgba(247,244,239,0.8)' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Problem ──────────────────────────────────────────── */}
        <AnimatedSection className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-4">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                O Problema
              </div>
              <h2 className="text-heading mb-6" style={{ color: 'var(--text)' }}>
                Qual era o desafio?
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.problem}
              </p>
            </div>
            <div
              className="relative aspect-video rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <Image
                src={project.gallery[0]}
                alt="Contexto do problema"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Process ──────────────────────────────────────────── */}
        <AnimatedSection className="mb-20">
          <div
            className="p-10 rounded-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <div className="section-label mb-4">
              <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
              Processo UX
            </div>
            <h2 className="text-heading mb-8" style={{ color: 'var(--text)' }}>
              Como chegamos lá
            </h2>
            <div className="space-y-4">
              {project.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-5"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-base leading-relaxed pt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Gallery ──────────────────────────────────────────── */}
        <AnimatedSection className="mb-20">
          <div className="section-label mb-6">
            <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
            Galeria
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 aspect-video' : 'aspect-video'}`}
                style={{ background: 'var(--bg-secondary)' }}
              >
                <Image
                  src={img}
                  alt={`${project.title} — imagem ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Outcome ──────────────────────────────────────────── */}
        <AnimatedSection className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="relative aspect-video rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <Image
                src={project.gallery[2] || project.gallery[0]}
                alt="Design final"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 50vw, 600px"
              />
            </div>
            <div>
              <div className="section-label mb-4">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Design Final
              </div>
              <h2 className="text-heading mb-6" style={{ color: 'var(--text)' }}>
                O resultado
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.outcome}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Navigation ───────────────────────────────────────── */}
        <div className="divider mb-12" />
        <AnimatedSection className="flex items-center justify-between pb-24">
          <Link href="/portfolio" className="btn-outline">
            <ArrowLeft size={16} /> Todos os projetos
          </Link>
          <Link href="/contact" className="btn-primary">
            Iniciar um projeto <ArrowUpRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
