/**
 * 权限判断指令
 *
 * 在需要权限控制的组件上使用 v-permission="permissions"，使用范例：
 * <a-button v-permission="['USER_DELETE']">删除用户</a-button>
 */

import Vue from 'vue'
import { permissionCheckGenerator } from '@/assets/js/permission'

export default context => {
  const checkPermission = permissionCheckGenerator(context)

  Vue.directive('permission', {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function(el, { value }) {
      if (!checkPermission(value)) {
        ;(el.parentNode && el.parentNode.removeChild(el)) ||
          (el.style.display = 'none')
      }
    }
  })
}
