// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global from './components/Global'


import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.prototype.$ajax = axios
Vue.prototype.global=global
Vue.prototype.apiUrl=global.apiUrl
Vue.prototype.username=global.username
Vue.prototype.uid=global.uid

Vue.config.productionTip = false
Vue.use(Element)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
