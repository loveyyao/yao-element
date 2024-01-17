// 详情表单高阶组件
import YaoDescForm from '@/components/YaoDescForm/index.vue'

function YaoDescRowForm(YaoDescForm) {
  return {
    name: 'YaoDescRowForm',
    props: {
      span: [String, Number],
      tag: {
        type: String,
        default: 'div'
      },
      gutter: Number,
      type: String,
      justify: {
        type: String,
        default: 'start'
      },
      align: String
    },
    provide() {
      return {
        rowDescForm: this
      }
    },
    methods: {
      resetFields() {
        this.$refs['originalDescForm'].resetFields()
      },
      clearValidate(props = []) {
        this.$refs['originalDescForm'].clearValidate(props)
      },
      validate(callback) {
        return this.$refs['originalDescForm'].validate(callback)
      },
      validateField(props, cb) {
        this.$refs['originalDescForm'].validateField(props, cb)
      }
    },
    render(h) {
      const defaults = this.$slots.default
      const elRowDefaultMap = {}
      let arr = []
      let index = 0
      // 插槽劫持，将yao-desc-col-form-item组件用el-row包裹
      defaults.forEach((children) => {
        if (children.componentOptions && children.componentOptions.tag === 'yao-desc-col-form-item') {
          arr.push(children)
        } else {
          if (arr.length) {
            elRowDefaultMap['row-' + (index)] = {
              tag: 'el-row',
              children: arr
            }
            arr = []
            index++
          }
          elRowDefaultMap['row-' + index] = children
          index++
        }
      })
      if (arr.length) {
        elRowDefaultMap['row-' + (index + 1)] = {
          tag: 'el-row',
          children: arr
        }
        arr = []
        index = 0
      }
      // 排序
      const elRowDefaults = Object.keys(elRowDefaultMap).sort((a, b) => {
        return Number(a.split('-')[1]) - Number(b.split('-')[1])
      })
      return h(YaoDescForm, {
        ref: 'originalDescForm',
        on: this.$listeners,
        attrs: this.$attrs
      }, [...elRowDefaults.map(child => {
        if (elRowDefaultMap[child].tag !== 'el-row') {
          return elRowDefaultMap[child]
        }
        return h(elRowDefaultMap[child].tag, {
          attrs: {
            gutter: this.gutter,
            type: this.type,
            justify: this.justify,
            align: this.align,
            tag: this.tag
          }
        }, elRowDefaultMap[child].children)
      })])
    }
  }
}

export default YaoDescRowForm(YaoDescForm)
