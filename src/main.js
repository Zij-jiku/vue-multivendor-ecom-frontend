import { createApp } from 'vue';
// Main CSS & Js File
import './style.css';
import './script.js';
// App JS
import App from './App.vue';
// Router
import router from './router';
// Notification JS
import ElementPlus from 'element-plus'
// State Management Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus)
app.mount('#app');
