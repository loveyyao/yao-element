<template>
  <div>
    <div>问题呈现</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="300">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="province" label="弹出层表格" width="180">
        <template>
          <el-popover placement="right" trigger="hover" width="400">
            <el-table :data="gridData">
              <el-table-column width="150" property="date" label="日期"></el-table-column>
              <el-table-column width="100" property="name" label="姓名"></el-table-column>
              <el-table-column width="300" property="address" label="地址"></el-table-column>
            </el-table>
            <el-button slot="reference">弹出层表格</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="250">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="150">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="350">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="220">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template>
          <el-button type="text" size="small">
            查看
          </el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>问题修复</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="300">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="province" label="弹出层表格" width="180">
        <template>
          <yao-popover placement="right" trigger="hover" width="400">
            <el-table :data="gridData">
              <el-table-column width="150" property="date" label="日期"></el-table-column>
              <el-table-column width="100" property="name" label="姓名"></el-table-column>
              <el-table-column width="300" property="address" label="地址"></el-table-column>
            </el-table>
            <el-button slot="reference">弹出层表格</el-button>
          </yao-popover>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="250">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="150">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="350">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="220">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template>
          <el-button type="text" size="small">
            查看
          </el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import YaoPopover from "@/components/YaoPopover/index.vue";

export default {
  name: "YaoPopoverTest",
  components: {YaoPopover},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
