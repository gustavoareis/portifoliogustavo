import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p
          className="font-display mb-4"
          style={{
            fontSize: 'clamp(6rem, 20vw, 14rem)',
            lineHeight: '1',
            color: 'var(--border)',
            fontWeight: '300',
          }}
        >
          404
        </p>
        <h1 className="font-display text-2xl font-light mb-3" style={{ color: 'var(--text)' }}>
          Página não encontrada
        </h1>
        <p className="text-base mb-8" style={{ color: 'var(--text-muted)' }}>
          Talvez ela tenha se perdido na floresta.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Voltar ao início
        </Link>
      </div>
    </div>
  )
}
