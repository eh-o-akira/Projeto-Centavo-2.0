import { createApp } from 'vue'
// Bootstrap (framework CSS) instalado via npm. Usamos só o CSS: quem controla
// o comportamento da página é o Vue (v-if, v-show, eventos...), não o JS do Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
// Ajustes de tema (cores do Centavo sobre as variáveis do Bootstrap).
// Fica DEPOIS do Bootstrap para poder sobrescrever as cores.
import './assets/global.css'

createApp(App).mount('#app')
