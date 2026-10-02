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

export const SITE_URL = 'https://www.bambasrodadesamba.com'
export const SHOWS_PAGE_URL = `${SITE_URL}/shows/`

// "Fri 16 Oct, 20:30-00:00" in the given language.
export const showWhen = (show, locale) => {
  const date = new Date(`${show.date}T12:00:00`).toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  return show.time ? `${date}, ${show.time}` : date
}

export const whatsappShareHref = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`

const WEEZTIX_GUID_ATTR = /data-ot-guid="([0-9a-f-]{36})"/i
const WEEZTIX_SHOP_URL = /https:\/\/shop\.weeztix\.com\/([0-9a-f-]{36})/i

// Weeztix shop id, read from the pasted embed code. Only the id is used;
// the pasted HTML itself is never put on the page.
export const weeztixGuid = (show) =>
  show.ticketEmbed?.match(WEEZTIX_GUID_ATTR)?.[1] ?? show.ticketEmbed?.match(WEEZTIX_SHOP_URL)?.[1] ?? null

export const weeztixShopUrl = (guid) => `https://shop.weeztix.com/${guid}`

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
