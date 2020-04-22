/**
 * 组件服务：二维码生成弹窗
 *
 * 参数请参考 ./_index.vue 下的 data 属性
 */

import Vue from 'vue'
import CbQrcodePreview from './_index.vue'

// 组件默认配置
const defaultOptions = {
  title: '查看二维码',
  isShowCopyButton: true
}

// 生成组件构造函数
const CbQrcodePreviewConstructor = Vue.extend(CbQrcodePreview)

// 组件实例，用于单例控制
let instance

const QrcodePreview = options => {
  options = options || {
    rawData: '无效二维码数据，请联系客服',
    ...defaultOptions
  }

  // 当传入待编码成二维码的字符串数据，则包装成配置对象，实现参数类型重载
  if (typeof options === 'string') {
    options = {
      rawData: options,
      ...defaultOptions
    }
  }

  // 如果不存在实例，则创建并挂载
  if (!instance) {
    instance = new CbQrcodePreviewConstructor({
      // 此处的 data 为 Vue 单页组件上的 data
      data: options
    })
    instance.$mount()
  } else {
    // 如果实例存在则更新数据
    Object.assign(instance, options)
  }

  instance.isVisible = true
  return instance
}

export default QrcodePreview
