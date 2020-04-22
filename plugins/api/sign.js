// 签到打分相关 API

export default function(axios) {
  return {
    // 获取签到记录列表
    getSignList: params => axios.get('admin/sign-in', { params }),

    // 删除签到记录
    delSign: data => axios.delete(`admin/sign-in/${data.id}`, data),

    // 获取签到分组列表
    getSignGroupList: params => axios.get('/admin/sign-in/groups', { params }),

    // 修改签到信息
    setSign: data => axios.put(`admin/sign-in/${data.id}`, data),

    // 获取签到设置列表
    getSignSettingList: params =>
      axios.get('admin/sign-in-setting', { params }),

    // 获取签到设置详情
    getSignSettingDetail: params =>
      axios.get(`admin/sign-in-setting/${params.id}`, { params }),

    // 导入签到列表信息
    importSignList: data => axios.post('admin/sign-in-setting/import', data),

    // 获取签到导入模板
    getSignTemplate: params =>
      axios.get(`/admin/sign-in-setting/template`, {
        params,
        responseType: 'blob'
      }),

    // 新增签到设置
    addSignSetting: data => axios.post('admin/sign-in-setting', data),

    // 修改签到设置
    setSignSetting: data => axios.put(`admin/sign-in-setting/${data.id}`, data),

    // 获取晋级成绩列表
    getPromotionList: (params, responseType) =>
      axios.get('admin/promotion', { params, responseType }),

    // 批量操作选手状态
    setPromotionStatus: data =>
      axios.post('admin/promotion/batch-update', data),

    // 获取成绩公布列表
    getScoreReleaseList: params =>
      axios.get('admin/score-release-setting', { params }),

    // 获取成绩公布详情
    getScoreReleaseDetail: params =>
      axios.get(`admin/score-release-setting/${params.id}`, { params }),

    // 新增成绩公布
    addScoreRelease: data => axios.post('admin/score-release-setting', data),

    // 修改成绩公布
    setScoreRelease: data =>
      axios.put(`admin/score-release-setting/${data.id}`, data),

    // 删除成绩公布
    delScoreRelease: data =>
      axios.delete(`admin/score-release-setting/${data.id}`, data),

    // 获取查看评分列表
    getCheckScoreList: params => axios.get('admin/judge-mark', { params }),

    // 修改评分
    setCheckScore: data => axios.put(`admin/judge-mark/${data.id}`, data),

    // 删除评分
    delCheckScore: data => axios.delete(`admin/judge-mark/${data.id}`, data),

    // 获取评分列表
    getJudgeMarkList: params =>
      axios.get('admin/judge-mark-setting', { params }),

    // 获取评分详情
    getJudgeMarkDetail: params =>
      axios.get(`admin/judge-mark-setting/${params.id}`, { params }),

    // 新增评分
    addJudgeMark: data => axios.post('admin/judge-mark-setting', data),

    // 修改评分
    setJudgeMark: data =>
      axios.put(`admin/judge-mark-setting/${data.id}`, data),

    // 获取工作人员列表
    getStaffList: params => axios.get('admin/sign-in-staff', { params }),

    // 获取工作人员详情
    getStaffDetail: params =>
      axios.get(`admin/sign-in-staff/${params.id}`, { params }),

    // 获取工作人员链接 tail
    getStaffTail: params => axios.get(`admin/sign-in-staff/tail`, { params }),

    // 删除工作人员
    delStaff: data => axios.delete(`admin/sign-in-staff/${data.id}`, data),

    // 修改工作人员
    setStaff: data => axios.put(`admin/sign-in-staff/${data.id}`, data),

    // 获取评委列表
    getJudgeList: params => axios.get(`admin/judge`, { params }),

    // 修改评委信息
    setJudge: data => axios.put(`admin/judge/${data.id}`, data),

    // 删除评委
    delJudge: data => axios.delete(`admin/judge/${data.id}`, data),

    // 获取评委链接 ticket
    getJudgeTail: params => axios.get(`admin/judge/ticket`, { params })
  }
}
