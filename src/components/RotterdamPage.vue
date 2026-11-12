<script setup>
import { useI18n } from "../i18n";
import { upcomingShows, pastShows } from "../shows";
import ShowRow from "./ShowRow.vue";

// /rotterdam/: what we play in Rotterdam and our Rotterdam dates, so people
// searching for samba there land on a page about that city.
const { t } = useI18n();

const inRotterdam = (show) => show.city === "Rotterdam";
const upcoming = upcomingShows.filter(inRotterdam);
const past = pastShows.filter(inRotterdam);

const IG_URL = "https://www.instagram.com/bambasrodadesamba/";
</script>

<template>
  <section id="rotterdam">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">Rotterdam</div>
        <h1>{{ t("rotterdam.h1") }}</h1>
      </div>
      <p class="lead">{{ t("rotterdam.lead") }}</p>
      <p class="text">{{ t("rotterdam.text") }}</p>

      <h2>{{ t("rotterdam.upcoming") }}</h2>
      <ShowRow v-for="show in upcoming" :key="show.slug" :show="show" />
      <p v-if="!upcoming.length" class="none">
        {{ t("rotterdam.none") }}
        <a :href="IG_URL" target="_blank" rel="noopener">@bambasrodadesamba</a>
      </p>

      <template v-if="past.length">
        <h2>{{ t("rotterdam.past") }}</h2>
        <ShowRow v-for="show in past" :key="show.slug" :show="show" past />
      </template>

      <p class="book">
        {{ t("rotterdam.bookText") }}
        <a href="/#book" class="btn btn-primary">{{ t("rotterdam.bookCta") }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
#rotterdam {
  background: var(--ink);
  padding-top: 150px;
  min-height: 80vh;
}
.sec-head { margin-bottom: 30px; }
h1 {
  font-size: clamp(36px, 5vw, 62px);
  line-height: 1;
  text-transform: uppercase;
}
.lead,
.text {
  max-width: 720px;
  line-height: 1.65;
}
.lead {
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 14px;
}
.text {
  font-size: 16px;
  color: rgba(251, 247, 240, 0.8);
}
h2 {
  margin: 48px 0 18px;
  color: var(--orange);
  font-size: 22px;
  text-transform: uppercase;
}
.none {
  padding: 26px 30px;
  border: 1px dashed rgba(251, 247, 240, 0.2);
  border-radius: 16px;
  color: rgba(251, 247, 240, 0.7);
  font-size: 15px;
}
.none a { color: var(--orange); }
.book {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 56px;
  font-size: 18px;
  font-weight: 600;
}
</style>
