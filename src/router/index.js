import Vue from 'vue'
import VueRouter from 'vue-router'
import { getItem } from '@/utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    meta: {
      isAuth: false,
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          isAuth: false,
        },
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/search'),
        props: true, //开启props传参
        meta: {
          isAuth: false,
        },
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/news'),
        meta: {
          isAuth: false,
        },
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: {
          isAuth: false,
        },
      },
    ],
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/views/home/components/ChoseCity'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/registe',
    name: 'registe',
    component: () => import('@/views/registe'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/Favorite',
    name: 'Favorite',
    component: () => import('@/views/my/components/favorite'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/MyRent',
    name: 'MyRent',
    component: () => import('@/views/my/components/MyRent'),
    meta: {
      isAuth: true,
    },
    children: [
      {
        path: 'PublishHouse',
        name: 'PublishHouse',
        component: () => import('@/views/my/components/PublishHouse'),
        meta: {
          isAuth: true,
        },
      },
      {
        path: 'Search',
        name: 'Search',
        component: () => import('@/views/my/components/SearchCom'),
      },
    ],
  },
  {
    path: '/Record',
    name: 'Record',
    component: () => import('@/views/my/components/Record'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/BeHouser',
    name: 'BeHouser',
    component: () => import('@/views/my/components/BeHouser'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/my/components/Profile'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/AutoServe',
    name: 'AutoServe',
    component: () => import('@/views/my/components/AutoServe'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/HousePage/:id', //如果路径后面不拼上参数，刷新会消失
    name: 'HousePage',
    component: () => import('@/views/housePage'),
    props: true, //开启props传参
    meta: {
      isAuth: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

/* 
token过期返回的数据
{
  "status": 400,
  "description": "token异常或者过期",
  "body": null
}
 */

//设置路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (getItem('TOUTIAO_USER')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

//解决重定向问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
