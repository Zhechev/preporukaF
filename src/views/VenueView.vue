<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { getVenue } from "@/services/venueService";
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/vue-splide/css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import VueEasyLightbox from 'vue-easy-lightbox';
import { createReviewForVenue } from "@/services/venueService";


const route = useRoute();
const store = useStore();
const splideRef = ref(null);
const VUE_APP_BASE_URL_STORAGE = process.env.VUE_APP_BASE_URL_STORAGE;

const isAuth = computed(() => store.getters['auth/authenticated'])

const venue = ref({});

const rating = ref(null);
const name = ref("");
const email = ref("");
const subject = ref("");
const content = ref("");
const fileUpload = ref(null);

const options = {
  rewind: true,
  gap: '1rem',
  width: '100%',
  height: '400px',
  type: 'loop',
  perPage: 1,
  perMove: 1,
  focus: 'center',
};

const visibleRef = ref(false);
const indexRef = ref(0);
const imgsRef = ref([
  { title: 'test img', 
    src: 'http://via.placeholder.com/350x150' },
  {
    title: 'test img 2',
    src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*',
  },
]);

const onShow = () => {
  visibleRef.value = true;
};

const showMultiple = (event) => {
  if (!event.target.classList.contains('splide__arrow')) {
    onShow();
  }
};

const onHide = () => (visibleRef.value = false);

const onSubmit = async () => {
    const formData = new FormData();
    formData.append('rating', rating.value);
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('subject', subject.value);
    formData.append('content', content.value);

    if (fileUpload.value?.files?.[0]) {
        formData.append('photo', fileUpload.value.files[0]);
    }

    try {
      await createReviewForVenue(venue.value.id, formData);
        // TODO: Handle success (show a message, redirect, etc.)
    } catch (error) {
        // TODO: Handle error (show error message, etc.)
    }
};

onMounted(async () => {
  // Fetch venue data and populate imgsRef
  venue.value = await getVenue(route.params.id);
  if (venue.value.images && Array.isArray(venue.value.images)) {
    imgsRef.value = venue.value.images.map(image => ({
      title: 'Venue Image',
      src: VUE_APP_BASE_URL_STORAGE + image.path,
    }));
  }

  // Set up Splide controls
  const controls = splideRef.value?.$el?.querySelectorAll('.splide__arrow');
  if (controls) {
    controls.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }
});

</script>



