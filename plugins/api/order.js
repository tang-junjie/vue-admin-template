// 订单管理相关 API

export default function(axios) {
  return {
    // 获取订单列表
    getOrderList: (params, responseType) =>
      axios.get('/admin/order', { params, responseType })
  }
}
