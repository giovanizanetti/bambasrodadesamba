<script setup>
import logo from "../assets/photos/logo_hero_circle.png";
import { upcomingShows } from "../shows";
import ShowRow from "./ShowRow.vue";

// The picture WhatsApp shows above a shared link to /shows/ (1200 x 630):
// the next shows as rows from the website, under the Bambas logo.
const MAX_ROWS = 3;
const shows = upcomingShows.filter((show) => !show.cancelled);
const rows = shows.slice(0, MAX_ROWS);
const more = shows.length - rows.length;
</script>

<template>
  <div class="card">
    <header>
      <img :src="logo" alt="Bambas Roda de Samba" />
      <div class="sec-tag">Upcoming shows</div>
    </header>
    <div class="rows">
      <ShowRow v-for="show in rows" :key="show.slug" :show="show" preview />
      <p v-if="!rows.length" class="empty">New dates coming soon</p>
    </div>
    <footer>
      <span>bambasrodadesamba.com</span>
      <span v-if="more > 0">+ {{ more }} more</span>
    </footer>
  </div>
</template>

<style scoped>
.card {
  width: 1200px;
  height: 630px;
  padding: 44px 56px 40px;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header img { height: 150px; }
header .sec-tag { font-size: 20px; margin: 0; }
.rows {
  margin: auto 0;
  zoom: 1.2;
}
.rows :deep(.show-row) { padding-top: 18px; padding-bottom: 18px; margin-bottom: 10px; }
.empty { font-size: 24px; color: rgba(251, 247, 240, 0.6); }
footer {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 600;
  color: rgba(251, 247, 240, 0.5);
}
</style>
