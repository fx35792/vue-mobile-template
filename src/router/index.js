import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
    },
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue') // 首页
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      title: '列表页面',
    },
    component: () => import(/* webpackChunkName: "List" */ '../views/List/List.vue') // 列表页面
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
