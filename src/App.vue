<template>
  <div class="app">
    <header class="header" role="banner">
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <ul class="nav-links">
          <li>
            <a
              href="/"
              @click.prevent="scrollTo('home')"
              aria-label="Go to home section"
              >Home</a
            >
          </li>
          <li>
            <a
              href="/about"
              @click.prevent="scrollTo('about')"
              aria-label="Learn about samba"
              >About</a
            >
          </li>
          <li>
            <a
              href="/contact"
              @click.prevent="scrollTo('contact')"
              aria-label="Contact and book us"
              >Contact</a
            >
          </li>
        </ul>
        <InstagramIcon :show-text="false" class="nav-instagram" />
      </nav>
    </header>

    <main role="main">
      <HomeSection id="home" />
      <AboutSection id="about" />
      <ContactSection id="contact" />
    </main>

    <footer class="footer" role="contentinfo">
      <p>
        &copy; {{ new Date().getFullYear() }} Bambas Roda de Samba - Amsterdam
      </p>
      <div class="social-links">
        <InstagramIcon :show-text="true" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HomeSection from "./components/HomeSection.vue";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import InstagramIcon from "./components/InstagramIcon.vue";

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });

    // Update URL without hash
    const path = sectionId === "home" ? "/" : `/${sectionId}`;
    window.history.pushState({ section: sectionId }, "", path);
  }
};

const scrollToSectionFromPath = (pathname) => {
  let sectionId = "home";

  if (pathname === "/about") {
    sectionId = "about";
  } else if (pathname === "/contact") {
    sectionId = "contact";
  }

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);
};

onMounted(() => {
  // Handle initial load
  scrollToSectionFromPath(window.location.pathname);

  // Handle browser back/forward buttons
  window.addEventListener("popstate", (event) => {
    const pathname = window.location.pathname;
    scrollToSectionFromPath(pathname);
  });
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--bg-header);
  box-shadow: 0 2px 8px var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.nav-instagram {
  color: var(--text-light);
}

.nav-instagram:hover {
  color: var(--brazil-yellow);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-links a:hover {
  color: var(--brazil-green);
}

main {
  flex: 1;
}

.footer {
  background-color: var(--text-dark);
  color: var(--text-light);
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

.social-links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links :deep(.instagram-link) {
  color: var(--text-light);
}

.social-links :deep(.instagram-link:hover) {
  color: var(--brazil-yellow);
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-instagram {
    margin-top: 0.5rem;
  }
}
</style>
