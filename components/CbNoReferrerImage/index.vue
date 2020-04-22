<!-- 组件：无 referrer 方式请求图片，用于图片盗链 -->

<template>
  <iframe
    :id="randomId"
    :width="width"
    :height="height"
    class="cb-no-referrer-image"
    frameborder="0"
    scrolling="no"
  />
</template>

<script>
export default {
  props: {
    // 图片 URL
    url: {
      default: '',
      type: String
    },
    // 图片宽度
    width: {
      default: 80,
      type: Number
    },
    // 图片高度
    height: {
      default: 80,
      type: Number
    },
    // 是否使用 https 以避免跨域
    secure: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      // 随机 ID，避免通过 document.getElementById 获取到错误节点
      randomId: 'cb-no-referrer-image-' + Math.random()
    }
  },

  mounted() {
    const iframe = document.getElementById(this.randomId)

    if (iframe) {
      const iframeDocument = iframe.contentDocument
      const iframeBody = iframeDocument.body
      iframeBody.style.margin = '0'

      const image = document.createElement('img')
      image.width = this.width
      image.height = this.height
      image.src = this.url.replace('http:', this.secure ? 'https:' : 'http:')
      iframeBody.appendChild(image)
    }
  }
}
</script>
