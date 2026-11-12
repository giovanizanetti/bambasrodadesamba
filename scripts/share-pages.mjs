// Runs after `vite build`. WhatsApp only reads a page's own HTML for a link
// preview, so this gives every show its own page, dist/shows/<slug>/index.html,
// with its own title, description and picture, and renders the pictures:
// screenshots of /shows/?card (the shows list) and /shows/?card=<slug> (one
// show), taken with headless Chrome from the built site.
// It also writes what search engines read: each show's event data, the
// /rotterdam/ page and sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { preview } from 'vite'
import { showWhen, venueLabel } from '../src/showFormat.js'

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
  const when = showWhen(show, 'en-GB')
  const title = `${show.title} · ${when}`
  const description = [show.cancelled && 'Cancelled', venueLabel(show), show.free && 'Free entry']
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
  html = withStructuredData(html, eventData(show))

  mkdirSync(`${DIST}/shows/${show.slug}`, { recursive: true })
  writeFileSync(`${DIST}/shows/${show.slug}/index.html`, html)
}

// /friday/, the address on the QR code. The browser picks the next Friday roda
// itself; the preview is the one that was next when the site was built.
const today = new Date().toISOString().slice(0, 10)
const nextFriday = shows
  .filter((show) => show.friday && !show.cancelled && show.date >= today)
  .sort((a, b) => a.date.localeCompare(b.date))[0]
const fridayTitle = `${nextFriday?.title ?? 'Friday roda'} · Bambas Roda de Samba`
const fridayDescription = nextFriday
  ? [showWhen(nextFriday, 'en-GB'), venueLabel(nextFriday)].join(' · ')
  : 'Our monthly Friday roda de samba. Date coming soon.'
let friday = template
  .replace(/<title>[^<]*<\/title>/, `<title>${escape(fridayTitle)}</title>`)
  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE}/friday/`)
friday = setMeta(friday, 'name="description"', fridayDescription)
friday = setMeta(friday, 'property="og:url"', `${SITE}/friday/`)
friday = setMeta(friday, 'property="og:title"', fridayTitle)
friday = setMeta(friday, 'property="og:description"', fridayDescription)
friday = setMeta(friday, 'property="og:image:alt"', fridayTitle)
friday = withPicture(friday, (nextFriday && pictures[nextFriday.slug]) ?? FALLBACK_PICTURE)
mkdirSync(`${DIST}/friday`, { recursive: true })
writeFileSync(`${DIST}/friday/index.html`, friday)

// /rotterdam/: the page people searching for samba in Rotterdam land on.
// Its text is in src/components/RotterdamPage.vue.
const rotterdamShows = shows
  .filter((show) => show.city === 'Rotterdam' && !show.cancelled)
  .sort((a, b) => a.date.localeCompare(b.date))
const rotterdamTitle = 'Roda de Samba Rotterdam — Live Brazilian Samba | Bambas Roda de Samba'
const rotterdamDescription =
  'Live roda de samba in Rotterdam with Bambas Roda de Samba: Brazilian samba played around the table, with the crowd singing and dancing along. Dates, venues and tickets. Live Braziliaanse muziek in Rotterdam.'
let rotterdam = template
  .replace(/<title>[^<]*<\/title>/, `<title>${escape(rotterdamTitle)}</title>`)
  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE}/rotterdam/`)
rotterdam = setMeta(rotterdam, 'name="description"', rotterdamDescription)
rotterdam = setMeta(rotterdam, 'property="og:url"', `${SITE}/rotterdam/`)
rotterdam = setMeta(rotterdam, 'property="og:title"', rotterdamTitle)
rotterdam = setMeta(rotterdam, 'property="og:description"', rotterdamDescription)
rotterdam = setMeta(rotterdam, 'property="og:image:alt"', 'Bambas Roda de Samba in Rotterdam')
rotterdam = withPicture(rotterdam, pictures.shows ?? FALLBACK_PICTURE)
rotterdam = withStructuredData(rotterdam, rotterdamShows.filter((show) => show.date >= today).map(eventData))
mkdirSync(`${DIST}/rotterdam`, { recursive: true })
writeFileSync(`${DIST}/rotterdam/index.html`, rotterdam)

// sitemap.xml. Cancelled shows are left out, and so are past Friday rodas:
// their pages send visitors on to /friday/.
const listedShows = shows.filter((show) => !show.cancelled && !(show.friday && show.date < today))
const sitemapUrls = [
  ...['/', '/shows/', '/friday/', '/rotterdam/'].map((path) => `<url><loc>${SITE}${path}</loc><lastmod>${today}</lastmod></url>`),
  ...listedShows.map((show) => `<url><loc>${SITE}/shows/${encodeURIComponent(show.slug)}/</loc></url>`),
]
writeFileSync(
  `${DIST}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${sitemapUrls.join('\n  ')}\n</urlset>\n`,
)

console.log(`Share pages: ${shows.length} show pages, /friday (${nextFriday?.slug ?? 'no date yet'}), ${Object.keys(pictures).length} preview pictures.`)

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

// A show as schema.org event data, which Google uses for its event listings.
function eventData(show) {
  const url = `${SITE}/shows/${encodeURIComponent(show.slug)}/`
  const band = { '@type': 'MusicGroup', '@id': `${SITE}/#organization`, name: 'Bambas Roda de Samba', url: SITE }
  const start = show.startTime && localDateTime(show.date, show.startTime)
  const endsNextDay = show.startTime && show.endTime && show.endTime <= show.startTime
  const hasTickets = Boolean(show.ticketUrl || show.ticketEmbed)
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: show.title,
    startDate: start || show.date,
    ...(start && show.endTime && { endDate: localDateTime(endsNextDay ? dayAfter(show.date) : show.date, show.endTime) }),
    eventStatus: `https://schema.org/${show.cancelled ? 'EventCancelled' : 'EventScheduled'}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: show.venue || venueLabel(show),
      address: {
        '@type': 'PostalAddress',
        ...(show.address && { streetAddress: show.address }),
        addressLocality: show.city,
        addressCountry: 'NL',
      },
    },
    image: [(pictures[show.slug] ?? FALLBACK_PICTURE).url],
    description: [`Live roda de samba in ${show.city} with Bambas Roda de Samba.`, show.free && 'Free entry.'].filter(Boolean).join(' '),
    performer: band,
    url,
    ...(show.free && { isAccessibleForFree: true }),
    ...(hasTickets && { offers: { '@type': 'Offer', url, availability: 'https://schema.org/InStock' } }),
  }
}

// "2026-11-08T12:00:00+01:00": the show's local time with Amsterdam's offset on that day.
function localDateTime(date, time) {
  const clock = time.slice(0, 5)
  const offset = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Amsterdam', timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${date}T${clock}:00Z`))
    .find((part) => part.type === 'timeZoneName')
    .value.replace('GMT', '')
  return `${date}T${clock}:00${offset || '+00:00'}`
}

function dayAfter(date) {
  const next = new Date(`${date}T12:00:00Z`)
  next.setUTCDate(next.getUTCDate() + 1)
  return next.toISOString().slice(0, 10)
}

// Adds the data to the page's head. "<" is escaped so a title can't close the script tag.
function withStructuredData(html, data) {
  if (Array.isArray(data) && !data.length) return html
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return html.replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`)
}

function setMeta(html, attribute, value) {
  return html.replace(new RegExp(`(<meta ${attribute} content=")[^"]*`), `$1${escape(value)}`)
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
