import { Message } from 'element-ui'
import router from './router'
import store from './store'
import nProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 配置进度条,是否显示右侧加载过程
nProgress.configure({ showSpinner: false })
import { dynamicRoute } from './router'
// 白名单
const whiteList = ['/login']

//  前置导航守卫
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  nProgress.start()
  // 判断是否有 token
  const token = store.getters.token
  if (token) { // 有token
    if (to.path === '/login') {
      next('/')
      // 关闭进度条,此处不会触发后置守卫,无法自动关闭后置守卫需要手动关闭
      nProgress.done()
    } else {
      // 进入页面就获取用户信息
      // 判断是否已经有了用户信息,没有就获取,不要重复获取
      if (!store.getters.userInfo.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const filterRouter = dynamicRoute.filter(item => {
          // 在所有的权限列表中筛选中筛选出用户拥有的权限并返回
          return roles.menus.includes(item.name)
        })
        // 将过滤后的路由添加到 vuex 中
        store.commit('user/setRouter', filterRouter)
        // 使用路由的 addRouters 方法,将筛选出来的动态路由添加到路由系统中去
        // 添加 404 路由地址到路由的最后面
        router.addRoutes([...filterRouter, { path: '*', redirect: '/404', hidden: true }])
        // 路由官方 bug ,重新定向到目标地点
        next(to.path)
      } else {
        // 放行
        next()
      }
    }
  } else { // 没有 token
    if (whiteList.includes(to.path)) { // 如果去的页面是 login 页面 放行
      next()
    } else {
      next('/login') // 放行到 login 页面
      //   提示用户登录
      Message.error('请先登录')
      nProgress.done()
    }
  }
})
// 后置导航守卫
router.afterEach(() => {
  //  关闭进度条
  nProgress.done()
})
