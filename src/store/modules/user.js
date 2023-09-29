import { setToken, getToken } from '@/utils/auth'
import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {

  },
  actions: {
    async login(context, data) {
      const res = await request.post('sys/login', data)
      // 存储 token
      setToken(res.data)
    }
  }
}
