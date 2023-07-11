import Router from '@/router'
import store from '@/store'
import { createApp } from 'vue';
import filters from './common/filters'
import i18n from './i18n'


import _ from 'lodash';
window._ = _;

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true

import Chosen from './components/common/ChosenSelect.vue';
import DefaultLayout from './components/layouts/Default.vue';

const app = createApp(DefaultLayout);

app.component('chosen-select', Chosen);
app.component('default-layout', DefaultLayout); // rename here

app.config.globalProperties.$filters = filters;

app.use(Router)
app.use(store)
app.use(i18n)

app.mount('#app');
