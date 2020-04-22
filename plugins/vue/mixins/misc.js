// 杂项 Mixin，用于全局混入一些琐碎但又高频用到的东西

import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('result', {
      __global__navToResultPage: 'navToResultPage'
    })
  }
}
