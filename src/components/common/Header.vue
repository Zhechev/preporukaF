<template>
   <header id="header_part" class="fullwidth">
    <div id="header">
      <div class="container">
        <div class="utf_left_side">
          <div id="logo"> <router-link :to="{name:'home'}"><img src="http://ulisting.utouchdesign.com/ulisting_ltr/images/logo.png" alt=""></router-link> </div>
        </div>
        <div class="utf_right_side">
          <div class="header_widget d-flex">
            <router-link :to="{ name: '' }" class="button border with-icon">
              <font-awesome-icon :icon="['fas', 'location-dot']" /><span class="txt">{{ $t('text.add_venue') }}</span>
            </router-link>
            <router-link :to="{ name: 'login' }" class="button border sign-in popup-with-zoom-anim" v-if="!isAuth">
              <font-awesome-icon :icon="['fas', 'sign-in']" />
              <span class="txt none">{{ $t('text.login') }}</span>
            </router-link>
            <div v-if="isAuth">
              <div class="dropdown">
                <button class="button-tr dropdown-toggle" type="button" id="profile" data-bs-toggle="dropdown" aria-expanded="false">
                  <font-awesome-icon :icon="['fas', 'user']" />
                </button>
                <ul class="dropdown-menu" aria-labelledby="profile">
                  <li><a class="dropdown-item" href="#">Настройки</a></li>
                  <li><a class="dropdown-item" href="#">Разлогване</a></li>
                </ul>
              </div>
            </div>
            <div>
              <div class="dropdown">
                <button class="button-tr dropdown-toggle" type="button" id="changeLang" data-bs-toggle="dropdown" aria-expanded="false">
                  <font-awesome-icon :icon="['fas', 'globe']" />
                </button>
                <ul class="dropdown-menu" aria-labelledby="changeLang">
                  <li :class="{'active-lang': currentLanguage === 'en'}"><a class="dropdown-item" href="#" @click="changeLanguage('en')">English</a></li>
                  <li :class="{'active-lang': currentLanguage === 'bg'}"><a class="dropdown-item" href="#" @click="changeLanguage('bg')">Bulgarian</a></li>
                </ul>
              </div>
            </div>
        </div>
        </div>


      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios';

export default {
  name: 'DefaultLayout',
  data() {
      return {
          active: false
      }
  },
  props: ['categories'],

  methods: {
    ...mapActions({
      signOut: 'auth/logout'
    }),
    async logout() {
        this.signOut()
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'auth/authenticated'
    }),
    currentLanguage() {
        return this.$i18n.locale;
    }
  },
  mounted() {

  }
}
</script>
