<script setup>
// import { computed } from 'vue'
// import { useStore } from 'vuex'
// import { useI18n } from 'vue-i18n'

// const store = useStore()
// const { locale } = useI18n()

// const signOut = () => store.dispatch('auth/logout')
// const isAuth = computed(() => store.getters['auth/authenticated'])

// const logout = async () => {
//   await signOut()
// }

// const changeLanguage = (lang) => {
//   locale.value = lang
// }

// const currentLanguage = computed(() => locale.value)
</script>
<template>
    <header id="header_part" class="fixed fullwidth_block dashboard"> 
        <div id="header" class="not-sticky">
        <div class="container"> 
            <div class="utf_left_side"> 
                <div id="logo"> <router-link :to="{name:'home'}"><img src="http://ulisting.utouchdesign.com/ulisting_ltr/images/logo.png" alt=""></router-link> </div>
            </div>
            <div class="utf_right_side"> 
                <div class="header_widget"> 
                    <div class="dashboard_header_button_item has-noti">
                        <div class="dropdown">
                            <button class="dashboard_notifi dropdown-toggle" type="button" id="notifications" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="i"><font-awesome-icon :icon="['fas', 'bell']" /></span>
                            </button>
                            <div class="dashboard_notifi_dropdown dropdown-menu" aria-labelledby="notifications">
                                <div class="dashboard_notifi_title">
                                    <p>You Have 2 Notifications</p>
                                </div>
                                <div class="dashboard_notifi_item">
                                    <div class="">
                                        <span class="i bg-c1 red"><font-awesome-icon :icon="['fas', 'check']" /></span>
                                    </div>
                                    <div class="content">
                                        <p>Your Listing <b>Burger House (MG Road)</b> Has Been Approved!</p>
                                        <span class="date">2 hours ago</span>
                                    </div>
                                </div>
                                <div class="dashboard_notifi_item">
                                    <div class="">
                                        <span class="i bg-c1 green"><font-awesome-icon :icon="['fas', 'envelope']" /></span>
                                    </div>
                                    <div class="content">
                                        <p>You Have 7 Unread Messages</p>
                                        <span class="date">5 hours ago</span>
                                    </div>
                                </div>
                                <div class="dashboard_notify_bottom text-center px-4 py-4">
                                    <a href="#">View All Notification</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="utf_user_menu">
                        <div class="dropdown">
                            <button class="utf_user_name dropdown-toggle" type="button" id="profile" data-bs-toggle="dropdown" aria-expanded="false">
                                <span><img src="images/dashboard-avatar.jpg" alt=""></span>
                                Hi, John!
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="profile">
                                <li><a class="dropdown-item" href="dashboard.html"><span class="i"><font-awesome-icon :icon="['fas', 'layer-group']" /></span> Dashboard</a></li>
                                <li><a class="dropdown-item" href="dashboard_my_profile.html"><span class="i"><font-awesome-icon :icon="['fas', 'user']" /></span> My Profile</a></li>
                                <li><a class="dropdown-item" href="dashboard_my_listing.html"><span class="i"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> My Listing</a></li>
                                <li><a class="dropdown-item" href="dashboard_messages.html"><span class="i"><font-awesome-icon :icon="['fas', 'envelope-open']" /></span> Messages</a></li>
                                <li><a class="dropdown-item" href="dashboard_bookings.html"><span class="i"><font-awesome-icon :icon="['fas', 'file']" /></span> Booking</a></li>
                                <li><a class="dropdown-item" href="index_1.html"><span class="i"><font-awesome-icon :icon="['fas', 'power-off']" /></span> Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </header>
</template>