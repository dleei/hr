import { getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login(context, data) {
      const res = await request.post('sys/login', data)
      // 存储 token
      context.commit('setToken', res.data)
    },
    async getUserInfo(context) {
      const userInfo = await getUserInfo()
      context.commit('setUserInfo', userInfo)
    }
  }
}
