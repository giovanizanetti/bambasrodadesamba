const showModules = import.meta.glob('../content/shows/*.json', { eager: true })

// Each show gets a slug from its file name, e.g. "2026-10-16-bambas-roda-de-samba".
export const allShows = Object.entries(showModules).map(([path, mod]) => ({
  ...mod.default,
  slug: path.split('/').pop().replace(/\.json$/, ''),
}))

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
