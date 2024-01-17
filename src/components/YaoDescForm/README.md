# 详情表单组件

> 详情表单组件基于`el-form`二次封装，添加`form-type`属性来切换详情显示和表单显示。

## 属性

| 参数                   | 说明          | 类型        | 可选值                 | 默认值  |
|----------------------|-------------|-----------|---------------------|------|
| labelComma           | label自动添加分号 | `Boolean` | `true`、`false`      | `null` |
| descOverflowEllipsis | 详情文本超出是否隐藏  | `Boolean` | `true`、`false`      | `null` |
| formType             | 组件显示表单或详情   | `String`  | `form`：表单、`desc`：详情 |  |

## 详情表单高阶组件

> 详情表单高阶组件将`el-row`、`el-col`集成，实现表单项的快速排版。用法一致，可以在`yao-desc-row-form`
> 使用`el-row`的属性，额外添加了`span`的属性，统一设置底下`el-col`。也可以在`yao-desc-col-form-item`
> 上设置`el-col`的属性来实现`el-col`组件的一些特性。

```vue
<template>
  <div>
    <yao-desc-row-form
        ref="rowFormRef"
        :model="form"
        :form-type="formType"
        label-comma
        :span="8"
        :rules="rules"
        desc-overflow-ellipsis
        label-width="120px"
    >
      <span>基础信息：</span>
      <yao-desc-col-form-item prop-required label="姓名" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入"/>
      </yao-desc-col-form-item>
      <yao-desc-col-form-item prop-required label="年龄" prop="age">
        <el-input v-model="form.age" clearable placeholder="请输入"/>
      </yao-desc-col-form-item>
      <span>下拉字段信息：</span>
      <yao-desc-col-form-item prop-required label="下拉字段1" prop="select">
        <el-select
            v-model="form.select"
            clearable
            filterable
            placeholder="请选择"
        >
          <el-option label="选项1" value="1"/>
          <el-option label="选项2" value="2"/>
          <el-option label="选项3" value="3"/>
        </el-select>
        <template slot="desc" slot-scope="val">
          插槽详情显示：<span>{{ val }}</span>
        </template>
      </yao-desc-col-form-item>
      <yao-desc-col-form-item prop-required label="下拉字段2" prop="select2" desc-prop="select2Text">
        <el-select
            v-model="form.select2"
            clearable
            filterable
            placeholder="请选择"
        >
          <el-option label="选项1" value="1"/>
          <el-option label="选项2" value="2"/>
          <el-option label="选项3" value="3"/>
        </el-select>
      </yao-desc-col-form-item>
      <span>其他备注信息:</span>
      <yao-desc-col-form-item :span="24" label="超出隐藏字段" prop="textarea">
        <el-input v-model="form.textarea" type="textarea" clearable placeholder="请输入"/>
      </yao-desc-col-form-item>
    </yao-desc-row-form>
    <div>
      <el-button @click="switchFormType">详情表单切换</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import YaoDescRowForm from "@/components/YaoDescForm/YaoDescRowForm";
import YaoDescColFormItem from "@/components/YaoDescFormItem/YaoDescColFormItem";
export default {
  components: {
    YaoDescRowForm,
    YaoDescColFormItem
  },
  data() {
    return {
      formType: 'form',
      form: {
        name: '',
        age: '',
        select: '',
        select2: '',
        select2Text: '详情使用desc-prop显示',
        textarea: '我们建议使用 CDN 引入 Element 的用户在链接地址上锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。锁定版本的方法请查看 unpkg.com。'
      },
      rules: {
        name: {
          max: 10,
          message: '名字最多10位'
        }
      }
    }
  },
  methods: {
    switchFormType() {
      this.formType = this.formType === 'form' ? 'desc' : 'form'
    },
    resetForm() {
      this.$refs.rowFormRef.resetFields()
    },
    submit() {
      this.$refs.rowFormRef.validate(val => {
        console.log(val ? '提交' : '检验失败')
      })
    }
  }
}
</script>
```

> `yao-desc-row-form`只会对`yao-desc-col-form-item`组件进行插槽劫持处理，其他的还是按照原来的顺序排列显示
> 。具体可查看生成的页面
