<!-- 组件：结果信息 -->

<template>
  <div class="cb-result">
    <a-icon :class="[type]" :type="typeIcon" />
    <div class="cb-result__title" v-text="title" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="cb-result__description" v-html="description" />
    <div v-if="$slots.default" class="cb-result__content">
      <slot />
    </div>
    <div v-if="$slots.action" class="cb-result__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
// 类型与 antd 图标对应关系
const typeIconMap = {
  info: 'info-circle',
  wait: 'clock-circle',
  success: 'check-circle',
  question: 'question-circle',
  warning: 'exclamation-circle',
  error: 'close-circle'
}

export default {
  props: {
    // 提示类型，取值如 typeIconMap 枚举的键名所示
    type: {
      type: String,
      default: ''
    },

    // 标题
    title: {
      type: String,
      default: ''
    },

    // 描述
    description: {
      type: String,
      default: ''
    }
  },

  computed: {
    // 结果类型对应的图标
    typeIcon() {
      return typeIconMap[this.type] || typeIconMap.info
    }
  }
}
</script>

<style lang="less" scoped>
.cb-result {
  margin: 0 auto;
  text-align: center;

  > .anticon {
    margin-bottom: 24px;
    font-size: 72px;
    line-height: 72px;
    color: @primary-color;
  }

  .success {
    color: @color-green;
  }

  .question {
    color: @color-orange;
  }

  .warning {
    color: @color-orange;
  }

  .error {
    color: @color-red;
  }

  &__title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.85);
  }

  &__description {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
  }

  &__content {
    margin-bottom: 32px;
    padding: 24px 40px;
    border-radius: 2px;
    text-align: left;
    background: #fafafa;
  }
}
</style>
