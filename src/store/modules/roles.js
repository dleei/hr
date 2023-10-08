import Layout from '@/layout'
export default {
  path: '/roles',
  component: Layout,
  children: [{
    path: '',
    name: 'role',
    component: () => import('@/views/role/index'),
    meta: { title: '角色', icon: 'role' }
  }]
}
