import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './plugins/vuetify'
import VueAlertify from 'vue-alertify'

Vue.config.productionTip = false
Vue.use(VueAlertify, {
    notifier: {
        delay: 2,
        position: 'top-right'
    }
})

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