<template>
  <div class="clearfix"></div>

  <div id="utf_listing_gallery_part" class="utf_listing_section">
    <Splide :options="options" ref="splideRef">
      <SplideSlide v-for="(img, index) in imgsRef" :key="index">
        <img
          class="listing_gallery_img"
          :src="img.src"
          :alt="'Sample ' + (index + 1)"
          @click="showMultiple($event, index)"
        />
      </SplideSlide>
    </Splide>
  </div>

  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    :index="indexRef"
    @hide="onHide"
  ></vue-easy-lightbox>
  <div class="container">
    <div class="row utf_sticky_main_wrapper">
      <div class="col-lg-8 col-md-8">
        <div id="titlebar" class="utf_listing_titlebar">
          <div class="utf_listing_titlebar_title">
            <h2 v-if="venue.category">
              {{ venue.title
              }}<span class="listing-tag">{{ venue.category["name_bg"] }}</span>
            </h2>

            <span>
              <a href="#utf_listing_location" class="listing-address">
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'location-pin']" /></span
                >The Ritz-Carlton, Hong Kong
              </a>
            </span>
            <span class="call_now">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'phone']"
              /></span>
              (415) 796-3633
            </span>
            <div class="utf_star_rating_section" data-rating="4.5">
              <div class="utf_counter_star_rating">(4.5) / (14 Reviews)</div>
            </div>
          </div>
        </div>
        <div id="utf_listing_overview" class="utf_listing_section">
          <h3
            class="utf_listing_headline_part margin-top-30 margin-bottom-30"
          ></h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
            pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur
            nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi
            tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam
            sed aliquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
            pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur
            nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi
            tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam
            sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum
            facilisis massa, a consequat purus viverra.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
            pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur
            nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi
            tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam
            sed aliquam.
          </p>
          <div
            id="utf_listing_tags"
            class="utf_listing_section listing_tags_section margin-bottom-10 margin-top-0"
          >
            <a href="#">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'phone']"
              /></span>
              +(01) 1123-254-456
            </a>
            <a href="#">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'envelope']" /></span
              >info@example.com
            </a>
            <a href="#">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'globe']"
              /></span>
              www.example.com
            </a>
          </div>
          <div class="social-contact">
            <a href="#" class="facebook-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'facebook']" /></span
              >Facebook
            </a>
            <a href="#" class="twitter-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'twitter']"
              /></span>
              Twitter
            </a>
            <a href="#" class="instagram-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'instagram']"
              /></span>
              Instagram
            </a>
            <a href="#" class="linkedin-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'linkedin']"
              /></span>
              Linkedin
            </a>
            <a href="#" class="youtube-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'youtube']"
              /></span>
              Youtube
            </a>
          </div>
        </div>
        <div
          id="utf_listing_tags"
          class="utf_listing_section listing_tags_section"
        >
          <h3 class="utf_listing_headline_part margin-top-30 margin-bottom-40">
            Listings Tags
          </h3>
          <a href="#">
            <span class="i"><font-awesome-icon :icon="['fas', 'tag']" /></span
            >Food
          </a>
          <a href="#">
            <span class="i"><font-awesome-icon :icon="['fas', 'tag']" /></span>
            Fruits
          </a>
          <a href="#">
            <span class="i"><font-awesome-icon :icon="['fas', 'tag']" /></span>
            Lunch
          </a>
          <a href="#">
            <span class="i"><font-awesome-icon :icon="['fas', 'tag']" /></span>
            Menu
          </a>
          <a href="#">
            <span class="i"><font-awesome-icon :icon="['fas', 'tag']" /></span>
            Parking
          </a>
          <a href="#">
            <span class="i"><font-awesome-icon :icon="['fas', 'tag']" /></span>
            Restaurant
          </a>
        </div>

        <div id="utf_listing_amenities" class="utf_listing_section">
          <h3 class="utf_listing_headline_part margin-top-50 margin-bottom-40">
            Features
          </h3>
          <ul class="utf_listing_features checkboxes margin-top-0">
            <li
              v-for="feature in featuresWithCheckStatus"
              :key="feature.id"
              :class="{
                'feature-yes': feature.hasFeature,
                'feature-no': !feature.hasFeature,
              }"
            >
              {{ feature.name_bg }}
            </li>
          </ul>
        </div>
        <div id="utf_listing_location" class="utf_listing_section">
          <h3
            class="utf_listing_headline_part margin-top-60 margin-bottom-40"
          ></h3>
          <div id="utf_single_listing_map_block">
            <div
              id="utf_listing_location"
              class="col-md-12 utf_listing_section map"
            >
              <leaflet-map
                v-if="venue && venue.lat && venue.lng"
                :lat="venue.lat"
                :lng="venue.lng"
                :zoom="13"
              ></leaflet-map>
            </div>
          </div>
        </div>
        <div id="utf_listing_reviews" class="utf_listing_section">
          <h3 class="utf_listing_headline_part margin-top-75 margin-bottom-20">
            Reviews <span>(08)</span>
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
                  <div class="utf_star_rating_section" data-rating="4">
                    <span class="star"><font-awesome-icon :icon="['fas', 'star']" /></span>
                    <span class="star"><font-awesome-icon :icon="['fas', 'star']" /></span>
                    <span class="star"><font-awesome-icon :icon="['fas', 'star']" /></span>
                    <span class="star"><font-awesome-icon :icon="['fas', 'star']" /></span>
                    <span class="star empty"><font-awesome-icon :icon="['fas', 'star']" /></span>
                  </div>
                  <a href="#" class="rate-review"
                    >Helpful Review
                    <font-awesome-icon :icon="['fas', 'thumbs-up']"
                  /></a>
                  <div class="utf_by_comment">
                    Francis Burton
                    <span class="date"
                      ><font-awesome-icon :icon="['fas', 'clock']" /> Jan 05,
                      2021 - 8:52 am</span
                    >
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.
                    Donec a consectetur nulla. Nulla posuere sapien vitae lectus
                    suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat.
                  </p>
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
                      <a href="#"
                        ><font-awesome-icon :icon="['fas', 'arrow-left']"
                      /></a>
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
                      <a href="#"
                        ><font-awesome-icon :icon="['fas', 'arrow-right']"
                      /></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div id="utf_add_review" class="utf_add_review-box">
          <h3
            :style="isAuth ? '' : 'filter: blur(1px)'"
            class="utf_listing_headline_part margin-bottom-20 add_review_title"
          >
            Add review
          </h3>
          <span class="utf_leave_rating_title">Your email address will not be published.</span>

          <div v-if="!isAuth" class="disable_form_review_text">
            <span>{{ reviewDisabledText }}</span>
            <a :href="loginRoute" class="button">{{ loginNowText }}</a>
          </div>
          <form
            id="addReview"
            class="utf_add_comment"
            enctype="multipart/form-data"
            action=""
            :style="isAuth ? '' : 'filter: blur(5px)'"
            @submit.prevent="onSubmit"
          >
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="clearfix"></div>
                <div class="utf_leave_rating margin-bottom-30">
                  <input type="radio" name="rating" id="rating-1" value="1" />
                  <label for="rating-1"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-2" value="2" />
                  <label for="rating-2"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-3" value="3" />
                  <label for="rating-3"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-4" value="4" />
                  <label for="rating-4"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-5" value="5" />
                  <label for="rating-5"><font-awesome-icon :icon="['fas', 'star']" /></label>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="add-review-photos margin-bottom-30">
                  <div class="photoUpload">
                    Upload Photo
                    <span class="i">
                      <font-awesome-icon :icon="['fas', 'circle-arrow-up']"
                    /></span>
                    <input type="file" class="upload" ref="fileUpload"/>
                  </div>
                </div>
              </div>
            </div>
            <fieldset>
              <div class="row">
                <div class="col-md-4">
                  <label>Name:</label>
                  <input type="text" placeholder="Name" v-model="name"/>
                </div>
                <div class="col-md-4">
                  <label>Email:</label>
                  <input type="text" placeholder="Email" v-model="email"/>
                </div>
                <div class="col-md-4">
                  <label>Subject:</label>
                  <input type="text" placeholder="Subject" v-model="subject"/>
                </div>
              </div>
              <div>
                <label>Review:</label>
                <textarea
                  cols="40"
                  placeholder="Your Message..."
                  rows="3"
                  v-model="content"
                ></textarea>
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