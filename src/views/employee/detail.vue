<template>
  <el-card>
    <el-form ref="form" :model="userInfo" :rules="rules">
      <el-form-item label-width="180px" label="姓名" prop="username">
        <el-input v-model="userInfo.username" style="width: 30%" size="mini" />
      </el-form-item>
      <el-form-item label-width="180px" label="工号" prop="workNumber">
        <el-input v-model="userInfo.workNumber" disabled style="width: 30%" size="mini" />
      </el-form-item>
      <el-form-item label-width="180px" label="手机" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width: 30%" size="mini" />
      </el-form-item>
      <el-form-item label-width="180px" label="部门" prop="departmentId">
        <template>
          <!-- <el-cascader
            v-model="value"
            :options="departmentOptions"
            @change="handleChange"
          /> -->
        </template>
      </el-form-item>
      <el-form-item label-width="180px" label="聘用形式" prop="formOfEmployment">
        <el-select v-model="userInfo.formOfEmployment" style="width: 30%" size="mini" placeholder="请选择">
          <el-option
            v-for="item in formOfEmploymentOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label-width="180px" label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          size="mini"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label-width="180px" label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="userInfo.correctionTime"
          size="mini"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label-width="180px" label="员工头像" prop="staffPhoto">
        <user-avatar />
      </el-form-item>
      <el-form-item label-width="180px">
        <el-button size="mini" type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import userAvatar from '@/views/employee/component/userImg.vue'
import { addEmployee } from '@/api/employee'
export default {
  components: { userAvatar },
  data() {
    return {
      // departmentOptions: [
      //   { value: '' ,label: ''}
      // ],
      userInfo: {
        username: '', // 员工姓名
        mobile: '', // 员工手机号
        formOfEmployment: '', // 员工聘用形式
        workNumber: '', // 员工工号
        departmentId: '', // 员工部门 id
        timeOfEntry: '', // 员工入职日期
        correctionTime: '', // 员工转正日期
        staffPhoto: '' // 头像信息
      },
      rules: {
        username: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ], // 员工姓名
        mobile: [
          { required: true, message: '请输入员工手机号', trigger: 'blur' }
        ], // 员工手机号
        formOfEmployment: [
          { required: true, message: '请输入员工聘用形式', trigger: 'change' }
        ], // 员工聘用形式
        // workNumber: [
        //   { required: true, message: '请输入员工工号', trigger: 'blur' }
        // ], // 员工工号
        departmentId: [
          { required: true, message: '请输入员工部门', trigger: 'blur' }
        ], // 员工部门 id
        timeOfEntry: [
          { required: true, message: '请输入员工入职日期', trigger: 'blur' }
        ], // 员工入职日期
        correctionTime: [
          { required: true, message: '请输入员工转正日期', trigger: 'blur' },
          {
            validator: (rule, val, callBack) => {
              +new Date(this.userInfo.timeOfEntry) > +new Date(val) ? callBack(new Error('转正日期不能小于入职日期')) : callBack()
            },
            message: '请选择员工转正日期',
            trigger: 'change'
          }
        ], // 员工转正日期
        staffPhoto: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ] // 头像信息
      },
      formOfEmploymentOption: [
        { value: '2', label: '非正式' },
        { value: '1', label: '正式' }
      ],
      value: ''
    }
  },
  methods: {
    handleChange() {

    },
    async submit() {
      this.$refs.form.validate()
      const res = await addEmployee(this.userInfo)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
