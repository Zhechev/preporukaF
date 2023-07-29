import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

// Guest Component
const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')

// Layouts
const HomeView = () => import('@/views/HomeView.vue')

// Categories
const CategoryView = () => import('@/views/CategoryView.vue')

// Venues
const VenueView = () => import('@/views/VenueView.vue')
const CreateVenueView = () => import('@/views/CreateVenueView.vue')


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "logout",
        path: "/logout",
        meta: {
            middleware: "auth",
            title: `Logout`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: HomeView,
        meta: {
            middleware: ["all"]
        },
        children: [
            {
                name: "home",
                path: '/',
                component: HomeView,
                meta: {
                    title: `HomeView`
                }
            }
        ]
    },
    {
        name: "showCategory",
        path: "/category/:id",
        component: CategoryView,
        meta: {
            middleware: ["all"],
            title: 'CategoryView'
        }
    },
    {
        name: "showVenue",
        path: "/venues/:id",
        props: true,
        component: VenueView,
        meta: {
            middleware: ["all"],
            title: 'showVenue'
        }
    },
    {
        name: "createVenue",
        path: "/venues/create/",
        props: true,
        component: CreateVenueView,
        meta: {
            middleware: ["auth"],
            title: 'createVenue'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "all") {
        return next();
    } else if (to.meta.middleware == "guest") {
        if (!store.state.auth.authenticated) {
            return next()
        }
    } else if (to.meta.middleware == "auth") {
        if (store.state.auth.authenticated) {
            return next()
        } else {
            return next({ name: "login" })
        }
    }
})

export default router
