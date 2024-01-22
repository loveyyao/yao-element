<template>
  <div class="yao-desc-form-test">
    <div>详情表单</div>
    <el-row>
      <el-col :span="6">
        <yao-desc-form
            ref="formRef"
            :model="form"
            :form-type="formType"
            label-comma
            :rules="rules"
            desc-overflow-ellipsis
            label-width="120px"
        >
          <yao-desc-form-item prop-required label="姓名" prop="name">
            <el-input v-model="form.name" clearable placeholder="请输入"/>
          </yao-desc-form-item>
          <yao-desc-form-item prop-required label="年龄" prop="age">
            <el-input v-model="form.age" clearable placeholder="请输入"/>
          </yao-desc-form-item>
          <yao-desc-form-item prop-required label="下拉字段1" prop="select">
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
          </yao-desc-form-item>
          <yao-desc-form-item prop-required label="下拉字段2" prop="select2" desc-prop="select2Text">
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
          </yao-desc-form-item>
          <yao-desc-form-item label="超出隐藏字段" prop="textarea">
            <el-input v-model="form.textarea" type="textarea" clearable placeholder="请输入"/>
          </yao-desc-form-item>
          <div>
            <el-button @click="switchFormType">详情表单切换</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </yao-desc-form>
      </el-col>
    </el-row>
    <el-divider />
    <div style="margin-bottom: 20px">详情表单高阶组件</div>
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
      <yao-desc-col-form-item label="年范围选择" prop="year">
        <yao-year-range
            v-model="form.year"
            placeholder="年范围"
            clearable
        />
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
import YaoDescForm from "@/components/YaoDescForm/index.vue";
import YaoDescFormItem from "@/components/YaoDescFormItem/index.vue";
import YaoDescRowForm from "@/components/YaoDescForm/YaoDescRowForm";
import YaoDescColFormItem from "@/components/YaoDescFormItem/YaoDescColFormItem";
import YaoYearRange from "@/components/YaoYearRange/index.vue";

export default {
  name: "YaoDescFormTest",
  components: {
    YaoYearRange,
    YaoDescFormItem,
    YaoDescForm,
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
        year: [],
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
      this.$refs.formRef.resetFields()
      this.$refs.rowFormRef.resetFields()
    },
    submit() {
      this.$refs.formRef.validate(val => {
        console.log(val ? '提交' : '检验失败')
      })
      this.$refs.rowFormRef.validate(val => {
        console.log(val ? '提交' : '检验失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
