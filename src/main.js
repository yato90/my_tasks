import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import focusDatepickerPlugin from './plugins/focusDatepickerPlugin.js';

createApp(App).use(router).use(store).use(focusDatepickerPlugin).mount('#app');
