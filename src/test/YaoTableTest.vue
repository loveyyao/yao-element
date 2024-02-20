<template>
  <div>
    <div>普通用法</div>
    <yao-table :data="tableData2" border style="width: 100%">
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
            <el-button slot="reference" type="text" size="small">弹出层表格</el-button>
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
    </yao-table>
    <div>columns</div>
    <yao-table
        border
        :columns="columns"
        :data="tableData"
    >
      <template slot="prop2">
        <span>使用插槽显示字段2</span>
      </template>
      <template slot="prop2Header">
        <span>使用插槽显示字段2表头</span>
      </template>
    </yao-table>
    <div>列拖拽</div>
    <yao-table
        col-drag
        border
        :columns="columns"
        :data="tableData"
        @col-drag-end="dragEnd"
    >
      <template #prop2>
        <span>使用插槽显示字段2</span>
      </template>
      <template #prop2Header>
        <span>使用插槽显示字段2表头</span>
      </template>
    </yao-table>
    <div>行拖拽</div>
    <yao-table
        row-drag
        border
        row-key="id"
        :columns="columns"
        :data="tableData"
        @row-drag-end="dragEnd"
    >
      <span slot="prop2">使用插槽显示字段2</span>
      <span slot="prop2Header">使用插槽显示字段2表头</span>
      <template slot="prop2Header">
        <span>使用插槽显示字段2表头</span>
      </template>
      <template slot="empty">
        <span>使用插槽显示字段2表头</span>
      </template>
    </yao-table>
  </div>
</template>

<script>
import YaoTable from '@/components/YaoTable/index.vue'
import YaoPopover from "@/components/YaoPopover/index.vue";

export default {
  name: 'YaoTableTest',
  components: {
    YaoPopover,
    YaoTable
  },
  data() {
    return {
      columns: [],
      tableData: [],
      tableData2: [
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
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      // setTimeout(() => {
        const columns = []
        const data = []
        for (let i = 0; i < 5; i++) {
          columns.push({
            props: {
              minWidth: '180px',
              prop: 'prop' + i,
              label: '字段' + i,
              align: 'center'
            },
            slots: i === 2 ? {
                  default: 'prop2',
                  header: 'prop2Header'
                } : null,
            // 其他的属性，如数据库存储id等
            id: i,
            label: '字段' + i
          })
        }
        for (let i = 0; i < 10; i++) {
          const obj = {
            id: i
          }
          for (let j = 0; j < 5; j++) {
            obj['prop' + j] = `数据${i}-${j}`
          }
          data.push(obj)
        }
        console.log(columns);
        this.tableData = data
        this.columns = columns
      // }, 0)
    },
    // 表头拖拽排序结束事件
    dragEnd(event) {
      console.log(event)
    }
  }
}
</script>
