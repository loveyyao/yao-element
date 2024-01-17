// 详情表单高阶组件
import YaoDescFormItem from '@/components/YaoDescFormItem/index.vue'

function YaoDescColFormItem(YaoDescFormItem) {
  return {
    name: "YaoDescColFormItem",
    inject: ['rowDescForm'],
    props: {
      span: {
        type: Number,
        default: 0
      },
      tag: {
        type: String,
        default: 'div'
      },
      offset: Number,
      pull: Number,
      push: Number,
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object]
    },
    methods: {
      resetField() {
        this.$refs['originalDescFormItem'].resetFields()
      },
      clearValidate() {
        this.$refs['originalDescFormItem'].clearValidate()
      }
    },
    render(h) {
      const slots = Object.keys(this.$slots)
      return h('el-col', {
        attrs: {
          span: this.span || this.rowDescForm.span || 24,
          offset: this.offset,
          pull: this.pull,
          push: this.push,
          xs: this.xs,
          sm: this.sm,
          md: this.md,
          lg: this.lg,
          xl: this.xl
        }
      }, [h(YaoDescFormItem, {
        ref: 'originalDescFormItem',
        on: this.$listeners,
        attrs: this.$attrs,
        scopedSlots: this.$scopedSlots
      }, slots)])
    }
  }
}

export default YaoDescColFormItem(YaoDescFormItem)
