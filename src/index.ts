import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './app/index.vue';
import Components from './shared/ui';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Vuelidate);

const app = new Vue({ render: (root) => root(App) });

Components.forEach((component) => {
  Vue.component(component.name, component);
});

app.$mount('#app');