import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/views/register'
import Login from "@/views/Login";
import userinfo from "@/views/userinfo";
import {Toast} from "vant";
import Edit from "@/views/Edit";
import Home from "@/views/Home";
import Article from "@/views/Article";

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepalive: true
    }

  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: userinfo,
    meta: {istoken: true}
  },
  {
    path: '/edit',
    component: Edit,
    meta: {istoken: true}
  },
  {
    path: '/article/:id',
    component: Article,
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken === true) {
    Toast.fail('请重新登录')
    next('/login')
    return
  }
  next()
})
export default router
