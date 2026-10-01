<script setup>
import { computed } from "vue";
import { useI18n } from "../i18n";
import { allShows, weeztixGuid } from "../shows";
import { ticketsHref } from "../router";

const { t, locale } = useI18n();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const now = new Date();
const todayIso = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");

const localized = (show, field) => show[`${field}_${locale.value}`] || show[field];

const upcomingShows = computed(() =>
  allShows
    .filter((show) => show.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((show) => ({
      ...show,
      day: show.date.slice(8, 10),
      month: MONTHS[Number(show.date.slice(5, 7)) - 1],
      title: localized(show, "title"),
      subtitle: localized(show, "subtitle"),
      info: `📍 ${show.venue}`,
      ticketLink: weeztixGuid(show) ? ticketsHref(show.slug) : show.ticketUrl,
      ticketExternal: !weeztixGuid(show),
    }))
);
</script>

<template>
  <section id="shows">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t("shows.tag") }}</div>
        <h2>{{ t("shows.heading") }}</h2>
      </div>
      <div
        v-for="(show, i) in upcomingShows"
        :key="i"
        class="show-row"
        :class="{ cancelled: show.cancelled }"
      >
        <div class="show-date">
          <div class="d">{{ show.day }}</div>
          <div class="m">{{ show.month }}</div>
        </div>
        <div class="show-info">
          <h3>
            <a
              v-if="show.eventUrl && !show.cancelled"
              :href="show.eventUrl"
              target="_blank"
              rel="noopener"
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
            <span v-if="show.cancelled" class="cancelled-badge">{{ t('shows.cancelled') }}</span>
            <span v-else-if="show.free" class="free-badge">{{ t('shows.freeEntry') }}</span>
          </div>
        </div>
        <a
          v-if="show.ticketLink && !show.cancelled"
          :href="show.ticketLink"
          :target="show.ticketExternal ? '_blank' : null"
          :rel="show.ticketExternal ? 'noopener' : null"
          class="btn btn-primary"
        >{{ show.free ? t("shows.freeTicket") : t("shows.tickets") }}</a>
      </div>
      <p v-if="!upcomingShows.length" class="no-shows">{{ t("shows.noShows") }}</p>
      <p class="shows-note">
        {{ t("shows.privateNote") }}
        <a href="#book">{{ t("shows.privateNoteCta") }}</a>
      </p>
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
  font-size: 13px; font-weight: 600; color: rgba(251,247,240,.5); white-space: nowrap;
}
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
