<template>
      <div class="clearfix"></div>


    <div id="utf_listing_gallery_part" class="utf_listing_section">
    <Splide :options="options" aria-labelledby="My Favorite Images">
            <SplideSlide>
            <img src="https://images.squarespace-cdn.com/content/v1/571fc5edd210b89083925aba/1587497063492-3M55NJG231XKWL9PLFL2/Liam_Wong_Tokyo_Nights_Phone_Wallpapers_Cyberpunk_Blade_Runner_TOKYOO_TO_KY_OO_Japan_BookMinutes+To+Midnight.jpg?format=1000w" alt="Sample 1">
            </SplideSlide>
            <SplideSlide>
            <img src="https://images.squarespace-cdn.com/content/v1/571fc5edd210b89083925aba/1587497063492-3M55NJG231XKWL9PLFL2/Liam_Wong_Tokyo_Nights_Phone_Wallpapers_Cyberpunk_Blade_Runner_TOKYOO_TO_KY_OO_Japan_BookMinutes+To+Midnight.jpg?format=1000w" alt="Sample 2">
            </SplideSlide>
            <SplideSlide>
            <img src="https://images.squarespace-cdn.com/content/v1/571fc5edd210b89083925aba/1587497063492-3M55NJG231XKWL9PLFL2/Liam_Wong_Tokyo_Nights_Phone_Wallpapers_Cyberpunk_Blade_Runner_TOKYOO_TO_KY_OO_Japan_BookMinutes+To+Midnight.jpg?format=1000w" alt="Sample 2">
            </SplideSlide>
            <SplideSlide>
            <img src="https://images.squarespace-cdn.com/content/v1/571fc5edd210b89083925aba/1587497063492-3M55NJG231XKWL9PLFL2/Liam_Wong_Tokyo_Nights_Phone_Wallpapers_Cyberpunk_Blade_Runner_TOKYOO_TO_KY_OO_Japan_BookMinutes+To+Midnight.jpg?format=1000w" alt="Sample 2">
            </SplideSlide>
        </Splide>

    </div>
  <div class="container">
    <div class="row utf_sticky_main_wrapper">
          <div class="col-lg-8 col-md-8">
              <div id="titlebar" class="utf_listing_titlebar">
                  <div class="utf_listing_titlebar_title">
                    <h2 v-if="venue.category">{{ venue.title }}<span class="listing-tag">{{ venue.category['name_bg'] }}</span></h2>

                      <span>
                          <a href="#utf_listing_location" class="listing-address">
                              <i class="sl sl-icon-location"></i> The Ritz-Carlton, Hong Kong </a>
                      </span>
                      <span class="call_now">
                          <i class="sl sl-icon-phone"></i> (415) 796-3633 </span>
                      <div class="utf_star_rating_section" data-rating="4.5">
                          <div class="utf_counter_star_rating">(4.5) / (14 Reviews)</div>
                      </div>

                  </div>
              </div>
              <div id="utf_listing_overview" class="utf_listing_section">
                  <h3 class="utf_listing_headline_part margin-top-30 margin-bottom-30"></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam.</p>
                  <div id="utf_listing_tags" class="utf_listing_section listing_tags_section margin-bottom-10 margin-top-0">
                      <a href="#">
                          <i class="sl sl-icon-phone" aria-hidden="true"></i> +(01) 1123-254-456 </a>
                      <a href="#">
                          <i class="fa fa-envelope-o" aria-hidden="true"></i> info@example.com </a>
                      <a href="#">
                          <i class="sl sl-icon-globe" aria-hidden="true"></i> www.example.com </a>
                  </div>
                  <div class="social-contact">
                      <a href="#" class="facebook-link">
                          <i class="fa fa-facebook"></i> Facebook </a>
                      <a href="#" class="twitter-link">
                          <i class="fa fa-twitter"></i> Twitter </a>
                      <a href="#" class="instagram-link">
                          <i class="fa fa-instagram"></i> Instagram </a>
                      <a href="#" class="linkedin-link">
                          <i class="fa fa-linkedin"></i> Linkedin </a>
                      <a href="#" class="youtube-link">
                          <i class="fa fa-youtube-play"></i> Youtube </a>
                  </div>
              </div>
              <div id="utf_listing_tags" class="utf_listing_section listing_tags_section">
                  <h3 class="utf_listing_headline_part margin-top-30 margin-bottom-40">Listings Tags</h3>
                  <a href="#">
                      <i class="fa fa-tag" aria-hidden="true"></i> Food </a>
                  <a href="#">
                      <i class="fa fa-tag" aria-hidden="true"></i> Fruits </a>
                  <a href="#">
                      <i class="fa fa-tag" aria-hidden="true"></i> Lunch </a>
                  <a href="#">
                      <i class="fa fa-tag" aria-hidden="true"></i> Menu </a>
                  <a href="#">
                      <i class="fa fa-tag" aria-hidden="true"></i> Parking </a>
                  <a href="#">
                      <i class="fa fa-tag" aria-hidden="true"></i> Restaurant </a>
              </div>

              <div id="utf_listing_amenities" class="utf_listing_section">
                  <h3 class="utf_listing_headline_part margin-top-50 margin-bottom-40">Features</h3>
                    <ul class="utf_listing_features checkboxes margin-top-0">
                        <li v-for="feature in featuresWithCheckStatus" :key="feature.id" :class="{ 'feature-yes': feature.hasFeature, 'feature-no': !feature.hasFeature }">
                            {{ feature.name_bg }}
                        </li>
                    </ul>
              </div>
        <div id="utf_listing_location" class="utf_listing_section">
            <h3 class="utf_listing_headline_part margin-top-60 margin-bottom-40"></h3>
            <div id="utf_single_listing_map_block">
              <div id="utf_listing_location" class="col-md-12 utf_listing_section map">
                <leaflet-map v-if="venue && venue.lat && venue.lng" :lat="venue.lat" :lng="venue.lng"></leaflet-map>
              </div>
            </div>
          </div>
              <div id="utf_listing_reviews" class="utf_listing_section">
                  <h3 class="utf_listing_headline_part margin-top-75 margin-bottom-20">Reviews <span>(08)</span>
                  </h3>
                  <div class="clearfix"></div>

                  <div class="comments utf_listing_reviews">
                      <ul>
                          <li>
                              <div class="avatar">
                                  <img src="images/client-avatar1.jpg" alt="" />
                              </div>
                              <div class="utf_comment_content">
                                  <div class="utf_arrow_comment"></div>
                                  <div class="utf_star_rating_section" data-rating="5"></div>
                                  <a href="#" class="rate-review">Helpful Review <i class="fa fa-thumbs-up"></i>
                                  </a>
                                  <div class="utf_by_comment">Francis Burton <span class="date">
                                          <i class="fa fa-clock-o"></i> Jan 05, 2021 - 8:52 am </span>
                                  </div>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat.</p>
                              </div>
                          </li>

                      </ul>
                  </div>
                  <div class="clearfix"></div>
                  <div class="row">
                      <div class="col-md-12">
                          <div class="utf_pagination_container_part margin-top-30">
                              <nav class="pagination">
                                  <ul>
                                      <li>
                                          <a href="#">
                                              <i class="sl sl-icon-arrow-left"></i>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="#" class="current-page">1</a>
                                      </li>
                                      <li>
                                          <a href="#">2</a>
                                      </li>
                                      <li>
                                          <a href="#">3</a>
                                      </li>
                                      <li>
                                          <a href="#">
                                              <i class="sl sl-icon-arrow-right"></i>
                                          </a>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                  </div>
                  <div class="clearfix"></div>
              </div>
              <div id="utf_add_review" class="utf_add_review-box">
                    <h3 :style="authStateCheck ? '' : 'filter: blur(1px)'" class="utf_listing_headline_part margin-bottom-20 add_review_title">
                    {{ addReviewText }}
                    </h3>

                    <div v-if="!authStateCheck" class="disable_form_review_text">
                    <span>{{ reviewDisabledText }}</span>
                    <a :href="loginRoute" class="button">{{ loginNowText }}</a>
                    </div>
                <form id="addReview" class="utf_add_comment" enctype="multipart/form-data" action="" :style="authStateCheck ? '' : 'filter: blur(5px)'">
                  <div class="row">
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <div class="clearfix"></div>
                          <div class="utf_leave_rating margin-bottom-30">
                              <input type="radio" name="rating" id="rating-1" value="1" />
                              <label for="rating-1" class="fa fa-star"></label>
                              <input type="radio" name="rating" id="rating-2" value="2" />
                              <label for="rating-2" class="fa fa-star"></label>
                              <input type="radio" name="rating" id="rating-3" value="3" />
                              <label for="rating-3" class="fa fa-star"></label>
                              <input type="radio" name="rating" id="rating-4" value="4" />
                              <label for="rating-4" class="fa fa-star"></label>
                              <input type="radio" name="rating" id="rating-5" value="5" />
                              <label for="rating-5" class="fa fa-star"></label>
                          </div>
                          <div class="clearfix"></div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                          <div class="add-review-photos margin-bottom-30">
                              <div class="photoUpload">
                                  <span>Upload Photo <i class="sl sl-icon-arrow-up-circle"></i>
                                  </span>
                                  <input type="file" class="upload" />
                              </div>
                          </div>
                      </div>
                  </div>
                      <fieldset>
                          <div class="row">
                              <div class="col-md-4">
                                  <label>Name:</label>
                                  <input type="text" placeholder="Name" value="" />
                              </div>
                              <div class="col-md-4">
                                  <label>Email:</label>
                                  <input type="text" placeholder="Email" value="" />
                              </div>
                              <div class="col-md-4">
                                  <label>Subject:</label>
                                  <input type="text" placeholder="Subject" value="" />
                              </div>
                          </div>
                          <div>
                              <label>Review:</label>
                              <textarea cols="40" placeholder="Your Message..." rows="3"></textarea>
                          </div>
                      </fieldset>
                      <button class="button">Submit Review</button>
                      <div class="clearfix"></div>
                  </form>
              </div>
          </div>
          <!-- Sidebar -->

      </div>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import LeafletMap from '../common/LeafletMap.vue';
