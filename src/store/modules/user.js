import { getUserInfoApi } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'
import { constantRoutes, resetRouter } from '@/router/index'
export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {},
    routes: constantRoutes
  },
  mutations: {
    setToken(state, token) {
      // 将 token 存储到 state
      state.token = token
      // 将 token 存储到本地
      setToken(token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeToken(state) {
      state.token = null
    },
    setRouter(state, router) {
      // 将动态路由和用户的具有访问权限的动态路由合并到 vuex 中存储
      // 用户进入页面路由循环渲染时,直接读取 vuex 中的该用户所拥有的所有菜单项
      state.routes = [...constantRoutes, ...router]
    }
  },
  actions: {
    async login(context, data) {
      const res = await request.post('sys/login', data)
      // 存储 token
      context.commit('setToken', res.data)
    },
    async getUserInfo(context) {
      const res = await getUserInfoApi()
      context.commit('setUserInfo', res.data)
      return res.data
    },
    logout(context) {
      // 清除本地 token
      removeToken()
      // 清除 state 里面的 token
      context.commit('removeToken')
      // 重置路由
      resetRouter()
    }
  }
}
