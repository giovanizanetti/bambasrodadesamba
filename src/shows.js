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
