"""Retheme patches for the vendored React Bits components (MOTION_DIRECTION.md → retheme overrides).
Idempotent: each replacement is skipped if already applied. Usage: python scripts/patch-reactbits.py
"""
import os

D = os.path.join(os.path.dirname(__file__), "..", "src", "components", "reactbits")


def patch(name, pairs):
    p = os.path.join(D, name)
    t = open(p, encoding="utf-8").read()
    for a, b in pairs:
        if b in t:
            continue
        if a not in t:
            print(f"  {name}: anchor not found, assuming already patched: {a[:60]!r}")
            continue
        t = t.replace(a, b, 1)
    open(p, "w", encoding="utf-8").write(t)
    print("patched", name)


# --- AccordionGallery: type-only imports, white surface, no shadows, srcset, onOpen for the active panel
patch("AccordionGallery.tsx", [
    ("import { useRef, useEffect, useState, useCallback, CSSProperties, KeyboardEvent, MouseEvent } from 'react';",
     "import { useRef, useEffect, useState, useCallback, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';"),
    ("  alt?: string;\n}", "  alt?: string;\n  srcSet?: string;\n  sizes?: string;\n}"),
    ("  className?: string;\n}\n", "  className?: string;\n  /** Nord Arch: called when the already-active panel is clicked (shared-image navigation). */\n  onOpen?: (index: number, img: HTMLImageElement | null) => void;\n}\n"),
    ("  className = ''\n}: AccordionGalleryProps) => {", "  className = '',\n  onOpen\n}: AccordionGalleryProps) => {"),
    ("    if (i !== active) {\n      e.preventDefault();\n      setActive(i);\n    }",
     "    if (i !== active) {\n      e.preventDefault();\n      setActive(i);\n    } else if (onOpen) {\n      e.preventDefault();\n      onOpen(i, (e.currentTarget as HTMLElement).querySelector('img'));\n    }"),
    ("bg-[#0a0713] no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] [box-shadow:0_10px_30px_-18px_rgba(0,0,0,0.8)] focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.8)]",
     "bg-[#E4E6E8] no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] focus-visible:[box-shadow:0_0_0_2px_#FFFFFF,0_0_0_4px_#0B0B0C]"),
    ("                  src={item.image}\n                  alt={item.alt || item.label || ''}",
     "                  src={item.image}\n                  srcSet={item.srcSet}\n                  sizes={item.sizes}\n                  loading=\"lazy\"\n                  decoding=\"async\"\n                  alt={item.alt || item.label || ''}"),
    ('aria-label="Image accordion gallery"', 'aria-label="Projetos em destaque"'),
    # DEC-025: closed at rest (defaultIndex -1), collapse on leave, active-change callback
    ("  onOpen?: (index: number, img: HTMLImageElement | null) => void;\n}",
     "  onOpen?: (index: number, img: HTMLImageElement | null) => void;\n  /** Nord Arch: notified when the expanded panel changes (-1 = all closed). */\n  onActiveChange?: (index: number) => void;\n}"),
    ("  className = '',\n  onOpen\n}: AccordionGalleryProps) => {", "  className = '',\n  onOpen,\n  onActiveChange\n}: AccordionGalleryProps) => {"),
    ("  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));",
     "  const [active, setActive] = useState(defaultIndex < 0 ? -1 : Math.min(defaultIndex, count - 1));\n  useEffect(() => onActiveChange?.(active), [active, onActiveChange]);"),
    ("          const drift = Math.max(-1.5, Math.min(1.5, active - i));", "          const drift = active < 0 ? 0 : Math.max(-1.5, Math.min(1.5, active - i));"),
    ('      role="list"\n', '      role="list"\n      onMouseLeave={() => defaultIndex < 0 && setActive(-1)}\n'),
])

# --- DriftWall: type imports, decorative non-focusable tiles, light surface, no shadows, pause offscreen
patch("DriftWall.tsx", [
    ("import { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';",
     "import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';"),
    ("  image: string;\n  title?: string;", "  image: string;\n  srcSet?: string;\n  title?: string;"),
    ("'pointer-events-none absolute inset-[calc(var(--dw-gap)/2)] block overflow-hidden bg-[#0b0b12]',",
     "'pointer-events-none absolute inset-[calc(var(--dw-gap)/2)] block overflow-hidden bg-[#E4E6E8]',"),
    ("    'group-[.is-active]/tile:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7)]',\n", ""),
    ("    'group-focus-visible/tile:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7),0_0_0_2px_rgba(255,255,255,0.9)]'\n", "    ''\n"),
    ("          src={item.image}\n          alt={item.title ?? ''}", "          src={item.image}\n          srcSet={item.srcSet}\n          sizes=\"(max-width: 640px) 40vw, 18vw\"\n          alt=\"\""),
    ("      <div key={id} tabIndex={0} role=\"button\" aria-label={item.title ?? 'tile'} {...commonProps}>",
     "      <div key={id} aria-hidden=\"true\" {...commonProps}>"),
    ("      role=\"group\"\n      aria-label=\"Drifting wall of tiles\"", "      aria-hidden=\"true\""),
    ("  const [reduced, setReduced] = useState(false);", "  const [reduced, setReduced] = useState(false);\n  const visibleRef = useRef(true); // Nord Arch: pause the rAF loop offscreen\n  useEffect(() => {\n    const el = containerRef.current;\n    if (!el) return;\n    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; });\n    io.observe(el);\n    return () => io.disconnect();\n  }, []);"),
])

# --- TiltedCard: honour reduced motion (the component has no guard)
patch("TiltedCard.tsx", [
    ("  function handleMouse(e: React.MouseEvent<HTMLElement>) {\n    if (!ref.current) return;",
     "  function handleMouse(e: React.MouseEvent<HTMLElement>) {\n    if (!ref.current) return;\n    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;"),
    ("  function handleMouseEnter() {\n", "  function handleMouseEnter() {\n    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;\n"),
])
