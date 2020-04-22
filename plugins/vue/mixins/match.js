// 大赛 Mixin，用于全局混入当前已选择大赛的信息

import { mapState } from 'vuex'

export default {
  computed: {
    // 从 store 中映射当前已选大赛的信息
    ...mapState('match', {
      __global__match: 'current'
    })
  }
}
