<!-- 空白布局，一般用于无鉴权页面，譬如登录 -->

<template>
  <a-locale-provider :locale="zh_CN">
    <nuxt />
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data() {
    return {
      zh_CN
    }
  }
}
</script>
