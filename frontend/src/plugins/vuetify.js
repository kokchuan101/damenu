import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
            xs: 576,
            sm: 768,
            md: 992,
            lg: 1200
        }
    }
});
