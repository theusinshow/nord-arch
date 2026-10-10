// Encode the curated Divisare originals (scripts/images.config.json) and the hero assets
// (assets-src/hero, from scripts/cutout.py) into AVIF + WebP at several widths, and write
// src/content/images.manifest.json (w, h, ratio, widths) so <Picture> can avoid CLS.
// Usage: node scripts/images.mjs   (skips files that already exist; --force to rebuild)
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'scripts/images.config.json'), 'utf8'))
const OUT = path.join(root, 'public/img')
const FORCE = process.argv.includes('--force')
const WIDTHS = [640, 960, 1440, 1920, 2560]
const DRIFT_WIDTHS = [480, 720]
const HERO_WIDTHS = [640, 960, 1280, 1920, 2560]

const ratioOf = (w, h) => (w / h > 1.25 ? '3:2' : h > w ? '4:5' : '16:9')
const pad = (n) => String(n).padStart(2, '0')

async function encode(file, slug, name, widths, { alpha = false } = {}) {
  const img = sharp(file, { failOn: 'none' }).rotate()
  const { width: w, height: h } = await img.metadata()
  const usable = widths.filter((x) => x <= w)
  if (!usable.length || usable[usable.length - 1] < Math.min(w, widths[widths.length - 1])) usable.push(Math.min(w, widths[widths.length - 1]))
  const dir = path.join(OUT, slug)
  fs.mkdirSync(dir, { recursive: true })
  for (const width of [...new Set(usable)]) {
    const base = path.join(dir, `${name}-${width}`)
    const resized = sharp(file, { failOn: 'none' }).rotate().resize({ width })
    if (FORCE || !fs.existsSync(`${base}.avif`)) await resized.clone().avif({ quality: alpha ? 55 : 50, effort: 4 }).toFile(`${base}.avif`)
    if (FORCE || !fs.existsSync(`${base}.webp`)) await resized.clone().webp({ quality: 72, alphaQuality: 80 }).toFile(`${base}.webp`)
  }
  return { src: `/img/${slug}/${name}`, w, h, ratio: ratioOf(w, h), widths: [...new Set(usable)] }
}

const src = (rel) => path.join(cfg.source, rel)
const manifest = { projects: {}, drift: [], hero: null }

for (const [slug, p] of Object.entries(cfg.projects)) {
  const entry = { opening: null, card: null, gallery: [] }
  entry.opening = await encode(src(p.opening), slug, 'opening', WIDTHS)
  entry.card = await encode(src(p.card), slug, 'card', WIDTHS.slice(0, 4))
  let i = 1
  for (const g of p.gallery) entry.gallery.push(await encode(src(g), slug, `g${pad(i++)}`, WIDTHS.slice(0, 4)))
  manifest.projects[slug] = entry
  console.log('✓', slug, entry.gallery.length + 2, 'images')
}

let d = 1
for (const f of cfg.drift) manifest.drift.push(await encode(src(f), 'drift', `d${pad(d++)}`, DRIFT_WIDTHS))
console.log('✓ drift', manifest.drift.length)

const heroDir = path.join(root, 'assets-src/hero')
if (fs.existsSync(path.join(heroDir, 'hero.json'))) {
  const meta = JSON.parse(fs.readFileSync(path.join(heroDir, 'hero.json'), 'utf8'))
  manifest.hero = {
    photo: await encode(path.join(heroDir, 'photo.jpg'), 'hero', 'photo', HERO_WIDTHS),
    fg: await encode(path.join(heroDir, 'fg.png'), 'hero', 'fg', HERO_WIDTHS, { alpha: true }),
    roofLine: meta.roofLine,
    luma: meta.luma,
  }
  const kb = (f) => Math.round(fs.statSync(path.join(OUT, 'hero', f)).size / 1024)
  console.log('✓ hero @1920 — photo', kb('photo-1920.avif'), 'KB · fg', kb('fg-1920.avif'), 'KB (budget 300 + 150)')
}

fs.writeFileSync(path.join(root, 'src/content/images.manifest.json'), JSON.stringify(manifest, null, 1))
console.log('manifest written')
