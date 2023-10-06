<template>
  <div>
    <el-card>
      <el-tree
        :data="data"
        :props="defaultProps"
        default-expand-all
        check-strictly
      >
        <template v-slot="scoped">
          <el-row style="width: 100%">
            <el-col :span="21">{{ scoped.data.name }}</el-col>
            <el-col :span="3">
              <el-row type="flex" justify="end">
                <el-col>管理员</el-col>
                <el-col>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                      <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                      <el-dropdown-item command="del">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </el-card>
    <add-dept :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/department'
import { transListToTree } from '@/utils'
import addDept from './dept-dialog.vue'
export default {
  components: { addDept },
  data() {
    return {
      showDialog: false, // 是否显示添加子部门弹框
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await getDepartments()
      // 扁平结构转树形结构
      this.data = transListToTree(res.data)
    },
    handleCommand(val) {
      if (val === 'add') {
        this.showDialog = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  padding: 20px 50px;
  margin: 20px;
}
</style>
