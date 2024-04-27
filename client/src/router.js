import { createWebHistory, createRouter } from "vue-router";
import { store } from './store'

const ifAuthenticated = (to, from, next) => {
    store.commit('CHECK_LOGIN_STATUS');
    if (!store.getters['getLogged']) {
        router.push({ name: 'Login' });
        localStorage.removeItem('userAuthenticated');
        return;
    }
    next();
};

const routes = [
    {
        path: `/`,
        name: "Login",
        component: () => import("./views/SignIn.vue"),
        meta: { Template: false },
    },
    {
        path: `/signup`,
        name: "Signup",
        component: () => import("./views/SignUp.vue"),
        meta: { Template: false },
    },
    {
        path: `/profile`,
        name: "Profile",
        component: () => import("./views/Profile.vue"),
        beforeEnter: [ifAuthenticated],
    },
    {
        path: `/dashboard`,
        name: "Dashboard",
        component: () => import("./views/Dashboard.vue"),
        beforeEnter: [ifAuthenticated],
    },
    {
        path: `/transactions`,
        name: "Transactions",
        component: () => import("./views/Transactions.vue"),
        beforeEnter: [ifAuthenticated],
    },
    {
        path: `/:pathMatch(.*)*`,
        name: "Not Found",
        component: () => import("./views/NotFound.vue"),
        meta: { Template: false },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;