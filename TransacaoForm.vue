<script setup>
import { ref } from 'vue'
import { categoriasReceita, categoriasDespesa } from '../data/categorias.js'
import { hojeIso } from '../utils/formatar.js'

// Formulário para cadastrar uma nova receita ou despesa.
// Bootstrap: card, form-label, form-control, form-select, input-group, btn-check,
// btn-group, alert, row/col (grid)...
// EVENTO: quando os dados são válidos, avisa o App.vue com o evento "adicionar".
const emit = defineEmits(['adicionar'])

// "botao" é a classe do Bootstrap de cada opção (vermelho para despesa, verde para receita)
const tiposDeTransacao = [
  { valor: 'despesa', rotulo: 'Despesa', icone: '📉', botao: 'btn-outline-danger' },
  { valor: 'receita', rotulo: 'Receita', icone: '📈', botao: 'btn-outline-success' }
]

// REATIVIDADE: cada campo do formulário é um ref() ligado ao input com v-model.
const tipo = ref('despesa')
const descricao = ref('')
const valor = ref('')
const categoria = ref(categoriasDespesa[0].nome)
const data = ref(hojeIso())
const erro = ref('')
const sucesso = ref('')

function listaDeCategorias(tipoEscolhido) {
  return tipoEscolhido === 'receita' ? categoriasReceita : categoriasDespesa
}

// Quando o tipo muda, a categoria volta para a primeira opção da lista nova.
function trocarTipo(novoTipo) {
  categoria.value = listaDeCategorias(novoTipo)[0].nome
}

function limparMensagens() {
  erro.value = ''
  sucesso.value = ''
}

function enviar() {
  const textoDescricao = descricao.value.trim()

  if (textoDescricao === '') {
    erro.value = 'Informe uma descrição para a transação.'
    sucesso.value = ''
    return
  }

  if (typeof valor.value !== 'number' || !(valor.value > 0)) {
    erro.value = 'Informe um valor maior que zero.'
    sucesso.value = ''
    return
  }

  if (data.value === '') {
    erro.value = 'Escolha a data da transação.'
    sucesso.value = ''
    return
  }

  emit('adicionar', {
    id: Date.now(),
    descricao: textoDescricao,
    valor: Math.round(valor.value * 100) / 100,
    tipo: tipo.value,
    categoria: categoria.value,
    data: data.value
  })

  erro.value = ''
  sucesso.value = tipo.value === 'receita' ? 'Receita adicionada!' : 'Despesa adicionada!'
  descricao.value = ''
  valor.value = ''
}
</script>

<template>
  <form class="card shadow-sm" novalidate @submit.prevent="enviar" @input="limparMensagens">
    <div class="card-header bg-transparent py-3">
      <h2 class="h5 mb-0">Nova transação</h2>
    </div>

    <div class="card-body">
      <fieldset class="mb-3">
        <legend class="form-label fs-6">Tipo</legend>
        <!-- btn-check + label.btn: botões de rádio com visual de botão do Bootstrap -->
        <div class="btn-group w-100">
          <template v-for="opcao in tiposDeTransacao" :key="opcao.valor">
            <input
              :id="`tipo-${opcao.valor}`"
              v-model="tipo"
              type="radio"
              class="btn-check"
              name="tipo"
              :value="opcao.valor"
              @change="trocarTipo(opcao.valor)"
            />
            <label class="btn" :class="opcao.botao" :for="`tipo-${opcao.valor}`">
              {{ opcao.icone }} {{ opcao.rotulo }}
            </label>
          </template>
        </div>
      </fieldset>

      <div class="mb-3">
        <label class="form-label" for="campo-descricao">Descrição</label>
        <input
          id="campo-descricao"
          v-model="descricao"
          class="form-control"
          type="text"
          maxlength="60"
          placeholder="Ex.: Compras no mercado"
          autocomplete="off"
        />
      </div>

      <!-- Grid: 1 coluna no celular, 2 colunas a partir de telas pequenas (col-sm-6) -->
      <div class="row g-3 mb-3">
        <div class="col-12 col-sm-6">
          <label class="form-label" for="campo-valor">Valor</label>
          <div class="input-group">
            <span class="input-group-text">R$</span>
            <input
              id="campo-valor"
              v-model.number="valor"
              class="form-control"
              type="number"
              step="0.01"
              min="0"
              inputmode="decimal"
              placeholder="0,00"
            />
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <label class="form-label" for="campo-data">Data</label>
          <input id="campo-data" v-model="data" class="form-control" type="date" />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="campo-categoria">Categoria</label>
        <select id="campo-categoria" v-model="categoria" class="form-select">
          <option v-for="item in listaDeCategorias(tipo)" :key="item.nome" :value="item.nome">
            {{ item.icone }} {{ item.nome }}
          </option>
        </select>
      </div>

      <div v-if="erro" class="alert alert-danger py-2" role="alert">{{ erro }}</div>
      <div v-show="sucesso !== ''" class="alert alert-success py-2" role="status">{{ sucesso }}</div>

      <button class="btn btn-primary w-100" type="submit">Adicionar transação</button>
    </div>
  </form>
</template>
