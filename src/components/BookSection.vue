<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const IG_HANDLE = '@bambasrodadesamba'
const IG_URL = 'https://www.instagram.com/bambasrodadesamba/'
const EMAIL = 'info@bambasrodadesamba.com'
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

const form = reactive({ name: '', email: '', phone: '', event: '', message: '' })
const honeypot = ref('')
const status = ref('idle') // idle | sending | success | error
const touched = reactive({ name: false, email: false, phone: false, event: false, message: false })

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const isValidPhone = (v) => /^[+\d][\d\s\-().]{6,}$/.test(v.trim())

const errors = computed(() => ({
  name: touched.name && !form.name.trim() ? t('book.errRequired') : '',
  email: touched.email
    ? !form.email.trim() ? t('book.errRequired') : !isValidEmail(form.email) ? t('book.errEmail') : ''
    : '',
  phone: touched.phone
    ? !form.phone.trim() ? t('book.errRequired') : !isValidPhone(form.phone) ? t('book.errPhone') : ''
    : '',
  event: touched.event && !form.event.trim() ? t('book.errRequired') : '',
  message: touched.message && !form.message.trim() ? t('book.errRequired') : '',
}))

const isValid = computed(() =>
  form.name.trim() && isValidEmail(form.email) && isValidPhone(form.phone) &&
  form.event.trim() && form.message.trim()
)

const touchAll = () => Object.keys(touched).forEach(k => (touched[k] = true))

const onSubmit = async () => {
  touchAll()
  if (!isValid.value || status.value === 'sending') return
  if (honeypot.value) return
  status.value = 'sending'
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Name: form.name,
        Email: form.email,
        'Phone / WhatsApp': form.phone,
        'Event type · Date': form.event,
        Message: form.message,
        _subject: `Booking request${form.event ? ` — ${form.event}` : ''}`,
        _template: 'table',
        _captcha: 'false',
      }),
    })
    if (!res.ok) throw new Error('Request failed')
    status.value = 'success'
    Object.keys(form).forEach(k => (form[k] = ''))
    Object.keys(touched).forEach(k => (touched[k] = false))
  } catch (e) {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="book">
    <div class="wrap">
      <div class="book-grid">
        <div>
          <h2 v-html="t('book.heading')"></h2>
          <p>{{ t('book.text') }}</p>
          <div class="contact-line">
            <div class="ic">@</div>
            <a :href="IG_URL" target="_blank" rel="noopener">{{ IG_HANDLE }}</a>
          </div>
          <div class="contact-line">
            <div class="ic">✉</div>
            <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
          </div>
        </div>
        <form class="book-form" novalidate @submit.prevent="onSubmit">
          <div class="field" :class="{ invalid: errors.name }">
            <label>{{ t('book.name') }}</label>
            <input v-model="form.name" type="text" :placeholder="t('book.namePh')" @blur="touched.name = true" />
            <span v-if="errors.name" class="field-err">{{ errors.name }}</span>
          </div>
          <div class="field" :class="{ invalid: errors.email }">
            <label>{{ t('book.email') }}</label>
            <input v-model="form.email" type="email" :placeholder="t('book.emailPh')" @blur="touched.email = true" />
            <span v-if="errors.email" class="field-err">{{ errors.email }}</span>
          </div>
          <div class="field" :class="{ invalid: errors.phone }">
            <label>{{ t('book.phone') }}</label>
            <input v-model="form.phone" type="tel" :placeholder="t('book.phonePh')" @blur="touched.phone = true" />
            <span v-if="errors.phone" class="field-err">{{ errors.phone }}</span>
          </div>
          <div class="field" :class="{ invalid: errors.event }">
            <label>{{ t('book.event') }}</label>
            <input v-model="form.event" type="text" :placeholder="t('book.eventPh')" @blur="touched.event = true" />
            <span v-if="errors.event" class="field-err">{{ errors.event }}</span>
          </div>
          <div class="field" :class="{ invalid: errors.message }">
            <label>{{ t('book.message') }}</label>
            <textarea v-model="form.message" rows="3" :placeholder="t('book.messagePh')" @blur="touched.message = true"></textarea>
            <span v-if="errors.message" class="field-err">{{ errors.message }}</span>
          </div>
          <input v-model="honeypot" type="text" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button type="submit" class="btn btn-primary" :disabled="status === 'sending' || !isValid">
            {{ status === 'sending' ? t('book.sending') : t('book.send') }}
          </button>
          <p v-if="status === 'success'" class="form-msg ok">{{ t('book.success') }}</p>
          <p v-if="status === 'error'" class="form-msg err">
            {{ t('book.errorBefore') }}
            <a :href="IG_URL" target="_blank" rel="noopener">Instagram</a>
            {{ t('book.errorMid') }}
            <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>.
          </p>
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
  background: rgba(255,255,255,.05); color: var(--cream); font-family: inherit; font-size: 15px; transition: border-color .2s;
}
.book-form input:focus, .book-form textarea:focus { outline: none; border-color: var(--orange); }
.field.invalid input, .field.invalid textarea { border-color: #ff6b6b; }
.field-err { display: block; margin-top: 5px; font-size: 12px; color: #ff8a80; font-weight: 500; }
.book-form button { width: 100%; margin-top: 8px; }
.book-form button:disabled { opacity: .45; cursor: not-allowed; transform: none; pointer-events: auto; }
.book-form button:disabled:hover { background: var(--orange); box-shadow: none; transform: none; }
.book-form .hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.form-msg { margin-top: 16px; font-size: 14px; line-height: 1.5; font-weight: 600; }
.form-msg.ok { color: var(--orange-bright); }
.form-msg.err { color: #ff8a80; }
.form-msg a { text-decoration: underline; }
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
