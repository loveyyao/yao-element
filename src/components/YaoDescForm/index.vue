<template>
  <el-form
      class="yao-desc-form"
      ref="originalForm"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot/>
  </el-form>
</template>

<script>
export default {
  name: "YaoDescForm",
  provide() {
    return {
      descForm: this
    }
  },
  props: {
    // label自动添加分号，默认中文：
    labelComma: {
      type: Boolean,
      default: null
    },
    // 详情文本超出是否隐藏
    descOverflowEllipsis: {
      type: Boolean,
      default: null
    },
    // form 表示普通表单 desc 为详情
    formType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {}
  },
  methods: {
    resetFields() {
      this.$refs['originalForm'].resetFields()
    },
    clearValidate(props = []) {
      this.$refs['originalForm'].clearValidate(props)
    },
    validate(callback) {
      return this.$refs['originalForm'].validate(callback)
    },
    validateField(props, cb) {
      this.$refs['originalForm'].validateField(props, cb)
    }
  }
}
</script>

<style scoped>

</style>
