<script setup>
const items = ['Live samba', 'Roda de samba', 'Parties', 'Weddings', 'Corporate events', 'Birthdays']
</script>

<template>
  <div class="marquee">
    <div>
      <span v-for="(item, i) in items" :key="`a-${i}`">{{ item }}</span>
      <span v-for="(item, i) in items" :key="`b-${i}`">{{ item }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  background: var(--orange); color: #0E0E0E; padding: 14px 0; overflow: hidden;
  white-space: nowrap; border-top: 3px solid #0E0E0E; border-bottom: 3px solid #0E0E0E;
}
.marquee div {
  display: inline-block; animation: scroll 22s linear infinite;
  font-family: 'Archivo Black', sans-serif; font-size: 20px; text-transform: uppercase;
}
.marquee span { margin: 0 26px; }
.marquee span::after { content: "●"; margin-left: 52px; color: rgba(14,14,14,.45); }
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
