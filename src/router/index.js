import Vue from 'vue'
import VueRouter from 'vue-router'

//引入store模块
import store from '@/store/index'
Vue.use(VueRouter)

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一参数：告诉原理push方法，你往哪里跳转(传递哪些参数)
//第二个参数：成功回调
//第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call与apply区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法执行数组方式传递
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //call与apply区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法执行数组方式传递
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search/index.vue'),
    props($route) {
      return {}
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/index.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail'),
    props($route) {
      return { id: $route.params.id }
    }
  },
  {
    path: '/addcatr/:num?',
    name: 'addcatr',
    component: () => import('@/views/Addcatr'),
    props($route) {
      return { num: $route.query.skuNum }
    }
  },
  {
    path: '/shoppcart',
    name: 'shoppcart',
    component: () => import('@/views/ShopCart')
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/views/Trade')
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //滚动行为，每次路由跳转后，回到页面的最上方
  scrollBehavior(to, from, savedPosition) {
    //返回的y=0，表示滚动条在最上方
    return { y: 0 }
  }
})

//全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  /*
  to:获取你前往的路由信息
  from:获取你从哪个路由来的信息
  next:放行函数 全放行next(),放行到指定路由 next(path)
  */
  //token字符串
  let token = store.state.user.token
  //用户信息
  let user = store.state.user.userInfo.name

  if (token) {
    //已登录，不能再前往登录路由
    if (to.path == '/login') {
      next('/home')
    } else {
      //登录了，去的不是login
      //如果有用户名,则直接放行
      if (user) {
        next()
      } else {
        //没有用户信息，派发actions仓库存储用户信息在跳转
        try {
          //获取用户信息在首页展示
          await store.dispatch('user/getuserInfo')
          //放行
          next()
        } catch (error) {
          //token失效了获取不到用户信息，需要清除存储的token，
          await store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录
    next()
  }
})

export default router
