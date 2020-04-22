<!--

组件：表格配套数据搜索

注意：
1. 暂时只支持 text、select、datePicker、timePicker、dateRange 和 datetimeRange
   这 6 种类型的搜索项，timeRange 等有需求的时候再加。
2. 需要传入一个名字为 searchers 的 prop 用于动态生成搜索项，格式范例如下：
    [
      {
        title: '选手姓名',
        name: 'name',
        type: 'text'
      },
      {
        title: '支付状态',  // 标题名称
        name: 'pay_status', // 搜索参数名
        hidden: true, // 默认是否隐藏，点击展开才能看到
        type: 'select', // 搜索项目类型
        options: [  // 枚举选项，仅在 type 为 select 时有效
          {
            name: '未支付',
            value: 0
          },
          {
            name: '已支付',
            value: 1
          }
        ]
      },
      {
        title: '报名时间',
        name: 'enroll_at',
        type: 'datePicker'
      }
    ]
3. 点击查询后会对外 emit 一个名字为 search 的事件，携带参数为表单组件对应的 value 值

-->

<script>
export default {
  props: {
    // 搜索项配置
    searchers: {
      required: true,
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      searchForm: this.$form.createForm(this), // 搜索参数表单
      isShowMore: false // 是否显示更多搜索选项
    }
  },

  computed: {
    // 按钮是否换行显示
    isButtonWrap() {
      return (
        (this.isShowMore && this.searchers.length > 2) ||
        (!this.isShowMore &&
          this.searchers.filter(item => !item.hidden).length > 2)
      )
    }
  },

  methods: {
    // 表单项生成器
    itemGenerator(searcher, hidden) {
      return searcher
        .filter(item => item.hidden === hidden)
        .map(item => {
          let formItem = null

          switch (item.type) {
            case 'text': {
              formItem = (
                <a-input
                  v-decorator={[item.name]}
                  placeholder={`请输入${item.title}`}
                />
              )

              break
            }

            case 'select': {
              formItem = (
                <a-select
                  v-decorator={[item.name, { initialValue: item.value }]}
                  placeholder={`请选择${item.title}`}
                >
                  {item.options.map(option => (
                    <a-select-option value={option.value}>
                      {option.name}
                    </a-select-option>
                  ))}
                </a-select>
              )

              break
            }

            case 'datePicker': {
              formItem = (
                <a-date-picker
                  v-decorator={[item.name]}
                  show-time={false}
                  format="YYYY-MM-DD"
                  placeholder={`请选择${item.title}`}
                />
              )

              break
            }

            case 'timePicker': {
              formItem = (
                <a-time-picker
                  v-decorator={[item.name]}
                  placeholder={`请选择${item.title}`}
                />
              )

              break
            }

            case 'dateRange': {
              formItem = (
                <a-range-picker v-decorator={[item.name]} show-time={false} />
              )

              break
            }

            case 'datetimeRange': {
              formItem = <a-range-picker v-decorator={[item.name]} />

              break
            }
          }

          return (
            <a-col md={8}>
              <a-form-item label={item.title}>{formItem}</a-form-item>
            </a-col>
          )
        })
    }
  },

  render() {
    // 默认可见的搜索项目
    const visibleItems = this.itemGenerator(this.searchers)
    // 需要点击【显示更多】按钮才能看到的搜索项目
    const hiddenItems = this.itemGenerator(this.searchers, true)

    // 【显示更多】按钮
    const showMoreButton = (
      <a
        on-click={() => {
          this.isShowMore = !this.isShowMore
        }}
      >
        {this.isShowMore ? '收起' : '展开'}
        <a-icon type={this.isShowMore ? 'up' : 'down'} />
      </a>
    )

    return (
      <div class="cb-table-searcher">
        <a-form layout="inline" form={this.searchForm}>
          <a-row gutter={48}>
            {visibleItems}
            {this.isShowMore ? hiddenItems : null}

            <a-col md={this.isButtonWrap ? 24 : 8}>
              <span
                class="submit-buttons"
                style={this.isButtonWrap ? { textAlign: 'right' } : {}}
              >
                <a-button
                  type="primary"
                  on-click={() => {
                    this.$emit('search', this.searchForm.getFieldsValue())
                  }}
                >
                  查询
                </a-button>
                <a-button
                  on-click={() => {
                    this.searchForm.resetFields()
                    this.$emit('reset')
                  }}
                >
                  重置
                </a-button>
                {this.searchers.filter(item => item.hidden).length
                  ? showMoreButton
                  : null}
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.cb-table-searcher {
  .ant-form-inline {
    /deep/ .ant-form-item {
      display: flex;
      margin: 0 0 20px 0;

      > .ant-form-item-label {
        padding-right: 8px;
        width: auto;
        line-height: 32px;
      }

      > .ant-form-item-control-wrapper {
        flex: 1;

        .ant-form-item-control {
          height: 32px;
          line-height: 32px;

          .ant-calendar-picker,
          .ant-time-picker {
            width: 100% !important;
          }
        }
      }
    }
  }

  .submit-buttons {
    display: block;
    margin-bottom: 20px;
    white-space: nowrap;

    .ant-btn {
      margin-right: 8px;
    }
  }
}
</style>
