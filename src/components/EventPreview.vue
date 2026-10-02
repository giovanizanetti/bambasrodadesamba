<script setup>
import logo from "../assets/photos/logo_horizontal_white.png";
import { allShows, withDate } from "../shows";
import ShowRow from "./ShowRow.vue";

// The picture WhatsApp shows above a shared link to one show (1200 x 630):
// the show's row from the website, enlarged, under the Bambas logo.
const props = defineProps({ slug: { type: String, required: true } });

const found = allShows.find((s) => s.slug === props.slug);
const show = found && withDate(found);
</script>

<template>
  <div class="card">
    <header>
      <img :src="logo" alt="Bambas Roda de Samba" />
      <div class="sec-tag">Live show</div>
    </header>
    <div v-if="show" class="row">
      <ShowRow :show="show" preview />
    </div>
    <footer>bambasrodadesamba.com</footer>
  </div>
</template>

<style scoped>
.card {
  width: 1200px;
  height: 630px;
  padding: 52px 56px 44px;
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
header img { height: 110px; }
header .sec-tag { font-size: 20px; margin: 0; }
.row {
  margin: auto 0;
  zoom: 1.6;
}
.row :deep(.show-row) { margin-bottom: 0; }
footer {
  font-size: 20px;
  font-weight: 600;
  color: rgba(251, 247, 240, 0.5);
}
</style>
