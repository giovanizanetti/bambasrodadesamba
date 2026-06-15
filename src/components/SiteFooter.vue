<script setup>
import logoFooter from '../assets/photos/logo_footer_darkbg.png'
import { useI18n } from '../i18n'

const { t } = useI18n()

const menuKeys = ['about', 'videos', 'gallery', 'shows', 'book']
const menuHrefs = { about: '#about', videos: '#video', gallery: '#gallery', shows: '#shows', book: '#book' }
</script>

<template>
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <img :src="logoFooter" alt="Bambas" />
          <p>{{ t('footer.tagline') }}</p>
        </div>
        <div class="foot-col">
          <h4>{{ t('footer.menu') }}</h4>
          <a v-for="key in menuKeys" :key="key" class="txt" :href="menuHrefs[key]">{{ t('footer.links')[key] }}</a>
        </div>
      </div>
      <div class="foot-bottom">{{ t('footer.rights') }}</div>
    </div>
  </footer>
</template>

<style scoped>
footer { background: #0A0A0A; padding: 60px 0 30px; border-top: 1px solid rgba(253,118,3,.2); }
.foot-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 40px; margin-bottom: 40px; }
.foot-brand img { width: 230px; margin-bottom: 18px; }
.foot-brand p { color: rgba(251,247,240,.55); font-size: 15px; line-height: 1.6; max-width: 300px; }
.foot-col h4 { font-size: 14px; text-transform: uppercase; letter-spacing: .1em; color: var(--orange); margin-bottom: 16px; }
.foot-col a.txt { display: block; color: rgba(251,247,240,.7); font-size: 15px; margin-bottom: 10px; transition: .2s; }
.foot-col a.txt:hover { color: var(--orange-bright); padding-left: 4px; }
.foot-bottom { text-align: center; padding-top: 30px; border-top: 1px solid rgba(251,247,240,.1); color: rgba(251,247,240,.4); font-size: 13px; }

@media (max-width: 900px) {
  .foot-grid { grid-template-columns: 1fr; gap: 30px; }
}
</style>
