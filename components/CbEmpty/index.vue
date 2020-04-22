<!-- 组件：无数据、空白提示 -->

<template>
  <div class="cb-empty" :style="styleObj">
    <cb-icon name="empty" />
    <div class="cb-empty__text" v-text="hint" />
  </div>
</template>

<script>
export default {
  props: {
    // 提示文案
    hint: {
      type: String,
      default: '暂无相关信息'
    },

    // 上边距
    top: {
      type: String,
      default: '0'
    }
  },

  computed: {
    styleObj() {
      return {
        marginTop: this.top + 'px'
      }
    }
  }
}
</script>

<style lang="less">
.cb-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .icon {
    color: @text-color-1;
    font-size: 110px;
  }

  .cb-empty__text {
    margin-top: 10px;
    font-size: 14px;
    color: @text-color-1;
  }
}
</style>
