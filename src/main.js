import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TapNav from '@/views/Home/TapNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.min.css'

//全局注册TapNav组件
Vue.component(TapNav.name, TapNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

//测试
// import { reqCategoryList } from '@/api'
// reqCategoryList()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
