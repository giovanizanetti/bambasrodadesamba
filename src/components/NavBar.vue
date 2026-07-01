<script setup>
import { ref } from 'vue'
import logoNavbar from '../assets/photos/logo_horizontal_navbar.png'
import { useI18n } from '../i18n'

const { t, locale, setLocale, locales } = useI18n()

const menuOpen = ref(false)
const langOpen = ref(false)

const links = [
  { href: '#about', key: 'about' },
  { href: '#videos', key: 'videos' },
  { href: '#photos', key: 'gallery' },
  { href: '#shows', key: 'shows' },
]

const closeMenu = () => { menuOpen.value = false }

const pickLocale = (code) => {
  setLocale(code)
  langOpen.value = false
}

const currentFlag = () => locales.find(l => l.code === locale.value)?.flag ?? '🌐'
</script>

<template>
  <nav>
    <a href="#" class="brand" @click="closeMenu"><img :src="logoNavbar" alt="Bambas Roda de Samba" /></a>

    <ul :class="{ open: menuOpen }">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" @click="closeMenu">{{ t(`nav.${link.key}`) }}</a>
      </li>

      <!-- mobile-only lang picker inside menu -->
      <li class="lang-mobile">
        <span class="lang-label">Language</span>
        <div class="lang-mobile-flags">
          <button
            v-for="l in locales"
            :key="l.code"
            class="lang-btn"
            :class="{ active: locale === l.code }"
            :aria-label="l.label"
            :title="l.label"
            @click="pickLocale(l.code); closeMenu()"
          >{{ l.flag }}</button>
        </div>
      </li>
    </ul>

    <!-- desktop dropdown -->
    <div class="lang-drop" :class="{ open: langOpen }">
      <button class="lang-trigger" :aria-label="`Language: ${locale}`" @click="langOpen = !langOpen">
        {{ currentFlag() }} <span class="caret">▾</span>
      </button>
      <div class="lang-menu" role="listbox">
        <button
          v-for="l in locales"
          :key="l.code"
          class="lang-option"
          :class="{ active: locale === l.code }"
          role="option"
          :aria-selected="locale === l.code"
          @click="pickLocale(l.code)"
        >{{ l.flag }} {{ l.label }}</button>
      </div>
    </div>

    <div class="burger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen">
      <span></span><span></span><span></span>
    </div>
  </nav>

  <!-- click-outside overlay to close dropdown -->
  <div v-if="langOpen" class="lang-overlay" @click="langOpen = false"></div>
</template>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 32px; background: rgba(255,255,255,.96); backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(14,14,14,.08); box-shadow: 0 2px 18px rgba(0,0,0,.08);
}
.brand img { height: 46px; width: auto; }
nav ul { display: flex; gap: 30px; list-style: none; align-items: center; margin-left: auto; }
nav ul a {
  font-weight: 600; font-size: 14px; letter-spacing: .04em; text-transform: uppercase;
  color: #1a1a1a; opacity: .85; transition: .2s;
}
nav ul a:hover { opacity: 1; color: var(--orange); }

/* --- desktop lang dropdown --- */
.lang-drop {
  position: relative; margin-left: 24px;
}
.lang-trigger {
  background: transparent; border: 1px solid rgba(14,14,14,.14); cursor: pointer;
  padding: 5px 10px; border-radius: 8px; font-size: 18px; line-height: 1;
  display: flex; align-items: center; gap: 4px; transition: .2s;
}
.lang-trigger:hover { border-color: var(--orange); }
.lang-drop.open .lang-trigger { border-color: var(--orange); background: rgba(253,118,3,.08); }
.caret { font-size: 11px; color: #888; transition: transform .18s; }
.lang-drop.open .caret { transform: rotate(180deg); }

.lang-menu {
  position: absolute; top: calc(100% + 8px); right: 0;
  background: #fff; border: 1px solid rgba(14,14,14,.1); border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0,0,0,.12); padding: 6px; min-width: 150px;
  display: flex; flex-direction: column; gap: 2px;
  opacity: 0; pointer-events: none; transform: translateY(-6px); transition: .18s;
}
.lang-drop.open .lang-menu { opacity: 1; pointer-events: auto; transform: translateY(0); }

.lang-option {
  background: transparent; border: none; cursor: pointer;
  padding: 9px 12px; border-radius: 8px; font-size: 15px; font-weight: 600;
  text-align: left; display: flex; align-items: center; gap: 8px; transition: .15s;
  color: #1a1a1a;
}
.lang-option:hover { background: rgba(253,118,3,.1); color: var(--orange); }
.lang-option.active { background: rgba(253,118,3,.14); color: var(--orange); }

.lang-overlay { position: fixed; inset: 0; z-index: 99; }

/* --- mobile --- */
.lang-mobile { display: none; }
.lang-drop { display: flex; }

.burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; margin-left: 18px; }
.burger span { width: 26px; height: 3px; background: #1a1a1a; border-radius: 2px; transition: .25s; }

@media (max-width: 900px) {
  nav ul {
    position: fixed; top: 66px; right: 0; left: 0; flex-direction: column; margin-left: 0;
    gap: 0; background: rgba(255,255,255,.98); backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(14,14,14,.08); box-shadow: 0 12px 24px rgba(0,0,0,.1);
    transform: translateY(-12px); opacity: 0; pointer-events: none; transition: .22s;
  }
  nav ul.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  nav ul li { width: 100%; }
  nav ul a { display: block; padding: 16px 32px; }

  .lang-drop { display: none; }

  .lang-mobile {
    display: block; padding: 14px 32px 18px; border-top: 1px solid rgba(14,14,14,.08);
  }
  .lang-label {
    display: block; font-size: 11px; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: #999; margin-bottom: 10px;
  }
  .lang-mobile-flags { display: flex; gap: 8px; }
  .lang-btn {
    background: transparent; border: 1px solid rgba(14,14,14,.12); cursor: pointer;
    padding: 6px 10px; border-radius: 8px; font-size: 22px; line-height: 1; transition: .2s;
  }
  .lang-btn:hover { background: rgba(253,118,3,.08); }
  .lang-btn.active { background: rgba(253,118,3,.14); border-color: var(--orange); }

  .burger { display: flex; }
  .burger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
}
</style>
