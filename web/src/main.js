import Vue from 'vue'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'
import router from './router'
Vue.config.productionTip = false

//npm install vue-awesome-swiper --save 轮播图
//npm install --save swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
//import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Card from './components/Card.vue'
//定义组件的名称
Vue.component("m-card",Card)

import ListCard from './components/ListCard.vue'
//定义组件的名称
Vue.component("m-list-card",ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:8080/web/api'
})

new Vue({ 
  router,
  render: h => h(App)
}).$mount('#app')
