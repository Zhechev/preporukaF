<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { fetchUserDetails, fetchUserNotifications } from "@/services/profileService.js";
import ProfileLayout from "@/components/layouts/ProfileLayout.vue";


const store = useStore();
const storedUser = computed(() => store.getters["auth/user"]);

const user = ref(null);
const notifications = ref([]);

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(notifications.value.total / notifications.value.per_page));

const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const paginationLinks = computed(() => {
    const links = [];
    for (let i = 1; i <= totalPages.value; i++) {
        links.push(i);
    }
    return links;
});

const getPageRange = () => {
    let start = Math.max(currentPage.value - 2, 1);
    let end = Math.min(currentPage.value + 2, totalPages.value);

    // Make sure we always show at least 5 pages (where possible)
    while ((end - start) < 4 && (start !== 1 || end !== totalPages.value)) {
        if (start > 1) start--;
        else if (end < totalPages.value) end++;
    }

    const range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
};

watchEffect(async () => {
    try {
        const data = await fetchUserNotifications(storedUser.value.id, currentPage.value);
        notifications.value = data;
    } catch (error) {
        console.error('Failed to load user notifications:', error);
    }
});

onMounted(async () => {
    if (storedUser.value && storedUser.value.id) {
        try {
            user.value = await fetchUserDetails(storedUser.value.id);
        } catch (error) {
            console.error('Failed to load user details:', error);
        }

        try {
            notifications.value = await fetchUserNotifications(storedUser.value.id);
            console.log(notifications.value);
        } catch (error) {
            console.error('Failed to load user notifications:', error);
        }
    }
});

</script>

<template>
    <ProfileLayout>
    <!-- Wrapper -->
    <div id="main_wrapper"> 
    <!-- Dashboard -->
    <div id="dashboard"> 
        <a class="utf_dashboard_nav_responsive" data-bs-toggle="collapse" href="#collapseNavMenu" role="button" aria-expanded="false" aria-controls="collapseNavMenu">
            <span class="i"><font-awesome-icon :icon="['fas', 'bars']" /></span> Dashboard Sidebar Menu</a>
            <slot name="dashboard-sidebar"></slot>
        <div class="utf_dashboard_content"> 
        
        <div class="row"> 
            <div class="col-lg-3 col-md-6">
            <div class="utf_dashboard_stat color-1">
                <div class="utf_dashboard_stat_content">
                    <h4>{{ user ? user.venues_count : 0 }}</h4>
                <span>Published Venues</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"><font-awesome-icon :icon="['fas', 'map-location-dot']" /></span></div>
            </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
            <div class="utf_dashboard_stat color-2">
                <div class="utf_dashboard_stat_content">
                <h4>{{ user ? user.venues_owned_count : 0 }}</h4>
                <span>Own Venues</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"></span></div>
            </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
            <div class="utf_dashboard_stat color-3">
                <div class="utf_dashboard_stat_content">
                <h4>{{ user ? user.reviews_count : 0 }}</h4>
                <span>Published Reviews</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"><font-awesome-icon :icon="['fas', 'align-justify']" /></span></div>
            </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
            <div class="utf_dashboard_stat color-4">
                <div class="utf_dashboard_stat_content">
                <h4>{{ user ? user.visitors_reviews_count : 0 }}</h4>
                <span>Received Reviews</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"></span></div>
            </div>
            </div>
        </div>
        <div class="row"> 
            <div class="col-lg-12 col-md-12">
            <div class="utf_dashboard_list_box with-icons margin-top-20">
                <h4>Notifications</h4>
                <ul>
                    <li v-for="notification in notifications.data" :key="notification.id">
                        <span>
                            <span class="i utf_list_box_icon">
                                <font-awesome-icon :icon="icon" />
                            </span>

                            <!-- For Review Notifications -->
                            <template v-if="notification.data.short_type === 'review'">
                                {{ $t('text.notifications.review.beforeUsername') }}
                                <strong><router-link :to="`/user/${notification.data.username}`">{{ notification.data.username }}</router-link></strong>
                                {{ $t('text.notifications.review.beforeReview') }}
                                <strong><router-link :to="`/review/${notification.data.review_id}`">{{ $t('text.notifications.review.reviewWord') }}</router-link></strong>
                                {{ $t('text.notifications.review.betweenReviewAndVenue') }}
                                <strong><router-link :to="`/venue/${notification.data.venue_title}`">{{ notification.data.venue_title }}</router-link></strong>
                                {{ $t('text.notifications.review.afterVenue') }}
                            </template>


                            <!-- For Comment Notifications -->
                            <template v-else-if="notification.data.short_type === 'comment'">
                                {{ $t('text.notifications.comment.beforeUsername') }}
                                <strong><router-link :to="`/user/${notification.data.username}`">{{ notification.data.username }}</router-link></strong>
                                {{ $t('text.notifications.comment.beforeComment') }}
                                <strong>
                                    <router-link 
                                        :to="{ 
                                        name: 'showVenue', 
                                        params: { id: notification.data.venue_id }, 
                                        query: { 
                                            comment: notification.data.comment_id, 
                                            review: notification.data.review_id 
                                        } 
                                        }"
                                    >
                                        {{ $t('text.notifications.comment.commentWord') }}
                                    </router-link>
                                </strong>
                                {{ $t('text.notifications.comment.betweenCommentAndCategory') }}
                                {{ notification.data.category_name }}
                                {{ $t('text.notifications.comment.betweenCategoryAndVenue') }}
                                <strong><router-link :to="`/venue/${notification.data.venue_title}`">{{ notification.data.venue_title }}</router-link></strong>
                                {{ $t('text.notifications.comment.afterVenue') }}
                            </template>


                            <!-- You can add more conditions for other types of notifications as needed -->
                        </span>
                    </li>
                </ul>

            </div>
            <div class="clearfix"></div>
            <div class="utf_pagination_container_part margin-top-30 margin-bottom-30">
                <nav v-if="paginationLinks.length" class="pagination">
                  <ul>
                      <li>
                        <a href="#" 
                          @click.prevent="changePage(currentPage - 1)" 
                          :class="{ 'disabled-arrow': currentPage === 1 }">
                            <font-awesome-icon :icon="['fas', 'arrow-left']" />
                        </a>
                      </li>
                      
                      <li v-if="currentPage > 3">
                          <a href="#" @click.prevent="changePage(1)">1</a>
                          <span>...</span>
                      </li>

                      <li v-for="page in getPageRange()" :key="page">
                          <a href="#" 
                            @click.prevent="changePage(page)" 
                            :class="{ 'current-page': currentPage === page }">
                              {{ page }}
                          </a>
                      </li>

                      <li v-if="currentPage < totalPages - 2">
                          <span>...</span>
                          <a href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
                      </li>

                      <li>
                        <a href="#" 
                          @click.prevent="changePage(currentPage + 1)"
                          :class="{ 'disabled-arrow': currentPage === totalPages }">
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </a>
                      </li>
                  </ul>
              </nav>
            </div>
            </div>
            <div class="col-md-12">
            <div class="footer_copyright_part">Copyright © 2021 All Rights Reserved.</div>
            </div>
        </div>
        </div>    
    </div>  
    </div>
</ProfileLayout>
</template>