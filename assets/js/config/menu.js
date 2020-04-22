/**
 * 菜单配置注意事项：
 *
 * 1. 每个一级菜单必须包含 name 和 icon 属性
 * 2. link 属性用于没有子菜单的项目，与 sub 属性互斥，即有 link 就不需要 sub 属性
 * 3. permissions 属性为显示该菜单时所需要的权限，
 */

export default [
  {
    name: '数据中心',
    icon: 'pie-chart',
    link: '/'
  },
  {
    name: '订单管理',
    icon: 'money-collect',
    sub: [
      {
        name: '虚拟礼物订单',
        link: '/order/2'
      }
    ]
  }
]
