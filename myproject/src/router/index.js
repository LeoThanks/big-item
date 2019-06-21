import Vue from 'vue'
import Router from 'vue-router'

// 引入组件
import Login from '../components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  }]
})
