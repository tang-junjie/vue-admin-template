// 大赛相关 API

export default function(axios) {
  return {
    // 获取大赛列表
    getMatchList: params => axios.get('/admin/match', { params }),

    // 获取大赛详情
    getMatchDetail: params =>
      axios.get(`/admin/match/${params.id}`, { params }),

    // 新增大赛
    addMatch: data => axios.post(`/admin/match`, data),

    // 修改大赛
    setMatch: data => axios.put(`/admin/match/${data.id}`, data),

    // 获取赛程列表
    getScheduleList: params => axios.get('/admin/schedule', { params }),

    // 获取大赛数据统计
    getStatistics: params => axios.get('/admin/statistics', { params }),

    // 新增赛程
    addSchedule: data => axios.post('/admin/schedule', data),

    // 编辑赛程
    setSchedule: data => axios.put(`/admin/schedule/${data.id}`, data),

    // 删除赛程
    delSchedule: data => axios.delete(`/admin/schedule/${data.id}`, data),

    // 获取赛区列表
    getZoneList: params => axios.get('/admin/zone', { params }),

    // 获取赛区详情
    getZoneDetail: params => axios.get(`/admin/zone/${params.id}`, { params }),

    // 新增赛区
    addZone: data => axios.post('/admin/zone', data),

    // 编辑赛区
    setZone: data => axios.put(`/admin/zone/${data.id}`, data),

    // 获取赛区赛程列表
    getZoneScheduleList: params =>
      axios.get(`/admin/zone/get-schedule-list`, { params }),

    // 新增赛区赛程
    addZoneSchedule: data => axios.post('/admin/zone/create-schedule', data),

    // 编辑赛区赛程
    setZoneSchedule: data =>
      axios.post(`/admin/zone/update-schedule/${data.id}`, data),

    // 删除赛区赛程
    delZoneSchedule: data =>
      axios.delete(`/admin/zone/destroy-schedule/${data.id}`, data),

    // 同步大赛详情到分赛区详情
    syncMatchDetailToZone: data =>
      axios.post('/admin/zone/sync-match-detail', data),

    // 邀请分赛区管理员
    inviteZoneAdmin: data => axios.post('/admin/zone/invite-zone-admin', data),

    // 删除分赛区管理员
    deleteZoneAdmin: data =>
      axios.delete(`/admin/zone/destroy-zone-admin/${data.id}`, data),

    // 修改海报
    setPoster: data => axios.put(`/admin/poster/${data.id}`, data),

    // 获取海报列表
    getPosterList: params => axios.get('/admin/poster', { params }),

    // 获取海报详情
    getPosterDetail: params =>
      axios.get(`/admin/poster/${params.id}`, { params }),

    // 获取公告列表
    getNoticeList: params => axios.get('/admin/announcement', { params }),

    // 获取公告详情
    getNoticeDetail: params =>
      axios.get(`/admin/announcement/${params.id}`, { params }),

    // 修改公告
    setNotice: data => axios.put(`/admin/announcement/${data.id}`, data),

    // 新增公告
    addNotice: data => axios.post(`/admin/announcement`, data),

    // 删除公告
    delNotice: data => axios.delete(`/admin/announcement/${data.id}`, data),

    // 获取弹窗列表
    getModalList: params => axios.get('/admin/modal-event', { params }),

    // 获取弹窗详情
    getModalDetail: params =>
      axios.get(`/admin/modal-event/${params.id}`, { params }),

    // 修改弹窗
    setModal: data => axios.put(`/admin/modal-event/${data.id}`, data),

    // 新增弹窗
    addModal: data => axios.post(`/admin/modal-event`, data),

    // 删除弹窗
    delModal: data => axios.delete(`/admin/modal-event/${data.id}`, data),

    // 获取分享列表
    getShareList: params => axios.get('/admin/share-setting', { params }),

    // 获取分享详情
    getShareDetail: params =>
      axios.get(`/admin/share-setting/${params.id}`, { params }),

    // 修改分享
    setShare: data => axios.put(`/admin/share-setting/${data.id}`, data),

    // 获取广告列表
    getAdvertisingList: params => axios.get('/admin/advertising', { params }),

    // 获取广告详情
    getAdvertisingDetail: params =>
      axios.get(`/admin/advertising/${params.id}`, { params }),

    // 修改广告
    setAdvertising: data => axios.put(`/admin/advertising/${data.id}`, data),

    // 新增广告
    addAdvertising: data => axios.post(`/admin/advertising`, data),

    // 删除广告
    delAdvertising: data => axios.delete(`/admin/advertising/${data.id}`, data),

    // 修改主题
    setTheme: data => axios.put(`/admin/theme-setting/${data.id}`, data),

    // 获取主题详情
    getThemeDetail: params => axios.get(`/admin/theme-setting`, { params })
  }
}
