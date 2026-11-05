<script setup>
import { formatarMoeda } from '../utils/formatar.js'

// Card de resumo REUTILIZÁVEL: o App.vue usa este mesmo componente 3 vezes
// (Saldo, Receitas e Despesas), mudando apenas as PROPS.
// Bootstrap: card, card-body, shadow-sm, border-start, border-4, text-success, bg-*-subtle...
const props = defineProps({
  titulo: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: { type: String, default: 'saldo' }, // 'saldo' | 'receita' | 'despesa'
  icone: { type: String, default: '💰' },
  visivel: { type: Boolean, default: true }
})

// Cada tipo usa uma cor do Bootstrap: primary (saldo), success (receita) e danger (despesa).
const cores = { saldo: 'primary', receita: 'success', despesa: 'danger' }

function cor() {
  return cores[props.tipo] || 'primary'
}

// Cor do número: verde para receita, vermelho para despesa (e para saldo negativo).
function classeValor() {
  if (props.tipo === 'receita') {
    return 'text-success'
  }
  if (props.tipo === 'despesa' || props.valor < 0) {
    return 'text-danger'
  }
  return ''
}
</script>

<template>
  <article class="card h-100 shadow-sm border-0 border-start border-4" :class="`border-${cor()}`">
    <div class="card-body">
      <div class="d-flex align-items-center gap-2 mb-2">
        <span
          class="icone rounded-circle d-flex align-items-center justify-content-center"
          :class="`bg-${cor()}-subtle`"
          aria-hidden="true"
        >
          {{ icone }}
        </span>
        <h3 class="h6 text-body-secondary mb-0">{{ titulo }}</h3>
      </div>

      <p v-if="visivel" class="fs-4 fw-bold text-break mb-0" :class="classeValor()">
        {{ formatarMoeda(valor) }}
      </p>
      <p v-else class="fs-4 fw-bold text-body-secondary mb-0">R$ •••••</p>
    </div>
  </article>
</template>

<style scoped>
/* Tamanho fixo da bolinha do ícone (o Bootstrap não tem utilitário para isso) */
.icone {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  font-size: 1rem;
}
</style>
