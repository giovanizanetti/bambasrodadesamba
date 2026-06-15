<script setup>
import guitarist from '../assets/photos/guitarist-portrait.jpg'
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t('about.tag') }}</div>
        <h2 style="color: var(--ink)">{{ t('about.heading') }}</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p class="lead">{{ t('about.lead') }}</p>
          <p v-for="(para, i) in t('about.paragraphs')" :key="i">{{ para }}</p>
        </div>
        <div class="about-photo"><img :src="guitarist" :alt="t('about.photoAlt')" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about { background: var(--cream); color: var(--ink); }
.about-grid { display: grid; grid-template-columns: 1.3fr .7fr; gap: 56px; align-items: start; }
.about-text p { font-size: 16.5px; line-height: 1.75; color: #3a3a3a; margin-bottom: 18px; }
.about-text .lead { font-size: 21px; font-weight: 600; color: var(--ink); line-height: 1.55; }
.about-photo {
  border-radius: 18px; overflow: hidden; aspect-ratio: 4/5;
  box-shadow: 0 20px 50px rgba(0,0,0,.25); position: sticky; top: 90px;
}
.about-photo img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 900px) {
  #about { padding-top: 48px; }
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-photo { position: static; }
}
</style>
