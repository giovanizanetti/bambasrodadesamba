// How a show's times and venue read, shared by the site and the build script
// that writes the WhatsApp share pages (scripts/share-pages.mjs).

// "16:00–18:30", or just "19:00" without an end time. The CMS time picker
// may store seconds ("16:00:00"); only hours and minutes are shown.
export const timeRange = (start, end) =>
  start ? [start, end].filter(Boolean).map((time) => time.slice(0, 5)).join('–') : ''

// "Café De Hartjes · Amsterdam"
export const venueLabel = (show) => [show.venue, show.city].filter(Boolean).join(' · ')

// "Fri 16 Oct, 20:30–00:00" in the given language. When the show has a
// separate Bambas play time (festivals, multi-act nights), it's appended
// so the shared text still carries it even though it has its own line on
// the website.
export const showWhen = (show, locale) => {
  const date = new Date(`${show.date}T12:00:00`).toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  const playTime = timeRange(show.playStart, show.playEnd)
  const time = [timeRange(show.startTime, show.endTime), playTime && `Bambas ${playTime}`]
    .filter(Boolean)
    .join(' · ')
  return time ? `${date}, ${time}` : date
}
