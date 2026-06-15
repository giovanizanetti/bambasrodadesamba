<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <section id="shows">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t('shows.tag') }}</div>
        <h2>{{ t('shows.heading') }}</h2>
      </div>
      <div v-for="(show, i) in t('shows.items')" :key="i" class="show-row">
        <div class="show-date">
          <div class="d">{{ show.day }}</div>
          <div class="m">{{ show.month }}</div>
        </div>
        <div class="show-info">
          <h3>{{ show.title }}</h3>
          <p>{{ show.info }}</p>
        </div>
        <a href="#book" class="btn btn-primary">{{ t('shows.tickets') }}</a>
      </div>
      <p class="placeholder">{{ t('shows.placeholder') }}</p>
    </div>
  </section>
</template>

<style scoped>
#shows { background: var(--ink); }
.show-row {
  display: grid; grid-template-columns: 120px 1fr auto; gap: 30px; align-items: center;
  padding: 26px 30px; border: 1px solid rgba(251,247,240,.12); border-radius: 16px;
  margin-bottom: 14px; transition: .2s; background: rgba(255,255,255,.02);
}
.show-row:hover { border-color: var(--orange); background: rgba(253,118,3,.06); }
.show-date { text-align: center; }
.show-date .d { font-family: 'Archivo Black', sans-serif; font-size: 38px; color: var(--orange); line-height: .9; }
.show-date .m { font-size: 13px; text-transform: uppercase; letter-spacing: .12em; font-weight: 700; color: rgba(251,247,240,.7); }
.show-info h3 { font-size: 21px; text-transform: uppercase; margin-bottom: 6px; }
.show-info p { color: rgba(251,247,240,.6); font-size: 15px; }
.placeholder { margin-top: 24px; color: rgba(251,247,240,.5); font-size: 14px; }

@media (max-width: 900px) {
  .show-row { grid-template-columns: 80px 1fr; gap: 18px; }
  .show-row .btn { grid-column: 1 / -1; }
}
</style>
