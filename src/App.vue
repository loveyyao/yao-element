<template>
  <div id="app">
    <el-tabs v-model="activeName">
      <el-tab-pane label="详情表单" name="descForm">
        <yao-desc-form-test />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import YaoDescFormTest from "@/test/YaoDescForm.vue";

export default {
  name: 'App',
  components: {YaoDescFormTest},
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
