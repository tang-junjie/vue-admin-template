<!-- 移动端预览组件 -->

<template>
  <div class="cb-mobile-preview">
    <div class="iphone">
      <div class="buttons">
        <div class="silent" />
        <div class="sleep" />
        <div class="vol-up" />
        <div class="vol-down" />
      </div>
      <div class="top">
        <div class="bg" />
        <div class="components">
          <div class="speaker" />
          <div class="camera">
            <div class="shine-left" />
            <div class="shine-right" />
          </div>
        </div>
      </div>
      <div class="decoration-top-bar" />
      <div class="decoration-bottom-bar" />
      <div class="screen">
        <div class="service">
          <div class="bar" />
          <div class="bar" />
          <div class="bar" />
          <div class="bar" />
        </div>
        <div class="carrier">
          大赛
        </div>
        <div class="battery">
          <div class="nub" />
          <div class="energy" />
        </div>

        <div class="iframe-wrap">
          <iframe ref="iframe" :src="initialSrc" frameborder="no" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const IFRAME_REFRESH_DELAY = 300 // iframe 更新延迟时间，单位：ms

export default {
  props: {
    // 待预览的页面地址，默认是首页
    src: {
      type: String,
      default() {
        return `home`
      }
    },

    // 待预览的数据行为类型，用于给 H5 标识，接收不同的类型做不同的操作
    dataType: {
      type: String,
      default: ''
    },

    // 待预览的数据，即准备 postMessage 到 iframe 中的数据
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      updateMatchDetail: () => {}, // 延迟封装后的 iframe 内容更新函数
      iframeInstance: null, // iframe 实例
      isIframeLoaded: false, // iframe 内容是否加载完毕
      initialSrc: '',
      matchId: this.$route.query.match_id || '' // 大赛 id
    }
  },

  watch: {
    // 监听预览数据变化
    data() {
      this.updateMatchDetail()
    },
    src: {
      handler: 'initSrcHandler',
      immediate: true
    }
  },

  mounted() {
    // nextTick 中确保能通过 ref 取到 DOM
    this.$nextTick(() => {
      const iframeInstance = (this.iframeInstance = this.$refs.iframe)
      // 监听 iframe onload 事件
      iframeInstance.onload = this.onIframeLoaded
    })

    // 构建 iframe 更新延迟函数
    this.updateMatchDetail = this.$utils.throttle(
      this._updateMatchDetail,
      IFRAME_REFRESH_DELAY
    )
  },

  methods: {
    // 初始化 iframe 地址处理
    initSrcHandler() {
      const isProd = this.$configs.isProd // 是否是正服线上环境
      let src

      if (this.src) {
        const base = `${this.$store.state.env.h5Domain}/${this.__global__match
          .id || this.matchId}/` // 通过加载指定测服或正服的大赛实现实时预览功能

        switch (this.src) {
          // 首页
          case 'home':
            src = `${base}match`
            break
          // 选手主页
          case 'player-home':
            src = `${base}player/${isProd ? 8851 : 8359}`
            break
          default:
            break
        }
      } else {
        src = `${this.$store.state.env.h5Domain}/preview/match` // 为空则是创建大赛之前的预览链接
      }

      this.initialSrc = src + '?preview=1' // preview=1 是给 H5 的标识，表示正在实时预览
    },

    // iframe 内容加载完毕回调
    onIframeLoaded() {
      this.isIframeLoaded = true
      this.updateMatchDetail()
    },

    // 更新 iframe 内容数据
    _updateMatchDetail() {
      // 仅在 iframe 加载完毕才 postMessage
      if (this.iframeInstance && this.isIframeLoaded) {
        const message = {
          post_message_type: this.dataType,
          ...this.data,
          description: this.data.description || ''
        }

        console.info('postMessage: ', message)

        this.iframeInstance.contentWindow.postMessage(
          message,
          this.$store.state.env.h5Domain
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cb-mobile-preview {
  height: 640px;
  width: 320px;

  .iframe-wrap {
    overflow: hidden;
    padding-top: 24px;
    height: 100%;
    width: 100%;
    background-color: #fff;

    iframe {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }

  .iphone {
    height: 100%;
    width: 100%;
    background: #111;
    border: 4px solid #3d3d3d;
    border-radius: 40px;
    box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999,
      0 0 15px 0 rgba(0, 0, 0, 0.7);
    transform: scale(1);
    .flex;

    .buttons {
      .silent,
      .vol-up,
      .vol-down,
      .sleep {
        position: absolute;
        background: #111;
        border-radius: 2px 0 0 2px;
      }
      .silent {
        height: 24px;
        width: 3px;
        top: 88px;
        left: -7px;
      }
      .vol-up,
      .vol-down {
        left: -7px;
        height: 40px;
        width: 3px;
      }
      .vol-up {
        top: 136px;
      }
      .vol-down {
        top: 188px;
      }
      .sleep {
        left: auto;
        right: -7px;
        top: 144px;
        height: 50px;
        width: 3px;
        border-radius: 0 2px 2px 0;
      }
    }

    .top {
      position: absolute;
      z-index: 4;
      width: 100%;
      top: 4px;
      .flex;

      .bg {
        position: relative;
        z-index: 2;
        margin-right: -6px;
        width: 48%;
        height: 25px;
        border-radius: 0 0 14px 14px;
        background: #111;
        .flex;
      }

      .components {
        position: absolute;
        top: 6px;
        padding-left: 6px;
        .flex;

        .speaker {
          height: 4px;
          width: 50px;
          margin: 0 20px;
          border-radius: 6px;
          border-bottom: 1px solid #333;
          background: #222;
          z-index: 100;
        }

        .camera {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          border-bottom: 1px solid #444;
          background: radial-gradient(black, #333);
          opacity: 0.5;
          z-index: 4;

          .shine-left {
            position: absolute;
            height: 8px;
            width: 8px;
            margin: 2px;
            border-left: 4px solid dodgerblue;
            border-right: transparent;
            background: black;
            border-radius: 50%;
            filter: blur(1.8px);

            &:before {
              content: '';
              position: absolute;
              right: 0;
              height: 6px;
              width: 6px;
              border-right: 2px solid white;
              border-radius: 3px;
            }
          }
        }
      }
    }

    .decoration-top-bar,
    .decoration-bottom-bar {
      position: absolute;
      left: -4px;
      height: 15px;
      width: 320px;
      border-left: 5px solid #111;
      border-right: 5px solid #111;
    }

    .decoration-top-bar {
      top: 60px;
    }

    .decoration-bottom-bar {
      bottom: 64px;
    }

    .screen {
      position: absolute;
      height: calc(100% - 12px);
      width: calc(100% - 12px);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      overflow: hidden;

      .service {
        position: absolute;
        top: 7px;
        left: 16px;
        height: 10px;
        width: 18px;
        .flex(space-between, flex-end);

        .bar {
          width: 3px;
          display: flex;
          border-radius: 1px;
          background: #444;

          &:first-child {
            height: 2px;
          }
          &:nth-child(2) {
            height: 4px;
          }
          &:nth-child(3) {
            height: 7px;
          }
          &:last-child {
            height: 10px;
          }
        }
      }

      .carrier {
        position: absolute;
        top: 2px;
        left: 40px;
        font-size: 12px;
        color: #000;
        transform: scale(0.95);
      }

      .battery {
        position: absolute;
        top: 6px;
        right: 30px;
        height: 12px;
        width: 24px;
        border: 1px solid #444;
        border-radius: 2px;
        display: flex;
        align-items: center;

        .nub {
          position: absolute;
          background: #444;
          top: 2px;
          right: -3px;
          height: 6px;
          width: 2px;
          border-radius: 0 4px 4px 0;
        }

        .energy {
          position: absolute;
          background: #444;
          left: 1px;
          height: 8px;
          width: 16px;
          border-radius: 1px 0 0 1px;
        }
      }
    }
  }
}
</style>
