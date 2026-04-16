'use client'

import { useEffect, useRef } from 'react'

const CHARS = ' .:;+=*#%@'
const GLITCH_CHARS = '!$^&~|/\\<>?{}[]±≠∞█▓▒░'
const CHAR_W = 8
const CHAR_H = 13

// Physics
const REPULSE_RADIUS = 110
const REPULSE_STRENGTH = 7
const SPRING = 0.055
const DAMPING = 0.80

// Glitch
const GLITCH_RADIUS = 145

interface Cell {
  char: string
  alpha: number
  homeX: number
  homeY: number
  x: number
  y: number
  vx: number
  vy: number
  glitchChar: string
  glitchActive: boolean
  glitchOffsetX: number
  glitchTimer: number
}

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -99999, y: -99999 })
  const cellsRef = useRef<Cell[]>([])
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Build cell list from SVG ───────────────────────────────────
    const buildCells = (img: HTMLImageElement) => {
      const cols = Math.floor(canvas.width / CHAR_W)
      const rows = Math.floor(canvas.height / CHAR_H)
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const offCtx = off.getContext('2d')!
      offCtx.clearRect(0, 0, cols, rows)

      // Draw with cover strategy — preserve aspect ratio, fill the canvas
      const imgW = img.naturalWidth || img.width
      const imgH = img.naturalHeight || img.height
      const imgAspect = imgW / imgH
      const canvasAspect = cols / rows

      let drawW: number, drawH: number, drawX: number, drawY: number
      if (imgAspect > canvasAspect) {
        // Image is relatively wider — fit by height, crop sides
        drawH = rows
        drawW = rows * imgAspect
        drawX = (cols - drawW) / 2
        drawY = 0
      } else {
        // Image is relatively taller — fit by width, crop top/bottom
        drawW = cols
        drawH = cols / imgAspect
        drawX = 0
        drawY = (rows - drawH) / 2
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH)
      const { data } = offCtx.getImageData(0, 0, cols, rows)

      const cells: Cell[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const a = data[(r * cols + c) * 4 + 3]
          if (a < 8) continue
          const charIdx = Math.round((a / 255) * (CHARS.length - 1))
          const hx = c * CHAR_W
          const hy = r * CHAR_H
          cells.push({
            char: CHARS[charIdx], alpha: a,
            homeX: hx, homeY: hy, x: hx, y: hy, vx: 0, vy: 0,
            glitchChar: CHARS[charIdx], glitchActive: false,
            glitchOffsetX: 0, glitchTimer: 0,
          })
        }
      }
      cellsRef.current = cells
    }

    const setup = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const img = new Image()
      img.src = '/portifoliogustavo/images/background-img.svg'
      img.onload = () => buildCells(img)
    }

    setup()

    const randGlitch = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]

    // ── Render + physics loop ──────────────────────────────────────
    const render = () => {
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(render); return }
      const cells = cellsRef.current
      if (!cells.length) { rafRef.current = requestAnimationFrame(render); return }

      const isDark = document.documentElement.classList.contains('dark')
      const { x: mx, y: my } = mouseRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `11px "Courier New", monospace`
      ctx.textBaseline = 'top'

      for (const cell of cells) {
        const cdx = cell.x - mx
        const cdy = cell.y - my
        const dist = Math.sqrt(cdx * cdx + cdy * cdy)

        // ── Physics ─────────────────────────────────────────────
        const ox = cell.x - cell.homeX
        const oy = cell.y - cell.homeY
        const displaced = Math.abs(cell.vx) > 0.01 || Math.abs(cell.vy) > 0.01
                       || Math.abs(ox) > 0.1 || Math.abs(oy) > 0.1
        const active = dist < Math.max(REPULSE_RADIUS, GLITCH_RADIUS) + 60

        if (active || displaced) {
          cell.vx += (cell.homeX - cell.x) * SPRING
          cell.vy += (cell.homeY - cell.y) * SPRING

          if (dist < REPULSE_RADIUS && dist > 0) {
            const force = ((1 - dist / REPULSE_RADIUS) ** 2) * REPULSE_STRENGTH
            cell.vx += (cdx / dist) * force
            cell.vy += (cdy / dist) * force
          }

          cell.vx *= DAMPING
          cell.vy *= DAMPING
          cell.x += cell.vx
          cell.y += cell.vy

          if (!active && Math.abs(cell.vx) < 0.02 && Math.abs(cell.vy) < 0.02
              && Math.abs(ox) < 0.2 && Math.abs(oy) < 0.2) {
            cell.x = cell.homeX; cell.y = cell.homeY
            cell.vx = 0; cell.vy = 0
          }
        }

        // ── Glitch state machine ─────────────────────────────────
        if (dist < GLITCH_RADIUS) {
          const t = 1 - dist / GLITCH_RADIUS          // 1 = center, 0 = edge
          const glitchRate  = 0.01 + t * 0.10         // how often corruption starts
          const restoreRate = 0.18 + t * 0.12         // how often it restores

          cell.glitchTimer--
          if (cell.glitchTimer <= 0) {
            if (!cell.glitchActive && Math.random() < glitchRate) {
              cell.glitchActive   = true
              cell.glitchChar     = randGlitch()
              cell.glitchOffsetX  = (Math.random() - 0.5) * 9
              cell.glitchTimer    = Math.floor(4 + Math.random() * 8)
            } else if (cell.glitchActive && Math.random() < restoreRate) {
              cell.glitchActive  = false
              cell.glitchOffsetX = 0
              cell.glitchTimer   = Math.floor(6 + Math.random() * 14)
            }
          }
        } else {
          cell.glitchActive  = false
          cell.glitchOffsetX = 0
          cell.glitchTimer   = 0
        }

        // ── Draw ─────────────────────────────────────────────────
        const dispDist = Math.sqrt((cell.x - cell.homeX) ** 2 + (cell.y - cell.homeY) ** 2)
        const dispT    = Math.min(1, dispDist / 35)
        const baseOp   = isDark ? (cell.alpha / 255) * 0.20 : (cell.alpha / 255) * 0.70
        const op       = baseOp + dispT * 0.6

        const drawChar = cell.glitchActive ? cell.glitchChar : cell.char
        const drawX    = cell.x + (cell.glitchActive ? cell.glitchOffsetX : 0)
        const drawY    = cell.y

        if (cell.glitchActive) {
          // Aberração cromática: camada ciano + camada vermelha
          ctx.fillStyle = 'rgba(0,220,255,0.32)'
          ctx.fillText(drawChar, drawX - 2.5, drawY)

          ctx.fillStyle = 'rgba(255,30,80,0.32)'
          ctx.fillText(drawChar, drawX + 2.5, drawY)
        }

        // Char principal — mais brilhante quando glitchando
        const mainOp = cell.glitchActive ? Math.min(1, op + 0.5) : op
        ctx.fillStyle = isDark
          ? `rgba(225,210,190,${mainOp.toFixed(3)})`
          : `rgba(65,48,28,${mainOp.toFixed(3)})`
        ctx.fillText(drawChar, drawX, drawY)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    render()

    // ── Mouse tracking ────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current = (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height)
        ? { x, y }
        : { x: -99999, y: -99999 }
    }

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', setup)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
