<template>
  <el-card>
    <el-tree :data="treeData" :props="defaultProps" default-expand-all>
      <template>
        <el-row style="width:100%">
          <el-col :span="21">传智教育</el-col>
          <el-col :span="3">
            <el-row type="flex" justify="space-around">
              <el-col>管理员</el-col>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-tree>
  </el-card>
</template>

<script>
import { getDepartments } from '@/api/department'
import { transListToTree } from '@/utils'
export default {
  name: 'Department',
  data() {
    return {
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await getDepartments()
      console.log(transListToTree(res.data))
      this.treeData = transListToTree(res.data)
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  .el-tree {
    margin: 0 80px;
  }
}
</style>
