<!--

组件：表格

注意：
1. 官方文档中 https://vue.ant.design/components/table-cn/#API 所有的 props 都可
   使用，使用案例请全文搜索项目。
2. column 属性元素可以设置布尔值 sortable 以便控制该列是否可在当前页面排序。另外也可以
   设置 customSortKey 以便控制是否在服务器端排序。两者互斥。
3. 无需关心分页操作，只要后台采用 page 和 per_page 参数，组件内容就能自动处理好分页。
4. 如果要用到行勾选的话，数据行一定要有 ID 属性。

使用方法如下：

    <cb-table
      ref="table"
      v-viewer
      show-selector
      data-path="data"
      :columns="columns"
      :api="$api.enroll.getEnrollList"
      :params="{ setting_id: $route.params.id }"
      :selected-row-keys.sync="selectedRowKeys"
      :selections.sync="selections"
      :selections-sumary-options="{
        title: '金钱',
        unit: '元',
        callback: selections =>
          selections.reduce((sum, item) => sum + +item.id, 0)
      }"
      :get-checkbox-props="
        record => ({
          props: {
            disabled: record.id < 7500
          }
        })
      "
      :export-config="{
        fileName: `【报名表导出】- ${
          $route.query.name
        } - ${$utils.moment().format('YYYYMMDDHHmmss')}.xls`,
        lastModifiedBy: __global__user.name,
        callback(data) {
          const arr = []
          arr.push(['id', '头像', '选手名称', '手机号码', '赛区', '报名时间'])
          data.forEach(item => {
            arr.push([
              item.id,
              item.avatar,
              item.name,
              item.mobile,
              item.zone_name,
              item.created_at
            ])
          })
          return arr
        }
      }"
      :batch-operations="[
        {
          name: '删除',
          callback(data) {}
        },
        {
          name: '隐藏',
          callback(data) {}
        }
      ]"
    >
      <template #头像="text">
        <img :src="text || $constants.misc.badImage" width="40" height="40" />
      </template>

      <template #操作="text, record">
        <a-button
          type="link"
          @click="
            $router.push(
              `/enroll/form/${$route.params.id}/player/${record.id}/edit`
            )
          "
        >
          编辑
        </a-button>
      </template>
    </cb-table>

-->

<script>
import Table from 'ant-design-vue/es/table/Table'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'

// 默认分页大小
const DEFALUT_PAGE_SIZE = 10
const INITIAL_PAGE_NUMBER = 1

