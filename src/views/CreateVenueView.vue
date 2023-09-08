<script setup>
import { useStore } from "vuex";
import LeafletMap from "../components/common/LeafletMap.vue";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import {
  required as requiredRule,
  email as emailRule,
} from "@vee-validate/rules";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { createVenue } from "@/services/venueService";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const { t, locale } = useI18n();
const store = useStore();
const selectedCategoryId = ref(1);
const zoom = ref(7);
const title = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const website = ref("");
const facebook = ref("");
const instagram = ref("");
const content_bg = ref("");
const content_en = ref("");
const formRef = ref(null);
const selectedFeatures = ref([]);
const selectedCity = ref("");
const coverImageFile = ref(null); // Define a ref for the input element
const otherImagesFiles = ref(null);

const categories = computed(() => store.getters["categories/categories"]);
const cities = computed(() => store.getters["cities/cities"]);
const selectedCityLat = computed(() =>
  selectedCity.value && selectedCity.value.lat
    ? selectedCity.value.lat
    : 42.7249925
);
const selectedCityLng = computed(() =>
  selectedCity.value && selectedCity.value.lng
    ? selectedCity.value.lng
    : 25.4833039
);
const user = computed(() => store.getters["auth/user"]);

const days = computed(() => ({
  1: t("text.monday"),
  2: t("text.tuesday"),
  3: t("text.wednesday"),
  4: t("text.thursday"),
  5: t("text.friday"),
  6: t("text.saturday"),
  7: t("text.sunday"),
}));

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

const openingHours = computed(() =>
  Object.entries(days.value).map((entry) => ({
    day: entry[0],
    dayName: days.value[entry[0]],
    openHour: "00",
    openMinute: "00",
    closeHour: "00",
    closeMinute: "00",
  }))
);

const categoryFeatures = computed(() => {
  let category = categories.value.find(
    (category) => category.id == selectedCategoryId.value
  );
  return category ? category.features : [];
});

const selectCity = (city) => {
  selectedCity.value = city;
  zoom.value = 13;
};

const getCategoryName = (category) => {
  return category["category_name_" + locale.value] || "";
};

const getCategoryNameById = (id) => {
  const category = categories.value.find((cat) => cat.id === id);
  return category ? getCategoryName(category) : "";
};

const submitForm = async () => {
  let formData = new FormData();

  const lat = selectedCity.value ? selectedCity.value.lat : 42.7249925;
  const lng = selectedCity.value ? selectedCity.value.lng : 25.4833039;

  // populate formData with form inputs
  formData.append("title", title.value);
  formData.append("address", address.value);
  formData.append("city_id", selectedCity.value.id);
  formData.append("phone", phone.value);
  formData.append("email", email.value);
  formData.append("website", website.value);
  formData.append("facebook", facebook.value);
  formData.append("instagram", instagram.value);
  formData.append("content_bg", content_bg.value);
  formData.append("content_en", content_en.value);
  formData.append("category_id", selectedCategoryId.value);
  formData.append("user_id", user.value.id);
  formData.append("openingHours", JSON.stringify(openingHours.value));
  formData.append("lat", lat);
  formData.append("lng", lng);

  if (coverImageFile.value && coverImageFile.value.files[0]) {
    formData.append("coverImage", coverImageFile.value.files[0]);
  } 

  // add other images to formData

  if (otherImagesFiles.value && otherImagesFiles.value.files) {
    for (let i = 0; i < otherImagesFiles.value.files.length; i++) {
      formData.append("images[]", otherImagesFiles.value.files[i]);
    }
  }

  let selectedFeatures = [];
  document
    .querySelectorAll('input[name="check"]:checked')
    .forEach((checkbox) => {
      selectedFeatures.push(checkbox.value);
    });
  // Add the selected features to formData
  formData.append("features", selectedFeatures);

  try {
    const response = await createVenue(formData);
    console.log(response);
    // redirect to the new venue page, if needed
  } catch (error) {
    console.log(error);
  }
};

const validateEmail = (value) => {
  if (!requiredRule(value)) {
    return t("validation.required");
  }

  if (!emailRule(value)) {
    return t("validation.email");
  }

  return true;
};

const validateCategory = (value) => {
  return !!value || t("validation.choose_category");
};

const isRequired = (value) => {
  if (!requiredRule(value)) {
    return t("validation.required");
  }

  return true;
};

