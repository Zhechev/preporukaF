<script setup>
import { useStore } from "vuex";
import { getVenues } from "@/services/venueService";
import { getCategories } from "@/services/categoryService";
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const store = useStore();
const venues = ref([]);
const categories = computed(() => store.getters["categories/categories"]);
console.log(categories)

// like icon, must remove
const is_like = ref(false);

// Pagination state
const currentPage = ref(1);
const totalPages = ref(0);
const paginationLinks = ref([]);

// Filters state
// const selectedFilter = ref("default");
const sortTypes = computed(() => [
  {  
    key: 'latest',
    name: t("text.latest")
  }, 
  { 
    key: 'popular',
    name: t("text.popular_venue") 
  },
  // { 
  //   key: 'price_low',
  //   name: t("text.price_low")
  // }, 
  // {  
  //   key: 'price_high',
  //   name: t("text.price_high")
  // }, 
  { 
    key: 'lowest_review',
    name: t("text.lowest_review")
  },
  { 
    key: 'highest_review',
    name: t("text.highest_review") 
  }
]);

const selectedSortType = async (newFilter) => {
  console.log('iame change');
  await fetchVenuesBySort(newFilter);
};

const getCategoryName = (category) => {
  return category["category_name_" + locale.value] || "";
};

const selectedByCat= async (cat) => {
  console.log('iame change cat');
  await fetchCategoryBySort(cat);
};

const fetchVenuesBySort = async (filter) => {
    try {
        const venuesResponse = await getVenues(currentPage.value, filter);
        venues.value = venuesResponse.data;
        console.log(venuesResponse.data)
    } catch (error) {
        console.error(error.message);
    }
}

const fetchCategoryBySort = async (filterCat) => {
  console.log(filterCat)
    try {
        const venuesResponse = await getCategories(currentPage.value, filterCat);
        venues.value = venuesResponse.data;
        console.log(venuesResponse.data)
    } catch (error) {
        console.error(error.message);
    }
}

onMounted(async () => {
    try {
        const venuesResponse = await getVenues(currentPage.value);
        
        venues.value = venuesResponse.data;

        totalPages.value = venuesResponse.last_page;
        paginationLinks.value = venuesResponse.links;
    } catch (error) {
        console.error(error.message);
    }
});

const changePage = async (page) => {
    currentPage.value = page;
    try {
        const venuesResponse = await getVenues(currentPage.value);
        venues.value = venuesResponse.data;
    } catch (error) {
        console.error(error.message);
    }
};

const getPageRange = () => {
    const total = totalPages.value;
    const current = currentPage.value;

    let start = current - 2;
    if (start < 1) start = 1;

    let end = start + 3; // 4 numbers in total
    if (end > total) end = total;

    // Adjusting start if we're at the last few pages
    if (current > total - 2) start = end - 3;

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

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
                    id="dropdownSort"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    
                    {{ $t("text.sort") }}
                    
                  </button>
                  <ul
                    class="form-dropdown-menu dropdown-menu"
                    aria-labelledby="dropdownSort"
                    >
                      <li v-for="option, key in sortTypes" :key="key">
                        <a class="dropdown-item"
                            href="#" :value="option.key" @click="selectedSortType(option.key)"> {{ option.name }}</a>
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
                    
                    {{ $t("text.categories") }}
                    
                  </button>
                  <ul
                    class="form-dropdown-menu dropdown-menu"
                    aria-labelledby="dropdownSortByCat"
                    >
                      <li v-for="cat in categories" :key="cat.category_id">
                        <a class="dropdown-item"
                            href="#" :value="cat.id" @click="selectedByCat(cat.id)"> {{ getCategoryName(cat) }} </a>
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
                  <img src="images/utf_listing_item-01.jpg" alt="" />
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
            <a href="#" @click.prevent="changePage(currentPage - 1)" :disabled="currentPage === 1">
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

        <li v-if="currentPage < totalPages.value - 2">
            <span>...</span>
            <a href="#" @click.prevent="changePage(totalPages.value)">{{ totalPages.value }}</a>
        </li>

        <li>
            <a href="#" @click.prevent="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
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
            <h3>
              <span class="i"
                ><font-awesome-icon :icon="['fas', 'sign-hanging']" />
              </span>
              Filters
            </h3>
            <div class="row with-forms">
              <div class="col-md-12">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value=""
                />
              </div>
            </div>
            <div class="row with-forms">
              <div class="col-md-12">
                <div class="input-with-icon location">
                  <input
                    type="text"
                    placeholder="Search Location..."
                    value=""
                  />
                  <a href="#"
                    ><span class="i"
                      ><font-awesome-icon
                        :icon="['fas', 'location-dot']" /></span
                  ></a>
                </div>
              </div>
            </div>
            <a
              href="#"
              class="more-search-options-trigger margin-bottom-10"
              data-open-title="More Filters Options"
              data-close-title="More Filters Options"
            ></a>
            <div class="more-search-options relative">
              <div class="checkboxes one-in-row margin-bottom-15">
                <input id="check-a" type="checkbox" name="check" />
                <label for="check-a">Real Estate</label>
                <input id="check-b" type="checkbox" name="check" />
                <label for="check-b">Friendly Workspace</label>
                <input id="check-c" type="checkbox" name="check" />
                <label for="check-c">Instant Book</label>
                <input id="check-d" type="checkbox" name="check" />
                <label for="check-d">Wireless Internet</label>
                <input id="check-e" type="checkbox" name="check" />
                <label for="check-e">Free Parking</label>
                <input id="check-f" type="checkbox" name="check" />
                <label for="check-f">Elevator in Building</label>
                <input id="check-g" type="checkbox" name="check" />
                <label for="check-g">Restaurant</label>
                <input id="check-h" type="checkbox" name="check" />
                <label for="check-h">Dance Floor</label>
              </div>
            </div>
            <button class="button fullwidth_block margin-top-5">Update</button>
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