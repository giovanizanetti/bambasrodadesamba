<script setup>
import { watch, nextTick } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import Marquee from './components/Marquee.vue'
import AboutSection from './components/AboutSection.vue'
import VideoSection from './components/VideoSection.vue'
import GallerySection from './components/GallerySection.vue'
import ShowsSection from './components/ShowsSection.vue'
import BookSection from './components/BookSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import InstagramFab from './components/InstagramFab.vue'
import TicketsPage from './components/TicketsPage.vue'
import { ticketSlug } from './router'

// Leaving the tickets page via a section link (#shows, #about, ...):
// the section only exists after the home page renders, so scroll to it then.
watch(ticketSlug, async (slug, previous) => {
  if (slug || !previous) return
  await nextTick()
  const target = window.location.hash && document.querySelector(window.location.hash)
  if (target) target.scrollIntoView()
  else window.scrollTo(0, 0)
})
</script>

<template>
  <NavBar />
  <TicketsPage v-if="ticketSlug" :key="ticketSlug" :slug="ticketSlug" />
  <template v-else>
    <HeroSection />
    <Marquee />
    <AboutSection />
    <VideoSection />
    <GallerySection />
    <ShowsSection />
    <BookSection />
  </template>
  <SiteFooter />
  <InstagramFab />
</template>
