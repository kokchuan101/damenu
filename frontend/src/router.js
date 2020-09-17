import Vue from 'vue'
import VueRouter from 'vue-router'
import MenuView from '@/app/MenuReadonly/MenuView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MenuView
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "MenuEditable" */ '@/app/MenuEditable/MenuView.vue')
    }
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

export default router
