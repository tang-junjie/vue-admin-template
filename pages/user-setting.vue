<template>
  <div class="page-user-setting">
    <div class="content-wrapper">
      <div class="content__left">
        <div class="info-wrap">
          <div class="user-info-wrap">
            <a-avatar :src="__global__user.avatar">
              <template v-if="!__global__user.avatar && __global__user.name">
                {{ __global__user.name[0].toUpperCase() }}
              </template>
            </a-avatar>
            <div class="user-name" v-text="__global__user.name" />
            <div class="match-info">
              <nuxt-link
                class="match-info__block"
                to="/match-list?type=my-creation"
              >
                <p class="label">
                  我创建的大赛
                </p>
                <!-- <p class="count">
                  0
                </p> -->
              </nuxt-link>

              <a-divider type="vertical" />

              <nuxt-link
                class="match-info__block"
                to="/match-list?type=my-management"
              >
                <p class="label">
                  我管理的大赛
                </p>
                <!-- <p class="count">
                  0
                </p> -->
              </nuxt-link>
            </div>
          </div>

          <a-divider class="info-auth-divider" />

          <div class="auth-info-wrap">
            <!-- @TODO: 小5 - 填充认证信息 -->
            <a-skeleton active avatar :paragraph="{ rows: 6 }" />
          </div>
        </div>
      </div>

      <div class="content__right">
        <nuxt-child />
      </div>
    </div>

    <cb-copyright />
  </div>
</template>

<script>
export default {
  layout: 'no-sidebar'
}
</script>

<style lang="less" scoped>
.page-user-setting {
  position: absolute;
  top: 130px;
  left: 50%;
  padding: 16px;
  width: 1000px;
  height: 640px;
  background-color: #fff;
  border-radius: 4px;
  transform: translateX(-50%);

  .content-wrapper {
    display: flex;
    height: 100%;

    .content__left {
      flex: none;
      padding: 32px 24px 32px 0;
      width: 360px;
      height: 100%;

      .info-wrap {
        width: 100%;
        height: 100%;
        border-right: solid 1px #e8e8e8;
        .flex(flex-start, center, column);

        .user-info-wrap {
          flex: none;
          width: 100%;
          text-align: center;

          .ant-avatar {
            height: 88px;
            width: 88px;
            font-size: 64px;
            line-height: 1.3;
          }

          .user-name {
            margin-top: 16px;
            font-size: 20px;
            color: @text-color-4;
            .text-ellipsis;
          }

          .match-info {
            margin-top: 16px;
            padding: 16px 16px 8px;
            width: 100%;
            .flex;

            &__block {
              flex: 1;

              .label {
                margin-bottom: 4px;
                text-align: center;
                color: @text-color-2;
              }

              .count {
                margin-bottom: 0px;
                font-size: 20px;
                font-weight: 700;
                text-align: center;
                color: @text-color-3;
              }
            }

            .ant-divider {
              height: 44px;
            }
          }
        }

        .info-auth-divider {
          margin: 16px 0;
          width: 88%;
          min-width: 88%;
        }

        .auth-info-wrap {
          padding: 0 16px;
          width: 100%;

          .ant-skeleton {
            margin-top: 8px;

            /deep/ .ant-skeleton-paragraph {
              padding-left: 0;
            }
          }
        }
      }
    }

    .content__right {
      flex: 1;
      padding: 16px 0;
    }
  }
}
</style>
