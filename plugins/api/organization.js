// 渠道管理相关 API

export default function(axios) {
  return {
    // 获取邀请加入机构链接 tail
    getOrganizationTail: params =>
      axios.get('/admin/organization/tail', { params }),

    // 获取渠道列表
    getOrganizationList: params =>
      axios.get('/admin/organizations', { params }),

    // 修改渠道状态
    setOrganizationStatus: data =>
      axios.put(`/admin/organization-admins/update`, data),

    // 修改渠道
    setOrganization: data => axios.put(`/admin/organizations/${data.id}`, data)
  }
}
