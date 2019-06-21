<template>
  <div class="myLogin">
    <div class="loginBox">
        <h2>登录信息</h2>
      <el-form
        :model="userInfo"
        status-icon
        label-position="top"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   判断输入有效,则需要发送请求
          //   alert("success");
          this.$http({
            method: 'POST',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.userInfo
          }).then(res => {
            const { data, meta } = res.data
            if (meta.status === 200) {
              window.localStorage.setItem('token', data.token)
              //  表示登录成功
              this.$router.push('/')
              this.$message({
                showClose: true,
                message: '登录成功~',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: '登录失败:密码错误~',
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.myLogin {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.loginBox {
  width: 580px;
  height: 440px;
  position: absolute;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  box-sizing: border-box;
}
</style>
