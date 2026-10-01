<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../i18n";
import { allShows, weeztixGuid, weeztixShopUrl, loadWeeztixInjector } from "../shows";

const props = defineProps({ slug: { type: String, required: true } });
const { t, locale } = useI18n();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const show = computed(() => allShows.find((s) => s.slug === props.slug));
const guid = computed(() => show.value && weeztixGuid(show.value));
const title = computed(() => show.value && (show.value[`title_${locale.value}`] || show.value.title));

const shopEl = ref(null);

onMounted(async () => {
  window.scrollTo(0, 0);
  if (!guid.value) return;
  const ShopInjector = await loadWeeztixInjector();
  // The visitor may have left the page while the script was loading.
  if (!shopEl.value) return;
  new ShopInjector().init({
    elem: shopEl.value,
    guid: guid.value,
    url: weeztixShopUrl(guid.value),
    autoscroll: true,
    scrollTop: 0,
  });
});

// Weeztix keeps listening for scroll/resize on its iframe; stop that on leave.
onBeforeUnmount(() => {
  shopEl.value?.querySelector("iframe")?.iFrameResizer?.close();
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
          <div ref="shopEl" class="ot-iframe" data-ot-autoload="false"></div>
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
