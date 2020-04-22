/**
 * 前端配置信息专用 store
 */

// 初始化数据
const initData = () => ({
  hasLoaded: false, // 是否已经加载完毕
  qiniuDomain: 'https://cdn.haosailei.cn', // 七牛域名
  h5Domain: 'https://actv.haosailei.cn', // H5 域名
  oem: {
    name: '好赛擂',
    main_logo:
      '//cdn.haosailei.cn/frontend/dashboard/resource/image/common/logo.png',
    vice_logo:
      '//cdn.haosailei.cn/frontend/dashboard/resource/image/common/logo-with-word.png',
    copyright: '2019 深圳好赛擂科技有限公司'
  }
})

export const state = () => initData()

export const mutations = {
  // 重置 state
  RESET_STATE(state) {
    Object.assign(state, initData())
  },

  // 设置结果信息页内容
  SET_STATE(state, payload) {
    Object.assign(state, payload)
  }
}

export const actions = {}
