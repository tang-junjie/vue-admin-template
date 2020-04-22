import webpack from 'webpack'

/**
 * Nuxt.js 框架配置，文档：https://zh.nuxtjs.org/api
 */
export default {
  /**
   * 构建模式
   */
  mode: 'spa',

  /**
   * 自定义页面头部
   */
  head: {
    title: '组委会管理后台 - 大赛系统',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '好赛擂大赛系统, 国内首家无纸化赛事活动报名管理运营工具'
      }
    ],
    script: [
      { src: '//at.alicdn.com/t/font_1263107_ze1b3pe723f.js', async: 'async' }
    ]
  },

  /**
   * 自定义加载指示器样式
   */
  loading: { color: '#409eff' },
  loadingIndicator: {
    name: '@/static/loading.html'
  },

  /*
   ** 全局样式
   */
  css: ['@/assets/less/main.less', '@/assets/less/antd-ui.less'],

  /**
   * 注册模块，作用于 nuxt 初始化前
   */
  modules: [
    // 文档: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // 文档: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // 文档: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // 文档: https://zh.nuxtjs.org/api/configuration-build#styleresources
    '@nuxtjs/style-resources',
    // 文档: https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry'
  ],

  /**
   * http-proxy 中间件本地代理调试配置
   */
  proxy: {
    '/api': {
      target:
        process.env.NODE_ENV === 'production'
          ? 'https://manage.haosailei.cn'
          : 'http://dev-manage.haosailei.cn'
    }
  },

  /**
   * sentry 错误采集配置
   */
  sentry: {
    dsn: 'https://2c285686706f4878a8ddb85625c8052b@sentry.tongxinghui.com/15', // sentry 日志上报地址
    disabled: process.env.NODE_ENV === 'development', // 开发模式下错误告警不被记录到 sentry
    publishRelease: process.env.SENTRY_RELEASE === 'true' // 仅在执行名称为 sentry-release 的 npm 任务时才上传 sourceMap 到 sentry
  },

  /**
   * styleResources 模块配置
   */
  styleResources: {
    less: ['./assets/less/variables.less', './assets/less/mixins.less']
  },

  /**
   * 注册插件，作用于 Nuxt 初始后
   */
  plugins: [
    'antd-ui',
    'api',
    'axios',
    'inject',
    'vue/component',
    'vue/config'
  ].map(fileName => '@/plugins/' + fileName),

  /**
   * 路由中间件，有顺序限制，按照数组下标顺序加载
   */
  router: {
    middleware: ['auth', 'permission', 'env', 'browser']
  },

  /**
   * build 配置，文档: https://zh.nuxtjs.org/api/configuration-build
   */
  build: {
    babel: {
      plugins: [
        // 配置 Ant Design of Vue 按需加载
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true // `style: true` 会加载 less 文件
          }
        ]
      ]
    },

    extend(
      config,
      {
        loaders: { less }
      }
    ) {
      config.plugins.push(
        new webpack.ContextReplacementPlugin(
          /moment[\\/]locale$/,
          /^\.\/(zh-cn|en-us)$/
        )
      )

      // 解决导入 exceljs 时出现的 cannot find module "fs" 的问题
      config.node = { fs: 'empty' }

      /**
       * 开启 Less 行内 JavaScript 支持
       * https://ant.design/docs/react/customize-theme-cn#在-webpack-中定制主题
       */
      less.javascriptEnabled = true
      less.modifyVars = {
        ...less.modifyVars,
        'primary-color': '#409eff'
      }
    }
  },

  server: {
    port: 3002 // default: 3000
  }
}
