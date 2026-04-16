'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Instagram, Linkedin, Dribbble, Mail, MapPin, Clock } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

const socials = [
  { icon: Instagram, label: 'Instagram', handle: '@gustavoreis.design', href: 'https://instagram.com' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'Gustavo Reis', href: 'https://linkedin.com' },
  { icon: Dribbble, label: 'Dribbble', handle: 'gustavoreis', href: 'https://dribbble.com' },
]

export default function ContatoPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
  }

  return (
    <div className="pt-28">
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <div
              className="blob w-80 h-80 -z-10"
              style={{ background: 'var(--accent)', left: '-5%', top: '-20%' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="section-label mb-6">
                <span className="w-8 h-px" style={{ background: 'var(--accent)' }} />
                Contato
              </div>
              <h1 className="text-heading mb-4" style={{ color: 'var(--text)' }}>
                Vamos trabalhar <em className="not-italic" style={{ color: 'var(--accent)' }}>juntos</em>
              </h1>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Seja para um projeto novo, uma parceria ou apenas para trocar uma ideia — estou disponível. Respondo em até 24 horas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Form */}
            <AnimatedSection>
              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 rounded-2xl text-center"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Send size={24} color="#F7F4EF" />
                  </div>
                  <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--text)' }}>
                    Mensagem enviada!
                  </h2>
                  <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                    Obrigado pelo contato. Retorno em breve.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Assunto
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="web">Desenvolvimento Web</option>
                      <option value="fullstack">Projeto Full Stack</option>
                      <option value="api">API / Backend</option>
                      <option value="consultoria">Consultoria Técnica</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Conte sobre seu projeto, objetivo e prazo..."
                      className="input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensagem <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Sidebar info */}
            <AnimatedSection delay={0.15} className="space-y-6">
              {/* Info cards */}
              <div
                className="p-6 rounded-xl"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-display text-lg font-medium mb-5" style={{ color: 'var(--text)' }}>
                  Informações
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                      <Mail size={14} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>Email</p>
                      <a
                        href="mailto:gustavo@email.com"
                        className="text-sm font-medium hover:text-accent transition-colors"
                        style={{ color: 'var(--text)' }}
                      >
                        gustavo@email.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                      <MapPin size={14} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>Localização</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                        São Paulo, Brasil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                      <Clock size={14} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>Disponibilidade</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                        Seg–Sex, 9h–18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div
                className="p-6 rounded-xl"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-display text-lg font-medium mb-5" style={{ color: 'var(--text)' }}>
                  Redes sociais
                </h3>
                <div className="space-y-3">
                  {socials.map(({ icon: Icon, label, handle, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02]"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div
                className="p-5 rounded-xl flex items-center gap-3"
                style={{ background: 'rgba(61, 107, 82, 0.1)', border: '1px solid rgba(61, 107, 82, 0.25)' }}
              >
                <span className="relative w-3 h-3 shrink-0">
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span
                    className="absolute inset-0.5 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  Disponível para novos projetos
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
