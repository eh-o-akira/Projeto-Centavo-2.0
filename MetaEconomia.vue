<script setup>
import { ref } from 'vue'
import { formatarMoeda } from '../utils/formatar.js'

// Meta de economia: mostra quanto do objetivo já foi alcançado (usando o saldo atual).
// Bootstrap: card, card-header, progress, progress-bar, input-group, btn, alert...
// PROPS: meta, saldo e visivel.
const props = defineProps({
  meta: { type: Number, required: true },
  saldo: { type: Number, required: true },
  visivel: { type: Boolean, default: true }
})

// EVENTO: quando o usuário salva uma meta nova, avisa o App.vue.
const emit = defineEmits(['atualizar-meta'])

// REATIVIDADE: "editando" mostra/esconde o formulário (v-show); "novaMeta" é o campo (v-model).
const editando = ref(false)
const novaMeta = ref(props.meta)
const erro = ref('')

// Quantos % da meta já foram alcançados (sempre entre 0 e 100).
function porcentagem() {
  if (props.meta <= 0) {
    return 0
  }
  const percentual = (props.saldo / props.meta) * 100
  return Math.min(100, Math.max(0, Math.round(percentual)))
}

function atingida() {
  return props.meta > 0 && props.saldo >= props.meta
}

function alternarEdicao() {
  editando.value = !editando.value
  novaMeta.value = props.meta
  erro.value = ''
}

function salvarMeta() {
  if (typeof novaMeta.value !== 'number' || !(novaMeta.value > 0)) {
    erro.value = 'Digite uma meta maior que zero.'
    return
  }
  emit('atualizar-meta', Math.round(novaMeta.value * 100) / 100)
  editando.value = false
  erro.value = ''
}
</script>

<template>
  <section class="card shadow-sm" aria-labelledby="titulo-meta">
    <div
      class="card-header bg-transparent d-flex justify-content-between align-items-center gap-2 py-3"
    >
      <h2 id="titulo-meta" class="h5 mb-0">Meta de economia</h2>
      <button class="btn btn-sm btn-outline-primary" type="button" @click="alternarEdicao">
        {{ editando ? 'Fechar' : 'Editar meta' }}
      </button>
    </div>

    <div class="card-body">
      <p class="small text-body-secondary">
        Acompanhe quanto do seu objetivo você já alcançou com o saldo atual.
      </p>

      <!-- Barra de progresso do Bootstrap: a largura da .progress-bar vem da reatividade do Vue -->
      <div
        class="progress mb-2"
        role="progressbar"
        aria-label="Progresso da meta de economia"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="porcentagem()"
      >
        <div
          class="progress-bar progress-bar-striped"
          :class="{ 'bg-success': atingida() }"
          :style="{ width: porcentagem() + '%' }"
        ></div>
      </div>

      <p class="mb-1">
        <strong>{{ porcentagem() }}%</strong> da meta
      </p>

      <p v-if="visivel" class="fw-semibold text-break mb-1">
        {{ formatarMoeda(saldo) }} de {{ formatarMoeda(meta) }}
      </p>
      <p v-else class="fw-semibold mb-1">R$ ••••• de R$ •••••</p>

      <p v-if="atingida()" class="fw-bold text-success mb-0">🎉 Meta atingida! Parabéns!</p>
      <p v-else-if="visivel" class="small text-body-secondary mb-0">
        Faltam {{ formatarMoeda(Math.max(meta - saldo, 0)) }} para chegar lá.
      </p>
      <p v-else class="small text-body-secondary mb-0">Faltam R$ ••••• para chegar lá.</p>

      <!-- Atenção: v-show só funciona se NÃO houver utilitário "d-flex/d-block" neste elemento,
           porque essas classes do Bootstrap usam !important e ganham do display:none do Vue -->
      <form v-show="editando" class="border-top pt-3 mt-3" novalidate @submit.prevent="salvarMeta">
        <label class="form-label" for="campo-meta">Nova meta</label>
        <div class="input-group">
          <span class="input-group-text">R$</span>
          <input
            id="campo-meta"
            v-model.number="novaMeta"
            class="form-control"
            type="number"
            step="0.01"
            min="0"
            inputmode="decimal"
          />
          <button class="btn btn-primary" type="submit">Salvar meta</button>
        </div>
        <div v-if="erro" class="alert alert-danger py-2 mt-3 mb-0" role="alert">{{ erro }}</div>
      </form>
    </div>
  </section>
</template>
