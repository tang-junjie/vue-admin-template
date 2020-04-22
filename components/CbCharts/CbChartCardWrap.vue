<!-- 组件：图表卡片容器 -->

<template>
  <a-card class="cb-chart-card" :loading="loading">
    <div class="cb-chart-card__header">
      <div class="meta">
        <span class="title">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <span class="action">
          <slot name="action"></slot>
        </span>
      </div>
      <div class="total">
        <slot name="total">
          <span>{{ total }}</span>
        </slot>
      </div>
    </div>

    <div v-if="$slots.default" class="cb-chart-card__content">
      <div class="content-fixed">
        <slot></slot>
      </div>
    </div>

    <div class="cb-chart-card__footer">
      <slot name="footer"></slot>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },

    // 数值
    total: {
      type: String,
      default: ''
    },

    // 加载状态
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.cb-chart-card {
  /deep/ .ant-card-body {
    padding: 16px 24px 12px;
  }

  &__header {
    position: relative;
    overflow: hidden;
    width: 100%;

    .meta {
      position: relative;
      overflow: hidden;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      color: @text-color-2;

      .action {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }

    .total {
      margin: 4px 0 0 0;
      font-size: 30px;
      color: @text-color-3;
      .text-vertical-align(40px);
      .text-ellipsis;
    }
  }

  &__content {
    margin-bottom: 12px;
    position: relative;
    height: 32px;
    width: 100%;

    .content-fixed {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }

  &__footer {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #e8e8e8;
    .text-ellipsis;
  }
}
</style>
