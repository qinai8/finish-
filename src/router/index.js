import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Footprint from '../views/footprint/footprint.vue'
import Address from '../views/Management/Management.vue'
import Collect from '../views/Shipping/Shipping.vue'
import Footpr from '../views/member/member.vue'
import History from '../views/History/history.vue'
import Feedback from '../views/Feedback/feedback.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
	  path: '/user',
	  component: Home,
    children: [{
		  path: 'footprint',
		  name: ['用户管理', '会员管理'],
      nitem: '会员管理',
		  component: Footprint
    }, {
		  path: 'addressa',
		  name: ['用户管理', '收货地址'],
		  nitem: ['收货地址'],
		  component: Address
		  },
		  {
		  path: 'collect',
		  name: ['用户管理', '会员收藏'],
		  nitem: ['会员收藏'],
		  component: Collect
		  },
		  {
		  path: 'footprintes',
		  name: ['用户管理', '会员足迹'],
		  nitem: ['会员足迹'],
		  component: Footpr
		  },
		  {
		  path: 'history',
		  name: ['用户管理', '搜索记录'],
		  nitem: ['搜索记录'],
		  component: History
		  },
		  {
		  path: 'feedback',
		  name: ['用户管理', '意见反馈'],
		  nitem: ['意见反馈'],
		  component: Feedback
		  }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
