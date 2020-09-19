import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/admin',
        name: 'MenuViewEditable',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/MenuEditable/MenuView.vue')
    },
    {
        path: '/menu/:id',
        name: 'MenuViewReadonly',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/MenuReadonly/MenuView.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
