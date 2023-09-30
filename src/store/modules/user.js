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
      // 将 token 存储到 state
      state.token = token
      // 将 token 存储到本地
      setToken(token)
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
      console.log(this.userInfo)
    }
  }
}
