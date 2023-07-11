<template>
  <header id="header_part" class="fullwidth">
    <div id="header">
      <div class="container">
        <div class="utf_left_side">
          <div id="logo">
            <router-link :to="{ name: 'home' }">
              <img src="http://ulisting.utouchdesign.com/ulisting_ltr/images/logo.png" alt="" />
            </router-link>
          </div>
          <div class="mmenu-trigger">
            <button class="hamburger utfbutton_collapse" type="button">
              <span class="utf_inner_button_box">
                <span class="utf_inner_section"></span>
              </span>
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="utf_right_side">
          <div class="header_widget">
            <router-link :to="{ name: 'login' }" class="button border sign-in popup-with-zoom-anim" v-if="!isAuth">
              <i class="fa fa-sign-in"></i>{{ $t('text.hello') }}
            </router-link>
            <a class="button border sign-in popup-with-zoom-anim" v-if="isAuth" href="" @click.prevent="logout">
              <i class="fa fa-sign-in"></i>Logout
            </a>
            <nav id="navigation" class="style_one">
              <ul id="responsive">
                <li>
                  <a href="#"><i class="sl sl-icon-user"></i></a>
                  <ul>
                    <li v-for="category in categories" :key="category.id">
                      <router-link :to="{ name: 'createVenue', params: { id: category.id } }">
                        test
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <a href="#" @click="changeLanguage('en')">English</a>
          <a href="#" @click="changeLanguage('bg')">Bulgarian</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios';

export default {
  name: 'DefaultLayout',

  props: ['categories'],

  methods: {
    ...mapActions({
      signOut: 'auth/logout'
    }),
    async logout() {
      await axios.post('/logout').then(() => {
        this.signOut()
      })
    },
    changeLanguage(lang) {
      console.log('Selected Language:', lang)
      this.$i18n.locale = lang
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'auth/authenticated'
    })
  },
  mounted() {
        console.log(this.$t('text.hello')); // translates 'hello' from 'text' in the current locale
  }
}
</script>
