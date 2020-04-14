import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import apiObj from './config/api'
import {
  baseUrl
} from './config/baseUrl'
import {
  httpGet,
  httpPost
} from './utils/axios'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$api = apiObj
Vue.prototype.$get = httpGet
Vue.prototype.$post = httpPost
Vue.prototype.baseUrl = baseUrl


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')