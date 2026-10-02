// The site is one page with section anchors (#about, #shows, ...), plus two
// real paths so a shared link gets its own WhatsApp preview:
//   /shows/          only the "Upcoming shows" section
//   /shows/<slug>/   one show (and its ticket shop), slug = the show's file name
const path = window.location.pathname.replace(/\/+$/, '')

export const showsOnly = path === '/shows'
export const showSlug = path.startsWith('/shows/') ? decodeURIComponent(path.slice('/shows/'.length)) : null

export const showHref = (slug) => `/shows/${encodeURIComponent(slug)}/`

// Links to home-page sections. On /shows/ the shows section is right there;
// on every other sub page they have to go back to the home page.
export const sectionHref = (hash) => {
  if (showsOnly && hash === '#shows') return hash
  return showsOnly || showSlug ? `/${hash}` : hash
}
