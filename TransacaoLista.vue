<script setup>
import { ref } from 'vue'
import TransacaoItem from './TransacaoItem.vue'

// Lista de transações com filtro (Todas / Receitas / Despesas).
// Bootstrap: card, card-header, btn-group, btn-outline-primary, badge, list-group...
// PROPS: recebe o array de transações e se os valores estão visíveis.
const props = defineProps({
  transacoes: { type: Array, required: true },
  visivel: { type: Boolean, default: true }
})

// EVENTO: repassa para o App.vue o pedido de remoção vindo do TransacaoItem.
const emit = defineEmits(['remover'])

const filtros = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'receita', rotulo: 'Receitas' },
  { id: 'despesa', rotulo: 'Despesas' }
]

// REATIVIDADE: quando o usuário clica em um filtro, "filtroAtivo" muda
// e a lista na tela é atualizada automaticamente.
const filtroAtivo = ref('todas')

function escolherFiltro(id) {
  filtroAtivo.value = id
}

function filtrar(id) {
  if (id === 'todas') {
    return props.transacoes
  }
  return props.transacoes.filter((transacao) => transacao.tipo === id)
}

// Transações do filtro atual, da mais recente para a mais antiga.
function listaVisivel() {
  return [...filtrar(filtroAtivo.value)].sort(
    (a, b) => b.data.localeCompare(a.data) || b.id - a.id
  )
}
</script>

<template>
  <section class="card shadow-sm" aria-labelledby="titulo-lista">
    <div
      class="card-header bg-transparent d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 py-3"
    >
      <h2 id="titulo-lista" class="h5 mb-0">Transações</h2>

      <div class="btn-group btn-group-sm" role="group" aria-label="Filtrar transações">
        <button
          v-for="filtro in filtros"
          :key="filtro.id"
          type="button"
          class="btn btn-outline-primary"
          :class="{ active: filtroAtivo === filtro.id }"
          :aria-pressed="filtroAtivo === filtro.id"
          @click="escolherFiltro(filtro.id)"
        >
          {{ filtro.rotulo }}
          <span
            class="badge rounded-pill ms-1"
            :class="filtroAtivo === filtro.id ? 'text-bg-light' : 'text-bg-secondary'"
          >
            {{ filtrar(filtro.id).length }}
          </span>
        </button>
      </div>
    </div>

    <div v-if="listaVisivel().length === 0" class="card-body text-center text-body-secondary py-5">
      {{
        filtroAtivo === 'todas'
          ? 'Nenhuma transação ainda. Adicione a primeira no formulário!'
          : 'Nenhuma transação neste filtro.'
      }}
    </div>

    <ul v-else class="list-group list-group-flush">
      <TransacaoItem
        v-for="transacao in listaVisivel()"
        :key="transacao.id"
        :transacao="transacao"
        :visivel="visivel"
        @remover="emit('remover', $event)"
      />
    </ul>
  </section>
</template>
