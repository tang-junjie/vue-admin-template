/**
 * 用户信息 store
 */

import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { path } from '@/assets/js/utils/misc'

storage.addPlugin(expirePlugin)

// 定义 localStorage 存储键名常量
const LOCALSTORAGE_USER_AUTH_INFO = 'user_auth_info'
// 非自动登录时令牌将在最近一次使用后的 30 分钟后过期
const NON_AUTO_LOGIN_EXPIRES_IN = 60 * 30

// 初始化数据
const initData = () => ({
  // 登录态信息
  auth: {},
  // 用户基础信息
  userInfo: {},
  // 用户权限集
  userPermissions: [],
  // 是否提醒过不合适的浏览器版本
  hasPromptAboutBrowser: false
})

export const state = () => initData()

export const getters = {
  // 获取 AccessToken
  getAccessToken({ auth }) {
    if (auth.auto_login === false) {
      /**
       * 当用户当初登录时没有勾选自动登录时，每次获取令牌都自动
       * 更新有效期到 NON_AUTO_LOGIN_EXPIRES_IN 秒后
       */
      storage.remove(LOCALSTORAGE_USER_AUTH_INFO)
      storage.set(
        LOCALSTORAGE_USER_AUTH_INFO,
        auth,
        Date.now() + NON_AUTO_LOGIN_EXPIRES_IN * 1000
      )
    }
    return auth.access_token
  },

  // 获取用户信息
  getUserInfo({ auth, userInfo }) {
    // @TODO: 小5 - 接入用户信息接口
    return {
      id: userInfo.id || (auth.user ? auth.user.id : ''),
      name: userInfo.name || (auth.user ? auth.user.mobile : ''),
      avatar: userInfo.avatar || '',
      role: userInfo.role || '',
      mobile: userInfo.mobile || (auth.user ? auth.user.mobile : '')
    }
  },

  // 获取用户权限
  getUserPermissions({ userPermissions }, _, rootState) {
    // 暂时写死大赛管理员比分赛区管理员多的权限
    const role = path(rootState, 'match.current.role')

    // @TODO: 小5 - 接入用户权限接口
    return role === 'match_admin'
      ? [
          'menu_match_setting_edit',
          'menu_match_setting_personalization',
          'menu_enroll_additional',
          'menu_enroll_fee',
          'menu_vote_setting',
          'menu_vote_option',
          'menu_vote_virtual_gift',
          'menu_vote_real_gift',
          'menu_organization_manage',
          'menu_feedback_complaint',

          'module_match_setting_edit',
          'module_match_setting_personalization',
          'module_enroll_additional',
          'module_enroll_fee',
          'module_vote_setting',
          'module_vote_option',
          'module_vote_gift',
          'module_feedback_complaint',
          'module_enroll_form_edit',

          'zone_create',
          'zone_admin_operate',

          'dashboard_organization_total'
        ]
      : []
  }
}

export const mutations = {
  // 重置 state
  RESET_STATE(state) {
    Object.assign(state, initData())
  },

  // 初始化登录态
  INIT_AUTH_INFO(state) {
    state.auth = {
      access_token: '',
      user: '',
      /**
       * 一定要为 undefined 作为初始值，这样才能在 getAccessToken 中正确区分
       * 是用户手动勾选的不自动登录还是程序刚启动时赋予的默认值，避免无端被
       * 清除 localStorage 中的 user_auth_info
       */
      auto_login: undefined
    }
  },

  // 更新登录态
  UPDATE_AUTH_INFO(state, auth) {
    state.auth.access_token = auth.access_token
    state.auth.user = auth.user
    state.auth.auto_login = auth.auto_login
  },

  // 设置用户权限集
  SET_USER_PERMISSIONS(state, permissions) {
    Object.assign(state, {
      userPermissions: [...permissions]
    })
  },

  // 更新浏览器版本提醒状态
  UPDATE_BROWSER_PROMPT_STATUS(state) {
    state.hasPromptAboutBrowser = true
  }
}

export const actions = {
  // 初始化用户 state
  initUserState({ commit }) {
    commit('RESET_STATE')
    commit('INIT_AUTH_INFO')

    // 自动从 localStorage 加载令牌
    const authInfo = storage.get(LOCALSTORAGE_USER_AUTH_INFO)
    if (authInfo) {
      commit('UPDATE_AUTH_INFO', authInfo)
    }
  },

  // 登录
  saveAuthInfo({ commit }, { authInfo, isEnableAutoLogin }) {
    const { expires_in = 7 * 24 * 3600, access_token, user } = authInfo
    const _authInfo = {
      access_token,
      user,
      auto_login: isEnableAutoLogin
    }

    commit('UPDATE_AUTH_INFO', _authInfo)

    /**
     * 如果自动登录，则令牌将在本地保存服务器返回的时间长度（秒为单位），否则，将在本地
     * 保存 NON_AUTO_LOGIN_EXPIRES_IN 秒（注意；每次在本地通过 getter 获取一次令牌，
     * 有效期都会自动刷新到获取时的 NON_AUTO_LOGIN_EXPIRES_IN 秒之后）
     */
    const _expires_in = isEnableAutoLogin
      ? expires_in
      : NON_AUTO_LOGIN_EXPIRES_IN
    // 将令牌保存到 localStorage
    storage.set(
      LOCALSTORAGE_USER_AUTH_INFO,
      _authInfo,
      Date.now() + _expires_in * 1000
    )
  },

  // 清除登录态，包括 localStorage 和 State
  flushAuthInfo({ commit }) {
    /**
     * 注意代码有先后顺序，因为 initUserState 会从 localStorage
     * 加载令牌，所以要先清除 localStorage
     */
    storage.remove(LOCALSTORAGE_USER_AUTH_INFO)
    actions.initUserState({ commit })
  },

  // 退出登录
  logout({ commit }) {
    actions.flushAuthInfo({ commit })
    window.location.href = '/login'
  }
}
