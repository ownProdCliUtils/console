import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import apiObj from './config/api'
import {
  httpGet,
  httpPost
} from './utils/axios'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$api = apiObj
Vue.prototype.$get = httpGet
Vue.prototype.$post = httpPost
Vue.prototype.baseUrl = 'http://127.0.0.1:7001'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
