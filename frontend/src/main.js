import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import vuetify from './plugins/vuetify';
import VueAlertify from 'vue-alertify';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VueAlertify, {
    notifier: {
        delay: 2,
        position: 'top-right'
    }
});

axios.interceptors.request.use((config) => {
    if (localStorage.token) {
        config.headers.common.Authorization = `Bearer ${localStorage.token}`;
    }

    return config;
});

new Vue({
    router,
    vuetify,
    render: h => h(App),
    data: {
        user: undefined
    }
}).$mount('#app');
