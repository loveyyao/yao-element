<template>
  <div
      class="yao-table"
      :class="{
        'yao-table__empty': tableData.length === 0
      }"
  >
    <el-table
        ref="originalTable"
        v-bind="$attrs"
        :data="tableData"
        v-on="$listeners"
    >
      <slot v-if="columns.length === 0"/>
      <el-table-column
          v-for="(col, i) in columns"
          :key="col.props.prop || i"
          v-bind="col.props"
      >
        <template v-if="col.slots && col.slots.header">
          <slot
              slot="header"
              slot-scope="scope"
              :name="col.slots.header"
              v-bind="scope"
          />
        </template>
        <template v-if="col.slots && col.slots.default">
          <slot
              slot-scope="scope"
              :name="col.slots.default"
              v-bind="scope"
          />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="tableData.length === 0" class="yao-table__empty__content">
      <slot name="empty">
        <el-empty style="padding-bottom: 20px" :description="emptyText"/>
      </slot>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import {deepClone, generateUUID} from "@/utils";

export default {
  name: "YaoTable",
  emits: ['col-drag-end', 'row-drag-end'],
  props: {
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    colDrag: {
      type: Boolean,
      default: false
    },
    rowDrag: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => ([])
    },
    /**
     * columns 列数组
     * columns.props: 对象 el-table-column props
     * columns.slots:  对象 插槽 el-table-column slot
     * columns.slots.default:  字符串 el-table-column 默认插槽
     * columns.slots.header:  字符串 el-table-column 头部插槽
     */
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      tableData: [],
      colSortable: null,
      rowSortable: null,
      rowFixedSortable: null,
      rowFixedRightSortable: null,
      originalColumns: [] // 存储 columns 额外的属性，用于列拖拽
    }
  },
  watch: {
    columns: {
      handler: function(val) {
        this.getOriginalColumns(val)
      },
      deep: true,
      immediate: true
    },
    data: {
      handler: function(val) {
        this.tableData = (val || []).map(item => {
          return {
            ...item
          }
        })
        if (this.rowDrag) {
          this.initRowSortable()
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initTableRef()
  },
  beforeDestroy() {
    this.colSortable && this.colSortable.destroy()
    this.rowSortable && this.rowSortable.destroy()
    this.rowFixedSortable && this.rowFixedSortable.destroy()
    this.rowFixedRightSortable && this.rowFixedRightSortable.destroy()
  },
  methods: {
    // 获取 columns 额外的属性，用于列拖拽
    getOriginalColumns(cols) {
      this.originalColumns = (cols || []).map(col => {
        const colKeys = Object.keys(col)
        const originalCol = {}
        colKeys.forEach(key => {
          if (!['props', 'slots'].includes(key)) {
            originalCol[key] = col[key]
          }
        })
        return originalCol
      })
    },
    initTableRef() {
      this.$nextTick(() => {
        const targetRef = this.$refs['originalTable']
        // 将table ref提供的方法属性绑定到当前的实例对象上
        for (const targetRefKey in targetRef) {
          if (!this[targetRefKey]) {
            this[targetRefKey] = targetRef[targetRefKey]
          }
        }
        // 拖拽表头排序
        this.colDrag && this.initColSortable()
      })
    },
    // 行拖拽
    initRowSortable() {
      const _vm = this
      _vm.rowSortable && _vm.rowSortable.destroy()
      _vm.rowFixedSortable && _vm.rowFixedSortable.destroy()
      _vm.rowFixedRightSortable && _vm.rowFixedRightSortable.destroy()
      // 双重延迟确保元素完全更新
      _vm.$nextTick(() => {
        setTimeout(() => {
          const tbody = _vm.$el.querySelector('.el-table__body-wrapper tbody')
          const fixedTbody = _vm.$el.querySelector('.el-table__fixed .el-table__fixed-body-wrapper tbody')
          const fixedRightTbody = _vm.$el.querySelector('.el-table__fixed-right .el-table__fixed-body-wrapper tbody')
          // 无固定列
          if (tbody) {
            this.rowSortable = new Sortable(tbody, {
              animation: 150,
              onEnd(event) {
                _vm.rowSortableEnd(event)
              }
            })
          }
          // 左边固定列
          if (fixedTbody) {
            this.rowFixedSortable = new Sortable(fixedTbody, {
              animation: 150,
              onEnd(event) {
                _vm.rowSortableEnd(event)
              }
            })
          }
          // 右边固定列
          if (fixedRightTbody) {
            this.rowFixedRightSortable = new Sortable(fixedRightTbody, {
              animation: 150,
              onEnd(event) {
                _vm.rowSortableEnd(event)
              }
            })
          }
        }, 200)
      })
    },
    rowSortableEnd(event) {
      const oldIndex = event.oldIndex
      const newIndex = event.newIndex
      if (newIndex === oldIndex) {
        return
      }
      const oldList = this.tableData.map(e => {
        const data = deepClone(e)
        return {
          ...data
        }
      })
      const currRow = this.tableData.splice(oldIndex, 1)[0]
      this.tableData.splice(newIndex, 0, currRow)

      this.$emit('row-drag-end', {
        oldList,
        newList: this.tableData,
        newIndex,
        oldIndex,
        currRow
      })
    },
    // 列拖拽
    initColSortable() {
      const _vm = this
      const columns = _vm.store.states._columns
      const header = _vm.$el.querySelector('div.el-table > div.el-table__header-wrapper > table > thead')
      if (header.className.indexOf('is-group') !== -1) {
        console.warn('表头分组不允许拖拽')
        return
      }
      const tableHeader = _vm.$el.querySelector('div.el-table > div.el-table__header-wrapper > table > thead > tr')
      this.colSortable = new Sortable(tableHeader, {
        animation: 150,
        onEnd(event) {
          const tableHeader = [...columns]
          const oldIndex = event.oldIndex
          const newIndex = event.newIndex
          if (newIndex === oldIndex) {
            return
          }
          const dragItem = tableHeader[oldIndex] || {}
          const targetItem = tableHeader[newIndex] || {}
          const tagName = event.item.tagName
          const items = event.from.getElementsByTagName(tagName)
          const types = ['selection', 'index', 'expand']
          if (
              dragItem.fixed ||
              targetItem.fixed ||
              types.includes(dragItem.type) ||
              types.includes(targetItem.type)
          ) {
            console.warn('固定列或单选复选展开列不允许拖拽')
            if (oldIndex > newIndex) {
              event.from.insertBefore(event.item, items[oldIndex + 1])
            } else {
              event.from.insertBefore(event.item, items[oldIndex])
            }
            return
          }
          _vm._updateColumns(newIndex, oldIndex)
        }
      })
    },
    _updateColumns(newIndex, oldIndex) {
      const _columns = this.store.states._columns || []
      const oldCols = (this.store.states._columns || []).map((col, i) => {
        return {
          prop: col.property,
          label: col.label,
          index: i
        }
      })
      const originalOldCols = this.originalColumns.map(col => {
        const data = deepClone(col)
        return {
          ...data
        }
      })
      // 移动到目标列
      const currCol = _columns.splice(oldIndex, 1)[0]
      _columns.splice(newIndex, 0, currCol)
      let originalCurrRow = null
      if (this.originalColumns.length) {
        originalCurrRow = this.originalColumns.splice(oldIndex, 1)[0]
        this.originalColumns.splice(newIndex, 0, originalCurrRow)
      }
      this.store.states._columns = _columns.map(col => {
        col.id = generateUUID()
        return col
      })
      this.store.updateColumns()
      this.store.scheduleLayout()
      const newCols = (this.store.states._columns || []).map((col, i) => {
        return {
          prop: col.property,
          label: col.label,
          index: i
        }
      })
      this.$emit('col-drag-end', {
        currCol,
        originalCurrRow,
        newCols,
        oldCols,
        originalOldCols,
        originalNewCols: this.originalColumns,
        newIndex,
        oldIndex
      })
    },
    // 外部调用更新列原始数据
    updateColumns(columns) {
      // 做个 DOM 更新后延迟处理 确保列正确
      this.$nextTick(() => {
        setTimeout(() => {
          const _columns = this.store.states._columns
          columns.forEach((e, i) => {
            _columns.forEach(col => {
              if (e.props.prop + e.props.label === col.property + col.label) {
                col.__index = i
              }
            })
          })
          this.getOriginalColumns(columns)
          this.store.states._columns = _columns.sort((a, b) => a.__index - b.__index).map(col => {
            delete col.__index
            return col
          })
          this.store.updateColumns()
          this.store.scheduleLayout()
        }, 100)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.yao-table {
  &.yao-table__empty {
    ::v-deep .el-table__body-wrapper {
      &.is-scrolling-left,
      &.is-scrolling-right,
      &.is-scrolling-middle {
        height: 17px;
      }

      &.is-scrolling-none {
        height: 0;
      }
    }
  }
}
</style>
