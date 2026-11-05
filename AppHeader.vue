<script setup>
// Cabeçalho do app (Bootstrap: navbar, navbar-brand, navbar-text, btn, d-flex...).
// PROP: "valoresVisiveis" diz se os valores estão aparecendo ou escondidos.
// EVENTO: ao clicar no botão, avisa o App.vue com o evento "alternar-valores".
defineProps({
  valoresVisiveis: { type: Boolean, default: true }
})

const emit = defineEmits(['alternar-valores'])

const dataExtenso = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

// "terça-feira, 3 de novembro de 2026" -> primeira letra maiúscula
const dataHoje = dataExtenso.charAt(0).toUpperCase() + dataExtenso.slice(1)
</script>

<template>
  <!-- data-bs-theme="dark" faz o Bootstrap usar textos claros dentro do cabeçalho colorido -->
  <header class="cabecalho text-white shadow-sm" data-bs-theme="dark">
    <nav class="navbar py-3">
      <div class="container">
        <div class="navbar-brand fs-6 d-flex align-items-center gap-2 py-0 me-0">
          <svg class="moeda" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#f5b83d" />
            <circle cx="32" cy="32" r="23" fill="none" stroke="#b7791f" stroke-width="3" />
            <text x="32" y="42" font-size="28" font-weight="700" text-anchor="middle" fill="#7a4a0e">C</text>
          </svg>
          <div>
            <h1 class="h4 fw-bold mb-0">Centavo</h1>
            <small class="d-none d-sm-block opacity-75">Seu dinheiro, centavo por centavo.</small>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <!-- d-none d-lg-inline: a data só aparece em telas grandes (lg), para o cabeçalho não quebrar -->
          <span class="navbar-text d-none d-lg-inline py-0">{{ dataHoje }}</span>
          <button
            class="btn btn-outline-light btn-sm"
            type="button"
            :aria-pressed="!valoresVisiveis"
            @click="emit('alternar-valores')"
          >
            {{ valoresVisiveis ? '🙈 Ocultar valores' : '👁️ Mostrar valores' }}
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* O Bootstrap não tem gradiente pronto na cor do Centavo, então este fundo é CSS próprio */
.cabecalho {
  background: linear-gradient(135deg, #0b4f4a 0%, #0f766e 55%, #14998c 100%);
}

.moeda {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25));
}
</style>
