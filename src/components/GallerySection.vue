<script setup>
import { ref, computed, onUnmounted, watch } from 'vue'
import overhead1 from '../assets/photos/band-overhead-1.jpg'
import overhead3 from '../assets/photos/band-overhead-3.jpg'
import pandeiro from '../assets/photos/pandeiro-player.jpg'
import guitarist from '../assets/photos/guitarist-portrait.jpg'
import singer from '../assets/photos/singer-cavaquinho.jpg'
import liveBar2 from '../assets/photos/live-bar-2.jpg'
import band from '../assets/photos/band.jpg'
import percusionist from '../assets/photos/percusionist.JPG'
import { useI18n } from '../i18n'

const { t } = useI18n()

const tiles = [
  { src: overhead1, cls: 'wide tall' },
  { src: pandeiro, cls: '' },
  { src: guitarist, cls: 'tall' },
  { src: singer, cls: '' },
  { src: band, cls: 'wide' },
  { src: percusionist, cls: 'tall' },
  { src: liveBar2, cls: 'wide' },
  { src: overhead3, cls: '' },
]

const altOf = (i) => t('gallery.alts')[i] ?? ''

const current = ref(-1)
const isOpen = computed(() => current.value >= 0)
const active = computed(() => tiles[current.value])

const open = (i) => { current.value = i }
const close = () => { current.value = -1 }
const next = () => { current.value = (current.value + 1) % tiles.length }
const prev = () => { current.value = (current.value - 1 + tiles.length) % tiles.length }

const onKey = (e) => {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="gallery">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t('gallery.tag') }}</div>
        <h2 style="color: var(--ink)">{{ t('gallery.heading') }}</h2>
      </div>
      <div class="gallery-grid">
        <div
          v-for="(tile, i) in tiles"
          :key="i"
          class="g"
          :class="tile.cls"
          role="button"
          tabindex="0"
          :aria-label="`Open image: ${altOf(i)}`"
          @click="open(i)"
          @keydown.enter="open(i)"
          @keydown.space.prevent="open(i)"
        >
          <img :src="tile.src" :alt="altOf(i)" loading="lazy" />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lb-fade">
        <div v-if="isOpen" class="lightbox" @click.self="close">
          <button class="lb-btn lb-close" aria-label="Close" @click="close">&times;</button>
          <button class="lb-btn lb-prev" aria-label="Previous" @click.stop="prev">&#8249;</button>
          <figure class="lb-stage">
            <img :src="active.src" :alt="altOf(current)" />
            <figcaption>{{ current + 1 }} / {{ tiles.length }}</figcaption>
          </figure>
          <button class="lb-btn lb-next" aria-label="Next" @click.stop="next">&#8250;</button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
#gallery { background: var(--paper); color: var(--ink); }
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 16px; }
.gallery-grid .g { border-radius: 14px; transition: .25s; cursor: pointer; overflow: hidden; position: relative; }
.gallery-grid .g:focus-visible { outline: 3px solid var(--orange); outline-offset: 3px; }
.gallery-grid .g img { width: 100%; height: 100%; object-fit: cover; transition: .4s; }
.gallery-grid .g:hover img { transform: scale(1.07); }
.g.tall { grid-row: span 2; }
.g.wide { grid-column: span 2; }

@media (max-width: 900px) {
  #gallery { padding-top: 48px; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: auto; }
  .gallery-grid .g { aspect-ratio: 1; }
  .g.tall { grid-row: auto; }
  .g.wide { grid-column: auto; }
}

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(8, 8, 8, .94); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.lb-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; max-width: 100%; }
.lb-stage img {
  max-width: min(1100px, 92vw); max-height: 82vh; width: auto; height: auto;
  border-radius: 12px; box-shadow: 0 24px 80px rgba(0, 0, 0, .6); object-fit: contain;
}
.lb-stage figcaption {
  color: rgba(251, 247, 240, .75); font-size: 14px; font-weight: 600;
  letter-spacing: .04em; text-transform: uppercase;
}
.lb-btn {
  position: absolute; background: rgba(255, 255, 255, .08); color: var(--cream);
  border: 1px solid rgba(251, 247, 240, .2); cursor: pointer; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; transition: .2s;
}
.lb-btn:hover { background: var(--orange); color: #0E0E0E; border-color: var(--orange); }
.lb-close { top: 22px; right: 24px; width: 48px; height: 48px; font-size: 30px; line-height: 1; }
.lb-prev, .lb-next { top: 50%; transform: translateY(-50%); width: 56px; height: 56px; font-size: 34px; line-height: 1; }
.lb-prev { left: 24px; }
.lb-next { right: 24px; }

@media (max-width: 600px) {
  .lb-prev, .lb-next { width: 46px; height: 46px; font-size: 28px; }
  .lb-prev { left: 10px; }
  .lb-next { right: 10px; }
  .lb-close { top: 14px; right: 14px; }
}

.lb-fade-enter-active, .lb-fade-leave-active { transition: opacity .22s ease; }
.lb-fade-enter-from, .lb-fade-leave-to { opacity: 0; }
</style>
