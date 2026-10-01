<script setup>
import { computed, onMounted, nextTick } from "vue";
import { useI18n } from "../i18n";
import { allShows, weeztixGuid, weeztixShopUrl } from "../shows";

const props = defineProps({ slug: { type: String, required: true } });
const { t, locale } = useI18n();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEZTIX_INJECTOR = "https://v1.widget.shop.weeztix.com/injector.js";

const show = computed(() => allShows.find((s) => s.slug === props.slug));
const guid = computed(() => show.value && weeztixGuid(show.value));
const title = computed(() => show.value && (show.value[`title_${locale.value}`] || show.value.title));

// The injector scans the page for .ot-iframe once when it runs, so it is
// loaded fresh each time this page mounts.
const loadWidget = () => {
  document.querySelector(`script[src="${WEEZTIX_INJECTOR}"]`)?.remove();
  const script = document.createElement("script");
  script.src = WEEZTIX_INJECTOR;
  document.body.appendChild(script);
};

onMounted(async () => {
  window.scrollTo(0, 0);
  if (!guid.value) return;
  await nextTick();
  loadWidget();
});
</script>

<template>
  <section id="tickets">
    <div class="wrap">
      <a href="#shows" class="back">{{ t("shows.backToShows") }}</a>

      <template v-if="show && guid">
        <div class="ticket-head">
          <div class="show-date">
            <div class="d">{{ show.date.slice(8, 10) }}</div>
            <div class="m">{{ MONTHS[Number(show.date.slice(5, 7)) - 1] }}</div>
          </div>
          <div>
            <div class="sec-tag">{{ t("shows.tickets") }}</div>
            <h2>{{ title }}</h2>
            <p class="meta">📍 {{ show.venue }}<span v-if="show.time"> · {{ show.time }}</span></p>
          </div>
        </div>

        <div class="shop">
          <div class="ot-iframe" :data-ot-url="weeztixShopUrl(guid)" :data-ot-guid="guid"></div>
        </div>
      </template>

      <p v-else class="missing">{{ t("shows.noShows") }}</p>
    </div>
  </section>
</template>

<style scoped>
#tickets {
  background: var(--ink);
  padding-top: 130px;
  min-height: 100vh;
}
.back {
  display: inline-block;
  color: rgba(251, 247, 240, 0.6);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  transition: 0.2s;
}
.back:hover { color: var(--orange); }
.ticket-head {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
}
.show-date { text-align: center; }
.show-date .d {
  font-family: "Archivo Black", sans-serif;
  font-size: 56px;
  color: var(--orange);
  line-height: 0.9;
}
.show-date .m {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: rgba(251, 247, 240, 0.7);
}
.ticket-head h2 { text-transform: uppercase; }
.meta {
  margin-top: 10px;
  color: rgba(251, 247, 240, 0.6);
  font-size: 15px;
}
.shop {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  min-height: 480px;
}
.missing {
  color: rgba(251, 247, 240, 0.6);
}
@media (max-width: 560px) {
  #tickets { padding-top: 110px; }
  .ticket-head { grid-template-columns: auto 1fr; gap: 18px; }
  .show-date .d { font-size: 40px; }
  .shop { padding: 6px; border-radius: 12px; }
}
</style>
