<script setup>
import { computed } from "vue";
import { useI18n } from "../i18n";
import { upcomingShows, SHOWS_PAGE_URL, whatsappShareHref } from "../shows";
import { sectionHref } from "../router";
import ShowRow from "./ShowRow.vue";
import WhatsappIcon from "./WhatsappIcon.vue";

const { t } = useI18n();

const shareHref = computed(() => whatsappShareHref(`${t("shows.shareText")}\n${SHOWS_PAGE_URL}`));
</script>

<template>
  <section id="shows">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t("shows.tag") }}</div>
        <h2>{{ t("shows.heading") }}</h2>
        <a v-if="upcomingShows.length" :href="shareHref" target="_blank" rel="noopener" class="share">
          <WhatsappIcon />
          {{ t("shows.share") }}
        </a>
      </div>
      <ShowRow v-for="show in upcomingShows" :key="show.slug" :show="show" />
      <p v-if="!upcomingShows.length" class="no-shows">{{ t("shows.noShows") }}</p>
      <p class="shows-note">
        {{ t("shows.privateNote") }}
        <a :href="sectionHref('#book')">{{ t("shows.privateNoteCta") }}</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
#shows {
  background: var(--ink);
}
.share {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  padding: 10px 18px;
  border: 1px solid rgba(251, 247, 240, 0.25);
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(251, 247, 240, 0.8);
  transition: 0.2s;
}
.share:hover {
  border-color: var(--orange);
  color: var(--orange);
}
.placeholder {
  margin-top: 24px;
  color: rgba(251, 247, 240, 0.5);
  font-size: 14px;
}
.no-shows {
  padding: 26px 30px;
  border: 1px dashed rgba(251, 247, 240, 0.2);
  border-radius: 16px;
  color: rgba(251, 247, 240, 0.6);
  font-size: 15px;
}
.shows-note {
  margin-top: 24px;
  color: rgba(251, 247, 240, 0.5);
  font-size: 14px;
}
.shows-note a {
  color: var(--orange);
  text-decoration: none;
}
.shows-note a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
