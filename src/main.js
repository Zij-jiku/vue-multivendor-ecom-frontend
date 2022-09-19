import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.css';
import './script.js';
import router from './router';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus)
app.mount('#app');
