import request from '@/utils/request'

export const getPermissionListAPI = () => request.get('sys/permission')
