import Router from '@/router'
import store from '@/store'
import { createApp } from 'vue';
import filters from './common/filters';
import i18n from './i18n';

// css
import "./assets/css/stylesheet.css";
import "./assets/css/mmenu.css";
import "./assets/css/style.css";

// js



import "./assets/js/slick.min.js";
import "/assets/js/rangeslider.min.js";
import "/assets/js/magnific-popup.min.js";
import "/assets/js/jquery-ui.min.js";
import "/assets/js/bootstrap-select.min.js";
import "/assets/js/mmenu.js";
import "/assets/js/tooltips.min.js";
import "/assets/js/jquery_custom.js";
import "/assets/js/markerclusterer.js";
import "/assets/js/moment.min.js";
import "/assets/js/daterangepicker.js";
import "/assets/js/leaflet.js";

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
