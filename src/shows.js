export { timeRange, venueLabel, showWhen } from './showFormat.js'

const showModules = import.meta.glob('../content/shows/*.json', { eager: true })

// Each show gets a slug from its file name, e.g. "2026-10-16-bambas-roda-de-samba".
export const allShows = Object.entries(showModules).map(([path, mod]) => ({
  ...mod.default,
  slug: path.split('/').pop().replace(/\.json$/, ''),
}))

const now = new Date()
export const todayIso = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
].join('-')

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// A show with the day and month split out, as the show row displays them.
export const withDate = (show) => ({
  ...show,
  day: show.date.slice(8, 10),
  month: MONTHS[Number(show.date.slice(5, 7)) - 1],
})

// Shows from today on, soonest first.
export const upcomingShows = allShows
  .filter((show) => show.date >= todayIso)
  .sort((a, b) => a.date.localeCompare(b.date))
  .map(withDate)

// A show's description as blocks for the page: a blank line between
// paragraphs, "## " starts a heading, lines starting with "- " are a list.
export const descriptionBlocks = (text) =>
  (text ?? '')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('## ')) return { type: 'heading', text: block.slice(3).trim() }
      const lines = block.split('\n').map((line) => line.trim())
      if (lines.every((line) => line.startsWith('- '))) return { type: 'list', items: lines.map((line) => line.slice(2)) }
      return { type: 'paragraph', text: lines.join(' ') }
    })

// The next Friday roda: the soonest upcoming show ticked "Friday roda" in the
// CMS. /friday, the address on the QR code, opens this show.
export const nextFriday = upcomingShows.find((show) => show.friday && !show.cancelled) ?? null

// Shows that have taken place, most recent first. Cancelled ones are left out.
export const pastShows = allShows
  .filter((show) => show.date < todayIso && !show.cancelled)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(withDate)

export const SITE_URL = 'https://www.bambasrodadesamba.com'
export const SHOWS_PAGE_URL = `${SITE_URL}/shows/`

export const whatsappShareHref = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`

const WEEZTIX_GUID_ATTR = /data-ot-guid="([0-9a-f-]{36})"/i
const WEEZTIX_SHOP_URL = /https:\/\/shop\.weeztix\.com\/([0-9a-f-]{36})/i

// Weeztix shop id, read from the pasted embed code. Only the id is used;
// the pasted HTML itself is never put on the page.
export const weeztixGuid = (show) =>
  show.ticketEmbed?.match(WEEZTIX_GUID_ATTR)?.[1] ?? show.ticketEmbed?.match(WEEZTIX_SHOP_URL)?.[1] ?? null

export const weeztixShopUrl = (guid) => `https://shop.weeztix.com/${guid}`

const WETICKET_SHOP_URL = /^https:\/\/[a-z0-9-]+\.weticket\.io\/[^\s"'<>]+$/i

// A WeTicket Ticket URL: its shop is embedded on the show's own page.
export const weticketShopUrl = (show) => (WETICKET_SHOP_URL.test(show.ticketUrl ?? '') ? show.ticketUrl : null)

// Whether the show sells its tickets in a shop on its own page.
export const hasOwnShop = (show) => Boolean(weeztixGuid(show) || weticketShopUrl(show))

const WEEZTIX_INJECTOR = 'https://v1.widget.shop.weeztix.com/injector.js'
let injectorLoading = null

// The Weeztix script can only run once per page (it throws when run again),
// so it is loaded a single time and each ticket page starts its own shop.
export const loadWeeztixInjector = () =>
  (injectorLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = WEEZTIX_INJECTOR
    script.onload = () => resolve(window.OpenTicket.ShopInjector)
    script.onerror = () => {
      script.remove()
      injectorLoading = null
      reject(new Error('Weeztix shop script failed to load'))
    }
    document.body.appendChild(script)
  }))
