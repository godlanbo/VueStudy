import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
