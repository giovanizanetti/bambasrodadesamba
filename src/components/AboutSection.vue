<script setup>
import guitarist from '../assets/photos/guitarist-portrait.jpg'
</script>

<template>
  <section id="about">
    <div class="wrap">
      <div class="sec-head">
        <div class="sec-tag">About</div>
        <h2 style="color: var(--ink)">Samba &amp; the Roda de Samba</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p class="lead">
            Samba is one of Brazil's most iconic and beloved musical genres, deeply rooted in the
            country's cultural identity.
          </p>
          <p>
            Born in the late 19th century in Bahia state, samba emerged from the fusion of African
            rhythms brought by enslaved people, European musical influences, and indigenous Brazilian
            sounds. Migrants from Bahia brought samba to Rio de Janeiro in the early 20th century, where
            it gained widespread popularity and evolved into urban samba, becoming a powerful expression
            of Brazilian identity.
          </p>
          <p>
            The roda de samba (samba circle) is a traditional gathering where musicians come together in
            an informal setting to play, sing, and celebrate. This communal practice emphasizes
            participation, improvisation, and the joy of making music together. Unlike formal
            performances, roda de samba creates an intimate atmosphere where everyone—musicians and
            audience alike—becomes part of the musical experience.
          </p>
          <p>
            For Brazilian culture, samba represents more than just music; it's a symbol of resistance,
            community, and national pride. It continues to be a vital part of celebrations, keeping alive
            the stories, rhythms, and spirit of Brazil.
          </p>
        </div>
        <div class="about-photo"><img :src="guitarist" alt="Bambas member playing" /></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about { background: var(--cream); color: var(--ink); }
.about-grid { display: grid; grid-template-columns: 1.3fr .7fr; gap: 56px; align-items: start; }
.about-text p { font-size: 16.5px; line-height: 1.75; color: #3a3a3a; margin-bottom: 18px; }
.about-text .lead { font-size: 21px; font-weight: 600; color: var(--ink); line-height: 1.55; }
.about-photo {
  border-radius: 18px; overflow: hidden; aspect-ratio: 4/5;
  box-shadow: 0 20px 50px rgba(0,0,0,.25); position: sticky; top: 90px;
}
.about-photo img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-photo { position: static; }
}
</style>
