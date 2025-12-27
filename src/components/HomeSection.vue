<template>
  <section
    ref="sectionRef"
    class="home-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="hero">
      <div class="hero-image-container">
        <img
          v-if="!imageError"
          :src="imageSrc"
          alt="Bambas Roda de Samba - Brazilian samba band performing live in Amsterdam, playing traditional roda de samba music"
          class="hero-image"
          loading="eager"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <h1
          class="roda-title"
          :class="{ 'animate__animated animate__fadeInDownBig': isVisible }"
        >
          🇧🇷 RODA DE SAMBA 🇧🇷
        </h1>
        <div v-if="imageError" class="image-placeholder">
          <p>Band Photo</p>
          <p class="placeholder-subtitle">
            Add your band photo as public/band-photo.jpg
          </p>
        </div>
        <div class="logo-container">
          <img
            :src="logoSrc"
            alt="Bambas Roda de Samba logo - Brazilian samba band Amsterdam"
            class="hero-logo"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import homePageImage from "../assets/home-page.jpg";
import logoImage from "../assets/ChatGPT Image Dec 26, 2025, 11_37_49 PM.png";

const imageError = ref(false);
const imageSrc = ref(homePageImage);
const logoSrc = ref(logoImage);
const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

const handleImageError = () => {
  imageError.value = true;
};

const handleImageLoad = () => {
  imageError.value = false;
};

// Intersection Observer to trigger animations when section comes into view
onMounted(() => {
  const img = new Image();
  img.onload = () => {
    imageError.value = false;
  };
  img.onerror = () => {
    imageError.value = true;
  };
  img.src = imageSrc.value;

  // Set up intersection observer
  if (sectionRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            // Unobserve after first trigger to prevent re-animation
            if (observer) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px",
      }
    );

    observer.observe(sectionRef.value);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value);
    observer.disconnect();
  }
});
</script>

<style scoped>
.home-section {
  padding: 0;
  background-color: var(--bg-dark);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  padding: 4rem 2rem;
}

.hero-image-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  --g: #0000, #000 0.5deg 90deg, #0000 91deg;
  --m: conic-gradient(from 45deg, var(--g)) 20px 0 no-repeat,
    conic-gradient(from 135deg, var(--g)) 0 20px no-repeat,
    conic-gradient(from 225deg, var(--g)) -20px 0 no-repeat,
    conic-gradient(from 315deg, var(--g)) 0 -20px no-repeat;
  width: 70%;
  max-width: 1000px;
  height: auto;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 8px 32px var(--shadow-lg);
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease-out, transform 1.2s ease-out,
    -webkit-mask-position 0.3s linear, mask-position 0.3s linear,
    filter 0.3s linear;
  filter: grayscale(0.3);
  -webkit-mask: var(--m);
  mask: var(--m);
  -webkit-mask-position: 20px 0, 0 20px, -20px 0, 0 -20px;
  mask-position: 20px 0, 0 20px, -20px 0, 0 -20px;
}

.home-section.is-visible .hero-image {
  opacity: 0.6;
  transform: translateY(0);
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
  filter: grayscale(0);
}

.logo-container {
  position: absolute;
  top: -240px;
  left: 50%;
  transform: translateX(-50%) translateY(-30px);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.home-section.is-visible .logo-container {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.hero-logo {
  height: 400px;
  filter: drop-shadow(0 8px 16px var(--shadow-md));
  image-rendering: -webkit-optimize-contrast;
}

.hero-logo[src*=".png"] {
  background: none !important;
}

.roda-title {
  position: absolute;
  font-weight: bold;
  color: var(--text-light);
  text-align: center;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  background: var(--bg-title);
  padding: 0 1rem;
  border-radius: 20px;
  border: 1px solid var(--text-light);
}

.home-section.is-visible .roda-title {
  opacity: 1;
}

@media (max-width: 968px) {
  .hero {
    padding: 3rem 1.5rem;
  }

  .hero-logo {
    height: 300px;
  }

  .logo-container {
    top: -200px;
  }

  .hero-image-container {
    max-width: 100%;
  }

  .hero-image {
    width: 75%;
  }

  .roda-title {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 3.5rem 1rem 2rem 1rem;
  }

  .hero-logo {
    height: 225px;
  }

  .roda-title {
    font-size: 12px;
    z-index: 13;
    margin-left: -10px;
  }

  .logo-container {
    top: -170px;
  }

  .hero-image {
    width: 80%;
  }
}
</style>
