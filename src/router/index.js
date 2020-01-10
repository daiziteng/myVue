import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// const login = r => require.ensure([], () => r(require('@/page/login')), 'login');  //require.ensure()实现

const login = () => import('@/Page/login')   //import 实现
const register = () => import('@/Page/register')   //import 实现
const manage = () => import('@/Page/manage')   //import 实现
const table = () => import('@/Page/table')   //import 实现
const echarts = () => import('@/Page/echarts')   //import 实现

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/manage',
    component: manage
  }, {
    path: '/table',
    component: table
  },
  {
    path: '/echarts',
    component: echarts
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'procuction'
})






