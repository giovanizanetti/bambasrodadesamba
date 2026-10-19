<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "../i18n";
import { allShows, withDate, todayIso, weeztixGuid, weeztixShopUrl, weticketShopUrl, loadWeeztixInjector, descriptionBlocks } from "../shows";
import ShowRow from "./ShowRow.vue";

// The page of one show (/shows/<slug>/): its row from the shows list, and
// below it the Weeztix or WeTicket ticket shop when the show sells tickets
// through one. Also /friday/, the next Friday roda (friday: true), where the
// slug is missing until the next one is in the CMS.
const props = defineProps({
  slug: { type: String, default: null },
  friday: { type: Boolean, default: false },
});
const { t, locale } = useI18n();

const found = allShows.find((s) => s.slug === props.slug);
const show = found && withDate(found);
const past = show && show.date < todayIso;
const title = computed(() => show && (show[`title_${locale.value}`] || show.title));
const description = computed(() => show && descriptionBlocks(show[`description_${locale.value}`] || show.description));
const guid = show && !past && !show.cancelled && weeztixGuid(show);
const weticketUrl = show && !past && !show.cancelled && !guid && weticketShopUrl(show);

const shopEl = ref(null);
const weticketEl = ref(null);

// WeTicket's shop can't tell us its height. It starts short (pick a ticket)
// and the check-out is long, so the frame starts compact and grows as soon as
// the visitor clicks into the shop, which moves the focus into the frame.
// Polled, because a click there only blurs our window if it had the focus.
const weticketActive = ref(false);
let focusCheck = null;
const checkShopFocus = () => {
  if (!weticketEl.value || document.activeElement !== weticketEl.value) return;
  weticketActive.value = true;
  clearInterval(focusCheck);
};

onMounted(async () => {
  if (weticketUrl) focusCheck = setInterval(checkShopFocus, 300);
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
  clearInterval(focusCheck);
  shopEl.value?.querySelector("iframe")?.iFrameResizer?.close();
});
</script>

<template>
  <section id="show">
    <div class="wrap">
      <a href="/shows/" class="back">{{ t("shows.backToShows") }}</a>

      <template v-if="show">
        <ShowRow :show="show" own-page :past="past" />
        <p v-if="past" class="note">{{ t("shows.past") }}</p>
        <a
          v-if="show.eventUrl && !show.cancelled"
          :href="show.eventUrl"
          target="_blank"
          rel="noopener"
          class="event-link"
        >{{ t("shows.eventPage") }} ↗</a>

        <div v-if="description?.length" class="description">
          <template v-for="(block, i) in description" :key="i">
            <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
            <ul v-else-if="block.type === 'list'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
            <p v-else>{{ block.text }}</p>
          </template>
        </div>

        <div v-if="guid" id="tickets" class="shop">
          <div ref="shopEl" class="ot-iframe" data-ot-autoload="false"></div>
        </div>
        <div v-else-if="weticketUrl" id="tickets" class="shop">
          <iframe
            ref="weticketEl"
            :src="weticketUrl"
            :title="t('shows.tickets')"
            class="weticket"
            :class="{ active: weticketActive }"
          ></iframe>
        </div>

        <img v-if="show.image" :src="show.image" :alt="title" class="poster" />
      </template>

      <p v-else class="note">{{ friday ? t("shows.fridaySoon") : t("shows.notFound") }}</p>
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
.description {
  max-width: 680px;
  margin-top: 30px;
  color: rgba(251, 247, 240, 0.85);
  font-size: 16px;
  line-height: 1.65;
}
.description h2 {
  margin: 26px 0 8px;
  color: var(--orange);
  font-size: 20px;
}
.description h2:first-child { margin-top: 0; }
.description p { margin: 0 0 14px; }
.description ul { margin: 0 0 14px; padding-left: 20px; }
.description li { margin-bottom: 6px; }
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
/* WeTicket's shop: compact for picking a ticket, tall for the check-out. */
.weticket {
  display: block;
  width: 100%;
  height: 325px;
  border: none;
  transition: height 0.3s ease;
}
.weticket.active { height: 880px; }
/* The shop has its own grey background: no white border around it. */
.shop:has(.weticket) {
  min-height: 0;
  padding: 0;
  overflow: hidden;
  background: #f8f8f8;
}
@media (max-width: 900px) {
  .weticket { height: 500px; }
}
@media (max-width: 560px) {
  #show { padding-top: 110px; }
  .shop { padding: 6px; border-radius: 12px; }
  .weticket { height: 620px; }
  .weticket.active { height: 1280px; }
}
</style>
