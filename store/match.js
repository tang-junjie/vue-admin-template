/**
 * 大赛信息 store
 */

import Cookie from 'js-cookie'

// 定义 cookie 存储键名常量
const COOKIE_CURRENT_MATCH = 'current_match'

// 初始化数据
const initData = () => ({
  isMatchListSearchMode: false, // 大赛列表页 `/match` 是否处于搜索模式
  current: {} // 全局状态下当前所选择的大赛
})

export const state = () => initData()

export const mutations = {
  // 重置 state
  RESET_STATE(state) {
    Object.assign(state, initData())
  },

  // 更新登录态
  UPDATE_CURRENT_MATCH(state, match) {
    state.current = match
  },

  // 更改大赛列表页列表搜索状态
  UPDATE_MATCH_LIST_SEARCH_STATUS(state, status) {
    state.isMatchListSearchMode = status
  }
}

export const actions = {
  // 存储当前所选大赛到全局
  setCurrentMatch({ commit }, match) {
    // 存入浏览器会话，关闭后会被清除
    Cookie.set(COOKIE_CURRENT_MATCH, match)
    // 更新到 store 中
    commit('UPDATE_CURRENT_MATCH', match)
  },

  // 清除当前会话中所选的大赛
  removeCurrentMatch({ commit }) {
    Cookie.remove(COOKIE_CURRENT_MATCH)
    commit('UPDATE_CURRENT_MATCH', {})
  },

  // 返回已选择的大赛
  getCurrentMatch({ commit, state }) {
    let match = state.current

    // 如果 store 中没有存储当前已选大赛，则尝试从当前浏览器会话中取
    if (match.id === undefined) {
      const rawString = Cookie.get(COOKIE_CURRENT_MATCH)

      // 从 cookie 去除的数据的类型是 string 或者 undefined，所以要判断和解析
      if (rawString) {
        try {
          match = JSON.parse(rawString)
        } catch (e) {}
      }

      // 更新到 store 中
      commit('UPDATE_CURRENT_MATCH', match)
    }

    return match
  }
}
