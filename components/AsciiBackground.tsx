'use client'

import { useEffect, useRef } from 'react'

const CHARS = ' .:;+=*#%@'
const GLITCH_CHARS = '!$^&~|/\\<>?{}[]±≠∞█▓▒░'
const CHAR_W = 5
const CHAR_H = 8
const FONT_SIZE = 7
const REPULSE_RADIUS = 110
const REPULSE_STRENGTH = 7
const SPRING = 0.055
const DAMPING = 0.80
const GLITCH_RADIUS = 145
const ACTIVE_RADIUS = Math.max(REPULSE_RADIUS, GLITCH_RADIUS) + 60

// Pre-computed squared radii — avoids sqrt for out-of-range cells
const ACTIVE_RADIUS_SQ = ACTIVE_RADIUS * ACTIVE_RADIUS
const REPULSE_RADIUS_SQ = REPULSE_RADIUS * REPULSE_RADIUS
const GLITCH_RADIUS_SQ = GLITCH_RADIUS * GLITCH_RADIUS
const DISP_MAX = 35
const DISP_MAX_SQ = DISP_MAX * DISP_MAX

const randGlitch = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]

interface Cell {
  char: string
  alpha: number
  baseOpDark: number   // pre-computed: (alpha/255)*0.20
  baseOpLight: number  // pre-computed: (alpha/255)*0.70
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
  const staticCacheRef = useRef<HTMLCanvasElement | null>(null)
  const lastThemeRef = useRef<boolean | null>(null)
  const cacheCurrentRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const buildStaticCache = (cells: Cell[], isDark: boolean) => {
      const sc = document.createElement('canvas')
      sc.width = canvas.width
      sc.height = canvas.height
      const sctx = sc.getContext('2d')!
      sctx.font = `${FONT_SIZE}px "Courier New", monospace`
      sctx.textBaseline = 'top'
      const len = cells.length
      for (let i = 0; i < len; i++) {
        const cell = cells[i]
        const op = isDark ? cell.baseOpDark : cell.baseOpLight
        sctx.fillStyle = isDark
          ? `rgba(225,210,190,${op})`
          : `rgba(65,48,28,${op})`
        sctx.fillText(cell.char, cell.homeX, cell.homeY)
      }
      staticCacheRef.current = sc
      lastThemeRef.current = isDark
      cacheCurrentRef.current = false
    }

    const buildCells = (img: HTMLImageElement) => {
      const cols = Math.floor(canvas.width / CHAR_W)
      const rows = Math.floor(canvas.height / CHAR_H)
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const offCtx = off.getContext('2d')!
      offCtx.clearRect(0, 0, cols, rows)

      const imgW = img.naturalWidth || img.width
      const imgH = img.naturalHeight || img.height
      const imgAspect = imgW / imgH
      // Account for non-square characters (CHAR_W × CHAR_H) to avoid distortion
      const canvasAspect = (cols * CHAR_W) / (rows * CHAR_H)

      let drawW: number, drawH: number, drawX: number, drawY: number
      if (imgAspect > canvasAspect) {
        drawH = rows
        drawW = rows * (CHAR_H / CHAR_W) * imgAspect
        drawX = (cols - drawW) / 2
        drawY = 0
      } else {
        drawW = cols
        drawH = cols * (CHAR_W / CHAR_H) / imgAspect
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
          // Pre-compute base opacities to avoid per-frame division
          const norm = a / 255
          cells.push({
            char: CHARS[charIdx], alpha: a,
            baseOpDark: norm * 0.20,
            baseOpLight: norm * 0.70,
            homeX: hx, homeY: hy, x: hx, y: hy, vx: 0, vy: 0,
            glitchChar: CHARS[charIdx], glitchActive: false,
            glitchOffsetX: 0, glitchTimer: 0,
          })
        }
      }
      cellsRef.current = cells

