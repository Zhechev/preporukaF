<template>

  <form @submit.prevent="submitForm" id="home-search-form">
    <div class="main_input_search_part">
      <div class="main_input_search_part_item" id="home-search-title-div">
        <input v-model="form.title" type="text" id="home-search-title" name="title" placeholder="Име на обекта">
      </div>
      <div class="main_input_search_part_item" id="search-choose-city-div">
        <chosen-select v-model="form.city" id="search-choose-city" name="city" placeholder="Изберете град">
          <option value="Изберете град"></option>
          <option v-for="city in cities" :key="city.id">{{ getCityName(city) }}</option>   
        </chosen-select>
      </div>
      <div class="main_input_search_part_item" id="search-choose-category-div">
        <chosen-select v-model="form.category" id="search-choose-category" name="category" placeholder="Изберете категория">
          <option value="0" selected>Изберете категория</option>
          <option value="{{ category.id }}" v-for="category in categories" :key="category.id">{{ getCategoryName(category) }}</option>
        </chosen-select>
      </div>
      <button class="button" type="submit" id="home-search-button">ТЪРСИ</button>
    </div>
  </form>
</template> 


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ChosenSelect from './ChosenSelect.vue';


export default {
    name: "SearchComponent",
    data() {
        return {
            query: '',
            cityId: 0,
            categoryId: 0,
        }
    },
    props: ['categories', 'cities'],
    methods: {
        getCategoryName(category) {
            const lang = this.$i18n.locale;
            return category['category_name_' + lang];
        },
        getCityName(city) {
            const lang = this.$i18n.locale;
            return city['name_' + lang];
        }
    },
    components: {
        ChosenSelect
    },
    setup() {
    const router = useRouter();

    const form = ref({
      title: '',
      city: '',
      category: ''
    });

    function submitForm() {
      router.push({ 
        name: 'search-venues',
        query: form.value
      });
    }

    return { form, submitForm };
  }
}
</script>

