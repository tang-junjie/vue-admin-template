<template>
  <div class="cb-meiqia" title="联系客服" @click="onService">
    <a-icon type="customer-service" />
  </div>
</template>

<script>
export default {
  created() {
    this.initMeiqia()
  },

  methods: {
    // 初始化美洽客服
    initMeiqia() {
      /* eslint-disable */
      ;(function(m, ei, q, i, a, j, s) {
        m[i] =
          m[i] ||
          function() {
            ;(m[i].a = m[i].a || []).push(arguments)
          }
        ;(j = ei.createElement(q)), (s = ei.getElementsByTagName(q)[0])
        j.async = true
        j.charset = 'UTF-8'
        j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t'
        s.parentNode.insertBefore(j, s)
      })(window, document, 'script', '_MEIQIA')
      _MEIQIA('entId', '139262')
      _MEIQIA('withoutBtn') // 在这里开启无按钮模式（常规情况下，需要紧跟在美洽嵌入代码之后）
      /* eslint-enable */
    },

    // 点击客服事件
    onService() {
      window._MEIQIA('showPanel') // 显示美洽聊天窗
    }
  }
}
</script>

<style lang="less" scoped>
.cb-meiqia {
  position: fixed;
  right: 24px;
  bottom: 80px;
  z-index: 10;
  width: 40px;
  height: 40px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 50%;
  cursor: pointer;
  .flex;

  i {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
