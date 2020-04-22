/**
 * 组件库加载方式为按需加载，故在使用新组件之前需要在此处引用，
 * 参照：https://github.com/vueComponent/ant-design-vue/blob/master/site/components.js
 */

import {
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  LocaleProvider,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Radio,
  Row,
  Select,
  Skeleton,
  Spin,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Upload
} from 'ant-design-vue'
import Vue from 'vue'

const dateFormat = 'YYYY/MM/DD HH:mm:ss' // 日期的格式

/**
 * 阻止弹窗通过点击遮罩关闭，因为弹窗内容区 mousedown 后移到遮罩层再 mouseup 会触发
 * 遮罩的 click 事件，导致在用鼠标选择内容区的文本时经常误关弹窗。
 */
Modal.props.maskClosable = {
  type: Boolean,
  default: false
}

// 对话框默认垂直居中展示
Modal.props.centered = {
  type: Boolean,
  default: true
}

// 卡片默认移除边框
Card.props.bordered = {
  type: Boolean,
  default: false
}

// 日期选择器默认显示时间
DatePicker.props.showTime = {
  type: [Object, Boolean],
  default: true
}

// 日期选择器默认显示日期的格式
DatePicker.props.format = {
  type: [String, Array],
  default: dateFormat
}

// 日期范围选择器默认显示日期的格式
DatePicker.RangePicker.props.showTime = {
  type: [Object, Boolean],
  default: true
}

// 日期范围选择器默认显示日期的格式
DatePicker.RangePicker.props.format = {
  type: [String, Array],
  default: dateFormat
}

// 搜索框默认可以搜索项目
Select.props.showSearch = {
  type: Boolean,
  default: true
}

// 搜索框默认支持清除
Select.props.allowClear = {
  type: Boolean,
  default: true
}

// 默认搜索框搜索算法
Select.props.filterOption = {
  type: [Boolean, Function],
  default: () => (input, option) =>
    option.componentOptions.children[0].text
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0
}

// 限制最大显示数, 超过限制时，最早的消息会被自动关闭
message.config({
  maxCount: 3
})

notification.config({
  top: '72px'
})

Vue.use(Alert)
Vue.use(Avatar)
Vue.use(BackTop)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Carousel)
Vue.use(Cascader)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(List)
Vue.use(LocaleProvider)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Popover)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Select)
Vue.use(Skeleton)
Vue.use(Spin)
Vue.use(Steps)
Vue.use(Switch)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Tooltip)
Vue.use(Upload)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
