import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'LoginView',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/Login/LoginView.vue')
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import(/* webpackChunkName: "RegisterView" */ '@/app/Register/RegisterView.vue')
    },
    {
        path: '/menu',
        name: 'MenuListView',
        component: () => import(/* webpackChunkName: "RegisterView" */ '@/app/MenuList/MenuListView.vue')
    },
    {
        path: '/menu/:id',
        name: 'MenuViewEditable',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/MenuEditable/MenuView.vue')
    },
    {
        path: '/view/menu/:id',
        name: 'MenuViewReadonly',
        component: () => import(/* webpackChunkName: "MenuReadonly" */ '@/app/MenuReadonly/MenuView.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
