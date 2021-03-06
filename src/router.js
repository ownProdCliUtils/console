import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from './views/homePage.vue'
import Class from './views/class.vue'
import ClassChapter from './views/classChapter.vue'
import Paragraph from './views/paragraph.vue'
import Test from './views/test.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Class
    },
    {
      path: '/class',
      component: Class
    },
    {
      path: '/classChapter',
      component: ClassChapter
    },
    {
      path: '/paragraph',
      component: Paragraph
    },
    {
      path: '/test',
      component: Test
    },
  ]
})
