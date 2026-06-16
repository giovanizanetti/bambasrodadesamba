<script setup>
import logoFooter from '../assets/photos/logo_footer_darkbg.png'
import { useI18n } from '../i18n'

const { t } = useI18n()

const menuKeys = ['about', 'videos', 'gallery', 'shows', 'book']
const menuHrefs = { about: '#about', videos: '#video', gallery: '#gallery', shows: '#shows', book: '#book' }

const IG_HANDLE = '@bambasrodadesamba'
const IG_URL = 'https://www.instagram.com/bambasrodadesamba/'
const EMAIL = 'info@bambasrodadesamba.com'
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
        <div class="foot-col">
          <h4>{{ t('footer.contact') }}</h4>
          <a class="foot-contact" :href="IG_URL" target="_blank" rel="noopener">
            <span class="foot-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </span>
            {{ IG_HANDLE }}
          </a>
          <a class="foot-contact" :href="`mailto:${EMAIL}`">
            <span class="foot-ic mail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                <path d="m3.5 6.5 8.5 6 8.5-6" />
              </svg>
            </span>
            {{ EMAIL }}
          </a>
        </div>
      </div>
      <div class="foot-bottom">{{ t('footer.rights') }}</div>
    </div>
  </footer>
</template>

<style scoped>
footer { background: #0A0A0A; padding: 60px 0 30px; border-top: 1px solid rgba(253,118,3,.2); }
.foot-grid { display: grid; grid-template-columns: 1.6fr 1fr 1.2fr; gap: 40px; margin-bottom: 40px; }
.foot-brand img { width: 230px; margin-bottom: 18px; }
.foot-brand p { color: rgba(251,247,240,.55); font-size: 15px; line-height: 1.6; max-width: 300px; }
.foot-col h4 { font-size: 14px; text-transform: uppercase; letter-spacing: .1em; color: var(--orange); margin-bottom: 16px; }
.foot-col a.txt { display: block; color: rgba(251,247,240,.7); font-size: 15px; margin-bottom: 10px; transition: .2s; }
.foot-col a.txt:hover { color: var(--orange-bright); padding-left: 4px; }
.foot-contact { display: flex; align-items: center; gap: 12px; color: rgba(251,247,240,.7); font-size: 15px; margin-bottom: 14px; transition: color .2s; }
.foot-contact:hover { color: var(--orange-bright); }
.foot-ic {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(251,247,240,.07); color: var(--orange); transition: background .2s;
}
.foot-contact:hover .foot-ic { background: rgba(253,118,3,.16); }
.foot-ic svg { width: 20px; height: 20px; }
.foot-ic.mail svg { width: 22px; height: 22px; }
.foot-bottom { text-align: center; padding-top: 30px; border-top: 1px solid rgba(251,247,240,.1); color: rgba(251,247,240,.4); font-size: 13px; }

@media (max-width: 900px) {
  .foot-grid { grid-template-columns: 1fr; gap: 30px; }
}
</style>
