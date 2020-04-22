<!-- 无菜单布局，一般用于大赛编辑页面 -->

<template>
  <a-locale-provider :locale="zh_CN">
    <div class="layout-no-sidebar">
      <div class="layout-banner">
        <img
          id="bg-ballons"
          src="//cdn.haosailei.cn/frontend/dashboard/resource/image/match-list/bg-ballon.png"
        />
      </div>

      <div class="layout-header">
        <a class="layout-header__logo" href="/">
          <img :src="$store.state.env.oem.main_logo" />
          <h1>{{ $store.state.env.oem.name }}</h1>
        </a>

        <div class="layout-header__actions">
          <a-input
            v-if="isShowMatchSearcher"
            v-model="searchKeyword"
            class="searcher"
            placeholder="搜索大赛"
            @input="onSearchDebounce"
            @keyup.enter="onSearch"
          >
            <a-icon
              v-if="!searchKeyword"
              slot="suffix"
              type="search"
              @click="onSearch"
            />
            <a-icon
              v-else
              slot="suffix"
              type="close-circle"
              @click="quitSearchMode"
            />
          </a-input>
          <cb-header-user-action />
        </div>
      </div>

      <nuxt />
      <cb-meiqia />
    </div>
  </a-locale-provider>
</template>

<script>
import { mapMutations } from 'vuex'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data() {
    return {
      zh_CN, // 中文语言包
      onSearchMatchesCallback: () => {}, // 准备指向 /match/index.vue 里的 onSearchMatches 函数
      onSearchDebounce: () => {}, // 大赛搜索 800ms 延迟函数
      searchKeyword: '' // 搜索关键字
    }
  },

  computed: {
    // 是否显示大赛搜索器
    isShowMatchSearcher() {
      // 仅在大赛列表页才显示大赛搜索器
      return /^\/match-list\/?$/.test(this.$route.path)
    }
  },

  mounted() {
    // 初始化视差效果监听
    this.initMouseMoveEffect()

    // 初始化大赛搜索 800ms 延迟函数
    this.onSearchDebounce = this.$utils.debounce(this.onSearch, 800)

    // 等待子组件挂载完毕
    this.$nextTick(this.getMatchSearcherCallback)
  },

  destroyed() {
    // 记得销毁 onmousemove 监听器，避免内存泄漏
    document.body.onmousemove = null
  },

  methods: {
    ...mapMutations('match', {
      updateMatchListSearchStatus: 'UPDATE_MATCH_LIST_SEARCH_STATUS'
    }),

    // 视差效果
    initMouseMoveEffect() {
      const target = document.getElementById('bg-ballons')
      document.body.onmousemove = function(event) {
        target.style.marginLeft = -event.clientX / 100 + 'px'
        target.style.marginTop = -event.clientY / 80 + 'px'
      }
    },

    // @Deprecated: 从子组件查找大赛搜索器的回调函数，注：此处设计不太好，和子组件耦合了
    getMatchSearcherCallback() {
      if (this !== null) {
        // 初始化广度优先队列数组
        const queue = [this]

        while (queue.length !== 0) {
          const item = queue.pop()

          // 查看当前遍历到的子组件实例上是否有 onSearchMatches 函数
          if (typeof item.onSearchMatches === 'function') {
            this.onSearchMatchesCallback = item.onSearchMatches
            return
          } else {
            item.$children.forEach(item => queue.unshift(item))
          }
        }
      }
    },

    // 大赛搜索回调
    onSearch() {
      // 将大赛列表搜索状态存储到全局 store 上
      this.updateMatchListSearchStatus(!!this.searchKeyword)

      // 调用子组件的大赛搜索回调函数
      this.onSearchMatchesCallback(this.searchKeyword)
    },

    // 退出搜索模式
    quitSearchMode() {
      this.searchKeyword = ''
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.layout-no-sidebar {
  overflow-x: hidden;
  position: relative;
  height: 100%;

  .layout-banner {
    overflow: hidden;
    position: absolute;
    top: 64px;
    left: 0;
    z-index: -1;
    height: 56%;
    width: 100%;
    background: linear-gradient(
      270deg,
      rgba(161, 196, 253, 1) 0%,
      rgba(64, 158, 255, 1) 100%
    );

    #bg-ballons {
      position: absolute;
      top: -10px;
      left: 50%;
      width: 95%;
      transform: translateX(-50%);
    }
  }

  .layout-header {
    padding: 0 32px;
    height: 64px;
    background-color: #fff;
    .flex(space-between, center);

    &__logo {
      text-decoration: none;
      .flex;

      img {
        width: 38px;
      }

      h1 {
        margin: -2px 0 0 20px;
        color: @text-color-3;
        font-size: 20px;
      }
    }

    &__actions {
      .flex;

      .searcher {
        margin-right: 24px;

        /deep/ .ant-input {
          width: 144px;
          outline: none;
          border-radius: 16px;
          border-color: #eee;

          &:hover {
            border-color: #eee;
          }

          &:focus {
            width: 256px;
            box-shadow: none;
            border-color: #eee;
            background-color: #f1f3f4;

            & + .ant-input-suffix {
              .anticon {
                color: rgba(0, 0, 0, 0.3);
              }
            }
          }
        }

        /deep/ .anticon {
          color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          .transition;
        }
      }
    }
  }
}
</style>
