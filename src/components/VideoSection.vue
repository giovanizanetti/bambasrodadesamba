<script setup>
import { ref } from 'vue'
import poster from '../assets/photos/live-bar-1.jpg'

const VIDEO_SRC = '/video/institucional.mp4'

const videoEl = ref(null)
const playing = ref(false)

const start = () => {
  if (playing.value) return
  playing.value = true
  const v = videoEl.value
  v.src = VIDEO_SRC
  v.load()
  const p = v.play()
  if (p && p.catch) p.catch(() => {})
}
</script>

<template>
  <section id="video">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">Watch</div>
        <h2>Live videos</h2>
      </div>
      <div class="video-stage">
        <div class="video-player" :class="{ playing }" @click="start">
          <img class="poster" :src="poster" alt="Bambas live" />
          <video ref="videoEl" preload="none" playsinline controls :poster="poster"></video>
          <div class="play" aria-label="Play video"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#video { background: var(--ink); }
.video-stage { display: flex; justify-content: center; }
.video-player {
  position: relative; width: min(380px, 86vw); aspect-ratio: 9/16; border-radius: 20px;
  overflow: hidden; background: #000; box-shadow: 0 24px 70px rgba(0,0,0,.6);
  border: 1px solid rgba(253,118,3,.25); cursor: pointer;
}
.video-player video, .video-player .poster { width: 100%; height: 100%; object-fit: cover; display: block; }
.video-player .poster { position: absolute; inset: 0; transition: .3s; }
.video-player .play {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 84px; height: 84px; border-radius: 50%; background: var(--orange);
  display: flex; align-items: center; justify-content: center; transition: .25s; z-index: 3;
  box-shadow: 0 10px 30px rgba(253,118,3,.5);
}
.video-player:hover .play { transform: translate(-50%, -50%) scale(1.08); background: var(--orange-bright); }
.video-player .play::after {
  content: ""; border-left: 26px solid #0E0E0E; border-top: 16px solid transparent;
  border-bottom: 16px solid transparent; margin-left: 6px;
}
.video-player.playing .play, .video-player.playing .poster { opacity: 0; pointer-events: none; }
</style>
