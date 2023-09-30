import request from '@/utils/request'

export const getUserInfoApi = () => request.get('sys/profile')

