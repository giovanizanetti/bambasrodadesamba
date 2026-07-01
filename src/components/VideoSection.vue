<script setup>
import { ref, reactive } from 'vue'
import poster from '../assets/photos/live-bar-2.jpg'
import birthdayPoster from '../assets/photos/wagner-moura-1.jpg'
import { useI18n } from '../i18n'

const { t } = useI18n()

const videos = [
  { src: '/video/institucional.mp4', poster, captionKey: '', featured: false },
  { src: '/video/wagner-moura-birthday.mp4', poster: birthdayPoster, captionKey: 'video.birthdayCaption', featured: true },
]

const youtube = {
  id: 'KW4ScUJ9Wos',
  caption: "King's Day — Yusu Café party at Oosterpark, Amsterdam, 2026",
  title: "Bambas Roda de Samba — King's Day party at Yusu Café, Oosterpark, Amsterdam, 2026",
  thumb: 'https://i.ytimg.com/vi/KW4ScUJ9Wos/maxresdefault.jpg',
}
const ytPlaying = ref(false)

const videoEls = ref([])
const setVideoRef = (el, i) => { if (el) videoEls.value[i] = el }
const playing = reactive({})

const start = (i) => {
  if (playing[i]) return
  playing[i] = true
  const v = videoEls.value[i]
  v.src = videos[i].src
  v.load()
  const p = v.play()
  if (p && p.catch) p.catch(() => {})
}
</script>

<template>
  <section id="videos">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">{{ t('video.tag') }}</div>
        <h2>{{ t('video.heading') }}</h2>
      </div>
      <figure class="yt-item">
        <div
          class="yt-frame"
          role="button"
          tabindex="0"
          :aria-label="`Play video: ${youtube.caption}`"
          @click="ytPlaying = true"
          @keydown.enter="ytPlaying = true"
          @keydown.space.prevent="ytPlaying = true"
        >
          <template v-if="!ytPlaying">
            <img class="yt-thumb" :src="youtube.thumb" :alt="youtube.title" loading="lazy" />
            <div class="play" aria-hidden="true"></div>
          </template>
          <iframe
            v-else
            class="yt-embed"
            :src="`https://www.youtube-nocookie.com/embed/${youtube.id}?autoplay=1&rel=0`"
            :title="youtube.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <figcaption class="video-caption">{{ youtube.caption }}</figcaption>
      </figure>
      <div class="video-stage">
        <figure v-for="(vid, i) in videos" :key="i" class="video-item" :class="{ featured: vid.featured }">
          <div class="video-player" :class="{ playing: playing[i] }" @click="start(i)">
            <img class="poster" :src="vid.poster" :alt="t('video.posterAlt')" />
            <video
              :ref="el => setVideoRef(el, i)"
              preload="none"
              playsinline
              controls
              controlsList="nofullscreen noplaybackrate nodownload"
              disablePictureInPicture
              @dblclick.prevent
              :poster="vid.poster"
            ></video>
            <div class="play" aria-label="Play video"></div>
          </div>
          <figcaption v-if="vid.captionKey" class="video-caption">{{ t(vid.captionKey) }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
#videos { background: var(--ink); padding-top: 48px; }
.yt-item { margin: 0 0 40px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.yt-frame {
  position: relative; width: min(860px, 92vw); aspect-ratio: 16/9;
  border-radius: 18px; overflow: hidden; background: #000; cursor: pointer;
  box-shadow: 0 24px 70px rgba(0,0,0,.6); border: 1px solid rgba(253,118,3,.25);
}
.yt-frame:focus-visible { outline: 3px solid var(--orange); outline-offset: 3px; }
.yt-thumb, .yt-embed { width: 100%; height: 100%; display: block; border: 0; object-fit: cover; }
.video-stage { display: flex; justify-content: center; align-items: flex-start; gap: 28px; flex-wrap: wrap; }
.video-item { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.video-caption {
  color: var(--cream); font-size: 15px; font-weight: 600; text-align: center;
  letter-spacing: .02em; opacity: .85;
}
.video-player {
  position: relative; width: min(380px, 86vw); aspect-ratio: 9/16; border-radius: 20px;
  overflow: hidden; background: #000; box-shadow: 0 24px 70px rgba(0,0,0,.6);
  border: 1px solid rgba(253,118,3,.25); cursor: pointer;
}
.video-player video, .video-player .poster { width: 100%; height: 100%; object-fit: cover; display: block; }
.video-player .poster { position: absolute; inset: 0; transition: .3s; }
.video-player .play, .yt-frame .play {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 84px; height: 84px; border-radius: 50%; background: var(--orange);
  display: flex; align-items: center; justify-content: center; transition: .25s; z-index: 3;
  box-shadow: 0 10px 30px rgba(253,118,3,.5); pointer-events: none;
}
.video-player:hover .play, .yt-frame:hover .play { transform: translate(-50%, -50%) scale(1.08); background: var(--orange-bright); }
.video-player .play::after, .yt-frame .play::after {
  content: ""; border-left: 26px solid #0E0E0E; border-top: 16px solid transparent;
  border-bottom: 16px solid transparent; margin-left: 6px;
}
.video-player.playing .play, .video-player.playing .poster { opacity: 0; pointer-events: none; }

/* On stacked (mobile) layout, show the Wagner Moura birthday video first */
@media (max-width: 835px) {
  .video-item.featured { order: -1; }
}
</style>
