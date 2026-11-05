// Guarda e lê dados no navegador (localStorage) para que as informações
// não sumam quando a página é recarregada. É JavaScript puro, sem Vue.

export function lerArmazenado(chave, valorPadrao) {
  try {
    const texto = localStorage.getItem(chave)
    return texto === null ? valorPadrao : JSON.parse(texto)
  } catch {
    // Se o navegador bloquear o armazenamento ou o dado estiver corrompido,
    // o app continua funcionando com o valor padrão.
    return valorPadrao
  }
}

export function salvarArmazenado(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    // Sem armazenamento disponível: o app funciona normalmente, só não persiste.
  }
}
