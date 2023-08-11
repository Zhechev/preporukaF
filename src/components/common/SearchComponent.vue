<script setup>
import { ref, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();

const props = defineProps(["categories", "cities"]);

const category = ref("");
const city = ref("");
const title = ref("");
const showError = ref(false);

const getCategoryName = (category) => {
  return category["category_name_" + locale.value];
};

const getCityName = (city) => {
  return city["name_" + locale.value];
};

const submitForm = () => {
  if (!title.value && !city.value && !category.value) {
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 1000);
    return;
  }

  const query = {
    category: category.value ? category.value.id : 0,
    city: city.value ? city.value.id : 0,
    page: 1,
  };

  if (title.value) {
    query.title = title.value;
  }

  router.push({
    name: 'showVenues',
    query
  });
};
</script>

<template>
  <form @submit.prevent="submitForm" id="home-search-form">
    <div class="main_input_search_part">
      <div class="main_input_search_part_item" :class="{ shake: showError, 'error': showError }" id="home-search-title-div">
        <label>
        <input
          v-model="title"
          type="text"
          id="home-search-title"
          name="title"
          placeholder="Име на обекта"
        />
        </label>
      </div>
      <div class="main_input_search_part_item" :class="{ shake: showError }" id="search-choose-city-div">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownCity"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :class="{ 'text-error': showError }"
          >
          <span :class="{ 'text-error': showError }">
            {{ city ? getCityName(city) : $t("text.choose_city") }}
          </span>
          </button>
          <ul
            id="search-choose-city"
            class="dropdown-menu"
            aria-labelledby="dropdownCity"
          >
            <li v-for="c in props.cities" :key="c.id">
              <a class="dropdown-item" href="#" @click.prevent="city = c">
                {{ getCityName(c) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="main_input_search_part_item" :class="{ shake: showError }" id="search-choose-category-div">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownCategory"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :class="{ 'text-error': showError }"
          >
          <span :class="{ 'text-error': showError }">
            {{ category ? getCategoryName(category) : $t("text.choose_category") }}
          </span>
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

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake {
  animation: shake 1.0s ease-in-out;
}

.text-error,
.text-error input {
  color: red !important;
}

.error #home-search-title::placeholder {
  color: red !important;
}
</style>