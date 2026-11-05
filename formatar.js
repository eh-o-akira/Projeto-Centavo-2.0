// Funções simples de formatação (JavaScript puro, sem Vue).

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

// 1234.5 -> "R$ 1.234,50"
export function formatarMoeda(valor) {
  return formatadorMoeda.format(valor)
}

// "2026-10-10" -> "10/10/2026"
// (separamos o texto em vez de usar new Date() para evitar erro de fuso horário)
export function formatarData(dataIso) {
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}

// Transforma um objeto Date em "AAAA-MM-DD", o formato do <input type="date">
function paraIso(data) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

// Data de hoje em "AAAA-MM-DD"
export function hojeIso() {
  return paraIso(new Date())
}

// Data de "X dias atrás" em "AAAA-MM-DD" (usada nos dados de exemplo)
export function diasAtrasIso(dias) {
  const data = new Date()
  data.setDate(data.getDate() - dias)
  return paraIso(data)
}
