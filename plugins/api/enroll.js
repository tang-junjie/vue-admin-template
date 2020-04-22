// 大赛相关 API

export default function(axios) {
  return {
    // 获取报名表单列表
    getEnrollSettingList: params =>
      axios.get('/admin/enroll-setting', { params }),

    // 获取报名表单详情
    getEnrollSettingDetail: params =>
      axios.get(`/admin/enroll-setting/${params.id}`, { params }),

    // 新增报名表单
    addEnrollSetting: data => axios.post('/admin/enroll-setting', data),

    // 编辑报名表单
    setEnrollSetting: data =>
      axios.put(`/admin/enroll-setting/${data.id}`, data),

    // 删除报名表单
    delEnrollSetting: data =>
      axios.delete(`/admin/enroll-setting/${data.id}`, data),

    // 复制报名表单
    duplicateSetting: data =>
      axios.post(`/admin/enroll-setting/copy/${data.id}`, data),

    // 下载报名表单 template
    downloadEnrollFormTemplate: params =>
      axios.get(`/admin/enroll-setting/template/${params.id}`, {
        responseType: 'blob'
      }),

    // 导入报名表
    importEnrollForm: (enrollSettingId, data) =>
      axios.post(`/admin/enroll-setting/import/${enrollSettingId}`, data),

    // 批量上传媒体报名资料的 url
    uploadEnrollUrl: data =>
      axios.post(`/admin/enroll-setting/upload-enroll-url`, data),

    // 获取报名列表
    getEnrollList: (params, responseType) =>
      axios.get('/admin/enroll', { params, responseType }),

    // 获取报名详情
    getEnrollDetail: params =>
      axios.get(`/admin/enroll/${params.id}`, { params }),

    // 新增报名
    addEnroll: data => axios.post('/admin/enroll', data),

    // 编辑报名
    setEnroll: data => axios.put(`/admin/enroll/${data.id}`, data),

    // 删除报名
    delEnroll: data => axios.delete(`/admin/enroll/${data.id}`, data),

    // 批量编辑报名补充资料
    batchSetAdditionalInfo: data =>
      axios.post('/admin/enroll/batch-set-addition-info', data),

    // 获取补充资料设置列表
    getAdditionalSettingList: params =>
      axios.get('/admin/additional-info-settings', { params }),

    // 获取补充资料设置详情
    getAdditionalSettingDetail: params =>
      axios.get(`/admin/additional-info-settings/${params.id}`, { params }),

    // 新增补充资料设置
    addAdditionalSetting: data =>
      axios.post('/admin/additional-info-settings', data),

    // 编辑补充资料设置
    setAdditionalSetting: data =>
      axios.put(`/admin/additional-info-settings/${data.id}`, data),

    // 下载补充资料表单 template
    downloadAdditionalInfoFormTemplate: params =>
      axios.get(`/admin/additional-info-settings/template/${params.id}`, {
        responseType: 'blob'
      }),

    // 导入补充资料
    importAdditionalInfoForm: (AdditionalInfoSettingId, data) =>
      axios.post(
        `/admin/additional-info-settings/import/${AdditionalInfoSettingId}`,
        data
      ),

    // 批量上传媒体补充资料的 url
    uploadAdditionalInfoUrl: data =>
      axios.post(
        `/admin/additional-info-settings/upload-additional-info-url`,
        data
      ),

    // 获取补充费用设置列表
    getFeeSettingList: params => axios.get('/admin/fee-setting', { params }),

    // 获取补充费用设置详情
    getFeeSettingDetail: params =>
      axios.get(`/admin/fee-setting/${params.id}`, { params }),

    // 新增补充费用设置
    addFeeSetting: data => axios.post('/admin/fee-setting', data),

    // 编辑补充费用设置
    setFeeSetting: data => axios.put(`/admin/fee-setting/${data.id}`, data)
  }
}