      const isDark = document.documentElement.classList.contains('dark')
      buildStaticCache(cells, isDark)
    }

    const setup = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const img = new Image()
      img.src = '/portifoliogustavo/images/background-img.svg'
      img.onload = () => buildCells(img)
    }

    setup()

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      if (!visibleRef.current) return
      const cells = cellsRef.current
      if (!cells.length || !staticCacheRef.current) return

      const isDark = document.documentElement.classList.contains('dark')

      // Rebuild static cache on theme change
      if (lastThemeRef.current !== isDark) {
        buildStaticCache(cells, isDark)
      }

      const { x: mx, y: my } = mouseRef.current
      const mouseActive = mx > -9999

      // Check for displaced cells when mouse is away
      let hasDisplaced = false
      if (!mouseActive) {
        const len = cells.length
        for (let i = 0; i < len; i++) {
          const c = cells[i]
          if (Math.abs(c.x - c.homeX) > 0.1 || Math.abs(c.y - c.homeY) > 0.1 || c.glitchActive) {
            hasDisplaced = true
            break
          }
        }
      }

      // Nothing to animate: blit cache once and skip
      if (!mouseActive && !hasDisplaced) {
        if (!cacheCurrentRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(staticCacheRef.current, 0, 0)
          cacheCurrentRef.current = true
        }
        return
      }

      // Blit static cache as base layer
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(staticCacheRef.current, 0, 0)
      cacheCurrentRef.current = false

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`
      ctx.textBaseline = 'top'

      const colorPrefix = isDark ? 'rgba(225,210,190,' : 'rgba(65,48,28,'
      const len = cells.length

      for (let i = 0; i < len; i++) {
        const cell = cells[i]
        const cdx = cell.x - mx
        const cdy = cell.y - my
        // Use squared distance — avoids sqrt for the ~97% of cells outside active radius
        const dist2 = cdx * cdx + cdy * cdy

        const ox = cell.x - cell.homeX
        const oy = cell.y - cell.homeY
        const displaced = Math.abs(cell.vx) > 0.01 || Math.abs(cell.vy) > 0.01
                       || Math.abs(ox) > 0.1 || Math.abs(oy) > 0.1
        const active = dist2 < ACTIVE_RADIUS_SQ

        if (!active && !displaced) continue

        // Only compute sqrt for cells that need it
        const dist = Math.sqrt(dist2)

        // Physics
        cell.vx += (cell.homeX - cell.x) * SPRING
        cell.vy += (cell.homeY - cell.y) * SPRING

        if (dist2 < REPULSE_RADIUS_SQ && dist2 > 0) {
          const force = ((1 - dist / REPULSE_RADIUS) ** 2) * REPULSE_STRENGTH
          const invDist = 1 / dist
          cell.vx += cdx * invDist * force
          cell.vy += cdy * invDist * force
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

        // Glitch
        if (dist2 < GLITCH_RADIUS_SQ) {
          const t = 1 - dist / GLITCH_RADIUS
          const glitchRate = 0.01 + t * 0.10
          const restoreRate = 0.18 + t * 0.12

          cell.glitchTimer--
          if (cell.glitchTimer <= 0) {
            if (!cell.glitchActive && Math.random() < glitchRate) {
              cell.glitchActive = true
              cell.glitchChar = randGlitch()
              cell.glitchOffsetX = (Math.random() - 0.5) * 9
              cell.glitchTimer = Math.floor(4 + Math.random() * 8)
            } else if (cell.glitchActive && Math.random() < restoreRate) {
              cell.glitchActive = false
              cell.glitchOffsetX = 0
              cell.glitchTimer = Math.floor(6 + Math.random() * 14)
            }
          }
        } else {
          cell.glitchActive = false
          cell.glitchOffsetX = 0
          cell.glitchTimer = 0
        }

        const dxHome = cell.x - cell.homeX
        const dyHome = cell.y - cell.homeY
        const dispDist2 = dxHome * dxHome + dyHome * dyHome
        const dispT = dispDist2 >= DISP_MAX_SQ ? 1 : Math.sqrt(dispDist2) / DISP_MAX
        const baseOp = isDark ? cell.baseOpDark : cell.baseOpLight
        const op = baseOp + dispT * 0.6
        const drawChar = cell.glitchActive ? cell.glitchChar : cell.char
        const drawX = cell.x + (cell.glitchActive ? cell.glitchOffsetX : 0)

        // Erase the static copy at home position, then redraw dynamically
        ctx.clearRect(cell.homeX, cell.homeY, CHAR_W + 1, CHAR_H + 1)

        if (cell.glitchActive) {
          ctx.fillStyle = 'rgba(0,220,255,0.32)'
          ctx.fillText(drawChar, drawX - 2.5, cell.y)
          ctx.fillStyle = 'rgba(255,30,80,0.32)'
          ctx.fillText(drawChar, drawX + 2.5, cell.y)
        }

        const mainOp = cell.glitchActive ? Math.min(1, op + 0.5) : op
        // Avoid toFixed — round to 3 decimal places with integer math
        ctx.fillStyle = colorPrefix + (~~(mainOp * 1000) / 1000) + ')'
        ctx.fillText(drawChar, drawX, cell.y)
      }
    }

    render()

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      mouseRef.current = (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height)
        ? { x, y }
        : { x: -99999, y: -99999 }
    }

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateMouse(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => { mouseRef.current = { x: -99999, y: -99999 } }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setup, 150)
    }

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
