<script>
export default {
  name: 'YaoPopover',
  data() {
    return {
      isRender: false
    }
  },
  render() {
    const _vm = this
    const _h = _vm.$createElement
    const _c = _vm._self._c || _h
    return _c('el-popover', _vm._g(_vm._b({
      on: {
        'show': _vm.popoverShow,
        'after-leave': _vm.popoverHide
      }
    }, 'el-popover', _vm.$attrs, false), _vm.$listeners), [(_vm.isRender) ? _c(
      'div', {
        staticClass: 'yao-popover_content'
      }, [_vm._t('default')], 2) : _vm._e(), _vm._t('reference', null, {
      'slot': 'reference'
    })], 2)
  },
  methods: {
    popoverShow() {
      this.isRender = true
      this.$emit('show')
    },
    popoverHide() {
      this.isRender = false
      this.$emit('after-leave')
    }
  }
}
</script>

<style scoped>

</style>
