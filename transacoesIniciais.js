import { diasAtrasIso } from '../utils/formatar.js'

// Dados de exemplo mostrados na primeira vez que o app é aberto.
// As datas são calculadas a partir de hoje para o app sempre parecer "vivo".
export const transacoesIniciais = [
  { id: 1, descricao: 'Salário do mês', valor: 3500, tipo: 'receita', categoria: 'Salário', data: diasAtrasIso(6) },
  { id: 2, descricao: 'Aluguel', valor: 1200, tipo: 'despesa', categoria: 'Moradia', data: diasAtrasIso(5) },
  { id: 3, descricao: 'Compras no mercado', valor: 320.45, tipo: 'despesa', categoria: 'Alimentação', data: diasAtrasIso(4) },
  { id: 4, descricao: 'Projeto freelance de site', valor: 600, tipo: 'receita', categoria: 'Freelance', data: diasAtrasIso(3) },
  { id: 5, descricao: 'Internet', valor: 99.9, tipo: 'despesa', categoria: 'Contas', data: diasAtrasIso(2) },
  { id: 6, descricao: 'Cinema com amigos', valor: 48, tipo: 'despesa', categoria: 'Lazer', data: diasAtrasIso(1) },
  { id: 7, descricao: 'Passagens de ônibus', valor: 150, tipo: 'despesa', categoria: 'Transporte', data: diasAtrasIso(0) }
]
