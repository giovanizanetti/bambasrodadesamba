<script setup>
import overhead1 from '../assets/photos/band-overhead-1.jpg'
import overhead2 from '../assets/photos/band-overhead-2.jpg'
import overhead3 from '../assets/photos/band-overhead-3.jpg'
import pandeiro from '../assets/photos/pandeiro-player.jpg'
import guitarist from '../assets/photos/guitarist-portrait.jpg'
import singer from '../assets/photos/singer-cavaquinho.jpg'
import liveBar1 from '../assets/photos/live-bar-1.jpg'
import liveBar3 from '../assets/photos/live-bar-3.jpg'

const tiles = [
  { src: overhead1, alt: 'Bambas live', cls: 'wide tall' },
  { src: pandeiro, alt: 'Pandeiro', cls: '' },
  { src: guitarist, alt: 'Guitar', cls: 'tall' },
  { src: singer, alt: 'Singer', cls: '' },
  { src: liveBar3, alt: 'Show', cls: '' },
  { src: overhead2, alt: 'Full roda', cls: 'wide' },
  { src: liveBar1, alt: 'Live at the bar', cls: '' },
  { src: overhead3, alt: 'Band', cls: '' },
]
</script>

<template>
  <section id="gallery">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">Gallery</div>
        <h2 style="color: var(--ink)">Moments from the roda</h2>
      </div>
      <div class="gallery-grid">
        <div v-for="(tile, i) in tiles" :key="i" class="g" :class="tile.cls">
          <img :src="tile.src" :alt="tile.alt" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#gallery { background: var(--paper); color: var(--ink); }
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 16px; }
.gallery-grid .g { border-radius: 14px; transition: .25s; cursor: pointer; overflow: hidden; position: relative; }
.gallery-grid .g img { width: 100%; height: 100%; object-fit: cover; transition: .4s; }
.gallery-grid .g:hover img { transform: scale(1.07); }
.g.tall { grid-row: span 2; }
.g.wide { grid-column: span 2; }

@media (max-width: 900px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
