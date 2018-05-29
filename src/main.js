// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import Mock from './Mock'

import axios from 'axios'
Vue.config.productionTip = false
Vue.use(Button);
Vue.prototype.axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
