'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index?: number
  large?: boolean
}

export default function ProjectCard({ project, index = 0, large = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/portfolio/${project.slug}`} className="card-project block group">
        {/* Image */}
        <div
          className={`relative overflow-hidden ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
          style={{ background: 'var(--bg-secondary)' }}
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.35)' }}
          >
            <div className="flex items-center gap-2 text-white text-sm font-medium bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
              Ver case <ArrowUpRight size={15} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
                {project.category}
              </p>
              <h3 className="font-display text-2xl font-light leading-tight" style={{ color: 'var(--text)' }}>
                {project.title}
              </h3>
            </div>
            <span className="text-xs shrink-0 mt-1" style={{ color: 'var(--text-muted)' }}>
              {project.year}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
