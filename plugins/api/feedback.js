// 反馈管理相关 API

export default function(axios) {
  return {
    // 新增意见反馈
    addFeedback: data => axios.post('/admin/feedback', data),

    // 获取投诉列表
    getComplaintList: params => axios.get('/admin/complaint', { params })
  }
}
