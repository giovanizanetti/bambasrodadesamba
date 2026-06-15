<script setup>
import { reactive } from 'vue'

const IG_HANDLE = '@bambasrodadesamba'
const IG_URL = 'https://www.instagram.com/bambasrodadesamba/'
const EMAIL = 'info@bambasrodadesamba.com'

const form = reactive({ name: '', contact: '', event: '', message: '' })

// No backend on this static site — compose a pre-filled email to the band.
const onSubmit = () => {
  const subject = `Booking request${form.event ? ` — ${form.event}` : ''}`
  const body = [
    `Name: ${form.name}`,
    `Email / WhatsApp: ${form.contact}`,
    `Event type · Date: ${form.event}`,
    '',
    form.message,
  ].join('\n')
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <section id="book">
    <div class="wrap">
      <div class="book-grid">
        <div>
          <h2>Want samba<br />at your party?</h2>
          <p>
            Weddings, birthdays, corporate events or just a good time with friends — Bambas brings
            the full roda to you. Based in Amsterdam, playing throughout Europe.
          </p>
          <div class="contact-line">
            <div class="ic">@</div>
            <a :href="IG_URL" target="_blank" rel="noopener">{{ IG_HANDLE }}</a>
          </div>
          <div class="contact-line">
            <div class="ic">✉</div>
            <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
          </div>
        </div>
        <form class="book-form" @submit.prevent="onSubmit">
          <div class="field">
            <label>Name</label>
            <input v-model="form.name" type="text" placeholder="Your name" />
          </div>
          <div class="field">
            <label>Email / WhatsApp</label>
            <input v-model="form.contact" type="text" placeholder="How we reach you" />
          </div>
          <div class="field">
            <label>Event type · Date</label>
            <input v-model="form.event" type="text" placeholder="e.g. Wedding, Oct 12" />
          </div>
          <div class="field">
            <label>Message</label>
            <textarea v-model="form.message" rows="3" placeholder="Tell us a bit about the event"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Send request</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
#book { background: linear-gradient(135deg, var(--orange) 0%, #E25E00 100%); color: #0E0E0E; }
.book-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.book-grid h2 { font-size: clamp(38px, 5vw, 66px); line-height: .95; text-transform: uppercase; color: #0E0E0E; }
.book-grid p { font-size: 19px; line-height: 1.6; margin: 22px 0 30px; font-weight: 500; max-width: 460px; }
.book-form { background: #0E0E0E; color: var(--cream); padding: 40px; border-radius: 22px; }
.book-form .field { margin-bottom: 18px; }
.book-form label { display: block; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; color: var(--orange-bright); }
.book-form input, .book-form textarea {
  width: 100%; padding: 14px 16px; border-radius: 10px; border: 1px solid rgba(251,247,240,.18);
  background: rgba(255,255,255,.05); color: var(--cream); font-family: inherit; font-size: 15px;
}
.book-form input:focus, .book-form textarea:focus { outline: none; border-color: var(--orange); }
.book-form button { width: 100%; margin-top: 8px; }
.contact-line { display: flex; align-items: center; gap: 14px; font-weight: 600; font-size: 17px; margin-bottom: 14px; }
.contact-line .ic {
  width: 42px; height: 42px; border-radius: 50%; background: #0E0E0E; color: var(--orange);
  display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
}
.contact-line a:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .book-grid { grid-template-columns: 1fr; gap: 40px; }
}
</style>
