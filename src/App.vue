<script setup>
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
import ShowPage from './components/ShowPage.vue'
import ShowsCard from './components/ShowsCard.vue'
import EventPreview from './components/EventPreview.vue'
import { showSlug, showsOnly } from './router'

// The WhatsApp preview pictures are screenshots of these pages, taken at
// build time (scripts/share-pages.mjs): /shows/?card for the shows list,
// /shows/?card=<slug> for one show.
const cardParam = showsOnly ? new URLSearchParams(window.location.search).get('card') : null
</script>

<template>
  <EventPreview v-if="cardParam" :slug="cardParam" />
  <ShowsCard v-else-if="cardParam !== null" />
  <template v-else>
    <NavBar />
    <ShowPage v-if="showSlug" :slug="showSlug" />
    <ShowsSection v-else-if="showsOnly" class="shows-page" />
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
</template>

<style>
/* On the shows-only page the section sits right under the fixed nav bar. */
.shows-page { padding-top: 150px; min-height: 80vh; }
</style>
