import request from '@/utils/request'

export const getDepartments = () => request.get('company/department')
// responseType 设置文件的响应类型为 Blob 文件
export const exportExcel = () => request.get('/sys/user/export', { responseType: 'Blob' })

export const downloadExcel = () => request.get('/sys/user/import/template', { responseType: 'Blob' })

export const delEmployee = id => request.delete(`/sys/user/${id}`)
