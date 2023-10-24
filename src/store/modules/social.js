import Layout from '@/layout'
export default {
  name: 'social',
  path: '/social',
  component: Layout,
  children: [{
    path: '',
    name: 'social',
    component: () => import('@/views/social/index'),
    meta: { title: '社保', icon: 'social' }
  }]
}
