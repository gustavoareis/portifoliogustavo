import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Gustavo Reis — Desenvolvedor Web',
    template: '%s | Gustavo Reis',
  },
  description:
    'Portfolio de Gustavo Reis, Desenvolvedor Web Full Stack com foco em interfaces modernas, performance e experiências digitais de alto impacto.',
  keywords: ['desenvolvedor web', 'frontend', 'full stack', 'react', 'next.js', 'portfolio'],
  authors: [{ name: 'Gustavo Reis' }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://gustavoreis.design',
    siteName: 'Gustavo Reis Design',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="grain-overlay" aria-hidden="true" />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
