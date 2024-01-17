# 详情表单组件

> 详情表单组件基于`el-form`二次封装，添加`form-type`属性来切换详情显示和表单显示。

## 属性

| 参数                   | 说明              | 类型        | 可选值                 | 默认值  |
|----------------------|-----------------|-----------|---------------------|------|
| labelComma           | label自动添加分号     | `Boolean` | `true`、`false`      | `null` |
| descOverflowEllipsis | 详情文本超出是否隐藏      | `Boolean` | `true`、`false`      | `null` |
| propRequired | 字段是否必填，自动生成必填校验 | `Boolean` | `true`、`false`      | `null` |
| formType             | 组件显示表单或详情       | `String`  | `form`：表单、`desc`：详情 |  |
| descProp             | 详情`prop`        | `String`  |  |  |

## 详情表单高阶组件

> 详情查看[YaoDescRowForm](src/components/YaoDescForm/README.md)
