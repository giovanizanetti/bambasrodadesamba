<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../i18n";
import { allShows, withDate, todayIso, weeztixGuid, weeztixShopUrl, loadWeeztixInjector } from "../shows";
import ShowRow from "./ShowRow.vue";

// The page of one show (/shows/<slug>/): its row from the shows list, and
// below it the Weeztix ticket shop when the show sells tickets through it.
const props = defineProps({ slug: { type: String, required: true } });
const { t, locale } = useI18n();

const found = allShows.find((s) => s.slug === props.slug);
const show = found && withDate(found);
const past = show && show.date < todayIso;
const title = computed(() => show && (show[`title_${locale.value}`] || show.title));
const guid = show && !past && !show.cancelled && weeztixGuid(show);

const shopEl = ref(null);

onMounted(async () => {
  if (!guid) return;
  const ShopInjector = await loadWeeztixInjector();
  // The visitor may have left the page while the script was loading.
  if (!shopEl.value) return;
  new ShopInjector().init({
    elem: shopEl.value,
    guid,
    url: weeztixShopUrl(guid),
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
  <section id="show">
    <div class="wrap">
      <a href="/shows/" class="back">{{ t("shows.backToShows") }}</a>

      <template v-if="show">
        <ShowRow :show="show" own-page />
        <p v-if="past" class="note">{{ t("shows.past") }}</p>
        <a
          v-if="show.eventUrl && !show.cancelled"
          :href="show.eventUrl"
          target="_blank"
          rel="noopener"
          class="event-link"
        >{{ t("shows.eventPage") }} ↗</a>

        <div v-if="guid" id="tickets" class="shop">
          <div ref="shopEl" class="ot-iframe" data-ot-autoload="false"></div>
        </div>

        <img v-if="show.image" :src="show.image" :alt="title" class="poster" />
      </template>

      <p v-else class="note">{{ t("shows.notFound") }}</p>
    </div>
  </section>
</template>

<style scoped>
#show {
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
.event-link {
  display: inline-block;
  margin-top: 6px;
  color: rgba(251, 247, 240, 0.6);
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s;
}
.event-link:hover { color: var(--orange); }
.note {
  margin-top: 10px;
  color: rgba(251, 247, 240, 0.6);
}
.poster {
  width: min(100%, 520px);
  margin: 26px auto 0;
  border-radius: 16px;
}
.shop {
  margin-top: 26px;
  scroll-margin-top: 100px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  min-height: 480px;
}
@media (max-width: 560px) {
  #show { padding-top: 110px; }
  .shop { padding: 6px; border-radius: 12px; }
}
</style>
