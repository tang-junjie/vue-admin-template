/**
 * 组件服务：视频预览
 *
 * 参数请参考 ./_index.vue 下的 data 属性
 */

import Vue from 'vue'
import CbVideoPreview from './_index.vue'

// 生成组件构造函数
const CbVideoPreviewConstructor = Vue.extend(CbVideoPreview)

// 组件实例，用于单例控制
let instance

const VideoPreview = src => {
  // 如果不存在实例，则创建并挂载
  if (!instance) {
    instance = new CbVideoPreviewConstructor({
      // 此处的 data 为 Vue 单页组件上的 data
      data: {
        src
      }
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
  } else {
    // 如果实例存在则更新数据
    Object.assign(instance, { src })
  }

  instance.isVisible = true
  return instance
}

export default VideoPreview
