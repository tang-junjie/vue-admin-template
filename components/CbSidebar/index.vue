<!-- 默认布局里的侧栏菜单 -->

<template>
  <div class="app-sidebar">
    <a class="app-sidebar__logo gradient-border-bottom" href="/">
      <img
        class="app-sidebar__logo-image"
        :src="$store.state.env.oem.main_logo"
      />
      <div class="app-sidebar__logo-title">{{ $store.state.env.oem.name }}</div>
    </a>

    <div class="app-sidebar__menu">
      <a-menu
        v-model="activedItem"
        mode="inline"
        :open-keys.sync="openedItem"
        @click="onMenuClick"
      >
        <template v-for="(mainMenuItem, mainMenuIndex) in menu">
          <a-menu-item v-if="!mainMenuItem.sub" :key="mainMenuIndex">
            <a-icon :type="mainMenuItem.icon" />
            <span v-text="mainMenuItem.name" />
          </a-menu-item>

          <a-sub-menu
            v-else-if="mainMenuItem.sub instanceof Array"
            :key="mainMenuIndex"
          >
            <span slot="title">
              <a-icon :type="mainMenuItem.icon" />
              <span v-text="mainMenuItem.name" />
            </span>

            <a-menu-item
              v-for="(subMenuItem, subMenuIndex) in mainMenuItem.sub"
              :key="`${mainMenuIndex}-${subMenuIndex}`"
              v-text="subMenuItem.name"
            />
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import menu from '@/assets/js/config/menu'

export default {
  data() {
    return {
      activedItem: [], // 当前激活高亮的菜单项
      openedItem: [] // 当前展开的父级菜单项
    }
  },

  computed: {
    // 菜单生成
    menu() {
      return (
        this.$utils
          .clonePlainObj(menu)
          // 先处理所有二级菜单项
          .map(main => {
            if (main.sub) {
              main.sub = main.sub.filter(
                item =>
                  // 要求具备某些权限但又不通过权限检查的二级菜单项要过滤掉
                  !(
                    item.permissions && !this.$checkPermission(item.permissions)
                  )
              )
            }
            return main
          })
          .filter(
            main =>
              // 过滤掉子菜单项数为 0 的一级菜单
              !(main.sub instanceof Array && main.sub.length === 0)
          )
          .filter(
            main =>
              // 要求具备某些权限但又不通过权限检查的一级菜单项要过滤掉
              !(main.permissions && !this.$checkPermission(main.permissions))
          )
      )
    }
  },

  watch: {
    // 监听路由变化，以展开或高亮菜单项
    $route: {
      immediate: true,
      handler() {
        this.initMenuStatus()
      }
    }
  },

  methods: {
    // 菜单项展开高亮初始化
    initMenuStatus() {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.$route.path === this.menu[i].link) {
          this.activedItem = [i]
          return
        } else if (this.menu[i].sub instanceof Array) {
          for (let j = 0; j < this.menu[i].sub.length; j++) {
            if (this.$route.path === this.menu[i].sub[j].link) {
              this.openedItem = [i]
              this.activedItem = [`${i}-${j}`]
            }
          }
        }
      }
    },

    // 菜单项点击事件
    onMenuClick({ key }) {
      const keyPath = key.toString().replace('-', '.sub.') + '.link'
      const routePath = this.$utils.path(this.menu, keyPath, '/')
      routePath && this.$router.push(routePath)
    }
  }
}
</script>

<style lang="less" scoped>
.app-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

  &__logo {
    position: relative;
    flex: none;
    height: @vertical-nav-height;
    border-right: 1px solid #fff;
    text-decoration: none;
    .flex;

    &-image {
      width: 44px;
    }

    &-title {
      margin-left: 12px;
      font-size: 24px;
      font-weight: 600;
      white-space: nowrap;
      color: @text-color-4;
      opacity: 0.85;
    }
  }

  &__menu {
    overflow-y: auto;

    /deep/ .ant-menu-root {
      border-right: none;

      & > li:first-child {
        margin: 0 0 -4px 0;
      }

      .ant-menu-item,
      .ant-menu-submenu-title {
        margin-bottom: 4px;
        padding-left: 32px !important;
        width: 100%;
        user-select: none;
        .text-vertical-align(48px) !important;

        .anticon {
          font-size: 16px;
        }
      }

      .ant-menu-submenu {
        &-arrow {
          right: 20px;
        }

        .ant-menu-item {
          padding-left: 48px !important;
        }
      }
    }
  }
}
</style>

<style lang="less">
.ant-layout-sider-collapsed {
  .app-sidebar__logo-title {
    display: none;
  }
}
</style>
