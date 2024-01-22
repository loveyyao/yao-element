<template>
  <div id="app">
    <el-tabs v-model="activeName">
      <el-tab-pane label="详情表单" name="descForm">
        <yao-desc-form-test />
      </el-tab-pane>
      <el-tab-pane label="弹出层" name="yaoPopover">
        <yao-popover-test />
      </el-tab-pane>
      <el-tab-pane label="表格" name="yaoTable">
        <yao-table-test />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import YaoDescFormTest from "@/test/YaoDescForm.vue";
import YaoPopoverTest from "@/test/YaoPopoverTest.vue";
import YaoTableTest from "@/test/YaoTableTest.vue";

export default {
  name: 'App',
  components: {YaoTableTest, YaoPopoverTest, YaoDescFormTest},
  data() {
    return {
      activeName: 'descForm'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
