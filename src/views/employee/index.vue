<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input size="mini" placeholder="请输入角色名" />
      </div>
      <div class="right">
        <el-row type="flex" justify="end">
          <el-button type="primary" size="mini">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <el-table border stripe style="margin-top:20px" :data="list">
          <el-table-column label="头像" width="60px" prop="staffPhoto">
            <!-- <img :src="staffPhoto"> -->
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
          <el-table-column v-slot="scoped" label="部门" prop="departmentId">
            {{ scoped.row.departmentId }}
          </el-table-column>
          <el-table-column v-slot="scoped" label="入职时间" sortable prop="timeOfEntry">
            {{ scoped.row.timeOfEntry }}
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="text" size="mini">查看</el-button>
              <el-button type="text" size="mini">角色</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="height:60px" type="flex" justify="end" align="middle">
          <el-pagination
            :total="20"
            background
            :page-sizes="[ 4, 6, 8]"
            :page-size="queryData.pagesize"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'Employee',
  data() {
    return {
      total: 0,
      currentPage: 1,
      queryData: {
        page: 1,
        pagesize: 4
      },
      list: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await getEmployeeList(this.queryData)
      // console.log(res)
      this.list = res.data.rows
      this.total = res.total
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
    padding-right: 20px;
    width: 280px;
    border-right: 1px solid #333;
  }
}.right {
  flex: 1;
  padding: 20px;
}
}
</style>
