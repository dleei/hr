<template>
  <div>  <el-card>
           <el-tree :data="treeData" :props="defaultProps" default-expand-all :expand-on-click-node="false">
             <template>
               <el-row style="width:100%">
                 <el-col :span="21">传智教育</el-col>
                 <el-col :span="3">
                   <el-row type="flex" justify="space-around">
                     <el-col>管理员</el-col>
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
                   </el-row>
                 </el-col>
               </el-row>
             </template>
           </el-tree>
         </el-card>
    <dept-dialog :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/department'
import { transListToTree } from '@/utils'
import deptDialog from './dept-dialog.vue'
export default {
  name: 'Department',
  components: {
    deptDialog
  },
  data() {
    return {
      showDialog: false,
      treeData: [],
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
      this.treeData = transListToTree(res.data)
    },
    handleCommand(type) {
      if (type === 'add') {
        this.showDialog = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  height: 400px;
  margin: 20px;
  .el-tree {
    margin: 0 80px;
  }
}
</style>
