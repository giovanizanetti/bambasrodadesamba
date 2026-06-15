<script setup>
import heroBg from "../assets/photos/band-overhead-1.jpg";
import heroLogo from "../assets/photos/logo_hero_circle.png";
import { useI18n } from "../i18n";

const { t } = useI18n();
</script>

<template>
  <header class="hero">
    <div class="hero-bg">
      <div class="img" :style="{ backgroundImage: `url(${heroBg})` }"></div>
      <div class="grad"></div>
    </div>
    <div class="hero-inner">
      <div class="hero-logo">
        <img :src="heroLogo" alt="Bambas Roda de Samba" />
      </div>
      <p class="hero-tagline">{{ t("hero.tagline") }}</p>
      <div class="hero-btns">
        <a href="#book" class="btn btn-primary">{{ t("hero.book") }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>§
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 120px 0 60px;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg .img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.62;
  filter: grayscale(0.05);
}
.hero-bg .grad {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      90% 70% at 50% 45%,
      rgba(253, 118, 3, 0.15),
      transparent 60%
    ),
    linear-gradient(
      180deg,
      rgba(14, 14, 14, 0.35),
      rgba(14, 14, 14, 0.72) 72%,
      var(--ink)
    );
}
.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-logo {
  animation: float 6s ease-in-out 1.6s infinite;
}
.hero-logo img {
  width: min(460px, 82vw);
  filter: drop-shadow(0 24px 60px rgba(253, 118, 3, 0.35));
  animation: logoSpin 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes logoSpin {
  0% {
    transform: rotate(0deg) scale(0.6);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-16px);
  }
}

.hero-tagline {
  font-size: clamp(16px, 2vw, 20px);
  color: rgba(251, 247, 240, 0.85);
  max-width: 560px;
  margin: 34px auto 0;
  line-height: 1.5;
}
.hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 34px;
}
</style>
