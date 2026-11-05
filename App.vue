<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ResumoCard from './components/ResumoCard.vue'
import TransacaoForm from './components/TransacaoForm.vue'
import MetaEconomia from './components/MetaEconomia.vue'
import TransacaoLista from './components/TransacaoLista.vue'
import { transacoesIniciais } from './data/transacoesIniciais.js'
import { lerArmazenado, salvarArmazenado } from './utils/armazenamento.js'

const CHAVE_TRANSACOES = 'centavo:transacoes'
const CHAVE_META = 'centavo:meta'
const META_PADRAO = 5000

function copiarExemplos() {
  return transacoesIniciais.map((transacao) => ({ ...transacao }))
}

function carregarTransacoes() {
  const salvas = lerArmazenado(CHAVE_TRANSACOES, null)
  return Array.isArray(salvas) ? salvas : copiarExemplos()
}

function carregarMeta() {
  const salva = lerArmazenado(CHAVE_META, META_PADRAO)
  return typeof salva === 'number' && salva > 0 ? salva : META_PADRAO
}

// ---------- ESTADO REATIVO (ref) ----------
// Sempre que um destes valores muda, a tela é atualizada sozinha.
const transacoes = ref(carregarTransacoes())
const meta = ref(carregarMeta())
const valoresVisiveis = ref(true)

// ---------- CÁLCULOS ----------
// Soma o valor de todas as transações de um tipo ('receita' ou 'despesa').
function somar(tipo) {
  const total = transacoes.value
    .filter((transacao) => transacao.tipo === tipo)
    .reduce((soma, transacao) => soma + transacao.valor, 0)
  return Math.round(total * 100) / 100
}

function saldo() {
  return Math.round((somar('receita') - somar('despesa')) * 100) / 100
}

// ---------- AÇÕES (chamadas pelos eventos dos componentes filhos) ----------
function adicionarTransacao(novaTransacao) {
  transacoes.value.unshift(novaTransacao)
  salvarArmazenado(CHAVE_TRANSACOES, transacoes.value)
}

function removerTransacao(id) {
  transacoes.value = transacoes.value.filter((transacao) => transacao.id !== id)
  salvarArmazenado(CHAVE_TRANSACOES, transacoes.value)
}

function atualizarMeta(novaMeta) {
  meta.value = novaMeta
  salvarArmazenado(CHAVE_META, novaMeta)
}

function alternarValores() {
  valoresVisiveis.value = !valoresVisiveis.value
}

function restaurarExemplos() {
  transacoes.value = copiarExemplos()
  meta.value = META_PADRAO
  salvarArmazenado(CHAVE_TRANSACOES, transacoes.value)
  salvarArmazenado(CHAVE_META, META_PADRAO)
}
</script>

<template>
  <AppHeader :valores-visiveis="valoresVisiveis" @alternar-valores="alternarValores" />

  <!-- Bootstrap: "container" centraliza e limita a largura; "row" + "col-*" formam o grid responsivo -->
  <main class="container py-4">
    <!-- REÚSO DE COMPONENTE: o mesmo ResumoCard aparece 3 vezes, com props diferentes.
         col-12 = 1 por linha no celular; col-md-4 = 3 lado a lado a partir de tablet -->
    <section class="row g-3 mb-4" aria-label="Resumo financeiro">
      <div class="col-12 col-md-4">
        <ResumoCard
          titulo="Saldo atual"
          tipo="saldo"
          icone="💰"
          :valor="saldo()"
          :visivel="valoresVisiveis"
        />
      </div>
      <div class="col-12 col-md-4">
        <ResumoCard
          titulo="Receitas"
          tipo="receita"
          icone="📈"
          :valor="somar('receita')"
          :visivel="valoresVisiveis"
        />
      </div>
      <div class="col-12 col-md-4">
        <ResumoCard
          titulo="Despesas"
          tipo="despesa"
          icone="📉"
          :valor="somar('despesa')"
          :visivel="valoresVisiveis"
        />
      </div>
    </section>

    <!-- col-lg-7 / col-lg-5: lado a lado em telas grandes, empilhados no celular e no tablet -->
    <div class="row g-4 align-items-start mb-4">
      <div class="col-12 col-lg-7">
        <TransacaoForm @adicionar="adicionarTransacao" />
      </div>
      <div class="col-12 col-lg-5">
        <MetaEconomia
          :meta="meta"
          :saldo="saldo()"
          :visivel="valoresVisiveis"
          @atualizar-meta="atualizarMeta"
        />
      </div>
    </div>

    <TransacaoLista
      :transacoes="transacoes"
      :visivel="valoresVisiveis"
      @remover="removerTransacao"
    />
  </main>

  <footer class="container pb-4">
    <div
      class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-center gap-2 border-top pt-3 small text-body-secondary"
    >
      <p class="text-center text-sm-start mb-0">
        Centavo · Projeto de Front-End Frameworks, feito com Vue.js e Bootstrap
      </p>
      <button class="btn btn-link btn-sm text-nowrap" type="button" @click="restaurarExemplos">
        Restaurar dados de exemplo
      </button>
    </div>
  </footer>
</template>
