import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
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

new Vue({
    router,
    vuetify,
    render: h => h(App),
    created() {
        axios.interceptors.request.use((config) => {
            if (sessionStorage.token) {
                config.headers.common.Authorization = `Bearer ${sessionStorage.token}`;
            }

            return config;
        });

        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response.status === 401) {
                if (error.response.data.message === 'Invalid token') {
                    this.$alertify.error('Session has expired. Redirecting to login page');
                    sessionStorage.clear();
                    this.$router.push({ name: 'LoginView' });
                }
            }
            return Promise.reject(error);
        });
    }
}).$mount('#app');
