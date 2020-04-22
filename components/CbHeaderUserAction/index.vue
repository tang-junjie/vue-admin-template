<!-- 组件：页眉导航栏用户操作菜单 -->

<template>
  <div class="header-user-action-wrapper">
    <cb-header-notice />

    <a-dropdown>
      <span class="user-info">
        <a-avatar size="small" :src="__global__user.avatar">
          <template v-if="!__global__user.avatar && __global__user.name">
            {{ __global__user.name[0].toUpperCase() }}
          </template>
        </a-avatar>
        <span class="user-info__name">{{ __global__user.name }}</span>
      </span>

      <a-menu slot="overlay">
        <a-menu-item key="0">
          <nuxt-link to="/user-setting/account">
            <a-icon type="user" />
            <span>账号设置</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item v-if="__global__match.id" key="1">
          <nuxt-link to="/feedback/user">
            <a-icon type="bulb" />
            <span>反馈意见</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-divider />

        <a-menu-item key="2">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CbHeaderNotice from './HeaderNotice'

export default {
  components: {
    CbHeaderNotice
  },

  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('match', ['removeCurrentMatch']),

    // 退出登录确认
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '确认退出登录 ?',
        centered: true,
        onOk: () => {
          this.removeCurrentMatch()
          this.logout()
        }
      })
    }
  }
}
</script>

<style lang="less">
.header-user-action-wrapper {
  .flex;

  .anticon {
    color: rgba(0, 0, 0, 0.65);
  }

  .cb-header-notice {
    margin-left: 20px;
  }

  .user-info {
    margin-left: 20px;
    .flex;

    .ant-avatar {
      margin-right: 4px;
    }

    &__name {
      overflow: hidden;
      max-width: 96px;
      text-overflow: ellipsis;
    }
  }
}
</style>
