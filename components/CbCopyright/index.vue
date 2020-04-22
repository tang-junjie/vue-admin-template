<!-- 组件：页脚版权 -->

<template>
  <div class="cb-copyright" :style="positionStyle">
    Copyright &copy;
    <a href="/">{{ $store.state.env.oem.copyright }}</a>
  </div>
</template>

<script>
export default {
  props: {
    // 定位方式
    position: {
      type: String,
      default: 'absolute'
    },

    // 距离父容器的底部距离
    bottom: {
      type: String,
      default: '-40'
    }
  },

  computed: {
    // 定位样式
    positionStyle() {
      return {
        position: this.position,
        bottom: `${this.bottom}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cb-copyright {
  position: absolute;
  bottom: -40px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);

  a {
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.45);
    text-decoration: none;
  }
}
</style>
