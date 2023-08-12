<script setup>
import { useStore } from "vuex";
import { getVenues } from "@/services/venueService";
import { ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';


const route = useRoute(); // Access current route
const router = useRouter(); // Access router instance
const { t, locale } = useI18n();

const store = useStore();
const venues = ref([]);
const categories = computed(() => store.getters["categories/categories"]);
const cities = computed(() => store.getters["cities/cities"]);
const category = ref("");
const city = ref("");
const selectedFeatures = ref([]);

const VUE_APP_BASE_URL_STORAGE = process.env.VUE_APP_BASE_URL_STORAGE;

// like icon, must remove
const is_like = ref(false);

// Pagination state
const currentPage = ref(1);
const totalPages = ref(0);
const paginationLinks = ref([]);

// Filters state
const sortingOptions = computed(() => [
  { key: 'latest', name: t("text.latest") },
  { key: 'popular', name: t("text.popular_venue") },
  { key: 'lowest_review', name: t("text.lowest_review") },
  { key: 'highest_review', name: t("text.highest_review") }
]);

const currentSortingOption = ref(sortingOptions.value[0]); // default to the first sort type


const selectSortingOption = async (newFilter) => {
    const selectedOption = sortingOptions.value.find((option) => option.key === newFilter);
    currentSortingOption.value = selectedOption;
    // Get the current category from the router's query
    const currentCategory = router.currentRoute.value.query.category;

    // Push both the sort and category parameters to the URL
    router.push({ name: "showVenues", query: { ...router.currentRoute.value.query, sort: newFilter, category: currentCategory } });

    // Fetch the venues by sort and pass in the current category
    await fetchVenues(route.query.category, newFilter, route.query.city, selectedFeatures.value.join(','));
};

const selectFeatures = async (featureId, event) => {
  if (event.target.checked) {
    selectedFeatures.value.push(featureId);
  } else {
    selectedFeatures.value = selectedFeatures.value.filter(id => id !== featureId);
  }
  updateUrlWithFeatures();
  await fetchVenues(route.query.category, route.query.sort, route.query.city, selectedFeatures.value.join(','));
};

const updateUrlWithFeatures = () => {
  router.push({
    name: "showVenues",
    query: {
      ...router.currentRoute.value.query,
      features: selectedFeatures.value.join(',') // Converting array to comma-separated string
    }
  });
};

const getCityName = (city) => {
  return city["name_" + locale.value];
};

const selectedCity = async (c) => {
  city.value = c;
  router.push({ name: "showVenues", query: { ...router.currentRoute.value.query, city: c.id}});
  await fetchVenues(route.query.category, route.query.sort, c.id, selectedFeatures.value.join(','));
};

const getCategoryName = (category) => {
  return category["category_name_" + locale.value] || "";
};

const selectedByCat = async (cat) => {
    if (cat.id != category.value.id) {
      selectedFeatures.value = [];
      category.value = cat; // You are setting the entire category object
      router.push({ name: "showVenues", query: { ...router.currentRoute.value.query, category: cat.id, features: undefined } });
      await fetchVenues(cat.id, route.query.sort, route.query.city, '');
    }
};

const fetchVenues = async (categoryId, sortType, cityId, features) => {
  try {
    const venuesResponse = await getVenues(currentPage.value, categoryId, sortType, cityId, features);
    venues.value = venuesResponse.data;
    console.log(venues.value);
    totalPages.value = venuesResponse.last_page;
    paginationLinks.value = venuesResponse.links;
  } catch (error) {
    console.error(error.message);
    // Optionally show an error to the user
  }
};

onMounted(async () => {
    currentPage.value = Number(route.query.page) || 1;
    if (currentPage.value < 1) {
      currentPage.value = 1; // Ensuring the current page is at least 1
    }

    const sortType = route.query.sort || 'default';
    const categoryId = route.query.category || 0;
    const cityId = route.query.city || 0;

    if (route.query.features) {
      selectedFeatures.value = route.query.features.split(','); // Convert to array
    }

    const hasQueryParams = route.query.sort || route.query.city || route.query.category;
    if (!hasQueryParams) {
      // Redirect to the URL with default values
      router.push({
        name: "showVenues",
        query: { sort: sortType, city: cityId, category: categoryId }
      });
    }

    try {
        const venuesResponse = await fetchVenues(categoryId, sortType, cityId, route.query.features || '');
        venues.value = venuesResponse.data;
        totalPages.value = venuesResponse.last_page;
        paginationLinks.value = venuesResponse.links;
    } catch (error) {
        console.error(error.message);
    }
});

const changePage = async (page) => {
    // Preventing navigation to out-of-bounds pages
    if (page < 1 || page > totalPages.value) return;

    // Get the current sort query parameter
    const currentSort = router.currentRoute.value.query.sort;
    const currentCategory = router.currentRoute.value.query.category;
    const currentCity = router.currentRoute.value.query.city;

    // Update the URL with the selected page and sort type
    router.push({ name: "showVenues", query: { page: page, sort: currentSort, category: currentCategory, city: currentCity } });

    currentPage.value = page;
    try {
      const venuesResponse = await fetchVenues(currentCategory, currentSort, currentCity, selectedFeatures.value.join(','));
      venues.value = venuesResponse.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getPageRange = () => {
  const total = totalPages.value;
  const current = currentPage.value;

  if (total === 1) return [1]; // Return only one page if no results

  let start = current - 2;
  if (start < 1) start = 1;

  let end = start + 3; // 4 numbers in total
  if (end > total) end = total;

  // Making sure start and end values are within bounds
  if (start < 1) start = 1;
  if (end < 1) end = 1;
  if (end > total) end = total;
  if (start > end) start = end;

  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};


watch(
  () => route.params.page,
  (newPage) => {
    if (newPage) {
      changePage(Number(newPage));
    }
  },
  { immediate: true }
);

watch(() => route.query, async (newQuery) => {
  if (newQuery.category) {
    const selectedCategory = categories.value.find(cat => cat.id.toString() === newQuery.category);
    if (selectedCategory) {
      category.value = selectedCategory;
    }
  }

  if (newQuery.city) {
    const selectedCity = cities.value.find(c => c.id.toString() === newQuery.city);
    if (selectedCity) {
      city.value = selectedCity;
    }
  }
}, { immediate: true, deep: true });

</script>

<template>
  <div class="clearfix"></div>
  <div id="titlebar" class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Layout List With Sidebar</h2>
          <nav id="breadcrumbs">
            <ul>
              <li><a href="index_1.html">Home</a></li>
              <li>Layout List With Sidebar</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-8">
        <div class="listing_filter_block">
          <div class="col-md-2 col-xs-2">
            <div class="utf_layout_nav">
              <a href="listings_grid_with_sidebar.html" class="grid"
                ><font-awesome-icon :icon="['fas', 'th']"
              /></a>
              <a href="#" class="list active"
                ><font-awesome-icon :icon="['fas', 'align-justify']"
              /></a>
            </div>
          </div>
          <div class="col-md-10 col-xs-10">
            <!-- <div class="sort-by utf_panel_dropdown sort_by_margin float-right">
              <a href="#">Destination</a>
              <div class="utf_panel_dropdown-content">
                <input
                  class="distance-radius"
                  type="range"
                  min="1"
                  max="999"
                  step="1"
                  value="1"
                  data-title="Select Range"
                />
                <div class="panel-buttons">
                  <button class="panel-apply">Apply</button>
                </div>
              </div>
            </div> -->
            <div class="sort-by">
              <div class="utf_sort_by_select_item sort_by_margin">
                <div class="dropdown">
                <button
                  class="form-dropdown btn dropdown-toggle"
                  type="button"
                  id="dropdownCity"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ city ? getCityName(city) : $t("text.choose_city") }}
                </button>
                <ul
                  id="search-choose-city"
                  class="form-dropdown-menu dropdown-menu"
                  aria-labelledby="dropdownCity"
                >
                  <li v-for="c in cities" :key="c.id">
                    <a class="dropdown-item" href="#" @click="selectedCity(c)">
                      {{ getCityName(c) }}
                    </a>
                  </li>
                </ul>
              </div>
              </div>
            </div>
            <div class="sort-by">
              <div class="utf_sort_by_select_item sort_by_margin">
                <div class="dropdown">
                  <button
                    class="form-dropdown btn dropdown-toggle"
                    type="button"
                    id="dropdownSort"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    
                    {{ currentSortingOption.name }}
                    
                  </button>
                  <ul
                    class="form-dropdown-menu dropdown-menu"
                    aria-labelledby="dropdownSort"
                    >
                      <li v-for="option, key in sortingOptions" :key="key">
                        <a class="dropdown-item"
                            href="#" :value="option.key" @click="selectSortingOption(option.key)"> {{ option.name }}</a>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sort-by">
              <div class="utf_sort_by_select_item sort_by_margin">
                <div class="dropdown">
                  <button
                    class="form-dropdown btn dropdown-toggle"
                    type="button"
                    id="dropdownSortByCat"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    
                    {{
                      category ? getCategoryName(category) : $t("text.choose_category")
                    }}
                    
                  </button>
                  <ul
                    class="form-dropdown-menu dropdown-menu"
                    aria-labelledby="dropdownSortByCat"
                    >
                      <li v-for="cat in categories" :key="cat.id">
                        <a class="dropdown-item"
                            href="#" :value="cat.id" @click="selectedByCat(cat)"> {{ getCategoryName(cat) }} </a>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sort-by">
              <div class="utf_sort_by_select_item utf_search_map_section">
                <ul>
                  <li>
                    <a class="utf_common_button" href="#"
                      ><span class="i"><font-awesome-icon
                        :icon="['fas', 'location-crosshairs']"
                      /></span>Near Me</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="venues && venues.length">
          <div
            v-for="venue in venues"
            :key="venue.id"
            class="col-lg-12 col-md-12"
          >
            <div class="utf_listing_item-container list-layout">
              <router-link
                :to="{ name: 'showVenue', params: { id: venue.id } }"
                class="utf_listing_item"
              >
                <div class="utf_listing_item-image">
                  <img :src="VUE_APP_BASE_URL_STORAGE + venue.cover_image" alt="" />
                  <span class="tag"><i :class="venue.category.icon"></i>test</span>
                  <div @click="is_like = !is_like" class="like-icon">
                    <span v-if="is_like == false"><font-awesome-icon :icon="['far', 'heart']" /></span>
                    <span v-else><font-awesome-icon :icon="['fas', 'heart']" /></span>
                  </div>
                  <div class="utf_listing_prige_block utf_half_list">
                    <!-- <span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $45</span> -->
                    <!-- <span class="utp_approve_item"><i class="utf_approve_listing"></i></span> -->
                  </div>
                </div>
                <span class="utf_open_now">Open Now</span>
                <div class="utf_listing_item_content">
                  <div class="utf_listing_item-inner">
                    <h3>{{ venue.title }}</h3>
                    <span
                      ><font-awesome-icon :icon="['fas', 'map-marker']"
                    /> {{ venue.address }} </span>
                    <span
                      ><font-awesome-icon :icon="['fas', 'phone']" /> {{ venue.phone }}</span
                    >
                    <div class="utf_star_rating_section" :data-rating="venue.rating">
                      <div class="utf_counter_star_rating">( {{ venue.rating }} )</div>
                    </div>
                    <p>
                      {{ venue.description }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="row">
          <div class="col-md-12">
            <div
              class="utf_pagination_container_part margin-top-20 margin-bottom-70"
            >
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
        </div>  
      </div>

      <!-- Sidebar -->
      <div class="col-lg-4 col-md-4">
        <div class="sidebar">
          <div class="utf_box_widget margin-bottom-35">
            <div class="checkboxes in-row amenities_checkbox">
                  <ul>
                    <li v-for="feature in category.features" :key="feature.id">
                      <input
                        :id="'input-feature' + feature.id"
                        type="checkbox"
                        name="check"
                        :value="feature.id"
                        @change="selectFeatures(feature.id, $event)"
                      />
                      <label class="icon icon-solid" :for="'input-feature' + feature.id">
                        <span class="tick"><font-awesome-icon :icon="['fas', 'check']" /></span>
                        {{ feature["name_" + $i18n.locale] }}
                      </label>
                    </li>
                  </ul>
                </div>
          </div>
          <div class="utf_box_widget margin-top-35 margin-bottom-75">
            <h3>
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'folder']"
              /></span>
              {{ $t("text.categories") }}
            </h3>
            <ul class="utf_listing_detail_sidebar">
              <li>
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'angles-right']" /></span
                ><a href="#">Travel</a>
              </li>
              <li>
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'angles-right']"
                /></span>
                <a href="#">Nightlife</a>
              </li>
              <li>
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'angles-right']" /></span
                ><a href="#">Fitness</a>
              </li>
              <li>
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'angles-right']" /></span
                ><a href="#">Real Estate</a>
              </li>
              <li>
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'angles-right']" /></span
                ><a href="#">Restaurant</a>
              </li>
              <li>
                <span class="i"
                  ><font-awesome-icon :icon="['fas', 'angles-right']" /></span
                ><a href="#">Dance Floor</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disabled-arrow {
    color: grey;
    pointer-events: none;
}

</style>