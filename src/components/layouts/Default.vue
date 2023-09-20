<template>
    <Header :categories="categories"></Header>

    <router-view></router-view>
    <Footer></Footer>
    <div id="bottom_backto_top"><a href="#"></a></div>

</template>

<script>
import Header from '../common/HeaderComponent.vue'
import Footer from '../common/Footer.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Header: Header,
        Footer: Footer,
    },
    name: "DefaultLayout",
    methods: {
        debug: function () {
            // console.log(this.$store.state.auth.isUserAuth)
        },
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
}
</script>
