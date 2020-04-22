<!-- 默认布局，有业务相关的组件，譬如菜单 -->

<template>
  <a-locale-provider :locale="zh_CN">
    <a-layout class="app-container">
      <a-layout-sider v-model="isMenuCollapsed">
        <cb-sidebar />
      </a-layout-sider>

      <a-layout
        class="app-content"
        :class="{ 'menu-collapsed': isMenuCollapsed }"
      >
        <a-layout-header>
          <div class="main-area">
            <a-icon
              class="menu-collapse-trigger"
              :type="isMenuCollapsed ? 'menu-unfold' : 'menu-fold'"
              @click="isMenuCollapsed = !isMenuCollapsed"
            />
            <div class="match-info">
              <div class="match-title" v-text="__global__match.title" />
              <div class="desc-tags">
                <div
                  class="match-status"
                  :class="[
                    $utils.path(
                      $constants,
                      `match.matchStatusMap.${__global__match.status}.color`
                    )
                  ]"
                  v-text="
                    $utils.path(
                      $constants,
                      `match.matchStatusMap.${__global__match.status}.name`
                    )
                  "
                />
              </div>
              <div class="info-card">
                <div
                  class="info-card__banner"
                  :style="{
                    backgroundImage: `url('${__global__match.cover}')`
                  }"
                >
                  <cb-icon v-if="!__global__match.cover" name="no-picture" />
                </div>
                <div class="info-card__basic-info gradient-border-bottom">
                  <div class="qrcode-wrap">
                    <vue-qr
                      class="qrcode"
                      :dot-scale="1"
                      :margin="16"
                      :size="128"
                      :text="h5Url"
                      :callback="qrcodeCallback"
                    />
                    <a-button
                      icon="download"
                      type="primary"
                      title="下载二维码图片"
                      shape="circle"
                      @click="saveMatchQrcodeImage"
                    />
                  </div>
                  <div class="main">
                    <a-tooltip>
                      <template slot="title">
                        {{ __global__match.title }}
                      </template>
                      <div class="title" v-text="__global__match.title" />
                    </a-tooltip>
                    <div class="vice">大赛 ID：{{ __global__match.id }}</div>
                    <div class="vice">
                      创建人员：{{
                        $utils.path(__global__match, 'user.name') ||
                          $utils.path(__global__match, 'user.mobile') ||
                          '未知'
                      }}
                    </div>
                    <div class="vice">
                      创建时间：{{ __global__match.created_at }}
                    </div>
                  </div>
                </div>
                <div class="info-card__functionals">
                  <!-- <div
                    class="button"
                    title="编辑大赛信息"
                    @click="$router.push('/match-setting/edit/basic')"
                  >
                    <a-icon type="edit" />
                    <span>详情编辑</span>
                  </div> -->

                  <div
                    v-clipboard:copy="h5Url"
                    v-clipboard:success="
                      () => {
                        $message.success('链接已成功复制到剪贴板')
                      }
                    "
                    class="button"
                    title="复制大赛 H5 链接"
                  >
                    <a-icon type="link" />
                    <span>复制链接</span>
                  </div>

                  <div class="button" title="切换大赛" @click="switchMatch">
                    <a-icon type="swap" />
                    <span>切换大赛</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-function-wrap">
            <cb-header-user-action />
          </div>
        </a-layout-header>

        <a-layout-content>
          <nuxt />
          <cb-meiqia />
        </a-layout-content>

        <a-layout-footer>
          <cb-copyright />
        </a-layout-footer>
      </a-layout>

      <a-back-top :visibility-height="800" />
    </a-layout>
  </a-locale-provider>
</template>

