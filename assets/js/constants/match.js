// 大赛状态字段属性映射，数组下标为对应值
export const matchStatusMap = [
  {
    name: '草稿',
    color: 'blue'
  },
  {
    name: '待审核',
    color: 'orange'
  },
  {
    name: '审核通过',
    color: 'green'
  },
  {
    name: '审核不通过',
    color: 'red'
  },
  {
    name: '下架',
    color: 'gray'
  }
]

// 大赛报名常用字段定义
export const enrollUsualFields = [
  {
    readable_name: '选手头像',
    name: 'avatar',
    icon: 'smile'
  },
  {
    readable_name: '选手姓名',
    name: 'name',
    icon: 'user'
  },
  {
    readable_name: '手机号码',
    name: 'mobile',
    icon: 'mobile'
  },
  {
    readable_name: '选手性别',
    name: 'gender',
    icon: 'man'
  },
  {
    readable_name: '选手身高',
    name: 'height',
    icon: 'skin'
  },
  {
    readable_name: '选手体重',
    name: 'weight',
    icon: 'fire'
  },
  {
    readable_name: '出生日期',
    name: 'birthday',
    icon: 'calendar'
  },
  {
    readable_name: '自我介绍',
    name: 'introduce',
    icon: 'solution'
  },
  {
    readable_name: '电子邮箱',
    name: 'email',
    icon: 'mail'
  },
  {
    readable_name: '父母姓名',
    name: 'parent_name',
    icon: 'team'
  },
  {
    readable_name: '常居地址',
    name: 'address',
    icon: 'home'
  },
  {
    readable_name: '身份证号',
    name: 'identification',
    icon: 'idcard'
  }
]

// 常用字段名文案映射
const _enrollUsualFieldsName = {}
enrollUsualFields.forEach(item => {
  _enrollUsualFieldsName[item.name] = item.readable_name
})
export const enrollUsualFieldsName = _enrollUsualFieldsName
