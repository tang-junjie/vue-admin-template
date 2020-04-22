<!-- 组件：Iconfont -->

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + name" />
  </svg>
</template>

<script>
export default {
  props: {
    // 图标名称，即 iconfont 项目的图标名
    name: {
      default: '',
      type: String
    }
  }
}
</script>
