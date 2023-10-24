<template>
  <div>
    <el-card>
      <el-button type="primary" size="mini" style="margin-bottom: 15px">添加权限</el-button>
      <el-table :data="list" row-key="id" border :header-cell-style="{ 'background': '#f5f6f8'}">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'
export default {
  name: 'Permission',
  data() {
    return {
      list: [] // 权限点列表数据
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await getPermissionListAPI()
      this.list = data
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
}
</style>
