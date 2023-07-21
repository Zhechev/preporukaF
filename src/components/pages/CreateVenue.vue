<template>
  <div id="main_wrapper">
    <Form action="" id="add_venue_form" enctype="multipart/form-data" method="POST" @submit="submitForm">
      <input type="hidden" name="lat" value="" id="lat" />
      <input type="hidden" name="lng" value="" id="lng" />
      <input type="hidden" name="category_id" value="" />
      <div class="container margin-bottom-75">
        <div class="row">
          <div class="col-lg-12">
            <div id="utf_add_listing_part">
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-tag"></i><font-awesome-icon :icon="['fas', 'tag']" />{{ $t('text.venue_title') }}
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="col-md-6">
                    <h5>{{ $t('text.title') }}</h5>
                    <Field v-model="title" type="text" class="search-field" name="title" id="title" :placeholder="$t('text.title')" />
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-map"></i>{{ $t('text.location') }}
                  </h3>
                </div>
                <div class="utf_submit_section">
                  <div class="row with-forms">
                    <div class="col-md-6">
                      <h5>{{ $t('text.city') }}</h5>
                      <div class="intro-search-field utf-chosen-cat-single" id="city_id_div">
                        <select v-if="cities && cities.length > 0" @change="selectCity($event)" class="" name="city_id" data-selected-text-format="count" data-size="7" :title="$t('text.venue_title')" id="city_id">
                          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city['name_' + $i18n.locale] }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h5>{{ $t('text.address') }}</h5>
                      <input v-model="address" type="text" class="input-text" name="address" id="address" :placeholder="$t('text.address')">
                    </div>
                    <div id="utf_listing_location" class="col-md-12 utf_listing_section map">
                      <leaflet-map ref="map" :lat="selectedCityLat" :lng="selectedCityLng" :zoom="zoom" :interactive=true></leaflet-map>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-picture"></i>{{ $t('text.photos') }}
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="utf_submit_section col-md-6">
                    <h4>{{ $t('text.cover_photo') }}</h4>
                    <input ref="coverImage" type="file" name="coverImage" />
                  </div>
                  <div class="utf_submit_section col-md-6">
                    <h4>{{ $t('text.other_photos') }}</h4>
                    <input ref="otherImages" type="file" name="images[]" multiple/>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-list"></i>{{ $t('text.content') }}
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="col-md-6">
                    <h5>{{ $t('text.phone') }}</h5>
                    <input v-model="phone" type="text" name="phone" id="phone" :placeholder="$t('text.phone')">
                  </div>
                  <div class="col-md-6">
                    <h5>E-mail</h5>
                    <Field v-model="email" type="text" class="search-field" name="email" id="email" placeholder="E-mail" :rules="validateEmail" />
                    <ErrorMessage name="email" />
                  </div>
                  <div class="col-md-6">
                    <h5>Website</h5>
                    <input v-model="website" type="text" name="website" placeholder="Website">
                  </div>
                  <div class="col-md-6">
                    <h5>Facebook</h5>
                    <input v-model="facebook" type="text" name="facebook" placeholder="Facebook">
                  </div>
                  <div class="col-md-6">
                    <h5>Instagram</h5>
                    <input v-model="instagram" type="text" name="instagram" placeholder="Instagram">
                  </div>
                  <div class="col-md-12">
                    <h5>{{ $t('text.description_bg') }}</h5>
                    <textarea v-model="content_bg" name="content_bg" cols="40" rows="3" id="content_bg" :placeholder="$t('text.description_bg')" spellcheck="true"></textarea>
                  </div>
                  <div class="col-md-12">
                    <h5>{{ $t('text.description_en') }}</h5>
                    <textarea v-model="content_en" name="content_en" cols="40" rows="3" id="content_en" :placeholder="$t('text.description_en')" spellcheck="true"></textarea>
                  </div>
                </div>
              </div>

              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3><i class="sl sl-icon-clock"></i>{{ $t('text.work_time') }}</h3>
                </div>

                <div class="switcher-content">
                  <div class=row>
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-4">
                      <h5>{{ $t('text.оpening_hours') }}:</h5>
                    </div>
                    <div class="col-md-4">
                      <h5>{{ $t('text.closing_hours') }}:</h5>
                    </div>
                  </div>
                  <div class="row utf_opening_day utf_js_demo_hours" v-for="(time, index) in openingHours" :key="index">
                    <div class="col-md-2">
                      <h5>{{time.dayName}} :-</h5>
                    </div>
                    <div class="col-md-2">
                      <select class="utf_chosen_select" v-model="time.openHour">
                        <option v-for="hour in hours" :key="hour" :value="hour">{{hour}}</option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <select class="utf_chosen_select" v-model="time.openMinute">
                        <option v-for="minute in minutes" :key="minute" :value="minute">{{minute}}</option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <select class="utf_chosen_select" v-model="time.closeHour">
                        <option v-for="hour in hours" :key="hour" :value="hour">{{hour}}</option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <select class="utf_chosen_select" v-model="time.closeMinute">
                        <option v-for="minute in minutes" :key="minute" :value="minute">{{minute}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-tag"></i>{{ $t('text.features') }}
                  </h3>
                </div>
                <div class="checkboxes in-row amenities_checkbox">
                  <ul>
                    <li v-for="feature in getCategoryFeatures()" :key="feature.id">
                      <input :id="'input-feature' + feature.id" type="checkbox" name="check" :value="feature.id">
                      <label :for="'input-feature' + feature.id">{{ feature['name_' + $i18n.locale] }}</label>
                    </li>
                  </ul>
                </div>
              </div>
              <button class="button preview">
                <i class="fa fa-arrow-circle-right"></i>{{ $t('text.save') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeafletMap from '../common/LeafletMap.vue';
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


export default {
  name: 'CreateVenueComponent',

  components: { LeafletMap, Form, Field, ErrorMessage },

  props: ['id'],

  data() {
    return {
      selectedCity: null,
      zoom: 7,
      title: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
      content_bg: '',
      content_en: '',
    }
  },

  setup() {
    const { t, locale } = useI18n();
    const days = computed(() => ({
      1: t('text.monday'),
      2: t('text.tuesday'),
      3: t('text.wednesday'),
      4: t('text.thursday'),
      5: t('text.friday'),
      6: t('text.saturday'),
      7: t('text.sunday')
    }));
    
    const hours = Array.from({length: 24}, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'));

    const openingHours = computed(() => {
      return Object.entries(days.value).map(entry => ({ 
        day: entry[0], 
        dayName: days.value[entry[0]], 
        openHour: '00', 
        openMinute: '00', 
        closeHour: '00', 
        closeMinute: '00' 
      }));
    });
    
    return {
      days,
      hours,
      minutes,
      openingHours,
      locale
    };
  },

  methods: {
    getCategoryFeatures() {
      let category = this.categories.find(category => category.id == this.id);
      return category.features;
    },
    selectCity(event) {
      let selectedCityId = event.target.value;
      this.selectedCity = this.cities.find(city => city.id === Number(selectedCityId));
      this.zoom = 13; // change the zoom level when a city is selected
    },

    submitForm() {
      let formData = new FormData();

      const lat = this.selectedCityLat;
      const lng = this.selectedCityLng;

      // populate formData with form inputs
      formData.append('title', this.title);
      formData.append('address', this.address);
      formData.append('city_id', this.selectedCity.id);
      formData.append('phone', this.phone);
      formData.append('email', this.email);
      formData.append('website', this.website);
      formData.append('facebook', this.facebook);
      formData.append('instagram', this.instagram);
      formData.append('content_bg', this.content_bg);
      formData.append('content_en', this.content_en);
      formData.append('category_id', this.id);
      formData.append('user_id', this.user.id);
      formData.append('openingHours', JSON.stringify(this.openingHours));
      formData.append('lat', lat);
      formData.append('lng', lng);

      // add cover image to formData
      let coverImageFile = this.$refs.coverImage.files[0];
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      }

      // add other images to formData
      let otherImagesFiles = this.$refs.otherImages.files;
      if (otherImagesFiles) {
        for (let i = 0; i < otherImagesFiles.length; i++) {
          formData.append('images[]', otherImagesFiles[i]);
        }
      }

      let selectedFeatures = [];
      document.querySelectorAll('input[name="check"]:checked').forEach(checkbox => {
        selectedFeatures.push(checkbox.value);
      });
      // Add the selected features to formData
      formData.append('features', selectedFeatures);

      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
      }
      alert(1);

      // API call
      axios.post('http://localhost:8000/api/venues', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          console.log(response);
          // redirect to the new venue page, if needed
      })
      .catch(error => {
          console.log(error);
      });
    },

    validateEmail(value) {
      if (!value) {
        return this.$t('validation.required');
      }

      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return this.$t('validation.email');
      }

      return true;
    },
  },

  computed: {
    ...mapGetters({
      categories: 'categories/categories',
      cities: 'cities/cities',
      user: 'auth/user' // add this line
    }),
        userId() {
      return this.user.id;
    },
    selectedCityLat() {
      return this.selectedCity ? this.selectedCity.lat : 42.7249925;  // return default lat if no city is selected
    },

    selectedCityLng() {
      return this.selectedCity ? this.selectedCity.lng : 25.4833039;  // return default lng if no city is selected
    },
  },

  mounted() {
    this.selectedCity = this.cities[0]
    console.log(this.openingHours);
  }
}
</script>
    