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
          alt="Bambas Roda de Samba performing"
          class="hero-image"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div v-if="imageError" class="image-placeholder">
          <p>Band Photo</p>
          <p class="placeholder-subtitle">
            Add your band photo as public/band-photo.jpg
          </p>
        </div>
        <div class="logo-container">
          <img
            :src="logoSrc"
            alt="Bambas Roda de Samba Logo"
            class="hero-logo"
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

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped>
.home-section {
  padding: 0;
  background-color: #2f2f2f; /* Graphite color */
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
  width: 100%;
  max-width: 1000px;
  height: auto;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease-out, transform 1.2s ease-out,
    -webkit-mask-position 0.3s linear, mask-position 0.3s linear,
    filter 0.3s linear;
  /* Vignette effect - fade on borders */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(0, 0, 0, 0.3),
    inset 0 0 200px rgba(0, 0, 0, 0.2);
  filter: grayscale(0.5);
  -webkit-mask: var(--m);
  mask: var(--m);
  -webkit-mask-position: 20px 0, 0 20px, -20px 0, 0 -20px;
  mask-position: 20px 0, 0 20px, -20px 0, 0 -20px;
}

/* Opacity mask overlay - makes corners more opaque, center less opaque */
.hero-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 70%,
    transparent 100%
  );
  mix-blend-mode: multiply;
  z-index: 2;
}

.home-section.is-visible .hero-image {
  opacity: 1;
  transform: translateY(0);
  -webkit-mask-position: 0 0, 0 0;
  mask-position: 0 0, 0 0;
  filter: grayscale(0);
}

/* Vignette overlay for better fade effect */
.hero-image-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.1) 80%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
}

.logo-container {
  position: absolute;
  top: -220px;
  left: 50%;
  transform: translateX(-50%) translateY(-30px);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.home-section.is-visible .logo-container {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.hero-logo {
  height: 400px;
  width: auto;
  object-fit: contain;
  background: transparent;
  mix-blend-mode: normal;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  image-rendering: -webkit-optimize-contrast;
}

/* Remove any background from logo */
.hero-logo[src*=".png"] {
  background: none !important;
}

.image-placeholder {
  width: 100%;
  max-width: 1000px;
  min-height: 200px;
  background: linear-gradient(
    135deg,
    var(--brazil-green) 0%,
    var(--brazil-yellow) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 1.5rem;
  font-weight: bold;
  padding: 2rem;
  text-align: center;
  border-radius: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(0, 0, 0, 0.3),
    inset 0 0 200px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.home-section.is-visible .image-placeholder {
  opacity: 1;
  transform: translateY(0);
}

.placeholder-subtitle {
  font-size: 0.9rem;
  font-weight: normal;
  margin-top: 0.5rem;
  opacity: 0.9;
}

@media (max-width: 968px) {
  .hero {
    padding: 3rem 1.5rem;
  }

  .hero-logo {
    height: 200px;
  }

  .logo-container {
    top: -60px;
  }

  .hero-image-container {
    max-width: 100%;
  }

  .hero-image {
    border-radius: 20px;
  }

  .hero-image-container::after {
    border-radius: 20px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 1rem;
  }

  .hero-logo {
    height: 150px;
  }

  .logo-container {
    top: -40px;
  }

  .hero-image {
    border-radius: 16px;
  }

  .hero-image-container::after {
    border-radius: 16px;
  }

  .image-placeholder {
    min-height: 300px;
    font-size: 1.2rem;
    border-radius: 16px;
  }
}
</style>