import axios from 'axios';

// Default theme
import '@splidejs/vue-splide/css';

export default {

    name: 'VenueComponent',

    components: { Splide, SplideSlide, LeafletMap },

    props: ["id"],

    setup() {
        const options = {
            rewind: true,
            gap   : '1rem',
            width: '100%',
            height: '600px'
        };

        return { options };
    },

    data() {
        return {
            venue: {}
        };
    },
    computed: {
        ...mapGetters({

        }),
        featuresWithCheckStatus() {
            if (!this.venue.category || !this.venue.category.features) {
                return [];
            }
            return this.venue.category.features.map(categoryFeature => {
                const hasFeature = this.venue.features.some(venueFeature => venueFeature.id === categoryFeature.id);
                return { ...categoryFeature, hasFeature };
            });
        },
            authStateCheck() {
                return this.$store.state.auth.authenticated;
            },
            addReviewText() {
                // replace this with your i18n or localization text function
                return "Add Review";
            },
            reviewDisabledText() {
                // replace this with your i18n or localization text function
                return "Add Review Disabled";
            },
            loginNowText() {
            // replace this with your i18n or localization text function
                return "Login Now";
            },
            loginRoute() {
                // replace this with your login route, make sure it's a string
                return "/login";
            },
    },
    mounted() {
        axios.get('https://preporuka.zhechev.eu/api/venues/' + this.id).then(({ data }) => {
            this.venue = data;
        })
        console.log(this.$t)
    }

}
</script>

