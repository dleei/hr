<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 左树 -->
        <el-input
          v-model="queryData.keywords"
          size="mini"
          placeholder="请输入角色名"
          @input="handleSearch"
        />
        <!--
          highlight-current 高亮当前点击的节点
          expand-on-click-node 设置点击任意位置都展开,只有点击下箭头才会展开
          -->
        <el-tree
          ref="tree"
          node-key="id"
          default-expand-all
          :data="treeData"
          :props="defaultProps"
          highlight-current
          :expand-on-click-node="false"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <!-- 右表 -->
        <el-row type="flex" justify="end">
          <el-button type="primary" size="mini" @click="$router.push('employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="openImportDialog">excel导入</el-button>
          <el-button size="mini" @click="exportExcel">excel导出</el-button>
        </el-row>

        <el-table stripe style="margin-top:20px" :data="list" :header-cell-style="{'background': '#f3f4f7'}">
          <el-table-column label="头像" width="60px" prop="staffPhoto">
            <template v-slot="scoped">
              <el-avatar v-if="scoped.row.staffPhoto" :size="30" :src="scoped.row.staffPhoto" />
              <span v-else class="username">{{ scoped.row.username?.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column v-slot="scoped" label="姓名" prop="username">
            {{ scoped.row.username }}
          </el-table-column>
          <el-table-column v-slot="scoped" label="手机号" sortable prop="mobile">
            {{ scoped.row.mobile }}
          </el-table-column>
          <el-table-column v-slot="scoped" label="工号" sortable prop="workNumber">
            {{ scoped.row.workNumber }}
          </el-table-column>
          <el-table-column v-slot="scoped" label="聘用形式" prop="formOfEmployment">
            {{ scoped.row.formOfEmployment === 1 ? '正式' : '非正式' }}
          </el-table-column>
          <el-table-column v-slot="scoped" label="部门" prop="departmentName">
            {{ scoped.row.departmentName }}
          </el-table-column>
          <el-table-column v-slot="scoped" label="入职时间" sortable prop="timeOfEntry">
            {{ scoped.row.timeOfEntry }}
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="text" size="mini">查看</el-button>
              <el-button type="text" size="mini">角色</el-button>
              <el-button
                slot="reference"
                type="text"
                size="mini"
                class="del-button-margin-left-10"
                @click="open(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="height:60px" type="flex" justify="end" align="middle">
          <el-pagination
            :total="total"
            background
            :page-sizes="[ 5, 10, 15]"
            :page-size="queryData.pagesize"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>
    </div>
    <import-excel :show-excel-dialog.sync="showExcelDialog" />
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employee'
import { delEmployee, exportExcel, getDepartments } from '@/api/department'
import { transListToTree } from '@/utils'
import FileSaver from 'file-saver'
import importExcel from './component/import-excel.vue'
export default {
  name: 'Employee',
  components: { importExcel },
  data() {
    return {
      total: null,
      currentPage: 1,
      queryData: {
        page: 1,
        pagesize: 5,
        keywords: '',
        departmentId: ''
      },
      list: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showExcelDialog: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await getDepartments() // 左边的树状图
      // 获取第一个节点的 id
      const id = res.data[0].id
      this.queryData.departmentId = id
      this.treeData = transListToTree(res.data)
      this.loadEmployee()
      // 默认进入时,设置第一个节点高亮
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(id)
      })
    },
    async loadEmployee() {
      const { data } = await getEmployeeList(this.queryData) // 右边的表格
      this.list = data.rows
      this.total = data.total
    },
    fn(scoped) {
      console.log(scoped)
    },
    handleSizeChange(size) {
      this.queryData.pagesize = size
      this.loadData()
    },
    handleCurrentChange(page) {
      this.queryData.page = page
      this.loadData()
    },
    handleSearch() {
      this.queryData.page = 1
      this.loadEmployee()
    },
    selectNode(data) {
      this.queryData.departmentId = data.id // 将当前点击选中的节点的 id 设置为请求数据的部门 id
    },
    async exportExcel() {
      const res = await exportExcel()
      // 使用 file-saver 包将返回的 Blob 文件保存为 excel 文件
      /**
       * 参数一: 返回的 blob 文件
       * 参数二: 保存为 excel 文件的文件名
       */
      FileSaver.saveAs(res, '员工信息表.xlsx') // BUG 员工信息表导出
    },
    openImportDialog() {
      this.showExcelDialog = true
    },
    async open(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { message, code } = await delEmployee(id)
        code === 50001 ? this.$message.error(message) && location.reload() : this.$message.success(message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .app-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  .left {
    padding: 20px;
    width: 280px;
    border-right: 1px solid #f3f4f7;
  }
}.right {
  flex: 1;
  padding: 20px;
}
}

.el-tree {
  margin-top: 20px;
}
.username {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px !important;
  height: 30px !important;
  background-color: aquamarine;
  border-radius: 50%;
  color: #fff;
}
.del-button-margin-left-10 {
  margin-left: 10px;
}
</style>