export default {
  // 部分 props 源自 Table 组件
  props: Object.assign({}, Table.props, {
    // API 数据请求源，一般传入 Axios 封装后的 Promise
    api: {
      type: Function,
      required: true
    },

    // API 数据请求参数
    params: {
      type: Object,
      default: () => {
        // 默认总是传递页码和分页大小
        return {
          per_page: DEFALUT_PAGE_SIZE,
          page: INITIAL_PAGE_NUMBER
        }
      }
    },

    /**
     * 业务数据源（一般为包含 total 的那一级）的获取路径，从 response.data
     * 节点取起，譬如业务数据在 response.data.data 下，那应该传入 `data`
     *
     * response 的 data 内容：
     *
     * {
     *   data: {                                       ┐
     *     data: [{ id: 1, name: zxw }, {xxxx} ....],  ╎ ==> 这个就算是业务数据
     *     total: 18                                   ╎
     *   },                                            ┘
     *   error_code: 0
     * }
     */
    dataPath: {
      type: String,
      default: ''
    },

    // 数据渲染前的处理
    dataProcess: {
      type: Function,
      default: data => data
    },

    // 是否显示列表项目选择器
    showSelector: {
      type: Boolean,
      default: false
    },

    // 默认选择项目的 keys，当使用项目选择器时该 props 为必传值
    selectedRowKeys: {
      type: Array,
      default: () => []
    },

    // 默认选择项目，当使用项目选择器时该 props 为必传值
    selections: {
      type: Array,
      default: () => []
    },

    // 选择框的默认属性配置，用法请查询文档
    getCheckboxProps: {
      type: Function,
      default: () => ({})
    },

    /**
     * 选择项统计配置，包含 title、unit 和 callback 3个属性，title 为统计标题，
     * unit 为单位，callback 为统计回调函数。
     */
    selectionsSumaryOptions: {
      type: Object,
      default: () => ({})
    },

    // 导出功能配置
    batchOperations: {
      type: Array
    },

    // 导出功能配置
    exportConfig: {
      type: Object
    },

    // 是否显示分页器
    showPagination: {
      type: Boolean,
      default: true
    },

    // 是否显示分页器分页大小改变器
    showPaginationSizeChanger: {
      type: Boolean,
      default: true
    },

    /**
     * 分页器类型，目前主要有两种分页器：不确定总数分页器（自定义组件 cb-pagination）
     * 和确定总数的分页器（官方 UI 组件 a-pagination）
     */
    customPagination: {
      type: Boolean,
      default: false
    }
  }),

  data() {
    return {
      /* 以下为当前组件所要用到的变量 */
      currentPageSize: 10, // 当前分页大小
      currentPage: 1, // 当前页码
      currentOrder: {}, // 当前排序规则
      totalItem: 0, // 数据项总数
      summaryResult: 0, // 选择项统计结果

      /* 以下为 a-table 组件要用到的 props，注意要以 `local` 开头，不然会和 props 冲突 */
      localSize: 'small', // 表格视觉尺寸
      localLoading: false, // 是否正在加载数据
      localPagination: this.showPagination && !this.customPagination, // 隐藏内置分页器
      localDataSource: [] // 数据源
    }
  },

  created() {
    // 获取父组件传进来的分页大小和初始页码
    this.currentPageSize = this.params.per_page || DEFALUT_PAGE_SIZE
    this.currentPage = this.params.page || INITIAL_PAGE_NUMBER

    // 加载数据
    this.loadData()
  },

  methods: {
    // 加载数据
    async loadData() {
      this.localLoading = true

      // 将参数传给 axios 封装后的数据源
      const result = await this.api(
        Object.assign({}, this.params, this.currentOrder, {
          page: this.currentPage,
          per_page: this.currentPageSize
        })
      ).finally(() => {
        this.localLoading = false
      })

      // 根据数据源获取路径获取数据项总数
      this.totalItem = this.$utils.path(result, this.dataPath + '.total', 0)

      // 根据数据源获取路径获取数据
      const data = this.$utils.path(
        result,
        (this.dataPath ? this.dataPath + '.' : '') + 'data',
        []
      )

      // 执行自定义数据处理
      let processedData = this.dataProcess(data)

      // 检查 processedData 是否为数组，避免传到 a-table 的 data-source 后出错
      if (!(processedData instanceof Array)) {
        console.error(
          '传入 data-source 的变量不是有效的数组，请检查是否设置 data-path 属性：',
          processedData
        )
        processedData = []
      }

      // 仅在显示分页器且分页器为自定义组件且数据列表长度为 0 时
      if (
        this.showPagination &&
        this.customPagination &&
        processedData.length === 0
      ) {
        // 通过 $refs 操作节点一定要等待渲染完毕
        this.$nextTick(() => {
          // 当没有更多数据时，禁用向下翻页
          this.$refs.pagination.disableNextAndMinusOne(false)
        })
        this.$message.info('暂无更多数据')
      }

      this.localDataSource = processedData
    },

    // 强制刷新列表数据
    refresh(isResetPage) {
      // 是否重置到第一页
      if (isResetPage) {
        this.currentPage = 1
      }
      this.loadData()
    },

    // 分页大小改变
    onPaginationSizeChange(pageSize) {
      if (pageSize !== undefined) {
        this.currentPageSize = pageSize
        // 强制回到第一页并刷新表格数据
        this.refresh(true)
      }
    },

    // 分页、排序、筛选变化时触发
    onTableChange(pagination, filters, sorter) {
      // 是否需要重置到第一页
      let needResetToFirstPage = false

      // 当表格组件使用的是内置的分页组件
      if (this.showPagination && !this.customPagination) {
        const { current: currentPage, pageSize: currentPageSize } = pagination

        // 如果列表翻页
        if (this.currentPage !== currentPage) {
          this.currentPage = currentPage
        }

        // 如果列表分页大小发生改变
        if (this.currentPageSize !== currentPageSize) {
          needResetToFirstPage = true
          this.currentPageSize = currentPageSize
        }
      }

      const { order: currentOrder, column: currentOrderColumn } = sorter
      // 每次都先清空排序规则
      this.currentOrder = {}
      // 如果自定义服务器端排序触发
      if (currentOrderColumn && currentOrderColumn.customSortKey) {
        this.currentOrder = {
          [currentOrderColumn.customSortKey]:
            currentOrder === 'ascend' ? 'asc' : 'desc'
        }
      }

      this.refresh(needResetToFirstPage)
    },

    // 导出表格数据到 excel 文件
    async exportDataToExcel(data) {
      // 创建工作簿
      const workbook = new Workbook()
      workbook.creator = '大赛系统'
      workbook.lastModifiedBy = this.exportConfig.lastModifiedBy || '大赛系统'

      // 添加工作表
      const worksheet = workbook.addWorksheet('Sheet1')

      // 添加行数据，数据结构为二维数组
      const rows =
        typeof this.exportConfig.callback === 'function'
          ? await this.exportConfig.callback(data)
          : []
      worksheet.addRows(rows)

      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        saveAs(blob, this.exportConfig.fileName || '导出.xlsx')
      })
    },

    // 执行数据导出
    onExportItem(type) {
      switch (type) {
        // 导出选中项
        case 'selected': {
          this.exportDataToExcel(this.selections)
          break
        }

        // 导出当前页
        case 'currentPage': {
          this.exportDataToExcel(this.localDataSource)
          break
        }

        // 导出全部
        default: {
          const callback = this.exportConfig.exportAll
          typeof callback === 'function' && callback()
        }
      }
    },

    // 当列表项勾选发生变化
    onSelectionChange(selectedRowKeys, selections) {
      this.$emit('update:selectedRowKeys', selectedRowKeys)
      this.$emit('update:selections', selections)

      // 更新统计项
      this.getSelectionSummary()
    },

    // 统计列数据
    getSelectionSummary() {
      this.$nextTick(() => {
        if (typeof this.selectionsSumaryOptions.callback === 'function') {
          this.summaryResult = this.selectionsSumaryOptions.callback(
            this.selections
          )
        }
      })
    },

    // 渲染选择项统计结果栏
    renderSelectionSummary() {
      // 绘制统计数据
      const summary =
        typeof this.selectionsSumaryOptions.callback === 'function' ? (
          <span>
            , {this.selectionsSumaryOptions.title}总计{' '}
            <a style="font-weight: 600;">
              {this.summaryResult} {this.selectionsSumaryOptions.unit}
            </a>
          </span>
        ) : null

      // 绘制批量操作按钮
      const operations =
        this.batchOperations instanceof Array
          ? this.batchOperations.map(item => (
              <a
                style="margin-left: 20px;"
                on-click={() => {
                  item.callback(this.selections)
                }}
              >
                {item.name}
              </a>
            ))
          : null

      // 绘制导出功能
      const exporter =
        typeof this.exportConfig === 'object' ? (
          <a-dropdown style="margin-left: 20px;">
            <a>
              导出 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                disabled={this.selections.length === 0}
                on-click={() => {
                  this.onExportItem('selected')
                }}
              >
                <span>导出选中项</span>
              </a-menu-item>
              <a-menu-item
                disabled={this.localDataSource.length === 0}
                on-click={() => {
                  this.onExportItem('currentPage')
                }}
              >
                <span>导出当前页</span>
              </a-menu-item>
              <a-menu-item on-click={this.onExportItem}>
                <span>导出全部</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        ) : null

      // 绘制清空按钮
      const clearButton = (
        <a
          style="margin-left: 16px;"
          on-click={() => {
            this.onSelectionChange([], [])
          }}
        >
          清空
        </a>
      )

      // 渲染选择项统计结果栏
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px;">
          <template slot="message">
            <span>
              已选择: <a style="font-weight: 600;">{this.selections.length}</a>{' '}
              条记录
            </span>
            {summary}
            {exporter}
            {this.selections.length > 0 ? operations : null}
            {this.selections.length > 0 ? clearButton : null}
          </template>
        </a-alert>
      )
    }
  },

  render() {
    // 准备传入 a-table 的 props
    const aTableProps = {}
    // 获取当前组件实例 data 的所有属性名
    const dataKeys = Object.keys(this.$data)

    Object.keys(Table.props).forEach(key => {
      // 合成与 Table 的 props 同名的以 `local` 开头的属性名，如 localDataSource
      const localDataKey = `local${key
        .substring(0, 1)
        .toUpperCase()}${key.substring(1)}`

      // 如果当前组件实例 data 下存在属性名，则加入准备传入 a-table 的 props 集合中
      if (dataKeys.includes(localDataKey)) {
        aTableProps[key] = this[localDataKey]
        return aTableProps[key]
      }

      /**
       * 因为组件挂载后 props 上所有属性都会自动地被挂载到当前组件实例下，所以可以通过
       * 当前组件实例来获取外部传进来的所有与 a-table 的 props 同名的属性，并加入准备
       * 传入 a-table 的 props 集合中
       */
      if (this[key] !== undefined) {
        aTableProps[key] = this[key]
      }
    })

    // 遍历的列定义，以便做个性化配置
    aTableProps.columns.forEach(item => {
      // 是否开启本地（即当前页）排序
      if (item.sortable) {
        item.sorter = (a, b) =>
          b[item.dataIndex]
            .toString()
            .localeCompare(a[item.dataIndex].toString())

        // 是否启用服务器排序
      } else if (item.customSortKey) {
        item.sorter = true
      }
    })

    // 表格行 key 在内部统一处理，外部无需操心这个属性，但是如果要用到行勾选的话，数据行一定要有 ID 属性
    aTableProps.rowKey = record => record.id || this.$utils.randomString()

    // 是否显示列表项选择器
    if (this.showSelector) {
      aTableProps.rowSelection = {
        getCheckboxProps: this.getCheckboxProps,
        selectedRowKeys: this.selectedRowKeys,
        selections: this.selections,
        onChange: this.onSelectionChange
      }
    }

    // 仅在显示分页器且分页器为内置分页器时才对其进行配置
    if (this.showPagination && !this.customPagination) {
      aTableProps.pagination = {
        showQuickJumper: true,
        showSizeChanger: this.showPaginationSizeChanger,
        total: this.totalItem,
        current: this.currentPage,
        pageSize: this.currentPageSize
      }
    }

    const table = (
      <div class="cb-table-wrapper">
        {this.showSelector ? this.renderSelectionSummary() : null}

        <a-table
          {...{ props: aTableProps, scopedSlots: { ...this.$scopedSlots } }}
          on-change={this.onTableChange}
        >
          {Object.keys(this.$slots).map(name => (
            <template slot={name}>{this.$slots[name]}</template>
          ))}
        </a-table>

        {this.showPagination && this.customPagination ? (
          <cb-pagination
            ref="pagination"
            value={this.currentPage}
            show-size-changer={this.showPaginationSizeChanger}
            // 监听名这么写源自于该 issue：https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/164
            on-input={value => (this.currentPage = value)}
            on-change={this.loadData}
            on-size-change={this.onPaginationSizeChange}
          />
        ) : (
          ''
        )}
      </div>
    )

    return table
  }
}
</script>

<style lang="less" scoped>
.cb-table-wrapper {
  /deep/ .ant-table {
    &.ant-table-small {
      border: 1px solid #ebeef5;
      border-radius: 0;

      .ant-table-content {
        .ant-table-body {
          margin: 0;

          .ant-table-thead tr th {
            padding: 12px 8px;
            color: @text-color-2;
            background-color: #f5f7fa;
            border-bottom-color: #ebeef5;
          }

          .ant-table-tbody tr td {
            padding: 16px 8px;
            border-bottom-color: #ebeef5;

            .ant-divider-vertical {
              margin: 0 4px;
            }
          }
        }
      }
    }
  }

  /deep/ .ant-select-selection__clear {
    display: none;
  }

  .cb-pagination {
    margin-top: 20px;
  }
}
</style>
