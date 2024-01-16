<template>
  <el-form-item
      ref="originalFormItem"
      :class="{
      'desc-form-item': true,
      'is-desc': isDesc,
      'desc-form-item-overflow-ellipsis': isOverflowEllipsis
    }"
      :label="labelText"
      v-bind="$attrs"
      :prop="isDesc ? '' : $attrs.prop"
      :rules="itemRules"
      v-on="$listeners"
  >
    <slot slot="label" name="label"/>
    <slot v-if="!isDesc"/>
    <slot
        v-if="isDesc"
        name="desc"
        :val="(elForm.model && (descProp || $attrs.prop)) ? elForm.model[(descProp || $attrs.prop)] : ''"
    >
      <el-tooltip
          v-if="isOverflow"
          :content="(elForm.model && (descProp || $attrs.prop)) ? elForm.model[(descProp || $attrs.prop)] : ''"
          placement="top"
      >
        <span class="desc-form-item_text is-overflow">
          {{ (elForm.model && (descProp || $attrs.prop)) ? elForm.model[(descProp || $attrs.prop)] : '' }}
        </span>
      </el-tooltip>
      <span v-else class="desc-form-item_text">
        {{ (elForm.model && (descProp || $attrs.prop)) ? elForm.model[(descProp || $attrs.prop)] : '' }}
      </span>
    </slot>
  </el-form-item>
</template>

<script>
export default {
  name: "YaoDescFormItem",
  inject: ['descForm', 'elForm'],
  props: {
    labelComma: {
      type: Boolean,
      default: null
    },
    descOverflowEllipsis: {
      type: Boolean,
      default: null
    },
    // form 表示普通表单 desc 为详情
    formType: {
      type: String,
      default: ''
    },
    descProp: {
      type: String,
      default: ''
    },
    propRequired: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      isOverflow: false
    }
  },
  computed: {
    itemRules() {
      let rules = null
      if (this.elForm.rules && this.elForm.rules[this.$attrs.prop]) {
        rules = this.elForm.rules[this.$attrs.prop]
      }
      if (this.$attrs.rules) {
        rules = this.$attrs.rules
      }
      if (this.propRequired) {
        const label = (this.$attrs.label || '').replace(/:|：/, '')
        const autoRules = {
          required: !this.isDesc,
          message: label + '不能为空'
        }
        if (rules) {
          if (Array.isArray(rules)) {
            rules.push(autoRules)
          } else {
            rules = [rules, autoRules]
          }
        } else {
          rules = autoRules
        }
      }
      return rules
    },
    isLabelComma() {
      if (this.labelComma !== null) {
        return this.labelComma
      }
      if (this.descForm && this.descForm.labelComma !== null) {
        return this.descForm.labelComma
      }
      return false
    },
    labelText() {
      if (this.$attrs.label && this.isLabelComma && !/.*:|：/.test(this.$attrs.label)) {
        return this.$attrs.label + '：'
      }
      return this.$attrs.label
    },
    isOverflowEllipsis() {
      if (this.descOverflowEllipsis !== null) {
        return this.descOverflowEllipsis
      }
      if (this.descForm && this.descForm.descOverflowEllipsis !== null) {
        return this.descForm.descOverflowEllipsis
      }
      return false
    },
    isDesc() {
      if (this.formType) {
        return this.formType === 'desc'
      }
      if (this.descForm && this.descForm.formType) {
        return this.descForm.formType === 'desc'
      }
      return false
    }
  },
  watch: {
    'elForm.model': {
      handler: function() {
        if (this.isOverflowEllipsis && (this.descProp || this.$attrs.prop)) {
          this.overflow()
        }
      },
      deep: true,
      immediate: true
    },
    isDesc() {
      if (this.isOverflowEllipsis && (this.descProp || this.$attrs.prop)) {
        this.overflow()
      }
    }
  },
  methods: {
    overflow() {
      if (this.$slots.desc) return
      if ((this.elForm.model && (this.descProp || this.$attrs.prop))) {
        this.$nextTick(() => {
          setTimeout(() => {
            const el = this.$el.querySelector('.desc-form-item_text')
            const wrapEl = this.$el.querySelector('.el-form-item__content')
            if (el) {
              const r = document.createRange()
              r.setStart(el, 0)
              r.setEnd(el, el.childNodes.length)
              const w = r.getBoundingClientRect().width
              const w2 = wrapEl.getBoundingClientRect().width
              this.isOverflow = w > w2
            }
          }, 16)
        })
      }
    },
    resetField() {
      this.$refs['originalFormItem'].resetFields()
    },
    clearValidate() {
      this.$refs['originalFormItem'].clearValidate()
    }
  }
}
</script>

<style lang="scss" scoped>
.desc-form-item {
  &.is-desc {
    margin-bottom: 0;
    .desc-form-item_text {
      word-break: break-all;
    }

    &.desc-form-item-overflow-ellipsis {
      .desc-form-item_text {
        display: block;
        white-space: nowrap;

        &.is-overflow {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    ::v-deep {
      .el-form-item__label {
        &:before {
          display: none;
        }
      }
      .el-form-item__error{
        display: none;
      }
    }
  }
  ::v-deep{
    .el-select{
      width: 100%;
    }
  }
}
</style>
