### 公共年份/月份范围选择器 yao-date-picker

> 公共年份/月份范围选择器，弥补组件没有年份/月份范围选择功能，年份默认格式`yyyy`，月份默认格式`yyyy-mm`，不可修改。

# 属性

| 参数          | 说明      | 类型                | 可选值            | 默认值     |
|-------------|---------|-------------------|----------------|---------|
| value       | `value` | `String`,`Number` |                | `[]`    |
| type        | 类型      | `String`          | `year`、`month` | `year`  |
| clearable   | 清空      | `Boolean`         | `true`、`false` | `false` |
| disabled    | 禁用      | `Boolean`         | `true`、`false` | `false` |
| placeholder | 提示文本    | `String`          |                |         |

# 事件

- `change`：值发生变化是触发，参数`value`
- `show`：选择器打开
- `close`：选择器关闭
