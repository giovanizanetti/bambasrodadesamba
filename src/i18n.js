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
      tagline: 'Brazilian samba circle at your event 🇧🇷',
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
    },
    video: { tag: 'Watch', heading: 'Live performance', posterAlt: 'Bambas live' },
    gallery: {
      tag: 'Gallery',
      heading: 'Moments from the roda',
      alts: ['Bambas live', 'Pandeiro', 'Guitar', 'Singer', 'Singer and the crowd', 'Percussionist', 'Live in the bar', 'Band'],
    },
    shows: {
      tag: 'Shows',
      heading: 'Upcoming shows',
      tickets: 'Tickets',
      placeholder: '[ Replace with your upcoming shows. ]',
      items: [
        { day: '21', month: 'Jun', title: 'Roda de Samba', info: '📍 [ Venue · City ] · 8 PM' },
        { day: '05', month: 'Jul', title: 'Samba Festival', info: '📍 [ Venue · City ] · 7 PM' },
      ],
    },
    book: {
      heading: 'Want samba<br>at your party?',
      text: 'Weddings, birthdays, corporate events or just a good time with friends — Bambas brings the full roda to you. Based in Amsterdam, playing throughout Europe.',
      name: 'Name',
      namePh: 'Your name',
      contact: 'Email / WhatsApp',
      contactPh: 'How we reach you',
      event: 'Event type · Date',
      eventPh: 'e.g. Wedding, Oct 12',
      message: 'Message',
      messagePh: 'Tell us a bit about the event',
      send: 'Send request',
      sending: 'Sending…',
      success: "Thanks! Your request was sent — we'll be in touch soon. 🥁",
      errorBefore: 'Something went wrong. Please try again, or reach us on',
      errorMid: 'or at',
    },
    footer: {
      tagline: 'Bambas Roda de Samba — samba de raiz to bring any party to life. Made with swing. 🥁',
      menu: 'Menu',
      links: { about: 'About', videos: 'Videos', gallery: 'Gallery', shows: 'Shows', book: 'Book us' },
      rights: '© 2026 Bambas Roda de Samba · All rights reserved',
    },
    ig: { follow: 'Follow us on Instagram' },
  },

  nl: {
    nav: { about: 'Over ons', videos: "Video's", gallery: 'Galerij', shows: 'Shows' },
    hero: {
      tagline: 'Braziliaanse roda de samba op jouw evenement 🇧🇷',
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
    },
    video: { tag: 'Kijken', heading: 'Live optreden', posterAlt: 'Bambas live' },
    gallery: {
      tag: 'Galerij',
      heading: 'Momenten uit de roda',
      alts: ['Bambas live', 'Pandeiro', 'Gitaar', 'Zanger', 'Zanger en het publiek', 'Percussionist', 'Live in de bar', 'Band'],
    },
    shows: {
      tag: 'Shows',
      heading: 'Aankomende shows',
      tickets: 'Tickets',
      placeholder: '[ Vervang dit door jullie aankomende shows. ]',
      items: [
        { day: '21', month: 'Jun', title: 'Roda de Samba', info: '📍 [ Locatie · Stad ] · 20:00' },
        { day: '05', month: 'Jul', title: 'Samba Festival', info: '📍 [ Locatie · Stad ] · 19:00' },
      ],
    },
    book: {
      heading: 'Samba op<br>jouw feest?',
      text: 'Bruiloften, verjaardagen, bedrijfsevenementen of gewoon een gezellige avond met vrienden — Bambas brengt de complete roda naar jou toe. Gevestigd in Amsterdam, actief in heel Europa.',
      name: 'Naam',
      namePh: 'Je naam',
      contact: 'E-mail / WhatsApp',
      contactPh: 'Hoe we je kunnen bereiken',
      event: 'Soort evenement · Datum',
      eventPh: 'bijv. Bruiloft, 12 okt',
      message: 'Bericht',
      messagePh: 'Vertel ons iets over het evenement',
      send: 'Aanvraag versturen',
      sending: 'Versturen…',
      success: 'Bedankt! Je aanvraag is verzonden — we nemen snel contact op. 🥁',
      errorBefore: 'Er ging iets mis. Probeer het opnieuw, of bereik ons via',
      errorMid: 'of op',
    },
    footer: {
      tagline: 'Bambas Roda de Samba — samba de raiz die elk feest tot leven brengt. Gemaakt met swing. 🥁',
      menu: 'Menu',
      links: { about: 'Over ons', videos: "Video's", gallery: 'Galerij', shows: 'Shows', book: 'Boek ons' },
      rights: '© 2026 Bambas Roda de Samba · Alle rechten voorbehouden',
    },
    ig: { follow: 'Volg ons op Instagram' },
  },

  pt: {
    nav: { about: 'Sobre', videos: 'Vídeos', gallery: 'Galeria', shows: 'Shows' },
    hero: {
      tagline: 'Roda de samba brasileira no seu evento 🇧🇷',
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
    },
    video: { tag: 'Assista', heading: 'Ao vivo', posterAlt: 'Bambas ao vivo' },
    gallery: {
      tag: 'Galeria',
      heading: 'Momentos da roda',
      alts: ['Bambas ao vivo', 'Pandeiro', 'Violão', 'Cantor', 'Cantor e o público', 'Percussionista', 'Ao vivo no bar', 'Banda'],
    },
    shows: {
      tag: 'Shows',
      heading: 'Próximos shows',
      tickets: 'Ingressos',
      placeholder: '[ Substitua pelos seus próximos shows. ]',
      items: [
        { day: '21', month: 'Jun', title: 'Roda de Samba', info: '📍 [ Local · Cidade ] · 20h' },
        { day: '05', month: 'Jul', title: 'Festival de Samba', info: '📍 [ Local · Cidade ] · 19h' },
      ],
    },
    book: {
      heading: 'Quer samba<br>na sua festa?',
      text: 'Casamentos, aniversários, eventos corporativos ou só um bom momento entre amigos — a Bambas leva a roda completa até você. Sediada em Amsterdã, tocando por toda a Europa.',
      name: 'Nome',
      namePh: 'Seu nome',
      contact: 'E-mail / WhatsApp',
      contactPh: 'Como falar com você',
      event: 'Tipo de evento · Data',
      eventPh: 'ex.: Casamento, 12 out',
      message: 'Mensagem',
      messagePh: 'Conte um pouco sobre o evento',
      send: 'Enviar pedido',
      sending: 'Enviando…',
      success: 'Obrigado! Seu pedido foi enviado — entraremos em contato em breve. 🥁',
      errorBefore: 'Algo deu errado. Tente novamente ou fale conosco no',
      errorMid: 'ou em',
    },
    footer: {
      tagline: 'Bambas Roda de Samba — samba de raiz para dar vida a qualquer festa. Feito com suingue. 🥁',
      menu: 'Menu',
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
