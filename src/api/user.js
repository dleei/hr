import request from '@/utils/request'

export const getUserInfo = () => request.get('sys/profile')

