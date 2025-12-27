<template>
  <section class="about-samba-section">
    <div class="container">
      <h2 class="section-title">About samba</h2>
      <div class="content">
        <div class="text-content">
          <p class="paragraph">
            Samba is one of Brazil's most iconic and beloved musical genres,
            deeply rooted in the country's cultural identity. Born in the late
            19th century in Bahia state, samba emerged from the fusion of
            African rhythms brought by enslaved people, European musical
            influences, and indigenous Brazilian sounds. Migrants from Bahia
            brought samba to Rio de Janeiro in the early 20th century, where it
            gained widespread popularity and evolved into urban samba, becoming
            a powerful expression of Brazilian identity.
          </p>
          <p class="paragraph">
            The <strong>roda de samba</strong> (samba circle) is a traditional
            gathering where musicians come together in an informal setting to
            play, sing, and celebrate. This communal practice emphasizes
            participation, improvisation, and the joy of making music together.
            Unlike formal performances, roda de samba creates an intimate
            atmosphere where everyone—musicians and audience alike—becomes part
            of the musical experience.
          </p>
          <p class="paragraph">
            For Brazilian culture, samba represents more than just music; it's a
            symbol of resistance, community, and national pride. It continues to
            be a vital part of celebrations, keeping alive the stories, rhythms,
            and spirit of Brazil.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.about-samba-section {
  padding: 5rem 2rem;
  background-color: var(--bg-header);
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

.content {
  background-color: var(--text-light);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px var(--shadow-sm);
}

.text-content {
  line-height: 1.9;
}

.paragraph {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  text-align: justify;
}

.paragraph:last-child {
  margin-bottom: 0;
}

.paragraph strong {
  color: var(--brazil-green);
  font-weight: 600;
}

@media (max-width: 768px) {
  .about-samba-section {
    padding: 3rem 1.5rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .content {
    padding: 2rem 1.5rem;
  }

  .paragraph {
    font-size: 1rem;
    text-align: left;
  }
}
</style>
