import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { showSlug } from './router'
import { allShows, todayIso } from './shows'

// A past Friday roda's page sends visitors on to /friday/, the next one,
// so old links (reels, stories, ads) keep selling tickets.
const show = showSlug && allShows.find((s) => s.slug === showSlug)
const isPastFriday = show?.friday && show.date < todayIso

if (isPastFriday) window.location.replace('/friday/')
else createApp(App).mount('#app')
