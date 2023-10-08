import Layout from '@/layout'
export default {
  path: '/employee',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employee',
      component: () => import('@/views/employee/index'),
      meta: { title: '员工', icon: 'employee' }
    },
    {
      path: 'detail',
      hidden: true, // 不要在侧边栏中显示
      component: () => import('@/views/employee/detail.vue'), // 默认会找index.vue文件,自定义的文件名必须要补充上后缀名
      meta: { title: '员工详情' } // title 为面包屑自动识别的导航地址内容
    }
  ]
}
