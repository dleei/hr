import Layout from '@/layout'
export default {
  name: 'permission',
  path: '/permission',
  component: Layout,
  children: [{
    path: '',
    name: 'permission',
    component: () => import('@/views/permission/index'),
    meta: { title: '权限', icon: 'permission' }
  }]
}
