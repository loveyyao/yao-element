<template>
  <div class="yao-date-picker">
    <el-popover
      v-model="visible"
      placement="bottom"
      popper-class="yao-date-picker_popover"
      :width="popoverWidth"
      trigger="manual"
    >
      <div class="yao-date-popover_content" @mouseup.stop>
        <div class="yao-date-popover_item left-item">
          <div class="yao-date-popover_top">
            <i class="el-icon-d-arrow-left" @click.stop="getPopoverList('ll')" />
            <span v-if="type === 'month'" class="yao-date-popover_top--year"> {{ leftShowYear }} 年 </span>
            <i class="el-icon-d-arrow-right" @click.stop="getPopoverList('lr')" />
          </div>
          <ul class="yao-date-popover_list">
            <li
              v-for="item in leftPopoverList"
              :key="item.value"
              class="yao-date-picker_item"
              :class="{active: inputValue.includes(item.value)}"
              @click.stop="select(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
        <div class="yao-date-popover_item right-item">
          <div class="yao-date-popover_top">
            <i class="el-icon-d-arrow-left" @click.stop="getPopoverList('rl')" />
            <span v-if="type === 'month'" class="yao-date-popover_top--year"> {{ rightShowYear }} 年 </span>
            <i class="el-icon-d-arrow-right" @click.stop="getPopoverList('rr')" />
          </div>
          <ul class="yao-date-popover_list">
            <li
              v-for="item in rightPopoverList"
              :key="item.value"
              class="yao-date-picker_item"
              :class="{active: inputValue.includes(item.value)}"
              @click.stop="select(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
      <template slot="reference">
        <div @mouseup.stop>
          <el-input
            v-model="inputValueText"
            readonly
            :placeholder="placeholder"
            :disabled="inputDisabled"
            :clearable="clearable"
            @focus="show"
          >
            <template slot="prefix">
              <i class="el-input__icon el-icon-date" />
            </template>
            <template v-if="inputValue.length" slot="suffix">
              <i
                class="el-input__icon el-icon-circle-close"
                style="cursor: pointer"
                @click.stop="clear"
              />
            </template>
          </el-input>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'YaoDatePicker',
  mixins: [emitter],
  emits: ['change', 'show', 'close'],
  inject: ['elForm'],
  props: {
    value: {
      type: [Array],
      default: () => ([])
    },
    // 范围选择 year/month
    type: {
      type: String,
      default: 'year'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      popoverWidth: 555,
      inputValue: [],
      leftPopoverList: [],
      leftShowYear: 0,
      rightPopoverList: [],
      rightShowYear: 0
    }
  },
  computed: {
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    inputValueText() {
      return this.inputValue.join(' ~ ')
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.inputValue = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (!Array.isArray(this.value)) {
      this.$emit('input', [])
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    getPopoverList(type) {
      if (['ll', 'lr'].includes(type)) {
        this.getLeftPopoverList(type)
      }
      if (['rl', 'rr'].includes(type)) {
        this.getRightPopoverList(type)
      }
    },
    getLeftPopoverList(type) {
      let year = this.leftShowYear
      if (this.type === 'year') {
        if (type === 'll') {
          year = this.leftShowYear - 12
        }
        if (type === 'lr') {
          year = this.leftShowYear + 12
          if (year >= this.rightShowYear) {
            year = this.leftShowYear
          }
        }
      }
      if (this.type === 'month') {
        if (type === 'll') {
          year = this.leftShowYear - 1
        }
        if (type === 'lr') {
          year = this.leftShowYear + 1
          if (year >= this.rightShowYear) {
            year = this.leftShowYear
          }
        }
      }
      this.leftPopoverList = this.getDateItemList(year)
      this.leftShowYear = year
    },
    getRightPopoverList(type) {
      let year = this.rightShowYear
      if (this.type === 'year') {
        if (type === 'rl') {
          year = this.rightShowYear - 12
          if (year <= this.leftShowYear) {
            year = this.rightShowYear
          }
        }
        if (type === 'rr') {
          year = this.rightShowYear + 12
        }
      }
      if (this.type === 'month') {
        if (type === 'rl') {
          year = this.rightShowYear - 1
          if (year <= this.leftShowYear) {
            year = this.rightShowYear
          }
        }
        if (type === 'rr') {
          year = this.rightShowYear + 1
        }
      }
      this.rightPopoverList = this.getDateItemList(year)
      this.rightShowYear = year
    },
    getDateItemList(y) {
      const year = Number(y)
      const yearList = []
      if (this.type === 'year') {
        for (let i = year - 6; i < year; i++) {
          yearList.push({
            label: i,
            value: i
          })
        }
        for (let i = year; i < year + 6; i++) {
          yearList.push({
            label: i,
            value: i
          })
        }
      }
      if (this.type === 'month') {
        const monthMap = {
          '1': { label: '一月', value: '-01' },
          '2': { label: '二月', value: '-02' },
          '3': { label: '三月', value: '-03' },
          '4': { label: '四月', value: '-04' },
          '5': { label: '五月', value: '-05' },
          '6': { label: '六月', value: '-06' },
          '7': { label: '七月', value: '-07' },
          '8': { label: '八月', value: '-08' },
          '9': { label: '九月', value: '-09' },
          '10': { label: '十月', value: '-10' },
          '11': { label: '十一月', value: '-11' },
          '12': { label: '十二月', value: '-12' }
        }
        for (let i = 0; i < 12; i++) {
          const monthMapValue = monthMap[i + 1 + '']
          yearList.push({
            label: monthMapValue.label,
            value: year + monthMapValue.value
          })
        }
      }
      return yearList
    },
    clear() {
      this.$emit('input', [])
      this.$emit('change', [])
      this.dispatch('ElFormItem', 'el.form.change', [])
    },
    getShowYear() {
      const y = new Date().getFullYear()
      if (this.type === 'year') {
        const leftVal = Number(this.value[0] || 0)
        const rightVal = Number(this.value[1] || 0)
        this.leftShowYear = leftVal || y
        if (rightVal - leftVal < 12) {
          this.rightShowYear = this.leftShowYear + 12
        } else {
          this.rightShowYear = rightVal || y
        }
      }
      if (this.type === 'month') {
        const leftStr = this.value[0] || ''
        const rightStr = this.value[1] || ''
        const leftVal = Number(leftStr.split('-')[0] || 0)
        const rightVal = Number(rightStr.split('-')[0] || 0)
        this.leftShowYear = leftVal || y
        if (leftVal === rightVal) {
          this.rightShowYear = this.leftShowYear + 1
        } else {
          this.rightShowYear = rightVal || y
        }
      }
    },
    show() {
      this.visible = true
      this.getShowYear()
      this.getLeftPopoverList('')
      this.getRightPopoverList('')
      document.addEventListener('mouseup', this.close)
      this.$emit('show')
    },
    close() {
      document.removeEventListener('mouseup', this.close)
      if (this.inputValue.length !== 2) {
        this.inputValue = []
        if (this.value.length) {
          this.inputValue = this.value
        }
      }
      this.visible = false
      this.$emit('close')
    },
    select(item) {
      if (this.value.length === 2 && this.inputValue.length === 2) {
        this.inputValue = []
        this.inputValue.push(item.value)
      } else {
        this.inputValue.push(item.value)
        if (this.inputValue.length === 2) {
          let val = []
          if (this.type === 'year') {
            val = this.inputValue.sort()
          }
          if (this.type === 'month') {
            val = this.inputValue.sort((a, b) => {
              return new Date(a + '-01 00:00:00').getTime() - new Date(b + '-01 00:00:00').getTime()
            })
          }
          this.$emit('input', val)
          this.$emit('change', val)
          this.close()
          this.dispatch('ElFormItem', 'el.form.change', val)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.yao-date-picker {
  width: 100%;
  min-width: 220px;
  .el-icon-circle-close {
    opacity: 0;
    transition: opacity .3s;
    cursor: pointer;
  }
  &:hover{
    .el-icon-circle-close{
      opacity: 1;
    }
  }
}

.yao-date-popover_content {
  display: flex;

  .yao-date-popover_item {
    flex: 1;
    &+.yao-date-popover_item{
      margin-left: 20px;
    }
  }
}

.yao-date-popover_top {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfe6ec;
  padding-bottom: 12px;
  .yao-date-popover_top--year{
    font-size: 14px;
  }
  i {
    cursor: pointer;

    &:hover {
      color: #409EFF;
    }
  }
}

.yao-date-popover_list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  margin: 0;

  .yao-date-picker_item {
    width: 60px;
    height: 50px;
    margin-right: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .3s;
    cursor: pointer;
    text-align: center;

    &:nth-of-type(4n) {
      margin-right: 0;
    }

    &.active {
      color: #409eff;
    }

    &:hover {
      color: #409eff;
    }
  }
}
</style>
<style lang="scss">
.yao-date-picker_popover{
  &:before{
    content: '';
    height: 100%;
    width: 1px;
    background: #dfe6ec;
    position: absolute;
    top: 0;
    left: 50%;
  }
}
</style>
