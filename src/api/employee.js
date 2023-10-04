import request from '@/utils/request'

export const getEmployeeList = params => request.get('sys/user', { params })
