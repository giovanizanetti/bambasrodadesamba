// Runs after `vite build`. WhatsApp only reads a page's own HTML for a link
// preview, so this gives every show its own page, dist/shows/<slug>/index.html,
// with its own title, description and picture, and renders the pictures:
// screenshots of /shows/?card (the shows list) and /shows/?card=<slug> (one
// show), taken with headless Chrome from the built site.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { preview } from 'vite'

const SITE = 'https://www.bambasrodadesamba.com'
const DIST = 'dist'
const PORT = 4179
const FALLBACK_PICTURE = { url: `${SITE}/logo-512.png`, width: 512, height: 512 }

const shows = readdirSync('content/shows')
  .filter((file) => file.endsWith('.json'))
  .map((file) => ({
    slug: file.replace(/\.json$/, ''),
    ...JSON.parse(readFileSync(`content/shows/${file}`, 'utf8')),
  }))

const pictures = await renderPictures()

const showsPage = `${DIST}/shows/index.html`
const template = readFileSync(showsPage, 'utf8')
writeFileSync(showsPage, withPicture(template, pictures.shows ?? FALLBACK_PICTURE))

for (const show of shows) {
  const when = showWhen(show)
  const title = `${show.title} · ${when}`
  const description = [show.cancelled && 'Cancelled', show.venue, show.free && 'Free entry']
    .filter(Boolean)
    .join(' · ')
  const url = `${SITE}/shows/${show.slug}/`

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} | Bambas Roda de Samba</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
  html = setMeta(html, 'name="description"', description)
  html = setMeta(html, 'property="og:url"', url)
  html = setMeta(html, 'property="og:title"', title)
  html = setMeta(html, 'property="og:description"', description)
  html = setMeta(html, 'property="og:image:alt"', title)
  html = withPicture(html, pictures[show.slug] ?? FALLBACK_PICTURE)

  mkdirSync(`${DIST}/shows/${show.slug}`, { recursive: true })
  writeFileSync(`${DIST}/shows/${show.slug}/index.html`, html)
}

console.log(`Share pages: ${shows.length} show pages, ${Object.keys(pictures).length} preview pictures.`)

// Screenshots of the preview cards, served from the built site.
// Without Chrome (e.g. on a machine that doesn't have it) the pages use the logo.
async function renderPictures() {
  const chrome = findChrome()
  if (!chrome) {
    console.warn('Share pages: Chrome not found, WhatsApp previews will show the logo.')
    return {}
  }
  const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: 'warn' })
  const pictures = {}
  try {
    mkdirSync(`${DIST}/previews`, { recursive: true })
    pictures.shows = await screenshot(chrome, '/shows/?card', 'shows')
    for (const show of shows) {
      pictures[show.slug] = await screenshot(chrome, `/shows/?card=${encodeURIComponent(show.slug)}`, show.slug)
    }
  } finally {
    await server.close()
  }
  return pictures
}

// Asynchronous: the preview server runs in this same process and has to keep
// answering Chrome while the screenshot is taken.
async function screenshot(chrome, path, name) {
  const file = `${DIST}/previews/${name}.png`
  await promisify(execFile)(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    // Gives the web fonts time to load before the picture is taken.
    '--virtual-time-budget=8000',
    `--screenshot=${resolve(file)}`,
    `http://localhost:${PORT}${path}`,
  ])
  // WhatsApp caches pictures by URL: a new version gets a new URL.
  const version = createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 10)
  return { url: `${SITE}/previews/${name}.png?v=${version}`, width: 1200, height: 630 }
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  return candidates.find((path) => path && existsSync(path))
}

function withPicture(html, picture) {
  html = setMeta(html, 'property="og:image"', picture.url)
  html = setMeta(html, 'property="og:image:width"', String(picture.width))
  html = setMeta(html, 'property="og:image:height"', String(picture.height))
  return setMeta(html, 'name="twitter:image"', picture.url)
}

function setMeta(html, attribute, value) {
  return html.replace(new RegExp(`(<meta ${attribute} content=")[^"]*`), `$1${escape(value)}`)
}

// "Fri 16 Oct, 20:30-00:00"
function showWhen(show) {
  const date = new Date(`${show.date}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  const time = [show.time, show.playTime ? `Bambas ${show.playTime}` : null].filter(Boolean).join(' · ')
  return time ? `${date}, ${time}` : date
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
