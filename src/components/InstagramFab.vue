<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()

const IG_URL = 'https://www.instagram.com/bambasrodadesamba/'
</script>

<template>
  <a :href="IG_URL" target="_blank" rel="noopener" class="ig-float" :aria-label="t('ig.follow')">
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  </a>
</template>

<style scoped>
.ig-float {
  position: fixed; right: 24px; bottom: 24px; z-index: 200;
  display: inline-flex; align-items: center; justify-content: center;
  width: 58px; height: 58px; border-radius: 50%; background: var(--orange); color: #fff;
  box-shadow: 0 8px 24px rgba(253,118,3,.45); transition: .25s;
}
.ig-float svg { width: 30px; height: 30px; }
.ig-float:hover {
  background: #fff; color: var(--orange);
  box-shadow: 0 0 0 3px var(--orange) inset, 0 10px 28px rgba(0,0,0,.25);
  transform: translateY(-3px) scale(1.06);
}
@media (max-width: 600px) {
  .ig-float { right: 16px; bottom: 16px; width: 52px; height: 52px; }
  .ig-float svg { width: 27px; height: 27px; }
}
</style>
