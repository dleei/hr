import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 全自动引入 svg 目录下所有的文件
// 只要引入了文件, 就会被 webpack 打包到项目中
// webpack 的功能: require.context()
// 作用: 扫描指定的文件夹下的文件
// 参数1: 要扫描的文件夹
// 参数2: 是否要扫描子目录
// 参数3: 扫描匹配正则的文件
// 返回值: 是一个函数
// 展开介绍返回值:
// 1. 该函数有一个方法 keys() 作用是将扫描到的所有文件名放到数组中返回
// 2. 直接调用该函数, 并传入指定的文件路径名, 就可以将文件加载进来了
const req = require.context('./svg', false, /\.svg$/)
// console.log(req.keys())
// 这样不能实现自动化引入, 每加一个进来就需要自己引入一次, 太 low 了
// req('./dashboard.svg')
// req('./eye.svg')
// req.keys().forEach(item => req(item))
const requireAll = req => req.keys().map(req)
requireAll(req)

// 相当于把svg下的所有的svg图片打包到了项目中
// 如果想用svg图片 就在svg目录下去寻找就可以了
