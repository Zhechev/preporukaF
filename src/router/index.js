import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

// Guest Component
const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')

// Layouts
const Home = () => import('@/components/pages/Home.vue')

// Categories
const Category = () => import('@/components/pages/Category.vue')

// Venues
const Venue = () => import('@/components/pages/Venue.vue')
const CreateVenue = () => import('@/components/pages/CreateVenue.vue')


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
        component: Home,
        meta: {
            middleware: ["all"]
        },
        children: [
            {
                name: "home",
                path: '/',
                component: Home,
                meta: {
                    title: `Home`
                }
            }
        ]
    },
    {
        name: "showCategory",
        path: "/category/:id",
        component: Category,
        meta: {
            middleware: ["all"],
            title: 'Category'
        }
    },
    {
        name: "showVenue",
        path: "/venues/:id",
        props: true,
        component: Venue,
        meta: {
            middleware: ["all"],
            title: 'showVenue'
        }
    },
    {
        name: "createVenue",
        path: "/venues/create/:id",
        props: true,
        component: CreateVenue,
        meta: {
            middleware: ["auth"],
            title: 'create'
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
