import VueRouter from "vue-router";
import store from "@/store";

const MainLayout = () => import("@/layout/MainLayout");
const Login = () => import("@/views/Login");
const Dashboard = () => import("@/views/Dashboard");
const Payment = () => import("@/views/Payment")

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            component: MainLayout,
            redirect: '/login',
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: Dashboard,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'payment',
                    name: 'payment',
                    component: Payment,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.isLoggedIn){
            next()
            return
        }
        next('/login')
    } else{
        next()
    }
});


export default router;