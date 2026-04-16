import Link from 'next/link'
import { Instagram, Linkedin, Mail } from 'lucide-react'

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:gustavo@email.com', label: 'Email' },
]

const links = [
  { href: '/about', label: 'Sobre' },
  { href: '/portfolio', label: 'Portfólio' },
  { href: '/contact', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer
      className="border-t mt-32"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-xl font-medium" style={{ color: 'var(--text)' }}>
              G<span style={{ color: 'var(--accent)' }}>.</span>Reis
            </Link>
            <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
              Desenvolvedor Web Full Stack
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="divider my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} Gustavo Reis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
