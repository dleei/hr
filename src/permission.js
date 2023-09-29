import { Message } from 'element-ui'
import router from './router'
import store from './store'
import nProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 配置进度条,是否显示右侧加载过程
nProgress.configure({ showSpinner: false })
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
      next()
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
