<template>
  <div class="yao-year-range">
    <el-popover
      v-model="visible"
      placement="bottom"
      popper-class="yao-year-range_popover"
      :width="popoverWidth"
      trigger="manual"
    >
      <div class="yao-year-popover_content" @mouseup.stop>
        <div class="yao-year-popover_item left-item">
          <div class="yao-year-popover_top">
            <i class="el-icon-d-arrow-left" @click.stop="getPopoverList('ll')" />
            <span class="yao-year-popover_top--year"> {{ leftYearText }} </span>
            <i class="el-icon-d-arrow-right" @click.stop="getPopoverList('lr')" />
          </div>
          <ul class="yao-year-popover_list">
            <li
              v-for="item in leftPopoverList"
              :key="item.value"
              class="yao-year-range_item"
              :class="{active: inputValue.includes(item.value)}"
              @click.stop="select(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
        <div class="yao-year-popover_item right-item">
          <div class="yao-year-popover_top">
            <i class="el-icon-d-arrow-left" @click.stop="getPopoverList('rl')" />
            <span class="yao-year-popover_top--year"> {{ rightYearText }} </span>
            <i class="el-icon-d-arrow-right" @click.stop="getPopoverList('rr')" />
          </div>
          <ul class="yao-year-popover_list">
            <li
              v-for="item in rightPopoverList"
              :key="item.value"
              class="yao-year-range_item"
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
  name: 'YaoYearRange',
  mixins: [emitter],
  emits: ['change', 'show', 'close'],
  inject: ['elForm'],
  props: {
    value: {
      type: [Array],
      default: () => ([])
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
      popoverWidth: 580,
      inputValue: [],
      leftPopoverList: [],
      leftShowYear: 0,
      rightPopoverList: [],
      rightShowYear: 0
    }
  },
  computed: {
    leftYearText() {
      return `${this.leftShowYear - 6} 年 - ${this.leftShowYear + 5} 年`
    },
    rightYearText() {
      return `${this.rightShowYear - 6} 年 - ${this.rightShowYear + 5} 年`
    },
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
      if (type === 'll') {
        year = this.leftShowYear - 12
      }
      if (type === 'lr') {
        year = this.leftShowYear + 12
        if (year >= this.rightShowYear) {
          year = this.leftShowYear
        }
      }
      this.leftPopoverList = this.getDateItemList(year)
      this.leftShowYear = year
    },
    getRightPopoverList(type) {
      let year = this.rightShowYear
      if (type === 'rl') {
        year = this.rightShowYear - 12
        if (year <= this.leftShowYear) {
          year = this.rightShowYear
        }
      }
      if (type === 'rr') {
        year = this.rightShowYear + 12
      }
      this.rightPopoverList = this.getDateItemList(year)
      this.rightShowYear = year
    },
    getDateItemList(y) {
      const year = Number(y)
      const yearList = []
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
      return yearList
    },
    clear() {
      this.$emit('input', [])
      this.$emit('change', [])
      this.dispatch('ElFormItem', 'el.form.change', [])
    },
    getShowYear() {
      const y = new Date().getFullYear()
      const leftVal = Number(this.value[0] || 0)
      const rightVal = Number(this.value[1] || 0)
      this.leftShowYear = leftVal || y
      if (rightVal - leftVal < 12) {
        this.rightShowYear = this.leftShowYear + 12
      } else {
        this.rightShowYear = rightVal || y
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
          const val = this.inputValue.sort()
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
.yao-year-range {
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

.yao-year-popover_content {
  display: flex;

  .yao-year-popover_item {
    flex: 1;
    &+.yao-year-popover_item{
      margin-left: 20px;
    }
  }
}

.yao-year-popover_top {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfe6ec;
  padding-bottom: 12px;
  .yao-year-popover_top--year{
    font-size: 14px;
  }
  i {
    cursor: pointer;

    &:hover {
      color: #409EFF;
    }
  }
}

.yao-year-popover_list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  margin: 0;

  .yao-year-range_item {
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
.yao-year-range_popover{
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
