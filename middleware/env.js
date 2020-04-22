/**
 * 前端配置获取中间件
 * 说明：只有获取到前端配置才能进入页面，避免出现异常
 */

export default function({ store }) {
  if (!store.state.env.hasLoaded) {
    return store.$api.common.getFrontendConfig().then(({ data }) => {
      const env = store.state.env

      store.commit('env/SET_STATE', {
        hasLoaded: true,
        qiniuDomain: data.qiniu_url || env.qiniuDomain,
        h5Domain: data.frontend_url || env.h5Domain,
        oem: data.oem || env.oem
      })
    })
  }
}
