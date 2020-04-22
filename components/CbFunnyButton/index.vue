<!-- 组件：有意思的大按钮 -->

<template>
  <div class="cb-funny-button" :style="buttonStyleObj">
    <slot>
      <a-icon :type="iconName" :style="iconStyleObj" />
      <p v-if="title" v-text="title" />
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    // 按钮宽度
    width: {
      type: String,
      default: '320'
    },

    // 按钮高度
    height: {
      type: String,
      default: '240'
    },

    // 按钮标题
    title: {
      type: String,
      default: ''
    },

    // 图标名称
    iconName: {
      type: String,
      default: 'plus-circle'
    },

    // 图标大小
    iconSize: {
      type: String,
      default: '64'
    }
  },

  computed: {
    // 合成按钮样式对象
    buttonStyleObj() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`
      }
    },

    // 合成按钮图标样式对象
    iconStyleObj() {
      return {
        marginTop: `${this.title ? '24px' : '0'}`,
        fontSize: `${this.iconSize}px`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cb-funny-button {
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 4px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  .flex();
  flex-direction: column;
  .transition;

  &:hover {
    .anticon,
    p {
      color: @primary-color;
    }
  }

  .anticon {
    color: @text-color-1;
    .transition(color);
  }

  p {
    margin-top: 12px;
    color: @text-color-1;
    .transition(color);
  }
}
</style>
