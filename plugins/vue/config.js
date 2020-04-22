// Vue 的框架配置、第三方组件等相关内容

import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import userMixin from './mixins/user'
import matchMixin from './mixins/match'
import miscMixin from './mixins/misc'
import directives from './directives'
import './filters'

Vue.use(VueClipboard)
Vue.mixin(userMixin)
Vue.mixin(matchMixin)
Vue.mixin(miscMixin)

export default context => {
  directives(context)
}
