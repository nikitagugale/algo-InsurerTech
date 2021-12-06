import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import FundProject from '../components/FundProject.vue'
import FacOffer from '../components/FacOffer.vue'
import TokenCreation from '../components/TokenCreation.vue'
import RedeemCredits from '../components/RedeemCredits.vue'
import FacAccept from '../components/FacAccept.vue'

const routes = [{
        path: '/',
        name: 'Main',
        redirect: '/login',
        component: Main,
        meta: { requiresAuth: true, loading: true },
        children: [{
                path: '/fund-project',
                name: 'FundProject',
                component: FundProject,
                // add component methodName here to call from the parent
                meta: {
                    confirm: { methodName: 'confirmOrders' }
                }
            },
            {
                path: '/facoffercreation',
                name: 'FacOffer',
                component: FacOffer
            },
            {
                path: '/fac-accept',
                name: 'FacAccept',
                component: FacAccept
            },
            {
                path: '/get-credits',
                name: 'TokenCreation',
                component: TokenCreation
            },
            {
                path: '/tokenredeem',
                name: '/RedeemCredits',
                component: RedeemCredits
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const loading = to.matched.some(record => record.meta.loading);

    if (store.state.account.length === 0 && loading) {
        next('/login')
    } else if (requiresAuth && store.state.account.length !== 0) {
        next();
    } else {
        next()
    }
})

export default router