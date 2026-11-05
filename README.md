# 💰 Centavo — controle financeiro pessoal

**Centavo** é um sistema de finanças pessoais em formato **One Page**, feito com **Vue.js 3** e **Bootstrap 5** para a disciplina **Front-End Frameworks (UNAMA)**. O tema sorteado para a equipe foi **Sistema de Finanças**.

Com o Centavo, a pessoa registra receitas e despesas, acompanha o saldo e o progresso de uma meta de economia, tudo em uma única página, sem navegação entre telas.

> **Etapa 2 da disciplina:** o projeto entregue na 1ª avaliação foi **evoluído com um framework CSS (Bootstrap)**, sem mudar a proposta nem as funcionalidades. Veja a seção [Evolução com Bootstrap](#-evolução-com-bootstrap-etapa-2).

## ✨ Funcionalidades

- **Resumo financeiro:** saldo atual, total de receitas e total de despesas.
- **Nova transação:** formulário com tipo (receita ou despesa), descrição, valor, data e categoria, com validação dos campos.
- **Lista de transações:** ordenada da mais recente para a mais antiga, com filtro (Todas, Receitas, Despesas) e exclusão com confirmação.
- **Meta de economia:** barra de progresso baseada no saldo atual, com meta editável.
- **Ocultar valores:** botão no cabeçalho que esconde todos os valores da tela.
- **Dados salvos no navegador** (`localStorage`): ao recarregar a página, as informações continuam lá.
- **Responsivo** (celular, tablet e computador) e com **tema escuro automático**.

## 🚀 Como executar

Pré-requisito: [Node.js](https://nodejs.org/) versão **20.19 ou superior** (ou 22.12+).

```bash
# 1. Instalar as dependências (isso também instala o Bootstrap)
npm install

# 2. Rodar em modo de desenvolvimento
npm run dev
```

Depois, abra o endereço mostrado no terminal (normalmente `http://localhost:5173`). Não abra o `index.html` com dois cliques: projeto Vue precisa do servidor do Vite.

Para gerar a versão final e testá-la:

```bash
npm run build
npm run preview
```

## 🎨 Evolução com Bootstrap (etapa 2)

### Framework escolhido e justificativa

Escolhemos o **Bootstrap 5.3** porque:

- é o framework CSS mais usado, com documentação e exemplos de sobra;
- tem **grid responsivo** pronto (`container`, `row`, `col-*`), que resolve o celular e o desktop;
- traz **componentes prontos** (card, navbar, formulário, barra de progresso, lista, alerta);
- tem **tema claro e escuro** nativo (`data-bs-theme`);
- o CSS dele funciona sozinho, sem precisar do JavaScript do Bootstrap, o que combina com o Vue.

### Como foi integrado

Pelo **npm**, sem CDN, para o projeto continuar rodando sem depender de internet:

```bash
npm install bootstrap
```

```js
// src/main.js
import 'bootstrap/dist/css/bootstrap.min.css'   // CSS do Bootstrap
import App from './App.vue'
import './assets/global.css'                    // ajustes de cor do Centavo (depois, para sobrescrever)
```

Usamos **somente o CSS**. O JavaScript do Bootstrap não foi importado, porque ele mexe no HTML por conta própria e o Vue já faz isso (`v-if`, `v-show`, eventos).

### Classes e recursos do Bootstrap aplicados

| Classe / recurso | Onde | O que faz na interface |
| --- | --- | --- |
| `container` | `App.vue` | Centraliza o conteúdo e limita a largura conforme o tamanho da tela |
| `row` + `col-12 col-md-4`, `col-lg-7`, `col-lg-5` (grid) | `App.vue`, `TransacaoForm.vue`, `TransacaoItem.vue` | Divide a página em colunas: 1 no celular, 3 cards lado a lado no tablet, formulário e meta lado a lado no desktop |
| `navbar`, `navbar-brand`, `navbar-text` | `AppHeader.vue` | Barra do topo com logo, nome e botão alinhados |
| `card`, `card-header`, `card-body`, `shadow-sm` | Todos os componentes | Caixas com borda, cabeçalho e sombra suave |
| `btn btn-primary`, `btn-outline-primary`, `btn-danger`, `btn-sm`, `btn-link` | Formulários, lista e rodapé | Botões padronizados em cores e tamanhos |
| `form-label`, `form-control`, `form-select` | `TransacaoForm.vue`, `MetaEconomia.vue` | Campos de formulário estilizados e com foco visível |
| `input-group` + `input-group-text` | `TransacaoForm.vue`, `MetaEconomia.vue` | Cola o "R$" ao campo de valor |
| `btn-check` + `btn-group` | `TransacaoForm.vue` | Escolha Despesa/Receita com aparência de botão (rádio estilizado) |
| `alert alert-danger`, `alert-success` | `TransacaoForm.vue`, `MetaEconomia.vue` | Mensagens de erro e de sucesso |
| `progress` + `progress-bar progress-bar-striped` | `MetaEconomia.vue` | Barra de progresso da meta; a largura vem do Vue |
| `list-group list-group-flush` + `list-group-item` | `TransacaoLista.vue`, `TransacaoItem.vue` | Lista de transações com divisórias |
| `badge rounded-pill text-bg-*` | `TransacaoLista.vue` | Contador de transações em cada filtro |
| `text-success`, `text-danger`, `text-body-secondary`, `bg-*-subtle`, `border-start border-4` | `ResumoCard.vue`, `TransacaoItem.vue` | Cores que indicam receita (verde), despesa (vermelho) e texto de apoio |
| Utilitários: `d-flex`, `align-items-center`, `justify-content-between`, `gap-*`, `mb-*`, `py-*`, `w-100`, `fw-bold`, `fs-4`, `text-nowrap`, `text-break` | Vários | Alinhamento, espaçamento e texto sem escrever CSS |
| Utilitários responsivos: `d-none d-lg-inline`, `flex-column flex-sm-row` | `AppHeader.vue`, `TransacaoLista.vue`, `App.vue` | Escondem ou reorganizam elementos conforme a largura da tela |

### Elementos visuais melhorados

| Elemento | Antes | Depois (Bootstrap) |
| --- | --- | --- |
| **Cabeçalho** | `div` com CSS próprio; no celular ocupava muita altura | `navbar` compacta; data some em telas menores (`d-none d-lg-inline`) |
| **Cards de resumo** | Cards com CSS próprio em linha | `card` com `border-start` colorido, ícone e valor empilhados (cabem em qualquer largura) |
| **Formulário** | Campos e botões com CSS próprio | `form-control`, `form-select`, `input-group` e `btn-check` |
| **Lista de transações** | Linhas com `flex` próprio | `list-group` com grid `row/col` e botões `btn-sm` |
| **Meta de economia** | Barra feita à mão | `progress` com `progress-bar-striped` |
| **Filtros** | Botões "pílula" próprios | `btn-group` com `badge` de contagem |

### Responsividade

O layout usa os pontos de quebra do Bootstrap (`sm` 576px, `md` 768px, `lg` 992px):

- **Celular:** tudo em 1 coluna; filtros embaixo do título; botões de confirmar/cancelar em linha própria.
- **Tablet (md):** os 3 cards de resumo ficam lado a lado.
- **Desktop (lg):** formulário e meta de economia lado a lado; data aparece no cabeçalho.

Testamos em 320, 360, 390, 576, 768, 992, 1280 e 1536 px, sem rolagem horizontal e sem texto estourando os cards.

### Antes e depois

**Computador**

![Comparação no computador](docs/antes-depois/comparacao-desktop.png)

**Celular**

![Comparação no celular](docs/antes-depois/comparacao-mobile.png)

As imagens individuais estão em `docs/antes-depois/`.

### Tema do Centavo sobre o Bootstrap

O `src/assets/global.css` só **troca as cores padrão do Bootstrap (azul) pelas do Centavo**, sobrescrevendo as variáveis CSS do próprio framework (`--bs-primary`, `--bs-success`, `--bs-danger` e as variáveis dos botões). Ele também define o fundo da página e a cor de foco dos campos. Tudo que é layout e componente vem do Bootstrap.

### Dificuldades e aprendizados

- **`v-show` com `d-flex`:** as classes `d-*` do Bootstrap usam `!important` e ganham do `display: none` que o Vue coloca. Por isso o `v-show` fica em elementos sem essas classes.
- **Não usar o JavaScript do Bootstrap:** ele altera o HTML direto, o que conflita com o Vue.
- **Cores dos botões:** o Bootstrap define as cores de cada botão em variáveis próprias (`--bs-btn-bg` etc.), então para mudar a cor foi preciso sobrescrever essas variáveis.
- **Tamanho do CSS:** o Bootstrap completo tem cerca de 230 kB (31 kB comprimido), contra 11 kB do CSS próprio. Em troca, ganhamos grid, componentes, acessibilidade e tema escuro prontos.

## 🧩 Tecnologias

- Vue.js 3 com `<script setup>` e Vite.
- Bootstrap 5.3 (somente CSS), instalado via npm.
- **Sem** Vue Router, **sem** bibliotecas externas de componentes e **sem** bibliotecas de estado.
- Apenas os fundamentos vistos em aula: componentes `.vue`, props, `ref()`, eventos, `v-model`, `v-if`, `v-show`, `v-for` e CSS.

## 📁 Estrutura de arquivos

```
centavo/
├── index.html                     # inclui o script do tema claro/escuro
├── package.json
├── vite.config.js
├── docs/
│   └── antes-depois/              # imagens da evolução visual
└── src/
    ├── main.js                    # inicia o app e importa o Bootstrap
    ├── App.vue                    # componente principal (junta tudo)
    ├── assets/
    │   └── global.css             # cores do Centavo sobre o Bootstrap
    ├── components/
    │   ├── AppHeader.vue          # cabeçalho (navbar)
    │   ├── ResumoCard.vue         # card de resumo (reutilizado 3 vezes)
    │   ├── TransacaoForm.vue      # formulário de nova transação
    │   ├── MetaEconomia.vue       # meta de economia com barra de progresso
    │   ├── TransacaoLista.vue     # lista com filtro
    │   └── TransacaoItem.vue      # uma linha da lista (reutilizada com v-for)
    ├── data/
    │   ├── categorias.js          # categorias do formulário
    │   └── transacoesIniciais.js  # dados de exemplo
    └── utils/
        ├── armazenamento.js       # leitura/gravação no localStorage
        └── formatar.js            # formatação de moeda e datas
```

## 🧱 Componentes

A componentização e a reatividade da 1ª etapa foram **mantidas**: os componentes têm as mesmas props e eventos de antes; só o visual (classes do Bootstrap) mudou.

| Componente | Para que serve | Props | Eventos |
| --- | --- | --- | --- |
| `AppHeader` | Logo, data de hoje e botão de ocultar valores | `valoresVisiveis` | `alternar-valores` |
| `ResumoCard` | Mostra um valor (saldo, receitas ou despesas) | `titulo`, `valor`, `tipo`, `icone`, `visivel` | — |
| `TransacaoForm` | Cadastra uma nova receita ou despesa | — | `adicionar` |
| `MetaEconomia` | Mostra e edita a meta de economia | `meta`, `saldo`, `visivel` | `atualizar-meta` |
| `TransacaoLista` | Lista as transações e aplica o filtro | `transacoes`, `visivel` | `remover` |
| `TransacaoItem` | Uma transação da lista | `transacao`, `visivel` | `remover` |

### Reúso de componentes

- `ResumoCard` é usado **3 vezes** no `App.vue` (Saldo, Receitas e Despesas), mudando apenas as props.
- `TransacaoItem` é usado **uma vez para cada transação** através do `v-for` do `TransacaoLista`.

## 📚 Conceitos de Vue aplicados (e onde ver no código)

| Conceito | Onde |
| --- | --- |
| **Componentes `.vue` com `<script setup>`** | Todos os arquivos de `src/components/` e o `App.vue` |
| **Props** | `ResumoCard.vue` (`defineProps`) recebendo os valores enviados pelo `App.vue` |
| **`ref()` (reatividade)** | `App.vue` (`transacoes`, `meta`, `valoresVisiveis`), `TransacaoLista.vue` (`filtroAtivo`), `TransacaoForm.vue` (campos), `TransacaoItem.vue` (`confirmando`) |
| **Eventos** | `@click` (filtros, botões), `@submit.prevent` (formulários), `@input`, `@change` e eventos personalizados com `defineEmits` |
| **`v-model`** | `TransacaoForm.vue` (descrição, valor, data, tipo e categoria) e `MetaEconomia.vue` (nova meta) |
| **`v-if` / `v-else`** | Mensagens de erro, lista vazia, valores ocultos (`ResumoCard`, `TransacaoItem`) |
| **`v-show`** | Formulário de edição da meta (`MetaEconomia.vue`) e mensagem de sucesso (`TransacaoForm.vue`) |
| **`v-for`** | Lista de transações e filtros (`TransacaoLista.vue`), tipos e categorias (`TransacaoForm.vue`) |

## 🤖 Uso de Inteligência Artificial

A IA foi utilizada como ferramenta de apoio no desenvolvimento, sempre respeitando o conteúdo estudado e as limitações de cada etapa. Todo o código foi revisado, testado e é compreendido pela equipe, inclusive as classes do Bootstrap listadas acima.

### Etapa 1 — Projeto em Vue

| Etapa | Prompt |
| --- | --- |
| **1. Planejamento e divisão em componentes** | "Tenho uma aplicação Vue sobre um sistema de finanças chamado Centavo. Sugira uma divisão em componentes simples e reutilizáveis. Utilize apenas Vue com `<script setup>`, sem bibliotecas externas e sem Vue Router. A aplicação deve ser One Page, ter pelo menos 4 componentes `.vue`, usar props, `ref()`, eventos, `v-if`, `v-show`, `v-for`, `v-model` e CSS próprio." |
| **2. Componente com props e reúso** | "Crie um componente Vue simples que receba título, valor e tipo através de props. Utilize `<script setup>` e CSS próprio, sem bibliotecas externas." |
| **3. Reutilização com props** | "Como posso reutilizar este componente para apresentar diferentes informações usando props?" (usado para o card de resumo: saldo, receitas e despesas) |
| **4. Reatividade e eventos** | "Sugira uma interação simples utilizando `ref()` e `@click` para adicionar reatividade a este componente." (usado nos filtros da lista de transações) |
| **5. Formulário** | "Como utilizar `v-model` neste formulário Vue? Explique o funcionamento do código." (usado no formulário de nova transação) |
| **6. Lista com componente reutilizável** | "Como utilizar `v-for` para apresentar esta lista utilizando um componente reutilizável?" (usado na lista de transações com `TransacaoItem`) |
| **7. Estilização** | "Crie o CSS do aplicativo usando apenas CSS puro, com variáveis, layout responsivo para celular e tema escuro, sem Bootstrap, Tailwind ou outras bibliotecas." |
| **8. Revisão final** | "Revise este código utilizando somente os conceitos básicos de Vue: componentes, props, `ref`, eventos, `v-if`, `v-for` e `v-model`. Não utilize bibliotecas externas nem conceitos avançados." |

### Etapa 2 — Evolução com Bootstrap

A IA apoiou a integração do Bootstrap e a troca do CSS próprio pelas classes do framework, mantendo os componentes, as props, os eventos e a reatividade como estavam.

## 👥 Equipe

| Integrante | Contribuição |
| --- | --- |
| Samuel Teixeira | Programação e código |
| Enzo Vida | Vídeo de apresentação |

Projeto desenvolvido para a disciplina **Front-End Frameworks** — Análise e Desenvolvimento de Sistemas, UNAMA.
