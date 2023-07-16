<template>
  <div id="main_wrapper">
    <form action="" id="add_venue_form" enctype="multipart/form-data" method="POST">
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
                    <i class="sl sl-icon-tag"></i><font-awesome-icon :icon="['fas', 'tag']" />category title
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="col-md-6">
                    <h5>text title</h5>
                    <input v-model="title" type="text" class="search-field" name="title" id="title" placeholder="text title">
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-map"></i> location
                  </h3>
                </div>
                <div class="utf_submit_section">
                  <div class="row with-forms">
                    <div class="col-md-6">
                      <h5>text city</h5>
                      <div class="intro-search-field utf-chosen-cat-single" id="city_id_div">
                        <select v-if="cities && cities.length > 0" @change="selectCity($event)" class="" name="city_id" data-selected-text-format="count" data-size="7" title="Изберете град" id="city_id">
                          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city['name_' + $i18n.locale] }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h5>address</h5>
                      <input v-model="address" type="text" class="input-text" name="address" id="address" placeholder="address">
                    </div>
                    <div id="utf_listing_location" class="col-md-12 utf_listing_section map">
                      <leaflet-map :lat="selectedCityLat" :lng="selectedCityLng" :zoom="zoom" :interactive=true></leaflet-map>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-picture"></i> images
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="utf_submit_section col-md-6">
                    <h4>cover image</h4>
                    <input ref="coverImage" type="file" name="coverImage" />
                  </div>
                  <div class="utf_submit_section col-md-6">
                    <h4>other images</h4>
                    <input ref="otherImages" type="file" name="images[]" multiple/>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-list"></i> content
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="col-md-6">
                    <h5>phone</h5>
                    <input v-model="phone" type="text" name="phone" id="phone" placeholder="phone">
                  </div>
                  <div class="col-md-6">
                    <h5>Email</h5>
                    <input v-model="email" type="text" name="email" id="email" placeholder="Email">
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
                    <h5>description bg</h5>
                    <textarea v-model="content_bg" name="content_bg" cols="40" rows="3" id="content_bg" placeholder="content..." spellcheck="true"></textarea>
                  </div>
                  <div class="col-md-12">
                    <h5>description en</h5>
                    <textarea v-model="content_en" name="content_en" cols="40" rows="3" id="content_en" placeholder="content..." spellcheck="true"></textarea>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-tag"></i> Add Pricing
                  </h3>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <table id="utf_pricing_list_section">
                      <tbody class="ui-sortable">
                        <tr class="pricing-list-item pattern ui-sortable-handle">
                          <td>
                            <div class="fm-move">
                              <i class="sl sl-icon-cursor-move"></i>
                            </div>
                            <div class="fm-input pricing-name">
                              <input type="text" placeholder="Title">
                            </div>
                            <div class="fm-input pricing-ingredients">
                              <input type="text" placeholder="Description">
                            </div>
                            <div class="fm-input pricing-price">
                              <i class="data-unit">$</i>
                              <input type="text" placeholder="Price" data-unit="$">
                            </div>
                            <div class="fm-close">
                              <a class="delete" href="#">
                                <i class="fa fa-remove"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" class="button add-pricing-list-item">Add Item</a>
                    <a href="#" class="button add-pricing-submenu">Add Category</a>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-clock"></i> Opening hours
                  </h3>
                </div>
                <div class="switcher-content">
                  <div class="row utf_opening_day utf_js_demo_hours">
                    <div class="col-md-2">
                      <h5>Monday :-</h5>
                    </div>
                    <div class="col-md-5">
                      <select class="utf_chosen_select" data-placeholder="Open Time"></select>
                    </div>
                    <div class="col-md-5">
                      <select class="utf_chosen_select" data-placeholder="Close Time"></select>
                    </div>
                  </div>
                  <!-- Rest of the opening hours rows -->
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <i class="sl sl-icon-tag"></i> Add Pricing
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
              <button class="button preview" @click.prevent="submitForm">
                <i class="fa fa-arrow-circle-right"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeafletMap from '../common/LeafletMap.vue';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


export default {
  name: 'CreateVenueComponent',

  components: { LeafletMap },

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
      content_en: ''
    }
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
      console.log(this.selectedCity);
    },

    submitForm() {
      let formData = new FormData();

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
  }
}
</script>
    