<template>
  <section class="contact-section">
    <div class="container">
      <h2 class="section-title">Contact Us</h2>
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-item">
            <h3>Location</h3>
            <p>Amsterdam Area, Netherlands</p>
          </div>
          <div class="info-item">
            <h3>Get in Touch</h3>
            <p>
              For bookings, collaborations, or inquiries, please reach out to
              us.
            </p>
          </div>
        </div>
        <div class="contact-form-container">
          <p class="form-note">
            We'd love to hear from you! Send us a message and we'll get back to
            you soon.
          </p>
          <div class="contact-display">
            <p><strong>Email:</strong> contact@bambasrodadesamba.nl</p>
            <p>
              <strong>Follow us:</strong> Check our social media for updates and
              upcoming events
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.contact-section {
  padding: 5rem 2rem;
  background-color: var(--text-light);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: var(--brazil-green);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(
    to right,
    var(--brazil-green),
    var(--brazil-yellow)
  );
  margin: 1rem auto 0;
  border-radius: 2px;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background-color: var(--bg-light);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item h3 {
  color: var(--brazil-green);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-item p {
  color: var(--text-dark);
  font-size: 1rem;
  line-height: 1.6;
}

.contact-form-container {
  display: flex;
  flex-direction: column;
}

.form-note {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.contact-display {
  background-color: var(--text-light);
  padding: 1.5rem;
  border-radius: 4px;
  border-left: 4px solid var(--brazil-green);
}

.contact-display p {
  margin-bottom: 1rem;
  color: var(--text-dark);
  line-height: 1.6;
}

.contact-display p:last-child {
  margin-bottom: 0;
}

.contact-display strong {
  color: var(--brazil-green);
  font-weight: 600;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .info-item h3 {
    font-size: 1.2rem;
  }
}
</style>
