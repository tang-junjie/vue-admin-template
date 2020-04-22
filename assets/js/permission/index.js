import permissionsMap from './map'

// 权限检查器生成
export function permissionCheckGenerator({ store }) {
  /**
   * 检查是否具备权限
   * @param {array} neededPermission - 必须具备的权限
   * @return {boolean} 权限检查结果
   */

  return neededPermissions => {
    // 当前用户所具备的权限
    const userPermissions = store.$utils.path(
      store,
      'getters.user/getUserPermissions',
      []
    )

    return neededPermissions.every(
      neededPermissionItem =>
        userPermissions.indexOf(permissionsMap[neededPermissionItem]) !== -1
    )
  }
}
