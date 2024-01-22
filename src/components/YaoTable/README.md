# 公共table组件

> 公共表格组件，基于`el-tabel`二次封装，新增列/行拖拽排序功能

# 属性

- `colDrag`：是否开启表头拖拽排序，默认 `false`。注意固定列或单选复选展开列不允许拖拽
  ，固定列必须集中在最前面（固定左侧）或者最后面（固定右侧），不然导致其他的表头拖拽不了
- `rowDrag`：是否开启行拖拽排序，默认 `false`。行拖拽必须指定`row-key`属性，不然会造成列表顺序混乱
- `columns`：列数组。优先级比默认插槽高，优先显示 `columns`
-
  - `columns.props`：对象，参考 `el-table-column` 的 `props`
-
  - `columns.slots`：对象 插槽 `el-table-column`的`slot`
-
  -
    - `columns.slots.default`：字符串 `el-table-column` 默认插槽
-
  -
    - `columns.slots.header`：字符串 `el-table-column` 头部插槽

# 事件

- `col-drag-end`：表头拖拽排序结束事件，回调参数 `event`
-
  - `event.currCol`：当前拖拽列，对象格式，属性为表格列属性
-
  - `event.originalCurrRow`：当前拖拽列其他数据，对象格式。
-
  - `event.newCols`：拖拽后新列数组，属性为表格列属性
-
  - `event.oldCols`：拖拽后老列数组，属性为表格列属性
-
  - `event.originalOldCols`：拖拽后老原始数据数组，属性为原始数据
-
  - `event.originalNewCols`：拖拽后新原始数据数组，属性为原始数据
-
  - `event.newIndex`：新序号
-
  - `event.oldIndex`：原序号

---

- `row-drag-end`：行拖拽排序结束事件，回调参数 `event`
-
  - `event.currRow`：当前拖拽行
-
  - `event.oldList`：老数据
-
  - `event.newList`：拖拽后新数据
-
  - `event.newIndex`：新序号
-
  - `event.oldIndex`：原序号

> 其余方法属性事件参考 `el-table`使用，后续功能添加在更新文档
