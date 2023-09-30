import { getUserInfoApi } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {}
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
    },
    logout(context) {
      // 清除本地 token
      removeToken()
      // 清除 state 里面的 token
      context.commit('removeToken')
    }
  }
}
