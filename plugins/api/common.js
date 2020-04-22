// 通用 API

export default function(axios) {
  return {
    // 获取前端配置
    getFrontendConfig: params => axios.get('/front/config', { params }),

    // 登录
    login: data => axios.post('/admin/login', data),

    // 发送验证码
    sendSmsCode: data => axios.post('/send-verify-sms', data),

    // 注册
    register: data => axios.post('/admin/register', data),

    // 重置密码
    resetPassword: data => axios.post('/admin/reset-password', data),

    // 获取七牛 token
    getQiniuToken: params => axios.get('/admin/qiniu/token', { params }),

    // 购买套餐计划
    purchasePlan: data => axios.post('/admin/package-order', data),

    // 获取套餐订单详情
    getPlanOrderDetail: params =>
      axios.get(`/admin/package-order/${params.id}`, params),

    // 套餐购买记录
    getPlanPurchaseRecord: params =>
      axios.get('/admin/package-order', { params }),

    // 获取已经选择了的赛程赛区列表，可用于选择赛程赛区时的重复性判断
    getSelectScheduleZoneList: params =>
      axios.get('/admin/match/select-schedule-zone', { params })
  }
}
