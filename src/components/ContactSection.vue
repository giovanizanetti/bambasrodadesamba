<template>
  <section class="contact-section">
    <div class="container">
      <h2 class="section-title">Book us for your event!</h2>

      <div class="booking-content">
        <p class="booking-text">
          As long as we can bring our musical instruments and set up our center
          table, we'll bring lots of good vibes and Brazilian culture to your
          party. Whether it's a wedding, summer afternoon party, private
          celebration, cultural event, or festival, we're ready to create an
          unforgettable samba circle experience.
        </p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-item">
            <h3>Location</h3>
            <p>
              Based in Amsterdam Area, Netherlands. We play throughout Europe!
            </p>
          </div>
          <div class="info-item">
            <h3>Get in Touch</h3>
            <p>For bookings, collaborations, or inquiries, reach out to us.</p>
          </div>
        </div>
        <div class="contact-form-container">
          <!-- Primary Contact Method: Instagram -->
          <div class="primary-contact">
            <a
              href="https://www.instagram.com/bambasrodadesamba/"
              target="_blank"
              rel="noopener noreferrer"
              class="instagram-message-button"
              aria-label="Send us a message on Instagram"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
              <span class="button-text">Message us on Instagram</span>
            </a>
            <p class="contact-hint">Faster response!</p>
          </div>

          <!-- Secondary Contact Method: Email -->

          <p class="or-divider">or</p>
          <div class="secondary-contact">
            <div class="email-contact">
              <p class="email-label"><strong>Email us:</strong></p>
              <a href="mailto:info@bambasrodadesamba.com" class="email-link">
                info@bambasrodadesamba.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import InstagramIcon from "./InstagramIcon.vue";
</script>

<style scoped>
.contact-section {
  padding: 5rem 2rem;
  background-color: var(--bg-dark);
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
  box-shadow: 0 4px 16px var(--shadow-sm);
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
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Primary Contact: Instagram */
.primary-contact {
  background: linear-gradient(135deg, var(--brazil-green), var(--brazil-blue));
  padding: 1.25rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px var(--shadow-md);
}

.contact-method-title {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.instagram-message-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--text-light);
  color: var(--brazil-green);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-md);
  border: 2px solid transparent;
}

.instagram-message-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--shadow-lg);
  background-color: var(--brazil-yellow);
  color: var(--text-dark);
}

.instagram-message-button:focus-visible {
  outline: 3px solid var(--text-light);
  outline-offset: 2px;
}

.instagram-message-button svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.button-text {
  font-weight: 600;
}

.contact-hint {
  color: var(--text-light);
  margin-top: 0.75rem;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Secondary Contact: Email */
.secondary-contact {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--text-light);
  border-radius: 8px;
  border: 2px dashed var(--brazil-green);
}

.or-divider {
  color: var(--text-dark);
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}

.email-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.email-label {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.email-label strong {
  color: var(--brazil-green);
  font-weight: 600;
}

.email-link {
  color: var(--brazil-blue);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: var(--brazil-green);
  text-decoration: underline;
}

.email-link:focus-visible {
  outline: 2px solid var(--brazil-green);
  outline-offset: 2px;
  border-radius: 2px;
}

.booking-content {
  margin: 3rem auto;
  text-align: center;
}

.booking-title {
  font-size: 2rem;
  color: var(--brazil-green);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.booking-text {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .info-item h3 {
    font-size: 1.1rem;
  }

  .booking-content {
    margin-top: 2rem;
  }

  .booking-title {
    font-size: 1.5rem;
  }

  .booking-text {
    font-size: 1rem;
  }

  .primary-contact {
    padding: 1rem;
  }

  .contact-method-title {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .instagram-message-button {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }

  .instagram-message-button svg {
    width: 18px;
    height: 18px;
  }

  .contact-hint {
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  .secondary-contact {
    padding: 1.25rem;
  }

  .email-link {
    font-size: 0.85rem;
    white-space: nowrap;
    display: inline-block;
  }
}
</style>
