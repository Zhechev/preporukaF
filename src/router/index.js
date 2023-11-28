import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

// Guest Component
const LoginView = () => import('@/components/LoginView.vue')
const RegisterView = () => import('@/components/RegisterView.vue')

// Layouts
const HomeView = () => import('@/views/HomeView.vue')

// Categories
const VenuesView = () => import('@/views/VenuesView.vue')

// Venues
const VenueView = () => import('@/views/VenueView.vue')
const CreateVenueView = () => import('@/views/CreateVenueView.vue')

const GoogleLoginSuccessView = () => import('@/components/GoogleLoginSuccessView.vue')

// Profile
const ProfileView = () => import('@/views/Profile/ProfileView.vue');
const ReviewView = () => import('@/views/Profile/ReviewView.vue');

const UserProfileView = () => import('@/views/Profile/UserProfileView.vue');


const routes = [
    {
        name: "login",
        path: "/login",
        component: LoginView,
        meta: {
            middleware: "guest",
            title: `LoginView`
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
        component: RegisterView,
        meta: {
            middleware: "guest",
            title: `RegisterView`
        }
    },
    {
        path: "/",
        component: HomeView,
        meta: {
            middleware: "all",
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
        path: '/profile',
        component: ProfileView,
        name: 'profile',
        meta: {
            middleware: "all",
            title: `ProfileView`
        }
    },
    {
        path: '/user/:userId',
        component: UserProfileView,
        name: 'userProfile',
        meta: {
            middleware: "all",
            title: `UserProfileView`
        }
    },
    {
        name: "showReview",
        path: "/reviews/:reviewId",
        component: ReviewView,
        meta: {
            middleware: "all",
            title: 'ReviewView'
        }
    },
    {
        name: "showVenues",
        path: "/venues/",
        component: VenuesView,
        meta: {
            middleware: "all",
            title: 'VenuesView'
        }
    },    
    {
        name: "showVenue",
        path: "/venues/:venueId",
        component: VenueView,
        meta: {
            middleware: "all",
            title: 'showVenue'
        }
    },
    {
        name: "createVenue",
        path: "/venues/create/",
        props: true,
        component: CreateVenueView,
        meta: {
            middleware: "auth",
            title: 'createVenue'
        }
    },
    {
        name: "login-success",
        path: "/login-success",
        component: GoogleLoginSuccessView,
        meta: {
            middleware: "all",
            title: `Google Login Success`
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