<script>
import { saveAs } from 'file-saver'
import { mapActions } from 'vuex'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data() {
    return {
      zh_CN, // 中文语言包
      isMenuCollapsed: false, // 菜单折叠状态
      qrcodeDataURI: '', // 二维码图片 Data URI
      breadcrumb: [] // 面包屑项目
    }
  },

  computed: {
    // 大赛 H5 地址
    h5Url() {
      let unlock = '' // 在微信中 URL 解封标记

      if (this.__global__match.id === 985) {
        unlock = '%20'
      }

      // 判断是否为正服以便返回正确的 h5 链接
      return `${this.$store.state.env.h5Domain}/${unlock +
        this.__global__match.id}/match`
    }
  },

  created() {
    this.refreshMatchDetail()
  },

  methods: {
    ...mapActions('match', ['setCurrentMatch', 'removeCurrentMatch']),

    // 刷新大赛信息
    refreshMatchDetail() {
      this.$api.match
        .getMatchDetail({
          id: this.__global__match.id
        })
        .then(({ data }) => {
          this.setCurrentMatch({
            id: data.id,
            title: data.title,
            status: data.status,
            cover: data.cover,
            created_at: data.created_at,
            user: data.user,
            role: this.__global__match.role
          })
        })
    },

    // 二维码生成回调
    qrcodeCallback(dataURI) {
      // 保存二维码图片的 DataURI
      this.qrcodeDataURI = dataURI
    },

    // 保存大赛 H5 二维码图片
    saveMatchQrcodeImage() {
      saveAs(this.qrcodeDataURI, `${this.__global__match.title}-二维码.png`)
    },

    // 切换大赛
    switchMatch() {
      this.removeCurrentMatch()
      this.$router.push('/match-list')
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  display: flex;
  min-height: 100vh;

  .ant-layout-sider {
    position: fixed;
    left: 0;
    z-index: 1001;
    background-color: transparent;
  }

  .app-content {
    position: relative;
    margin-left: @sidebar-main-width;
    .transition(margin-left);

    &.menu-collapsed {
      margin-left: calc(@sidebar-collapsed-width);

      .ant-layout-header {
        width: calc(100% - @sidebar-collapsed-width);
      }
    }

    .ant-layout-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000;
      padding: 0 20px 0 0;
      background: #fff;
      white-space: nowrap;
      width: calc(100% - @sidebar-main-width);
      box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
      .text-vertical-align(@vertical-nav-height);
      .flex(space-between);
      .transition(width);

      .main-area {
        display: flex;

        > .menu-collapse-trigger {
          padding: 0 24px;
          font-size: 20px;
          line-height: @vertical-nav-height;
          cursor: pointer;
          .transition(background-color);

          &:hover {
            background-color: rgba(0, 0, 0, 0.03);
          }
        }

        > .match-info {
          display: flex;
          position: relative;
          cursor: pointer;

          &:hover {
            .info-card {
              opacity: 1;
              pointer-events: auto;
            }
          }

          .match-title {
            padding: 0 8px;
            max-width: 320px;
            font-size: 18px;
            font-weight: 600;
            line-height: 3.4;
            color: @text-color-4;
            .text-ellipsis;
          }

          .desc-tags {
            margin-left: 4px;
            .flex;

            .match-status {
              display: inline-block;
              margin-top: -4px;
              padding: 2px 8px;
              height: 20px;
              line-height: 1.3;
              color: #fff;
              font-size: 12px;
              border-radius: 4px;
              .color-table;
            }
          }

          .info-card {
            overflow: hidden;
            position: absolute;
            top: @vertical-nav-height - 8px;
            left: 0;
            cursor: default;
            background-color: #fff;
            background-position: 0 145px;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url(//cdn.haosailei.cn/frontend/dashboard/resource/image/common/header-info-card-bg.png);
            border-radius: 4px;
            box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.08);
            pointer-events: none;
            opacity: 0;
            .transition(opacity);

            &__banner {
              width: 300px;
              height: 150px;
              background-color: #f0f2f5;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
              .flex;

              .icon {
                width: 88px;
                height: 88px;
                opacity: 0.5;
              }
            }

            &__basic-info {
              position: relative;
              padding: 15px;

              .qrcode-wrap {
                position: absolute;
                top: -40px;
                right: 16px;
                background-color: #fff;
                box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.08);

                .qrcode {
                  height: 80px;
                  width: 80px;
                }

                /deep/ .ant-btn {
                  position: absolute;
                  right: -8px;
                  bottom: -8px;
                  width: 20px;
                  height: 20px;
                  line-height: 0.5;

                  i {
                    font-size: 14px;
                  }
                }
              }

              .main {
                overflow: hidden;
                display: block;
                width: 71%;

                .title {
                  max-width: 270px;
                  font-size: 16px;
                  font-weight: 600;
                  line-height: 1.3;
                  color: @text-color-4;
                  white-space: normal;
                  .text-ellipsis-multi-line(2);
                }

                .vice {
                  margin-top: 8px;
                  font-size: 12px;
                  line-height: 1;
                  color: rgb(102, 102, 102);
                }
              }
            }

            &__functionals {
              padding: 16px 0 12px;
              .flex;

              .button {
                cursor: pointer;
                user-select: none;
                .flex(center, center, column);

                &:not(:first-child) {
                  margin-left: 24px;
                }

                &:hover {
                  i,
                  span {
                    color: @primary-color;
                  }
                }

                i {
                  font-size: 18px;
                  color: @text-color-2;
                  .transition(color);
                }

                span {
                  font-size: 12px;
                  line-height: 1.8;
                  .transition(color);
                }
              }
            }
          }
        }
      }
    }

    .ant-layout-content {
      position: relative;
      margin: calc(@vertical-nav-height + 24px) 24px 0;
    }

    .ant-layout-footer {
      position: relative;

      .cb-copyright {
        position: relative !important;
        bottom: 0 !important;
      }
    }
  }

  .ant-back-top {
    right: 24px;
    bottom: 24px;
  }
}
</style>
