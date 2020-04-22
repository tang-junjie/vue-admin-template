<!-- 组件：状态原点，一般用于表格 -->

<template>
  <div class="cb-status-dot">
    <div :class="['dot', color]" :style="dotStyle" />
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 颜色值
    color: {
      type: String,
      default: 'gray'
    },

    // 原点尺寸
    size: {
      type: Number,
      default: 6
    }
  },

  computed: {
    // 原点样式
    dotStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cb-status-dot {
  display: block;
  .flex(flex-start);

  .dot {
    margin-right: 4px;
    border-radius: 50%;
    .color-table;
  }
}
</style>
