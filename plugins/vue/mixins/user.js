// 用户信息 Mixin，用于全局混入当前登录用户的信息

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', {
      __global__user: 'getUserInfo'
    })
  }
}
