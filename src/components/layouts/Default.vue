<template>
    <div>
      <main-header :categories="categories"></main-header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </template>
<script>
import MainHeader from '../common/HeaderComponent.vue'
import Footer from '../common/Footer.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        MainHeader,
        Footer,
    },
    name: "DefaultLayout",
    methods: {
        getRandomProperty(obj) {
            return obj[Math.floor((Math.random() * obj.length))];
        }
    },
    created() {
        this.$store.dispatch('categories/categories'); // Add state to store before page load
        this.$store.dispatch('cities/cities'); // Add state to store before page load
    },
    computed: {
        ...mapGetters({
            isAuth: 'auth/authenticated',
            categories: 'categories/categories'  // Add this line
        }),
    },
    props: {
        headerComponent: {
            type: String,
            default: 'MainHeader'
        }
    }
}
</script>
