<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <ul class="nav-links">
          <li><a href="#home" @click="scrollTo('home')">Home</a></li>
          <li>
            <a href="#about-samba" @click="scrollTo('about-samba')"
              >About Samba</a
            >
          </li>
          <li><a href="#contact" @click="scrollTo('contact')">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <HomeSection id="home" />
      <AboutSambaSection id="about-samba" />
      <ContactSection id="contact" />
    </main>

    <footer class="footer">
      <p>
        &copy; {{ new Date().getFullYear() }} Bambas Roda de Samba - Amsterdam
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeSection from "./components/HomeSection.vue";
import AboutSambaSection from "./components/AboutSambaSection.vue";
import ContactSection from "./components/ContactSection.vue";

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--text-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-dark);
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
}
</style>
