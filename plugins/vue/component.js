// 注册全局组件，建议只选择 dumb 组件进行注册

import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueQr from 'vue-qr'
import CbLoading from '@/components/CbLoading'
import CbQrcodePreview from '@/components/CbQrcodePreview'
import CbVideoPreview from '@/components/CbVideoPreview'
import CbChartCardWrap from '@/components/CbCharts/CbChartCardWrap'

const requireComponent = require.context(
  // 组件目录
  '@/components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index.vue$/
)

// 自动导入
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 通过路径获取组件名
  const componentName = fileName
    .split('/')
    .splice(-2)
    .shift()

  // 全局注册该组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// 二维码生成组件
Vue.component('VueQr', VueQr)
// 图片预览组件
Vue.use(Viewer)
// 加载 loading 指示器服务
Vue.use(CbLoading)
// 加载二维码预览弹窗组件服务
Vue.use(CbQrcodePreview)
// 加载视频预览组件服务
Vue.use(CbVideoPreview)

// 图表组件注册
Vue.component('CbChartCardWrap', CbChartCardWrap)
