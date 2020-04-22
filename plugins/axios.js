// Axios 文档: https://axios.nuxtjs.org/usage

/**
 * Axios 在请求流程设计上的几点原则：
 *
 * 1. 所有软错误的 error_message 错误信息不一定要 toast 出来，譬如登录、注册失败，
 *    这些 error_message 将会被显示在表单元素附近，所以需要在 reject 错误参数时
 *    附带回调函数 hideToast 让开发者在 api 调用处的 catch 回调中控制是否 toast。
 *    默认情况下，所有的错误信息都会被 toast 出来。
 * 2. 所有的 http 错误也不一定都要展示错误信息，处理方式同上 —— 提供回调函数由开发者
 *    决定是否展示错误信息。
 * 3. 所有的错误流程均要让 api 调用处的代码进入 catch 流程。
 *
 * 名词解析：
 * a. 软错误：指 http 请求的状态码为 200 但 response.data.error 不为零的情况
 * b. http 错误：指 http 请求的状态码不为 200 的情况
 *
 * 调用示例：
 *
 * this.$api.common.login({
 *   mobile,
 *   password
 * }).then(({ data }) => {
 *   // 正常流程
 * }, ({ error, hideToast }) => {
 *   // axios 请求过程出错会进入该流程，而该 then 回调中的其他出错会进入下一个 catch
 *   // axios 异常流程
 * })
 * .catch(e => {
 *   // 上一个 then 里的异常流程
 * })
 * .finally(() => {
 *   // 收尾工作
 * })
 *
 */

import Vue from 'vue'

const BASE_URL = '/api' // API 路径前缀
const REQUEST_TIMEOUT = 1000 * 20 // 请求超时时间

export default function({ $axios, store, route, redirect }) {
  $axios.onRequest(config => {
    config.baseURL = BASE_URL
    config.timeout = REQUEST_TIMEOUT
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    config.headers.common.Authorization =
      'Bearer ' + store.getters['user/getAccessToken']

    // 获取对应 http 请求方式 payload 的键名
    const payloadKeyName = config.method === 'get' ? 'params' : 'data'
    // 合并当前全局已选大赛的 id 到请求参数上
    const match_id = store.$utils.path(store, 'state.match.current.id')
    if (match_id) {
      // 对应 payload 有可能为 undefined，所以要判断是否要赋空对象以避免 Object.assign 出错
      !config[payloadKeyName] && (config[payloadKeyName] = {})

      Object.assign(config[payloadKeyName], {
        match_id
      })
    }

    return config
  })

  $axios.onResponse(response => {
    // Blob 类型、纯文本类型（一般是 csv 文件下载）、应用类型（一般是应用程序文档如 xls 下载）的响应也要直接返回
    if (
      store.$utils.path(response, 'data.error_code') === 0 ||
      response.headers['content-type'].indexOf('text/plain') !== -1 ||
      response.headers['content-type'].indexOf('application/vnd.ms-excel') !==
        -1 ||
      response.data instanceof Blob
    ) {
      // 判断返回原始响应还是返回数据
      const isRaw =
        store.$utils.path(response.config, 'params.return_raw_response') === 1
      return Promise.resolve(isRaw ? response : response.data)
    } else {
      return Promise.reject(response.data)
    }
  })

  $axios.onError(error => {
    // 非 HTTP 200 时 error.response 不为 undefined
    if (error.response) {
      switch (error.response.status) {
        // 令牌无效
        case 401: {
          // 退出登录
          store.dispatch('user/flushAuthInfo')

          // 重定向到登录页面，并保存登录前的页面地址
          return redirect('/login', {
            fe_router_callback: encodeURIComponent(route.fullPath)
          })
        }

        case 404: {
          error.error_message = '资源不存在'
          break
        }

        default: {
          error.error_message = '服务器开小差了，稍后再试吧'
        }
      }
    } else if (typeof error.message === 'string') {
      // 如果错误类型是 Axios 请求流程抛出的错误
      if (error.message === 'Network Error') {
        error.error_message = '网络异常，稍后再试吧'
      } else if (error.message.indexOf('timeout') === 0) {
        error.error_message = '请求超时，稍后再试吧'
      }
    }

    const timer = setTimeout(() => {
      Vue.prototype.$message.error(
        error.error_message || '未知异常，稍后再试吧'
      )
    })

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      error,
      // 用于在业务页面控制是否显示轻提示
      hideToast() {
        clearTimeout(timer)
      }
    })
  })
}
