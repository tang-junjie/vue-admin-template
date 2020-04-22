import service from './service'

export default {
  install(Vue) {
    Vue.prototype.$qrcode = service
  }
}
