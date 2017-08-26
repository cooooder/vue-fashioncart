import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
//自定义
import Index from './views/index.vue'
import axios from 'axios'
//暂时不用路由 
import router from './router'
import {currency,truncate} from './utils/filters'
Vue.use(Element)
Vue.filter('currency',currency)
Vue.filter('truncate',truncate)

new Vue({
  el: '#app',
  render: h => h(App)
})
