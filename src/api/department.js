import request from '@/utils/request'

export const getDepartments = () => request.get('company/department')
