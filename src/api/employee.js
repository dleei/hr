import request from '@/utils/request'

export const getEmployeeList = params => request.get('sys/user', { params })

export const addEmployee = data => request.post('sys/user', data)
