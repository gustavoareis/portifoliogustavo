import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, projects } from '@/lib/projects'
import CaseStudyClient from './CaseStudyClient'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — ${project.category}`,
    description: project.description,
  }
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return <CaseStudyClient project={project} />
}
