<template>
  <div>
    <el-card>
      <el-row type="flex" justify="center">
        <img src="../../assets/login_title.png" alt="">
      </el-row>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button style="width: 200px" type="primary" @click="login">登录</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        mobile: '13800000002',
        password: 'hm#qd@23!'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { partten: /^1[3-9]\d{9}$/, message: '请输入合法手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '手机号长度在 4 ~ 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login() {
      // 登录前表单兜底校验
      this.$refs.form.validate()
      await this.$store.dispatch('user/login', this.form)
      // 提示用户登录成功
      this.$message.success('登录成功') // this.$route.query.redirect 优化跳转到上次登录前的页面
      // 跳转到首页
      this.$router.push('/')
    }
  }

}
</script>

<style lang="scss" ecoped>
.el-card {
    width: 600px;
    height: 400px;
    margin: 100px auto;
  }
</style>
