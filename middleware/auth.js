/**
 * 登录鉴权中间件
 */

// 免鉴权的页面白名单
const nonAuthList = ['/login', '/login/', '/agreement', '/agreement/']
// 有令牌的情况下需要自动跳过的页面白名单
const autoRedirectList = ['/login', '/login/']

export default function({ store, route, redirect }) {
  if (!store.getters['user/getAccessToken']) {
    // 如果 state 中没有用户的令牌，则尝试从 localStorage 中加载
    store.dispatch('user/initUserState')

    // 重新判断这回是否还能获取到令牌
    if (!store.getters['user/getAccessToken']) {
      // 如果不能获取到令牌且不是免登陆页面，则重定向到登录页面，并保存登录前的页面地址
      if (!nonAuthList.includes(route.path)) {
        return redirect('/login', {
          fe_router_callback: encodeURIComponent(route.fullPath)
        })
      }
    }
  }

  // 如果用户的令牌存在，但是前往页面是【有令牌时需要自动跳过】的页面
  if (
    store.getters['user/getAccessToken'] &&
    autoRedirectList.includes(route.path)
  ) {
    redirect('/')
  }
}
