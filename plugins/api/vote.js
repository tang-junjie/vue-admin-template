// 打榜管理相关 API

export default function(axios) {
  return {
    // 获取票数明细列表
    getUserVoteList: params => axios.get('/admin/vote/user-vote', { params }),

    // 新增虚拟礼物
    addVirtualGiftList: data => axios.post('/admin/virtual-gift', data),

    // 获取虚拟礼物列表
    getVirtualGiftList: params => axios.get('/admin/virtual-gift', { params }),

    // 获取虚拟礼物详情
    getVirtualGiftDetail: params =>
      axios.get(`admin/virtual-gift/${params.id}`),

    // 修改虚拟礼物
    setVirtualGift: data => axios.put(`admin/virtual-gift/${data.id}`, data),

    // 获取实体礼物列表
    getRealGiftList: params => axios.get('/admin/real-gift', { params }),

    // 新增实体礼物
    addRealGiftList: data => axios.post('/admin/real-gift', data),

    // 修改实体礼物
    setRealGift: data => axios.put(`admin/real-gift/${data.id}`, data),

    // 获取实体礼物详情
    getRealGiftDetail: params => axios.get(`admin/real-gift/${params.id}`),

    // 获取打榜设置列表
    getVoteSettingList: params => axios.get(`admin/vote-setting`, { params }),

    // 修改打榜设置
    setVoteSetting: data => axios.put(`admin/vote-setting/${data.id}`, data),

    // 新增打榜设置
    addVoteSetting: data => axios.post(`admin/vote-setting`, data),

    // 获取打榜设置详情
    getVoteSettingDetail: params =>
      axios.get(`admin/vote-setting/${params.id}`, { params }),

    // 获取排行榜列表
    getVoteRankList: (params, responseType) =>
      axios.get('/admin/vote/rank', { params, responseType }),

    // 冻结选手
    freezePlayer: data => axios.post(`admin/vote/freeze`, data),

    // 解冻选手
    unfreezePlayer: data => axios.post(`admin/vote/unfreeze`, data),

    // 修改选手票数
    setPlayerVote: data => axios.post(`admin/vote/edit-vote`, data),

    // 虚拟礼物加票
    setGiftVote: data => axios.post(`admin/vote/gift-vote`, data),

    // 编辑打榜会员设置
    setVoteMemberSetting: data =>
      axios.put(`admin/vote-member-setting/${data.id}`, data),

    // 获取打榜会员设置
    getVoteMemberSetting: params =>
      axios.get(`admin/vote-member-setting/${params.id}`, { params }),

    // 获取打榜翻倍设置
    getGiftDoubleSetting: params =>
      axios.get(`/admin/gift-double-setting/${params.id}`, { params }),

    // 获取打榜被冻结选手列表
    getVoteFreezeList: params =>
      axios.get(`/admin/vote/freeze-list`, { params }),

    // 设置翻倍设置
    setGiftDoubleSetting: data =>
      axios.put(`/admin/gift-double-setting/${data.id}`, data)
  }
}
