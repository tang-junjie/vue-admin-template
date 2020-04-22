<!-- 组件：消息通知 -->

<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    :auto-adjust-overflow="true"
    :arrow-point-at-center="true"
    overlay-class-name="header-notice-wrapper"
  >
    <template slot="content">
      <a-tabs v-loading="loading">
        <a-tab-pane key="notice" tab="通知">
          <a-list>
            <!-- <a-list-item>
                <a-list-item-meta
                  title="你收到了 1 个通知"
                  description="一天前"
                >
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item> -->
            <div class="no-notice">
              暂无通知
            </div>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </template>

    <span class="cb-header-notice" @click="fetchNotice">
      <a-badge>
        <a-icon type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false, // 是否显示组件
      loading: false // 是否正在加载
    }
  },

  methods: {
    // 获取消息通知
    fetchNotice() {
      if (!this.visible) {
        this.loading = true
        // 放置业务逻辑
        setTimeout(() => {
          this.loading = false
        }, 500)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="less">
.header-notice-wrapper {
  width: 300px;
  top: calc(@vertical-nav-height + 8px) !important;

  .ant-popover-content .ant-popover-inner .ant-popover-inner-content {
    padding: 0 16px 8px;

    .ant-tabs {
      .ant-tabs-bar {
        margin-bottom: 8px;
      }

      .no-notice {
        padding: 4px 8px;
      }
    }
  }
}

.cb-header-notice {
  display: inline-block;
  cursor: pointer;

  .anticon {
    font-size: 16px;
    padding: 4px;
  }
}
</style>
