/**
 * 结果信息页专用 store
 */

// 初始化数据
const initData = () => ({
  type: '', // 信息类型
  title: '操作成功', // 信息标题
  description: '请点击下方按钮进行下一步操作', // 信息描述
  actions: [
    /**
     * 动作按钮定义，注意一般情况下 action 函数内是获取不到 this 的，所以不建议做复杂
     * 操作，如果非要做，则需要自行传入已经绑定上下文环境的函数
     */
    {
      title: '返回',
      primary: true,
      action() {
        window.$nuxt.$router.go(-1)
      }
    },
    {
      title: '前往首页',
      action() {
        window.$nuxt.$router.push('/')
      }
    }
  ]
})

export const state = () => initData()

export const mutations = {
  // 重置 state
  RESET_STATE(state) {
    Object.assign(state, initData())
  },

  // 设置结果信息页内容
  SET_RESULT_PAGE(state, data) {
    Object.assign(state, data)
  }
}

export const actions = {
  // 前往结果信息页面
  navToResultPage({ commit }, data) {
    commit('RESET_STATE')
    commit('SET_RESULT_PAGE', data)
    this.$router.push('/common/result')
  }
}
