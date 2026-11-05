<script setup>
import { ref } from 'vue'
import { formatarMoeda, formatarData } from '../utils/formatar.js'
import { iconeDaCategoria } from '../data/categorias.js'

// Uma linha da lista de transações. É REUTILIZADO pelo v-for do TransacaoLista.vue:
// o mesmo componente aparece várias vezes, cada um com uma transação diferente (PROP).
// Bootstrap: list-group-item, row/col (grid), btn, btn-sm, text-success, text-danger...
const props = defineProps({
  transacao: { type: Object, required: true },
  visivel: { type: Boolean, default: true }
})

// EVENTO personalizado: avisa o componente pai qual transação deve ser removida.
const emit = defineEmits(['remover'])

// REATIVIDADE: "confirmando" controla se o botão mostra "Excluir" ou "Confirmar/Cancelar".
const confirmando = ref(false)

function pedirConfirmacao() {
  confirmando.value = true
}

function cancelar() {
  confirmando.value = false
}

function confirmar() {
  emit('remover', props.transacao.id)
}
</script>

<template>
  <li class="list-group-item py-3">
    <!-- Grid do Bootstrap: col-auto ocupa só o espaço do conteúdo, col ocupa o que sobrar -->
    <div class="row align-items-center g-2 g-sm-3">
      <div class="col-auto">
        <span
          class="icone rounded-3 d-flex align-items-center justify-content-center fs-5"
          :class="transacao.tipo === 'receita' ? 'bg-success-subtle' : 'bg-danger-subtle'"
          aria-hidden="true"
        >
          {{ iconeDaCategoria(transacao.tipo, transacao.categoria) }}
        </span>
      </div>

      <div class="col">
        <p class="fw-semibold text-break mb-0">{{ transacao.descricao }}</p>
        <small class="text-body-secondary">
          {{ transacao.categoria }} · {{ formatarData(transacao.data) }}
        </small>
      </div>

      <div class="col-auto">
        <p
          v-if="visivel"
          class="valor fw-bold text-nowrap mb-0"
          :class="transacao.tipo === 'receita' ? 'text-success' : 'text-danger'"
        >
          {{ transacao.tipo === 'receita' ? '+' : '−' }} {{ formatarMoeda(transacao.valor) }}
        </p>
        <p v-else class="fw-bold text-body-secondary mb-0">•••••</p>
      </div>

      <!-- Em tela pequena, os botões de confirmação ganham uma linha só deles (col-12) -->
      <div class="text-end" :class="confirmando ? 'col-12 col-sm-auto' : 'col-auto'">
        <button
          v-if="!confirmando"
          class="btn btn-sm btn-outline-secondary"
          type="button"
          :aria-label="`Excluir ${transacao.descricao}`"
          @click="pedirConfirmacao"
        >
          🗑️
        </button>
        <template v-else>
          <button class="btn btn-sm btn-danger me-2" type="button" @click="confirmar">Excluir</button>
          <button class="btn btn-sm btn-outline-secondary" type="button" @click="cancelar">
            Cancelar
          </button>
        </template>
      </div>
    </div>
  </li>
</template>

<style scoped>
.icone {
  width: 42px;
  height: 42px;
}

/* Números alinhados (todos os dígitos com a mesma largura) */
.valor {
  font-variant-numeric: tabular-nums;
}
</style>
