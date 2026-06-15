<script setup>
import { ref } from 'vue'
import logoNavbar from '../assets/photos/logo_horizontal_navbar.png'

const open = ref(false)

const links = [
  { href: '#about', label: 'About' },
  { href: '#video', label: 'Videos' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#shows', label: 'Shows' },
]

const close = () => { open.value = false }
</script>

<template>
  <nav>
    <a href="#" class="brand" @click="close"><img :src="logoNavbar" alt="Bambas Roda de Samba" /></a>
    <ul :class="{ open }">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" @click="close">{{ link.label }}</a>
      </li>
    </ul>
    <div class="burger" :class="{ open }" @click="open = !open">
      <span></span><span></span><span></span>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 32px; background: rgba(255,255,255,.96); backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(14,14,14,.08); box-shadow: 0 2px 18px rgba(0,0,0,.08);
}
.brand img { height: 46px; width: auto; }
nav ul { display: flex; gap: 30px; list-style: none; align-items: center; }
nav ul a {
  font-weight: 600; font-size: 14px; letter-spacing: .04em; text-transform: uppercase;
  color: #1a1a1a; opacity: .85; transition: .2s;
}
nav ul a:hover { opacity: 1; color: var(--orange); }

.burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
.burger span { width: 26px; height: 3px; background: #1a1a1a; border-radius: 2px; transition: .25s; }

@media (max-width: 900px) {
  nav ul {
    position: fixed; top: 66px; right: 0; left: 0; flex-direction: column;
    gap: 0; background: rgba(255,255,255,.98); backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(14,14,14,.08); box-shadow: 0 12px 24px rgba(0,0,0,.1);
    transform: translateY(-12px); opacity: 0; pointer-events: none; transition: .22s;
  }
  nav ul.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  nav ul li { width: 100%; }
  nav ul a { display: block; padding: 16px 32px; }
  .burger { display: flex; }
  .burger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
}
</style>
