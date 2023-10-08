<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
        >
        <!-- @change="handleChange" -->
        // TODO 处理员工批量导入
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="download">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="$refs['excel-upload-input'].click()">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { downloadExcel } from '@/api/department'
import FileSaver from 'file-saver'
export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async download() {
      const res = await downloadExcel()
      FileSaver.saveAs(res, '员工模版.xlsx')
    }
    // 监听文件选择框的 change 事件,获取到选择的文件对象
    // handleChange(e) {  // TODO 员工数据批量导入

    // }

  }
}
</script>

<style scoped lang="scss">
    .upload-excel {
      display: flex;
      justify-content: center;
      margin: 20px;
      width: 360px;
      height: 180px;
      align-items: center;
      color: #697086;
      .excel-upload-input {
        display: none;
        z-index: -9999;
      }
      .btn-upload,
      .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .drop {
        line-height: 40px;
        color: #bbb;
        i {
          font-size: 60px;
          display: block;
          color: #c0c4cc;
        }
      }
    }
</style>
