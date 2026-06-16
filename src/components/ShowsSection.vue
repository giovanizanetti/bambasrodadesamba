<script setup>
import { useI18n } from "../i18n";

const { t } = useI18n();
</script>

<template>
  <section id="shows">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t("shows.tag") }}</div>
        <h2>{{ t("shows.heading") }}</h2>
      </div>
      <div v-for="(show, i) in t('shows.items')" :key="i" class="show-row">
        <div class="show-date">
          <div class="d">{{ show.day }}</div>
          <div class="m">{{ show.month }}</div>
        </div>
        <div class="show-info">
          <h3>{{ show.title }}</h3>
          <div class="show-meta">
            <a
              v-if="show.mapsUrl"
              :href="show.mapsUrl"
              target="_blank"
              rel="noopener"
              class="show-location"
            >{{ show.info }}</a>
            <p v-else>{{ show.info }}</p>
            <span v-if="show.time" class="show-time">{{ show.time }}</span>
            <span v-if="show.free" class="free-badge">{{ t('shows.freeEntry') }}</span>
          </div>
        </div>
        <a v-if="!show.free" href="#book" class="btn btn-primary">{{
          t("shows.tickets")
        }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
#shows {
  background: var(--ink);
}
.show-row {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 30px;
  align-items: center;
  padding: 26px 30px;
  border: 1px solid rgba(251, 247, 240, 0.12);
  border-radius: 16px;
  margin-bottom: 14px;
  transition: 0.2s;
  background: rgba(255, 255, 255, 0.02);
}
.show-row:hover {
  border-color: var(--orange);
  background: rgba(253, 118, 3, 0.06);
}
.show-date {
  text-align: center;
}
.show-date .d {
  font-family: "Archivo Black", sans-serif;
  font-size: 38px;
  color: var(--orange);
  line-height: 0.9;
}
.show-date .m {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: rgba(251, 247, 240, 0.7);
}
.show-info h3 {
  font-size: 21px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.show-info p {
  color: rgba(251, 247, 240, 0.6);
  font-size: 15px;
}
.show-location {
  color: rgba(251, 247, 240, 0.6);
  font-size: 15px;
  text-decoration: none;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.show-location:hover {
  color: var(--orange);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.show-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.show-time {
  font-size: 13px; font-weight: 600; color: rgba(251,247,240,.5); white-space: nowrap;
}
.free-badge {
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--orange); border: 1px solid var(--orange); border-radius: 20px;
  padding: 2px 9px; white-space: nowrap;
}
.placeholder {
  margin-top: 24px;
  color: rgba(251, 247, 240, 0.5);
  font-size: 14px;
}

@media (max-width: 900px) {
  .show-row {
    grid-template-columns: 80px 1fr;
    gap: 18px;
  }
  .show-row .btn {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .show-row {
    grid-template-columns: auto 1fr;
    gap: 16px;
    padding: 20px 18px;
  }
  .show-date .d {
    font-size: 31px;
  }
  .show-info h3 {
    font-size: 19px;
  }
}
</style>
