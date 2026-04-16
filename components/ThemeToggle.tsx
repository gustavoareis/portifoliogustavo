'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useCallback } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = useCallback(() => {
    const switchTheme = () => setTheme(isDark ? 'light' : 'dark')

    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }, [isDark, setTheme])

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)',
      }}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
