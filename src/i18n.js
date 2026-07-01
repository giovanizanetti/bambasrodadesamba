import { ref } from 'vue'

export const locales = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'nl', flag: '🇳🇱', label: 'Nederlands' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
]

const messages = {
  en: {
    nav: { about: 'About', videos: 'Videos', gallery: 'Gallery', shows: 'Shows' },
    hero: {
      h1: 'Bambas Roda de Samba — Brazilian Samba Band in Amsterdam',
      tagline: '🇧🇷 Bringing the joy of Brazilian samba to events across the Netherlands 🇳🇱',
      book: 'Book the band',
    },
    marquee: {
      items: ['Live samba', 'Roda de samba', 'Parties', 'Weddings', 'Corporate events', 'Birthdays'],
    },
    about: {
      tag: 'About',
      heading: 'Samba & the Roda de Samba',
      photoAlt: 'Bambas member playing',
      lead: "Samba is one of Brazil's most iconic and beloved musical genres, deeply rooted in the country's cultural identity.",
      paragraphs: [
        'Born in the late 19th century in Bahia state, samba emerged from the fusion of African rhythms brought by enslaved people, European musical influences, and indigenous Brazilian sounds. Migrants from Bahia brought samba to Rio de Janeiro in the early 20th century, where it gained widespread popularity and evolved into urban samba, becoming a powerful expression of Brazilian identity.',
        'The roda de samba (samba circle) is a traditional gathering where musicians come together in an informal setting to play, sing, and celebrate. This communal practice emphasizes participation, improvisation, and the joy of making music together. Unlike formal performances, roda de samba creates an intimate atmosphere where everyone—musicians and audience alike—becomes part of the musical experience.',
        "For Brazilian culture, samba represents more than just music; it's a symbol of resistance, community, and national pride. It continues to be a vital part of celebrations, keeping alive the stories, rhythms, and spirit of Brazil.",
      ],
      different: "Bambas is a traditional roda de samba — samba de raiz, played from the roots. Brazilian music is everywhere right now, but we don't do pop covers: we play the songs that mean something to us, the classics of samba's great composers.",
      creed: 'We play with our hearts. What we play has to mean something to us.',
    },
    video: { tag: 'Watch', heading: 'Live performance', posterAlt: 'Bambas live', birthdayCaption: "Wagner Moura's 50th birthday" },
    gallery: {
      tag: 'Gallery',
      heading: 'Moments from the roda',
    },
    shows: {
      tag: 'Shows',
      heading: 'Upcoming shows',
      tickets: 'Tickets',
      location: 'Location',
      freeEntry: 'Free entry',
      items: [
        { day: '26', month: 'Jul', title: 'Samba da Red Light', info: '📍 Café De Hartjes · Amsterdam', time: '16:00–18:30', free: true, mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+De+Hartjes%F0%9F%8D%BA/@52.375895,4.9001353,17z/data=!3m1!4b1!4m6!3m5!1s0x47c609b9c8411a09:0xbc459a8f37c0d444!8m2!3d52.375895!4d4.9001353!16s%2Fg%2F1tjdqjn6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D' },
        { day: '30', month: 'Aug', title: 'Samba da Red Light', info: '📍 Café De Hartjes · Amsterdam', time: '16:00–18:30', free: true, mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+De+Hartjes%F0%9F%8D%BA/@52.375895,4.9001353,17z/data=!3m1!4b1!4m6!3m5!1s0x47c609b9c8411a09:0xbc459a8f37c0d444!8m2!3d52.375895!4d4.9001353!16s%2Fg%2F1tjdqjn6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D' },
      ],
    },
    book: {
      heading: 'Want samba<br>at your party?',
      text: 'Weddings, birthdays, corporate events or just a good time with friends — Bambas brings the full roda to you. Based near Amsterdam, playing across the whole of the Netherlands and beyond.',
      name: 'Name',
      namePh: 'Your name',
      email: 'Email',
      emailPh: 'your@email.com',
      phone: 'Phone / WhatsApp',
      phonePh: '+31 6 00 00 00 00',
      event: 'Event type · Date',
      eventPh: 'e.g. Wedding, Oct 12',
      message: 'Message',
      messagePh: 'Tell us a bit about the event',
      send: 'Send request',
      sending: 'Sending…',
      success: "Thanks! Your request was sent — we'll be in touch soon. 🥁",
      errRequired: 'This field is required',
      errEmail: 'Please enter a valid email address',
      errPhone: 'Please enter a valid phone number',
      errorBefore: 'Something went wrong. Please try again, or reach us on',
      errorMid: 'or at',
    },
    footer: {
      tagline: '🇧🇷 Bringing the joy of Brazilian samba to events across the Netherlands 🇳🇱',
      menu: 'Menu',
      contact: 'Contact',
      links: { about: 'About', videos: 'Videos', gallery: 'Gallery', shows: 'Shows', book: 'Book us' },
      rights: '© 2026 Bambas Roda de Samba · All rights reserved',
    },
    ig: { follow: 'Follow us on Instagram' },
  },

  nl: {
    nav: { about: 'Over ons', videos: "Video's", gallery: 'Galerij', shows: 'Shows' },
    hero: {
      h1: 'Bambas Roda de Samba — Braziliaanse Sambaband in Amsterdam',
      tagline: '🇧🇷 De vreugde van Braziliaanse samba naar evenementen door heel Nederland 🇳🇱',
      book: 'Boek de band',
    },
    marquee: {
      items: ['Live samba', 'Roda de samba', 'Feesten', 'Bruiloften', 'Bedrijfsevenementen', 'Verjaardagen'],
    },
    about: {
      tag: 'Over ons',
      heading: 'Samba & de Roda de Samba',
      photoAlt: 'Spelend Bambas-bandlid',
      lead: 'Samba is een van de meest iconische en geliefde muziekgenres van Brazilië, diep geworteld in de culturele identiteit van het land.',
      paragraphs: [
        'Ontstaan aan het einde van de 19e eeuw in de staat Bahia, kwam samba voort uit de versmelting van Afrikaanse ritmes die door tot slaaf gemaakte mensen werden meegebracht, Europese muzikale invloeden en inheemse Braziliaanse klanken. Migranten uit Bahia brachten samba begin 20e eeuw naar Rio de Janeiro, waar het enorm populair werd en uitgroeide tot stedelijke samba — een krachtige uiting van de Braziliaanse identiteit.',
        'De roda de samba (sambakring) is een traditionele samenkomst waar muzikanten in een informele setting samenkomen om te spelen, te zingen en te vieren. Deze gezamenlijke traditie draait om deelname, improvisatie en het plezier van samen muziek maken. Anders dan bij formele optredens creëert de roda de samba een intieme sfeer waarin iedereen — muzikanten én publiek — deel wordt van de muzikale ervaring.',
        'Voor de Braziliaanse cultuur is samba meer dan alleen muziek; het is een symbool van verzet, gemeenschap en nationale trots. Het blijft een essentieel onderdeel van vieringen en houdt de verhalen, ritmes en de geest van Brazilië levend.',
      ],
      different: 'Bambas is een traditionele roda de samba — samba de raiz, gespeeld vanuit de wortels. Braziliaanse muziek is nu overal, maar wij spelen geen popcovers: wij spelen de nummers die iets voor ons betekenen, de klassiekers van de grote sambacomponisten.',
      creed: 'Wij spelen met ons hart. Wat we spelen moet iets voor ons betekenen.',
    },
    video: { tag: 'Kijken', heading: 'Live optreden', posterAlt: 'Bambas live', birthdayCaption: "Wagner Moura's 50e verjaardag" },
    gallery: {
      tag: 'Galerij',
      heading: 'Momenten uit de roda',
    },
    shows: {
      tag: 'Shows',
      heading: 'Aankomende shows',
      tickets: 'Tickets',
      location: 'Locatie',
      freeEntry: 'Gratis toegang',
      placeholder: '[ Vervang dit door jullie aankomende shows. ]',
      items: [
        { day: '26', month: 'Jul', title: 'Samba da Red Light', info: '📍 Café De Hartjes · Amsterdam', time: '16:00–18:30', free: true, mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+De+Hartjes%F0%9F%8D%BA/@52.375895,4.9001353,17z/data=!3m1!4b1!4m6!3m5!1s0x47c609b9c8411a09:0xbc459a8f37c0d444!8m2!3d52.375895!4d4.9001353!16s%2Fg%2F1tjdqjn6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D' },
        { day: '30', month: 'Aug', title: 'Samba da Red Light', info: '📍 Café De Hartjes · Amsterdam', time: '16:00–18:30', free: true, mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+De+Hartjes%F0%9F%8D%BA/@52.375895,4.9001353,17z/data=!3m1!4b1!4m6!3m5!1s0x47c609b9c8411a09:0xbc459a8f37c0d444!8m2!3d52.375895!4d4.9001353!16s%2Fg%2F1tjdqjn6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D' },
      ],
    },
    book: {
      heading: 'Samba op<br>jouw feest?',
      text: 'Bruiloften, verjaardagen, bedrijfsevenementen of gewoon een gezellige avond met vrienden — Bambas brengt de complete roda naar jou toe. Gevestigd rond Amsterdam, actief in heel Nederland en daarbuiten.',
      name: 'Naam',
      namePh: 'Je naam',
      email: 'E-mail',
      emailPh: 'jouw@email.com',
      phone: 'Telefoon / WhatsApp',
      phonePh: '+31 6 00 00 00 00',
      event: 'Soort evenement · Datum',
      eventPh: 'bijv. Bruiloft, 12 okt',
      message: 'Bericht',
      messagePh: 'Vertel ons iets over het evenement',
      send: 'Aanvraag versturen',
      sending: 'Versturen…',
      success: 'Bedankt! Je aanvraag is verzonden — we nemen snel contact op. 🥁',
      errRequired: 'Dit veld is verplicht',
      errEmail: 'Voer een geldig e-mailadres in',
      errPhone: 'Voer een geldig telefoonnummer in',
      errorBefore: 'Er ging iets mis. Probeer het opnieuw, of bereik ons via',
      errorMid: 'of op',
    },
    footer: {
      tagline: '🇧🇷 De vreugde van Braziliaanse samba naar evenementen door heel Nederland 🇳🇱',
      menu: 'Menu',
      contact: 'Contact',
      links: { about: 'Over ons', videos: "Video's", gallery: 'Galerij', shows: 'Shows', book: 'Boek ons' },
      rights: '© 2026 Bambas Roda de Samba · Alle rechten voorbehouden',
    },
    ig: { follow: 'Volg ons op Instagram' },
  },

  pt: {
    nav: { about: 'Sobre', videos: 'Vídeos', gallery: 'Galeria', shows: 'Shows' },
    hero: {
      h1: 'Bambas Roda de Samba — Banda de Samba Brasileira em Amsterdã',
      tagline: '🇧🇷 Levando a alegria do samba brasileiro para eventos por toda a Holanda 🇳🇱',
      book: 'Contrate a banda',
    },
    marquee: {
      items: ['Samba ao vivo', 'Roda de samba', 'Festas', 'Casamentos', 'Eventos corporativos', 'Aniversários'],
    },
    about: {
      tag: 'Sobre',
      heading: 'O Samba & a Roda de Samba',
      photoAlt: 'Integrante da Bambas tocando',
      lead: 'O samba é um dos gêneros musicais mais icônicos e queridos do Brasil, profundamente enraizado na identidade cultural do país.',
      paragraphs: [
        'Nascido no fim do século XIX no estado da Bahia, o samba surgiu da fusão de ritmos africanos trazidos por pessoas escravizadas, influências musicais europeias e sons indígenas brasileiros. Migrantes baianos levaram o samba ao Rio de Janeiro no início do século XX, onde ganhou enorme popularidade e evoluiu para o samba urbano, tornando-se uma poderosa expressão da identidade brasileira.',
        'A roda de samba é um encontro tradicional em que os músicos se reúnem de forma informal para tocar, cantar e celebrar. Essa prática coletiva valoriza a participação, a improvisação e a alegria de fazer música juntos. Diferente de apresentações formais, a roda de samba cria uma atmosfera intimista em que todos — músicos e público — fazem parte da experiência musical.',
        'Para a cultura brasileira, o samba representa mais do que música; é um símbolo de resistência, comunidade e orgulho nacional. Continua sendo parte essencial das celebrações, mantendo vivas as histórias, os ritmos e o espírito do Brasil.',
      ],
      different: 'A Bambas é uma roda de samba tradicional — samba de raiz, tocado desde a raiz. A música brasileira está em alta, mas não fazemos versões pop: tocamos as canções que significam algo para nós, os clássicos dos grandes compositores do samba.',
      creed: 'Tocamos com o coração. O que tocamos precisa significar algo para nós.',
    },
    video: { tag: 'Assista', heading: 'Ao vivo', posterAlt: 'Bambas ao vivo', birthdayCaption: 'Aniversário de 50 anos do Wagner Moura' },
    gallery: {
      tag: 'Galeria',
      heading: 'Momentos da roda',
    },
    shows: {
      tag: 'Shows',
      heading: 'Próximos shows',
      tickets: 'Ingressos',
      location: 'Localização',
      freeEntry: 'Entrada gratuita',
      placeholder: '[ Substitua pelos seus próximos shows. ]',
      items: [
        { day: '26', month: 'Jul', title: 'Samba da Red Light', info: '📍 Café De Hartjes · Amsterdam', time: '16:00–18:30', free: true, mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+De+Hartjes%F0%9F%8D%BA/@52.375895,4.9001353,17z/data=!3m1!4b1!4m6!3m5!1s0x47c609b9c8411a09:0xbc459a8f37c0d444!8m2!3d52.375895!4d4.9001353!16s%2Fg%2F1tjdqjn6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D' },
        { day: '30', month: 'Aug', title: 'Samba da Red Light', info: '📍 Café De Hartjes · Amsterdam', time: '16:00–18:30', free: true, mapsUrl: 'https://www.google.com/maps/place/Caf%C3%A9+De+Hartjes%F0%9F%8D%BA/@52.375895,4.9001353,17z/data=!3m1!4b1!4m6!3m5!1s0x47c609b9c8411a09:0xbc459a8f37c0d444!8m2!3d52.375895!4d4.9001353!16s%2Fg%2F1tjdqjn6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D' },
      ],
    },
    book: {
      heading: 'Quer samba<br>na sua festa?',
      text: 'Casamentos, aniversários, eventos corporativos ou só um bom momento entre amigos — a Bambas leva a roda completa até você. Sediada perto de Amsterdã, tocando por toda a Holanda e além.',
      name: 'Nome',
      namePh: 'Seu nome',
      email: 'E-mail',
      emailPh: 'seu@email.com',
      phone: 'Telefone / WhatsApp',
      phonePh: '+31 6 00 00 00 00',
      event: 'Tipo de evento · Data',
      eventPh: 'ex.: Casamento, 12 out',
      message: 'Mensagem',
      messagePh: 'Conte um pouco sobre o evento',
      send: 'Enviar pedido',
      sending: 'Enviando…',
      success: 'Obrigado! Seu pedido foi enviado — entraremos em contato em breve. 🥁',
      errRequired: 'Este campo é obrigatório',
      errEmail: 'Por favor, insira um e-mail válido',
      errPhone: 'Por favor, insira um número de telefone válido',
      errorBefore: 'Algo deu errado. Tente novamente ou fale conosco no',
      errorMid: 'ou em',
    },
    footer: {
      tagline: '🇧🇷 Levando a alegria do samba brasileiro para eventos por toda a Holanda 🇳🇱',
      menu: 'Menu',
      contact: 'Contato',
      links: { about: 'Sobre', videos: 'Vídeos', gallery: 'Galeria', shows: 'Shows', book: 'Contrate-nos' },
      rights: '© 2026 Bambas Roda de Samba · Todos os direitos reservados',
    },
    ig: { follow: 'Siga-nos no Instagram' },
  },
}

const htmlLang = (code) => (code === 'pt' ? 'pt-BR' : code)

const detect = () => {
  try {
    const saved = localStorage.getItem('locale')
    if (saved && messages[saved]) return saved
  } catch (e) { /* ignore */ }
  const nav = (typeof navigator !== 'undefined' ? navigator.language : 'en').toLowerCase()
  if (nav.startsWith('nl')) return 'nl'
  if (nav.startsWith('pt')) return 'pt'
  return 'en'
}

const locale = ref(detect())

if (typeof document !== 'undefined') document.documentElement.lang = htmlLang(locale.value)

const setLocale = (code) => {
  if (!messages[code]) return
  locale.value = code
  try { localStorage.setItem('locale', code) } catch (e) { /* ignore */ }
  if (typeof document !== 'undefined') document.documentElement.lang = htmlLang(code)
}

const resolve = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)

const t = (key) => {
  const val = resolve(messages[locale.value], key)
  if (val !== undefined) return val
  const fallback = resolve(messages.en, key)
  return fallback === undefined ? key : fallback
}

export function useI18n() {
  return { locale, setLocale, t, locales }
}
