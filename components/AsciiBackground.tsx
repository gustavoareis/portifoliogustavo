'use client'

import { useEffect, useRef } from 'react'

const CHARS = ' .:;+=*#%@'
const GLITCH_CHARS = '!$^&~|/\\<>?{}[]±≠∞█▓▒░'
const CHAR_W = 5
const CHAR_H = 8
const FONT_SIZE = 7
const REPULSE_RADIUS = 80
const REPULSE_STRENGTH = 10
const SPRING = 0.10
const DAMPING = 0.68
const GLITCH_RADIUS = 145
const ACTIVE_RADIUS = Math.max(REPULSE_RADIUS, GLITCH_RADIUS) + 20

const ACTIVE_RADIUS_SQ = ACTIVE_RADIUS * ACTIVE_RADIUS
const REPULSE_RADIUS_SQ = REPULSE_RADIUS * REPULSE_RADIUS
const GLITCH_RADIUS_SQ = GLITCH_RADIUS * GLITCH_RADIUS
const DISP_MAX = 35
const DISP_MAX_SQ = DISP_MAX * DISP_MAX
// Grid cell size slightly larger than active radius so we only need to check 2x2 or 3x3 buckets
const GRID_CELL = ACTIVE_RADIUS + 10

const randGlitch = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]

interface Cell {
  char: string
  alpha: number
  baseOpDark: number
  baseOpLight: number
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
  lastFrame: number
}

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -99999, y: -99999 })
  const cellsRef = useRef<Cell[]>([])
  const gridRef = useRef<Cell[][]>([])
  const gridColsRef = useRef(0)
  const gridRowsRef = useRef(0)
  // Tracks cells with nonzero displacement/velocity so we don't scan all cells
  const displacedRef = useRef<Set<Cell>>(new Set())
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(true)
  const staticCacheRef = useRef<HTMLCanvasElement | null>(null)
  const lastThemeRef = useRef<boolean | null>(null)
  const cacheCurrentRef = useRef(false)
  const rectRef = useRef<DOMRect | null>(null)
  const frameIdRef = useRef(0)

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
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i]
        const op = isDark ? cell.baseOpDark : cell.baseOpLight
        sctx.fillStyle = isDark ? `rgba(225,210,190,${op})` : `rgba(65,48,28,${op})`
        sctx.fillText(cell.char, cell.homeX, cell.homeY)
      }
      staticCacheRef.current = sc
      lastThemeRef.current = isDark
      cacheCurrentRef.current = false
    }

    const buildCells = (img: HTMLImageElement) => {
      const canvCols = Math.floor(canvas.width / CHAR_W)
      const canvRows = Math.floor(canvas.height / CHAR_H)
      const off = document.createElement('canvas')
      off.width = canvCols; off.height = canvRows
      const offCtx = off.getContext('2d')!
      offCtx.clearRect(0, 0, canvCols, canvRows)

      const imgAspect = (img.naturalWidth || img.width) / (img.naturalHeight || img.height)
      const canvasAspect = (canvCols * CHAR_W) / (canvRows * CHAR_H)
      let drawW: number, drawH: number, drawX: number, drawY: number
      if (imgAspect > canvasAspect) {
        drawH = canvRows; drawW = canvRows * (CHAR_H / CHAR_W) * imgAspect
        drawX = (canvCols - drawW) / 2; drawY = 0
      } else {
        drawW = canvCols; drawH = canvCols * (CHAR_W / CHAR_H) / imgAspect
        drawX = 0; drawY = (canvRows - drawH) / 2
      }
      offCtx.drawImage(img, drawX, drawY, drawW, drawH)
      const { data } = offCtx.getImageData(0, 0, canvCols, canvRows)

      const cells: Cell[] = []
      for (let r = 0; r < canvRows; r++) {
        for (let c = 0; c < canvCols; c++) {
          const a = data[(r * canvCols + c) * 4 + 3]
          if (a < 8) continue
          const charIdx = Math.round((a / 255) * (CHARS.length - 1))
          const norm = a / 255
          cells.push({
            char: CHARS[charIdx], alpha: a,
            baseOpDark: norm * 0.20, baseOpLight: norm * 0.70,
            homeX: c * CHAR_W, homeY: r * CHAR_H,
            x: c * CHAR_W, y: r * CHAR_H, vx: 0, vy: 0,
            glitchChar: CHARS[charIdx], glitchActive: false,
            glitchOffsetX: 0, glitchTimer: 0, lastFrame: -1,
          })
        }
      }
      cellsRef.current = cells

      // Build spatial grid — cells stored by home position bucket
      const gCols = Math.ceil(canvas.width / GRID_CELL) + 1
      const gRows = Math.ceil(canvas.height / GRID_CELL) + 1
      const grid: Cell[][] = Array.from({ length: gCols * gRows }, () => [])
      for (const cell of cells) {
        const gx = Math.floor(cell.homeX / GRID_CELL)
        const gy = Math.floor(cell.homeY / GRID_CELL)
        grid[gy * gCols + gx].push(cell)
      }
      gridRef.current = grid
      gridColsRef.current = gCols
      gridRowsRef.current = gRows
      displacedRef.current = new Set()
      rectRef.current = canvas.getBoundingClientRect()

      buildStaticCache(cells, document.documentElement.classList.contains('dark'))
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
      if (lastThemeRef.current !== isDark) buildStaticCache(cells, isDark)

      const { x: mx, y: my } = mouseRef.current
      const mouseActive = mx > -9999
      const displaced = displacedRef.current

      if (!mouseActive && displaced.size === 0) {
        if (!cacheCurrentRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(staticCacheRef.current, 0, 0)
          cacheCurrentRef.current = true
        }
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(staticCacheRef.current, 0, 0)
      cacheCurrentRef.current = false
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`
      ctx.textBaseline = 'top'

      const colorPrefix = isDark ? 'rgba(225,210,190,' : 'rgba(65,48,28,'
      const frameId = ++frameIdRef.current
      // Cap fillText calls per frame — physics still runs for all cells
      let drawBudget = 1200

      const processCell = (cell: Cell) => {
        if (cell.lastFrame === frameId) return
        cell.lastFrame = frameId

        const cdx = cell.x - mx
        const cdy = cell.y - my
        const dist2 = cdx * cdx + cdy * cdy
        const active = dist2 < ACTIVE_RADIUS_SQ
        const ox = cell.x - cell.homeX
        const oy = cell.y - cell.homeY
        const moving = Math.abs(cell.vx) > 0.06 || Math.abs(cell.vy) > 0.06
                    || Math.abs(ox) > 0.5 || Math.abs(oy) > 0.5

        if (!active && !moving && !cell.glitchActive) {
          displaced.delete(cell)
          return
        }

        // Spring
        cell.vx += (cell.homeX - cell.x) * SPRING
        cell.vy += (cell.homeY - cell.y) * SPRING

        // Repulse — sqrt only when inside repulse radius
        if (dist2 < REPULSE_RADIUS_SQ && dist2 > 0) {
          const dist = Math.sqrt(dist2)
          const force = ((1 - dist / REPULSE_RADIUS) ** 2) * REPULSE_STRENGTH
          const invDist = 1 / dist
          cell.vx += cdx * invDist * force
          cell.vy += cdy * invDist * force
        }

        cell.vx *= DAMPING
        cell.vy *= DAMPING
        cell.x += cell.vx
        cell.y += cell.vy

        const nox = cell.x - cell.homeX
        const noy = cell.y - cell.homeY

        // Glitch — sqrt only when inside glitch radius
        if (dist2 < GLITCH_RADIUS_SQ) {
          const dist = Math.sqrt(dist2)
          const t = 1 - dist / GLITCH_RADIUS
          cell.glitchTimer--
          if (cell.glitchTimer <= 0) {
            if (!cell.glitchActive && Math.random() < 0.01 + t * 0.10) {
              cell.glitchActive = true
              cell.glitchChar = randGlitch()
              cell.glitchOffsetX = (Math.random() - 0.5) * 9
              cell.glitchTimer = Math.floor(4 + Math.random() * 8)
            } else if (cell.glitchActive && Math.random() < 0.18 + t * 0.12) {
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

        const stillMoving = Math.abs(cell.vx) > 0.06 || Math.abs(cell.vy) > 0.06
                         || Math.abs(nox) > 0.5 || Math.abs(noy) > 0.5
        if (stillMoving || cell.glitchActive) {
          displaced.add(cell)
        } else {
          // Only snap to home when not in active radius (preserves repulse equilibrium)
          if (!active) {
            cell.x = cell.homeX; cell.y = cell.homeY
            cell.vx = 0; cell.vy = 0
          }
          displaced.delete(cell)
        }

        // Skip redraw if cell is essentially at home with no glitch — static cache handles it
        if (Math.abs(nox) < 0.5 && Math.abs(noy) < 0.5 && !cell.glitchActive) return
        if (drawBudget <= 0) return
        drawBudget--

        const dxH = cell.x - cell.homeX
        const dyH = cell.y - cell.homeY
        const dispDist2 = dxH * dxH + dyH * dyH
        const dispT = dispDist2 >= DISP_MAX_SQ ? 1 : Math.sqrt(dispDist2) / DISP_MAX
        const baseOp = isDark ? cell.baseOpDark : cell.baseOpLight
        const op = baseOp + dispT * 0.6
        const drawChar = cell.glitchActive ? cell.glitchChar : cell.char
        const drawX = cell.x + (cell.glitchActive ? cell.glitchOffsetX : 0)

        ctx.clearRect(cell.homeX, cell.homeY, CHAR_W + 1, CHAR_H + 1)

        if (cell.glitchActive) {
          ctx.fillStyle = 'rgba(0,220,255,0.32)'
          ctx.fillText(drawChar, drawX - 2.5, cell.y)
          ctx.fillStyle = 'rgba(255,30,80,0.32)'
          ctx.fillText(drawChar, drawX + 2.5, cell.y)
        }

        const mainOp = cell.glitchActive ? Math.min(1, op + 0.5) : op
        ctx.fillStyle = colorPrefix + (~~(mainOp * 1000) / 1000) + ')'
        ctx.fillText(drawChar, drawX, cell.y)
      }

      // Grid lookup: only iterate cells whose home is near the mouse
      if (mouseActive) {
        const grid = gridRef.current
        const gCols = gridColsRef.current
        const gRows = gridRowsRef.current
        const gxMin = Math.max(0, Math.floor((mx - ACTIVE_RADIUS) / GRID_CELL))
        const gxMax = Math.min(gCols - 1, Math.floor((mx + ACTIVE_RADIUS) / GRID_CELL))
        const gyMin = Math.max(0, Math.floor((my - ACTIVE_RADIUS) / GRID_CELL))
        const gyMax = Math.min(gRows - 1, Math.floor((my + ACTIVE_RADIUS) / GRID_CELL))
        for (let gy = gyMin; gy <= gyMax; gy++) {
          for (let gx = gxMin; gx <= gxMax; gx++) {
            const bucket = grid[gy * gCols + gx]
            if (!bucket) continue
            for (let i = 0; i < bucket.length; i++) processCell(bucket[i])
          }
        }
      }

      // Process displaced cells not already handled by grid lookup
      for (const cell of displaced) {
        if (cell.lastFrame !== frameId) processCell(cell)
      }
    }

    render()

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = rectRef.current ?? canvas.getBoundingClientRect()
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
      resizeTimer = setTimeout(() => {
        setup()
        rectRef.current = canvas.getBoundingClientRect()
      }, 150)
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
