<template>
  <header id="header_part" class="fullwidth">
    <div id="header">
      <div class="container">
        <div class="utf_left_side">
          <div id="logo"> <router-link :to="{name:'home'}"><img src="http://ulisting.utouchdesign.com/ulisting_ltr/images/logo.png" alt=""></router-link> </div>
        </div>
        <div class="utf_right_side">
          <div class="header_widget d-flex">
            <router-link :to="{ name: 'createVenue' }" class="button border with-icon"><font-awesome-icon :icon="['fas', 'location-dot']" /><span class="txt">{{ $t('text.add_venue') }}</span></router-link>
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
                  <li><router-link :to="{name:'profile'}" class="reg-link">{{ $t('text.profile') }}</router-link></li>
                  <li><a class="dropdown-item" href="#" @click.prevent="logout">Разлогване</a></li>
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

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { locale } = useI18n()

const signOut = () => store.dispatch('auth/logout')
const isAuth = computed(() => store.getters['auth/authenticated'])

const logout = async () => {
  await signOut()
}

const changeLanguage = (lang) => {
  locale.value = lang
}

const currentLanguage = computed(() => locale.value)
</script>

