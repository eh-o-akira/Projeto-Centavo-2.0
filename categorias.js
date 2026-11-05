// Categorias disponíveis no formulário, separadas por tipo de transação.

export const categoriasReceita = [
  { nome: 'Salário', icone: '💼' },
  { nome: 'Freelance', icone: '💻' },
  { nome: 'Investimentos', icone: '📈' },
  { nome: 'Presente', icone: '🎁' },
  { nome: 'Outros', icone: '💵' }
]

export const categoriasDespesa = [
  { nome: 'Alimentação', icone: '🍽️' },
  { nome: 'Moradia', icone: '🏠' },
  { nome: 'Transporte', icone: '🚌' },
  { nome: 'Contas', icone: '🧾' },
  { nome: 'Lazer', icone: '🎬' },
  { nome: 'Saúde', icone: '💊' },
  { nome: 'Educação', icone: '📚' },
  { nome: 'Outros', icone: '🛒' }
]

// Devolve o emoji de uma categoria (ex.: iconeDaCategoria('despesa', 'Lazer') -> 🎬)
export function iconeDaCategoria(tipo, nome) {
  const lista = tipo === 'receita' ? categoriasReceita : categoriasDespesa
  const encontrada = lista.find((categoria) => categoria.nome === nome)
  return encontrada ? encontrada.icone : '💰'
}
