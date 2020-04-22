/**
 * 角色鉴权中间件
 *
 * 通过检查当前用户的权限集里是否有待渲染路由页上所需的权限来决定用户能否进入该路由页，
 * 每个需要鉴权的页面都要在 meta 里指定 permissions 的值
 *
 */

export default function({ store, route, error }) {
  // meta[0] 为父级路由的 meta，但某个父级路由页面无权限进入，则子路由页面也无法进入
  const neededPermissions = store.$utils.path(route, 'meta.0.permissions')

  // 如果当前页面需要特定权限且当前用户没有该权限
  if (neededPermissions && !store.$checkPermission(neededPermissions)) {
    error({
      statusCode: 403
    })
  }
}
