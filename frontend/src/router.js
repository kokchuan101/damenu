import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const hasLoggedIn = (to, from, next) => {
    if (sessionStorage.user) {
        next({ name: 'MenuListView' });
    } else {
        next();
    }
};

const routes = [
    {
        path: '/',
        name: 'LoginView',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/Login/LoginView.vue'),
        beforeEnter: hasLoggedIn
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import(/* webpackChunkName: "RegisterView" */ '@/app/Register/RegisterView.vue'),
        beforeEnter: hasLoggedIn
    },
    {
        path: '/menu',
        name: 'MenuListView',
        component: () => import(/* webpackChunkName: "MenuListView" */ '@/app/MenuList/MenuListView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/menu/:id',
        name: 'MenuViewEditable',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/MenuEditable/MenuView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/view/menu/:id',
        name: 'MenuViewReadonly',
        component: () => import(/* webpackChunkName: "MenuReadonly" */ '@/app/MenuReadonly/MenuView.vue')
    },
    {
        path: '/404',
        alias: '*',
        name: 'Error404',
        component: () => import(/* webpackChunkName: "Error404" */ '@/app/components/Error404.vue')
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!sessionStorage.user) {
            next({ name: 'LoginView' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
