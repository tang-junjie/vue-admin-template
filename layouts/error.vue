<!-- 错误信息布局 -->

<template>
  <div class="page-error">
    <div class="image">
      <img :src="errorConfig[errorCode].image" />
    </div>
    <div class="content">
      <h1>{{ errorConfig[errorCode].title }}</h1>
      <div class="description">
        {{ errorConfig[errorCode].description }}
      </div>
      <div class="action">
        <a-button type="primary" @click="$router.push('/')">
          返回首页
        </a-button>
        <a-button @click="reloadPage">
          刷新
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      // 错误类型预设文案图标配置
      errorConfig: {
        403: {
          title: '403',
          image: require('!url-loader?limit=15000!@/static/images/common/403.png'),
          description: '抱歉，你无权访问该页面'
        },
        404: {
          title: '404',
          image: require('!url-loader?limit=15000!@/static/images/common/404.png'),
          description: '抱歉，你访问的页面不存在'
        },
        500: {
          title: '500',
          image: require('!url-loader?limit=15000!@/static/images/common/500.png'),
          description: '抱歉，内部发生异常'
        }
      }
    }
  },

  computed: {
    // 获取错误码的 computed 属性
    errorCode() {
      return this.error.statusCode
    }
  },

  mounted() {
    // 隐藏 no-sidebar 布局中的 banner，以免影响视觉效果
    const dom = document.getElementsByClassName('layout-banner')[0]
    dom && (dom.style.display = 'none')
    // 销毁 onmousemove 监听器
    document.body.onmousemove = null
  },

  methods: {
    // 重载页面
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.page-error {
  padding-top: 120px;
  .flex;

  .image {
    padding-right: 24px;

    img {
      height: 300px;
      max-width: 300px;
    }
  }

  .content {
    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
    }

    .description {
      margin-bottom: 24px;
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.45);
    }

    .action button {
      width: 120px;

      &:first-child {
        margin-right: 8px;
      }
    }
  }
}
</style>
