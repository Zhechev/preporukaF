<template>
  <form @submit.prevent="submitForm" id="home-search-form">
    <div class="main_input_search_part">
      <div class="main_input_search_part_item" id="home-search-title-div">
        <input
          v-model="title"
          type="text"
          id="home-search-title"
          name="title"
          placeholder="Име на обекта"
        />
      </div>
      <div class="main_input_search_part_item" id="search-choose-city-div">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownCity"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Изберете град
          </button>
          <ul
            id="search-choose-city"
            class="dropdown-menu"
            aria-labelledby="dropdownCity"
          >
            <li v-for="city in props.cities" :key="city.id" :value="city.id">
              <a class="dropdown-item" href="#">{{ getCityName(city) }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="main_input_search_part_item" id="search-choose-category-div">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownCategory"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{
              category
                ? getCategoryName(category)
                : $t("validation.choose_category")
            }}
          </button>
          <ul
            id="search-choose-category"
            class="dropdown-menu"
            aria-labelledby="dropdownCategory"
          >
            <li v-for="cat in props.categories" :key="cat.id">
              <a class="dropdown-item" href="#" @click.prevent="category = cat">
                {{ getCategoryName(cat) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button class="button" type="submit" id="home-search-button">
        ТЪРСИ
      </button>
    </div>
  </form>
</template> 


<script setup>
import { ref, computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const props = defineProps(['categories', 'cities']);

const category = ref("");

const lang = computed(() => {
  return locale.value;
});

const getCategoryName = (category) => {
  return category["category_name_" + lang.value];
};

const getCityName = (city) => {
  return city["name_" + lang.value];
};

const submitForm = () => {

};

</script>

