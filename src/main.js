import Router from '@/router'
import store from '@/store'
import { createApp } from 'vue';
import filters from './common/filters';
import i18n from './i18n';

// css
import "./assets/css/stylesheet.css";
import "./assets/css/style.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

import { fab } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(fas)
library.add(fab)

// js

import _ from 'lodash';
window._ = _;

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true

import Chosen from './components/common/ChosenSelect.vue';
import DefaultLayout from './components/layouts/Default.vue';

const app = createApp(DefaultLayout);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('chosen-select', Chosen);
app.component('default-layout', DefaultLayout); // rename here

app.config.globalProperties.$filters = filters;

app.use(Router)
app.use(store)
app.use(i18n)

app.mount('#app');
