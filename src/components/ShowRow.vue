<script setup>
import { computed } from "vue";
import { useI18n } from "../i18n";
import { weeztixGuid, showWhen, whatsappShareHref, SITE_URL } from "../shows";
import { showHref } from "../router";
import WhatsappIcon from "./WhatsappIcon.vue";

// One show in the "Upcoming shows" list. Also used for the WhatsApp preview
// picture of a show (preview: true), so the picture looks exactly like the
// website; a picture has no use for the share button.
const props = defineProps({
  show: { type: Object, required: true },
  preview: { type: Boolean, default: false },
  // On the show's own page the title is no longer a link.
  ownPage: { type: Boolean, default: false },
});
const { t, locale } = useI18n();

const DATE_LOCALES = { en: "en-GB", nl: "nl-NL", pt: "pt-BR" };

const localized = (field) => props.show[`${field}_${locale.value}`] || props.show[field];

const show = computed(() => ({
  ...props.show,
  title: localized("title"),
  subtitle: localized("subtitle"),
  info: `📍 ${props.show.venue}`,
  ticketLink: weeztixGuid(props.show) ? `${showHref(props.show.slug)}#tickets` : props.show.ticketUrl,
  ticketExternal: !weeztixGuid(props.show),
  // In a list the title opens the show's own page (poster, tickets).
  titleLink: props.ownPage ? null : showHref(props.show.slug),
}));

// e.g. "Bambas Roda de Samba · Fri 16 Oct, 20:30-00:00 · Chef, Amsterdam" + the show's page.
const shareHref = computed(() =>
  whatsappShareHref(
    `${show.value.title} · ${showWhen(props.show, DATE_LOCALES[locale.value])} · ${props.show.venue}\n` +
      `${SITE_URL}${showHref(props.show.slug)}`
  )
);
</script>

<template>
  <div class="show-row" :class="{ cancelled: show.cancelled }">
    <div class="show-date">
      <div class="d">{{ show.day }}</div>
      <div class="m">{{ show.month }}</div>
    </div>
    <div class="show-info">
      <h3>
        <a
          v-if="show.titleLink && !show.cancelled"
          :href="show.titleLink"
          class="show-title-link"
        >{{ show.title }}</a>
        <template v-else>{{ show.title }}</template>
      </h3>
      <p v-if="show.subtitle" class="show-subtitle">{{ show.subtitle }}</p>
      <div class="show-meta">
        <a
          v-if="show.mapsUrl && !show.cancelled"
          :href="show.mapsUrl"
          target="_blank"
          rel="noopener"
          class="show-location"
        >{{ show.info }}</a>
        <p v-else>{{ show.info }}</p>
        <span v-if="show.time" class="show-time">{{ show.time }}</span>
        <span v-if="show.playTime" class="show-play-time">{{ t('shows.playsAt') }} <span class="nowrap">{{ show.playTime }}</span></span>
        <span v-if="show.cancelled" class="cancelled-badge">{{ t('shows.cancelled') }}</span>
        <span v-else-if="show.free" class="free-badge">{{ t('shows.freeEntry') }}</span>
      </div>
    </div>
    <div class="show-actions">
      <a
        v-if="!preview && !show.cancelled"
        :href="shareHref"
        target="_blank"
        rel="noopener"
        class="share-icon"
        :aria-label="t('shows.share')"
        :title="t('shows.share')"
      ><WhatsappIcon /></a>
      <a
        v-if="show.ticketLink && !show.cancelled"
        :href="show.ticketLink"
        :target="show.ticketExternal ? '_blank' : null"
        :rel="show.ticketExternal ? 'noopener' : null"
        class="btn btn-primary"
      >{{ show.free ? t("shows.freeTicket") : t("shows.tickets") }}</a>
      <a
        v-if="show.titleLink && !show.cancelled"
        :href="show.titleLink"
        class="btn btn-ghost"
      >{{ t("shows.moreInfo") }}</a>
    </div>
  </div>
</template>

<style scoped>
.show-row {
  position: relative;
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
  max-width: 100%;
  overflow: hidden;
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
.show-info {
  min-width: 0;
}
.show-info h3 {
  font-size: 21px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.show-subtitle {
  color: rgba(251, 247, 240, 0.5);
  font-size: 14px;
  font-style: italic;
  margin-bottom: 6px;
}
.show-info p {
  color: rgba(251, 247, 240, 0.6);
  font-size: 15px;
}
.show-title-link {
  color: inherit;
  text-decoration: none;
  transition: 0.2s;
}
.show-title-link:hover {
  color: var(--orange);
  text-decoration: underline;
  text-underline-offset: 4px;
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
  font-size: 13px; font-weight: 600; color: rgba(251,247,240,.5);
}
.show-play-time {
  font-size: 13px; font-weight: 700; color: var(--orange);
}
.nowrap { white-space: nowrap; }
.free-badge {
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: var(--orange); border: 1px solid var(--orange); border-radius: 20px;
  padding: 2px 9px; white-space: nowrap;
}
.cancelled-badge {
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: #e05252; border: 1px solid #e05252; border-radius: 20px;
  padding: 2px 9px; white-space: nowrap;
}
.show-row.cancelled { opacity: 0.55; }
.show-row.cancelled:hover {
  border-color: rgba(251, 247, 240, 0.12);
  background: rgba(255, 255, 255, 0.02);
}
.show-row.cancelled .show-info h3 {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: #e05252;
}
.show-row.cancelled .show-date .d { color: rgba(251, 247, 240, 0.5); }

.show-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
/* Same height as the outlined More info button next to it. */
.show-actions .btn-primary { border: 2px solid transparent; }
.share-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid rgba(251, 247, 240, 0.25);
  border-radius: 50%;
  color: rgba(251, 247, 240, 0.8);
  transition: 0.2s;
}
.share-icon:hover {
  border-color: var(--orange);
  color: var(--orange);
}
/* With a mouse, the share button stays quiet until you point at the show. */
@media (hover: hover) {
  .share-icon { opacity: 0.35; }
  .show-row:hover .share-icon,
  .share-icon:focus-visible { opacity: 1; }
}

@media (max-width: 900px) {
  .show-row {
    grid-template-columns: 80px 1fr;
    gap: 18px;
  }
  .show-info { padding-right: 44px; }
  .show-actions {
    grid-column: 1 / -1;
  }
  .show-actions:not(:has(.btn)) { display: contents; }
  .show-actions { flex-wrap: wrap; }
  /* Equal widths side by side; each drops to its own line when it can't fit its label. */
  .show-row .btn { flex: 1 1 0; min-width: max-content; justify-content: center; }
  .share-icon {
    position: absolute;
    top: 16px;
    right: 16px;
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
  .show-row .btn { padding: 14px 20px; }
  .show-info h3 {
    font-size: 19px;
  }
}
</style>