const checkErrors = async () => {
  const result = await formRef.value.validate();

  if (!result.valid) {
    const firstErrorField = Object.keys(result.errors)[0];
    let errorElement;

    if (firstErrorField === "category") {
      // This handles the special case where the error is on the hidden category input.
      // Here, we scroll to the dropdown associated with this input.
      errorElement = document.querySelector("#dropdownCategory");
    } else {
      errorElement = document.querySelector(`[name="${firstErrorField}"]`);
    }

    if (errorElement) {
      errorElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
  return result;
};
</script>

<template>
  <div id="main_wrapper">
    <Form ref="formRef" @submit="submitForm">
      <input type="hidden" name="lat" :value="selectedCityLat" id="lat" />
      <input type="hidden" name="lng" :value="selectedCityLng" id="lng" />
      <input type="hidden" name="category_id" value="" />
      <div class="container margin-bottom-75">
        <div class="row">
          <div class="col-lg-12">
            <div id="utf_add_listing_part">
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <span class="i"
                      ><font-awesome-icon :icon="['fas', 'tag']" /></span
                    >{{ $t("text.venue_title") }}
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="col-md-6">
                    <h5>{{ $t("text.title") }}</h5>
                    <Field
                      v-model="title"
                      type="text"
                      class="search-field"
                      name="title"
                      id="title"
                      :placeholder="$t('text.title')"
                      :rules="isRequired"
                    />
                    <ErrorMessage name="title" />
                  </div>
                  <div class="col-md-6">
                    <h5>{{ $t("text.category") }}</h5>
                    <div class="dropdown">
                      <button
                        class="form-dropdown btn dropdown-toggle"
                        type="button"
                        id="dropdownCategory"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {{
                          selectedCategoryId
                            ? getCategoryNameById(selectedCategoryId)
                            : $t("validation.choose_category")
                        }}
                      </button>
                      <ul
                        class="form-dropdown-menu dropdown-menu"
                        aria-labelledby="dropdownCategory"
                      >
                        <li v-for="category in categories" :key="category.id">
                          <a
                            class="dropdown-item"
                            href="#"
                            @click.prevent="selectedCategoryId = category.id"
                          >
                            {{ getCategoryName(category) }}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <!-- Hidden input field for validation -->
                    <Field
                      v-model="selectedCategoryId"
                      type="hidden"
                      name="category"
                      :rules="validateCategory"
                    />
                    <ErrorMessage name="category" />
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <span class="i"
                      ><font-awesome-icon :icon="['fas', 'map']" /></span
                    >{{ $t("text.location") }}
                  </h3>
                </div>
                <div class="utf_submit_section">
                  <div class="row with-forms">
                    <div class="col-md-6">
                      <h5>{{ $t("text.city") }}</h5>
                      <div class="dropdown">
                        <button
                          v-if="cities && cities.length > 0"
                          @change="selectCity"
                          class="form-dropdown btn dropdown-toggle"
                          type="button"
                          id="city_id_div"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {{
                            selectedCity
                              ? selectedCity["name_" + $i18n.locale]
                              : $t("text.venue_title")
                          }}
                        </button>
                        <ul
                          class="form-dropdown-menu dropdown-menu"
                          aria-labelledby="city_id_div"
                        >
                          <li
                            v-for="city in cities"
                            :key="city.id"
                            v-bind="selectedCity"
                          >
                            <a
                              class="dropdown-item"
                              href="#"
                              @click.prevent="selectCity(city)"
                            >
                              {{ city["name_" + $i18n.locale] }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h5>{{ $t("text.address") }}</h5>
                      <Field
                        v-model="address"
                        type="text"
                        class="input-text"
                        name="address"
                        id="address"
                        :placeholder="$t('text.address')"
                        :rules="isRequired"
                      />
                      <ErrorMessage name="address" />
                    </div>
                    <div
                      id="utf_listing_location"
                      class="col-md-12 utf_listing_section map"
                    >
                      <leaflet-map
                        ref="map"
                        :lat="selectedCityLat"
                        :lng="selectedCityLng"
                        :zoom="zoom"
                        :interactive="true"
                        style="z-index: 1"
                      ></leaflet-map>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <span class="i"
                      ><font-awesome-icon :icon="['fas', 'image']"
                    /></span>
                    {{ $t("text.photos") }}
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="utf_submit_section col-md-6">
                    <h5>{{ $t("text.cover_photo") }}</h5>
                    <input ref="coverImageFile" type="file" name="coverImage" />
                  </div>
                  <div class="utf_submit_section col-md-6">
                    <h5>{{ $t("text.other_photos") }}</h5>
                    <input
                      ref="otherImagesFiles"
                      type="file"
                      name="images[]"
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <span class="i"
                      ><font-awesome-icon :icon="['fas', 'list']"
                    /></span>
                    {{ $t("text.content") }}
                  </h3>
                </div>
                <div class="row with-forms">
                  <div class="col-md-6">
                    <h5>{{ $t("text.phone") }}</h5>
                    <input
                      v-model="phone"
                      type="text"
                      name="phone"
                      id="phone"
                      :placeholder="$t('text.phone')"
                    />
                  </div>
                  <div class="col-md-6">
                    <h5>E-mail</h5>
                    <Field
                      v-model="email"
                      type="text"
                      class="search-field"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      :rules="validateEmail"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div class="col-md-6">
                    <h5>Website</h5>
                    <input
                      v-model="website"
                      type="text"
                      name="website"
                      placeholder="Website"
                    />
                  </div>
                  <div class="col-md-6">
                    <h5>Facebook</h5>
                    <input
                      v-model="facebook"
                      type="text"
                      name="facebook"
                      placeholder="Facebook"
                    />
                  </div>
                  <div class="col-md-6">
                    <h5>Instagram</h5>
                    <input
                      v-model="instagram"
                      type="text"
                      name="instagram"
                      placeholder="Instagram"
                    />
                  </div>
                  <div class="col-md-12">
                    <h5>{{ $t("text.description_bg") }}</h5>
                    <Field
                      v-model="content_bg"
                      name="content_bg"
                      cols="40"
                      rows="3"
                      id="content_bg"
                      :placeholder="$t('text.description_bg')"
                      spellcheck="true"
                    />
                    <ErrorMessage name="content_bg" />
                  </div>
                  <div class="col-md-12">
                    <h5>{{ $t("text.description_en") }}</h5>
                    <textarea
                      v-model="content_en"
                      name="content_en"
                      cols="40"
                      rows="3"
                      id="content_en"
                      :placeholder="$t('text.description_en')"
                      spellcheck="true"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <span class="i"
                      ><font-awesome-icon :icon="['fas', 'clock']"
                    /></span>
                    {{ $t("text.work_time") }}
                  </h3>
                </div>

                <div class="switcher-content">
                  <div
                    class="row utf_opening_day utf_js_demo_hours"
                    v-for="(time, index) in openingHours"
                    :key="index"
                  >
                    <div class="col-md-2">
                      <h5>{{ time.dayName }}</h5>
                    </div>
                    <div class="col-md-5 d-flex">
                      <span class="hours-txt">от</span>
                      <select class="utf_chosen_select" v-model="time.openHour">
                        <option v-for="hour in hours" :key="hour" :value="hour">
                          {{ hour }}
                        </option>
                      </select>
                      <span class="hours-dots">:</span>
                      <select
                        class="utf_chosen_select"
                        v-model="time.openMinute"
                      >
                        <option
                          v-for="minute in minutes"
                          :key="minute"
                          :value="minute"
                        >
                          {{ minute }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-5 d-flex">
                      <span class="hours-txt">до</span>
                      <select
                        class="utf_chosen_select"
                        v-model="time.closeHour"
                      >
                        <option v-for="hour in hours" :key="hour" :value="hour">
                          {{ hour }}
                        </option>
                      </select>
                      <span class="hours-dots">:</span>
                      <select
                        class="utf_chosen_select"
                        v-model="time.closeMinute"
                      >
                        <option
                          v-for="minute in minutes"
                          :key="minute"
                          :value="minute"
                        >
                          {{ minute }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add_utf_listing_section margin-top-45">
                <div class="utf_add_listing_part_headline_part">
                  <h3>
                    <span class="i"
                      ><font-awesome-icon :icon="['fas', 'copy']"
                    /></span>
                    {{ $t("text.features") }}
                  </h3>
                </div>
                <div class="checkboxes in-row amenities_checkbox">
                  <ul>
                    <li v-for="feature in categoryFeatures" :key="feature.id">
                      <input
                        :id="'input-feature' + feature.id"
                        type="checkbox"
                        name="check"
                        :value="feature.id"
                        v-model="selectedFeatures"
                      />
                      <label
                        class="icon icon-solid"
                        :for="'input-feature' + feature.id"
                      >
                        <span class="tick"
                          ><font-awesome-icon :icon="['fas', 'check']"
                        /></span>
                        {{ feature["name_" + $i18n.locale] }}</label
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <button class="button preview" @click="checkErrors">
                <i class="fa fa-arrow-circle-right"></i>{{ $t("text.save") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>