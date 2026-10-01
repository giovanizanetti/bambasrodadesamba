import { ref, computed } from 'vue'

// Minimal hash router. Section anchors (#about, #shows, ...) stay as they are;
// only hashes starting with "#/tickets/" open the tickets page.
const TICKETS_PREFIX = '#/tickets/'

const hash = ref(window.location.hash)
window.addEventListener('hashchange', () => { hash.value = window.location.hash })

export const ticketSlug = computed(() =>
  hash.value.startsWith(TICKETS_PREFIX) ? decodeURIComponent(hash.value.slice(TICKETS_PREFIX.length)) : null
)

export const ticketsHref = (slug) => `${TICKETS_PREFIX}${encodeURIComponent(slug)}`
