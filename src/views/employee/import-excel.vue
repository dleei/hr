<template>
  <el-dialog
    title="导入员工模版"
    :visible="showImportDialog"
    width="500px"
    @close="$emit('update:showImportDialog',false)"
  >
    <i class="el-icon-upload" />
    <el-row>
      <el-button type="text" @click="download">下载模版</el-button> // BUG 下载模版
    </el-row>
    <div class="el-upload__text">将文件拖到此处，或<el-button type="text">点击上传</el-button></div>
    <template #footer>
      <el-button type="primary" size="mini" @click="$emit('update:showImportDialog',false)">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { downloadExcel } from '@/api/department'
import fileSaver from 'file-saver'
export default {
  props: {
    showImportDialog: {
      require: true,
      type: Boolean,
      default: false
    }
  },
  methods: {
    async download() {
      const res = await downloadExcel()
      fileSaver.saveAs(res, '员工模版.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
