/**
 * 此文件用于将前端界面的权限常量映射到后台返回的权限常量上，
 * 避免后台改变权限常量名称后前端需要修改所有页面上的权限常量
 * 键名为本地权限常量名称，键值为后台传回的权限常量名称
 */

export default {
  // 菜单
  MENU_MATCH_SETTING_EDIT: 'menu_match_setting_edit', // 详情编辑
  MENU_MATCH_SETTING_PERSONALIZATION: 'menu_match_setting_personalization', // 个性设置
  MENU_ENROLL_ADDITIONAL: 'menu_enroll_additional', // 补充资料
  MENU_ENROLL_FEE: 'menu_enroll_fee', // 费用设置
  MENU_VOTE_SETTING: 'menu_vote_setting', // 打榜设置
  MENU_VOTE_OPTION: 'menu_vote_option', // 打榜玩法
  MENU_VOTE_VIRTUAL_GIFT: 'menu_vote_virtual_gift', // 虚拟礼物
  MENU_VOTE_REAL_GIFT: 'menu_vote_real_gift', // 实体礼物
  MENU_ORGANIZATION_MANAGE: 'menu_organization_manage', // 渠道管理
  MENU_FEEDBACK_COMPLAINT: 'menu_feedback_complaint', // 投诉管理

  // 功能模块路由页面
  MODULE_MATCH_SETTING_EDIT: 'module_match_setting_edit', // 详情编辑
  MODULE_MATCH_SETTING_PERSONALIZATION: 'module_match_setting_personalization', // 个性设置
  MODULE_ENROLL_ADDITIONAL: 'module_enroll_additional', // 补充资料
  MODULE_ENROLL_FEE: 'module_enroll_fee', // 费用设置
  MODULE_VOTE_SETTING: 'module_vote_setting', // 打榜设置
  MODULE_VOTE_OPTION: 'module_vote_option', // 打榜玩法
  MODULE_VOTE_GIFT: 'module_vote_gift', // 打榜礼物
  MODULE_FEEDBACK_COMPLAINT: 'module_feedback_complaint', // 投诉管理
  MODULE_ENROLL_FORM_EDIT: 'module_enroll_form_edit', // 报名表单编辑

  // 赛区设置
  ZONE_CREATE: 'zone_create', // 赛区创建
  ZONE_ADMIN_OPERATE: 'zone_admin_operate', // 赛区管理员操作（邀请和移除）

  // 仪表盘
  DASHBOARD_ORGANIZATION_TOTAL: 'dashboard_organization_total' // 渠道数量
}
