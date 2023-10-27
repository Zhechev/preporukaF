<script setup>
// 1. Imports
import LeafletMap from "@/components/common/LeafletMap.vue";
import ReviewCommentComponent from '@/components/ReviewCommentComponent.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getVenue, getVenueReviews, createReviewForVenue } from "@/services/venueService";
import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/vue-splide/css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import VueEasyLightbox from 'vue-easy-lightbox';
import { Form, Field, ErrorMessage } from 'vee-validate';
import {
  required as requiredRule,
} from "@vee-validate/rules";
import { useI18n } from "vue-i18n";
import MessagePopup from '@/components/common/MessagePopup.vue';

// 2. Component setup
const route = useRoute();
const store = useStore();
const VUE_APP_BASE_URL_STORAGE = process.env.VUE_APP_BASE_URL_STORAGE;
const { t } = useI18n();

// 3. Component props, refs, reactive variables
const splideRef = ref(null);
const formRef = ref(null);
const venue = ref({});
const rating = ref(null);
const content = ref("");
const fileUpload = ref(null);
const savingSuccessful = ref(false);
const visibleRef = ref(false);
const indexRef = ref(0);
const imgsRef = ref([
  { title: 'test img', src: 'http://via.placeholder.com/350x150' },
  { title: 'test img 2', src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*' },
]);
const categoryFeatures = ref([]);
const reviews = ref([]);
const reviewsPagination = ref({});

// 4. Computed properties
const isAuth = computed(() => store.getters['auth/authenticated']);

// 5. Methods
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

const isRequired = (value) => {
  if (!requiredRule(value)) {
    return t("validation.required");
  }

  return true;
};

const fetchReviews = async (page = 1) => {
    const reviewData = await getVenueReviews(route.params.id, page);
    reviews.value = reviewData.data;
    reviewsPagination.value = reviewData;
};

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

const formatReviewDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// 6. Lifecycle hooks
onMounted(async () => {

  const commentElement = document.getElementById(`comment-16`);


  console.log(commentElement);

  venue.value = await getVenue(route.params.id);
  if (venue.value.images && Array.isArray(venue.value.images)) {
    imgsRef.value = venue.value.images.map(image => ({
      title: 'Venue Image',
      src: VUE_APP_BASE_URL_STORAGE + image.path,
    }));
  }

  const controls = splideRef.value?.$el?.querySelectorAll('.splide__arrow');
  if (controls) {
    controls.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  await fetchReviews();

  // get features
  let venueFeatures = venue.value.features;
  let categoryFeaturesValue = venue.value.category.features;

  for (const venueFeature of venueFeatures) {
    const matchingFeature = categoryFeaturesValue.find(catF => catF.id === venueFeature.id);

    if (matchingFeature) {
      matchingFeature.hasFeature = true;
    }
  }

  categoryFeatures.value = categoryFeaturesValue;
});

// replay comments show/hide
const toggleComments = (review) => {
    review.showComments = !review.showComments;
}

// Popup
watch ( savingSuccessful, () => {
    document.body.style.overflow = savingSuccessful.value ? "hidden" : "auto"
    document.body.style.backgroundColor = savingSuccessful.value ? "background-color:rgba(0,0,0,0.8)" : "none"
})
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
          > {{ $t("text.description") }}
          </h3>
          <p>
            {{ venue["content_" + $i18n.locale] }}
          </p>
          <div
            id="utf_listing_tags"
            class="utf_listing_section listing_tags_section margin-bottom-10 margin-top-0"
          >
            <a href="#">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'phone']"
              /></span>
              {{ venue.phone}}
            </a>
            <a href="#">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'envelope']" /></span
              >{{ venue.email }}
            </a>
            <a href="#">
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'globe']"
              /></span>
              {{ venue.website }}
            </a>
          </div>
          <div class="social-contact">
            <a :href="venue.facebook" class="facebook-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'facebook']" /></span
              >Facebook
            </a>
            <a :href="venue.instagram" class="instagram-link">
              <span class="i"
                ><font-awesome-icon :icon="['fab', 'instagram']"
              /></span>
              Instagram
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
            {{ $t("text.features") }}
          </h3>
          <ul class="utf_listing_features checkboxes margin-top-0">
            <li
              v-for="feature in categoryFeatures"
              :key="feature.id"
              :class="{
                'feature-yes': feature.hasFeature,
                'feature-no': !feature.hasFeature,
              }"
            >
              <span v-if="feature.hasFeature" class="i"><font-awesome-icon :icon="['fas', 'circle-check']" /></span>
              <span v-else class="i"><font-awesome-icon :icon="['fas', 'circle-xmark']" /></span>
              {{ feature["name_" + $i18n.locale] }}
            </li>
          </ul>
        </div>
        <div id="utf_listing_location" class="utf_listing_section">
          <h3
            class="utf_listing_headline_part margin-top-60 margin-bottom-40"
          >{{ $t("text.location") }}</h3>
          <div id="utf_single_listing_map_block">
            <div
              id="utf_listing_location"
              class="col-md-12 utf_listing_section map"
            >
              <leaflet-map
                ref="map"
                v-if="venue.lat && venue.lng"
                :lat="parseFloat(venue.lat)"
                :lng="parseFloat(venue.lng)"
                :zoom="25"
                :interactive="true"
                style="z-index: 1"
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
              <li v-for="review in reviews" :key="review.id">
                <div class="avatar">
                  <img src="images/client-avatar1.jpg" alt="" />
                </div>
                <div class="utf_comment_content">
                  <div class="utf_arrow_comment"></div>
                  <div class="utf_star_rating_section" :data-rating="review.rating">
                    <template v-for="star in 5">
                      <span class="star" v-if="star <= review.rating" :key="'full-' + star">
                        <font-awesome-icon :icon="['fas', 'star']" />
                      </span>
                      <span class="star empty" v-else :key="'empty-' + star">
                        <font-awesome-icon :icon="['fas', 'star']" />
                      </span>
                    </template>
                  </div>
                  <a href="#" class="rate-review"
                    >Helpful Review
                    <font-awesome-icon :icon="['fas', 'thumbs-up']"
                  /></a>
                  <div class="utf_by_comment">
                    {{ review.user.name }}
                    <span class="date"
                      ><font-awesome-icon :icon="['fas', 'clock']" /> 
                      {{ formatReviewDate(review.created_at) }}
                      </span>
                      <p>
                        {{ review.content }}
                      </p>
                      <div class="utf_add_comment">
                        <button @click="toggleComments(review)" class="replay"><font-awesome-icon :icon="['fas', 'reply']" /> Replay</button>
                        <review-comment-component :review-id="review.id" :key="review.id"></review-comment-component>
                      </div>
                  </div>
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
                      <a href="#" @click.prevent="fetchReviews(reviewsPagination.current_page - 1)"
                        ><font-awesome-icon :icon="['fas', 'arrow-left']"
                      /></a>
                    </li>
                    <li v-for="n in reviewsPagination.last_page" :key="n">
                      <a href="#" @click.prevent="fetchReviews(n)" :class="{ 'current-page': n === reviewsPagination.current_page }">{{ n }}</a>
                    </li>
                    <li>
                      <a href="#" @click.prevent="fetchReviews(reviewsPagination.current_page + 1)"
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
            <span>Add Review Disabled</span>
            <a :href="loginRoute" class="button">Login now</a>
          </div>
          <Form
            ref="formRef"
            id="addReview"
            class="utf_add_comment"
            enctype="multipart/form-data"
            action=""
            :style="isAuth ? '' : 'filter: blur(5px); pointer-events: none;'"
            v-if="!savingSuccessful"
            @submit="onSubmit"
          >
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="clearfix"></div>
                <div class="utf_leave_rating margin-bottom-30">
                  <input type="radio" name="rating" id="rating-1" value="5" v-model="rating" :disabled="!isAuth" />
                  <label for="rating-1"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-2" value="4" v-model="rating" :disabled="!isAuth" />
                  <label for="rating-2"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-3" value="3" v-model="rating" :disabled="!isAuth" />
                  <label for="rating-3"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-4" value="2" v-model="rating" :disabled="!isAuth" />
                  <label for="rating-4"><font-awesome-icon :icon="['fas', 'star']" /></label>
                  <input type="radio" name="rating" id="rating-5" value="1" v-model="rating" :disabled="!isAuth" />
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
                    <input type="file" class="upload" ref="fileUpload" :disabled="!isAuth" />
                  </div>
                </div>
              </div>
            </div>
            <fieldset>
              <div>
                <label>Review:</label>
                <Field
                  as="textarea"
                  name="content"
                  cols="40"
                  placeholder="Your Message..."
                  rows="3"
                  v-model="content"
                  :rules="isRequired"
                />
                <ErrorMessage name="content_bg" />
              </div>
            </fieldset>
            <button class="button" :disabled="!isAuth" >Submit Review</button>
            <div class="clearfix"></div>
            <MessagePopup v-if="savingSuccessful"/>
          </Form>
        </div>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
</template>