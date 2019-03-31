<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">欢迎您登录</h3>
      <el-form-item prop="username" class="div-el-password">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" class="div-input" name="username" type="text" auto-complete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password" class="div-el-password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          class="div-input"
        />
      </el-form-item>
      <el-form-item class="div-check">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="div-login" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">忘记密码联系管理员</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { login } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.checked = localStorage.getItem('checked') == 'true'
    this.loginForm.username = localStorage.getItem('username')
    this.loginForm.password = localStorage.getItem('password')
  },
  methods: {
    handleLogin() {
      if (this.checked) {
        localStorage.setItem('username', this.loginForm.username)
        localStorage.setItem('password', this.loginForm.password)
        console.log('getItem', localStorage.getItem('checked'))
      }
      localStorage.setItem('checked', this.checked)

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            console.log(this.redirect, 'this.redirect')
            this.$router.push({ path: 'home/loginSuccess' || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url('../../assets/login_images/login-bg.png');
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 40px auto;
      width:390px;
      height:500px;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 16px 0px rgba(0,0,0,0.12);
      border-radius:2px;
      /deep/ .el-form-item__error{
        left: 33px;
      }
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      text-align: center;
      span {
          width:162px;
          height:23px;
          font-size:18px;
          font-family:MicrosoftYaHeiUI;
          color:rgba(142,154,157,1);
          line-height:23px;
      /deep/  &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      width:180px;
      height:36px;
      font-size:36px;
      font-family:MicrosoftYaHeiUI;
      color:rgba(51,51,51,1);
      line-height:36px;
      letter-spacing:9px;
    }
    .div-el-password{
      padding-left: 0px;
    }
    .div-check{
      padding-left: 16px;
    }
     .div-input{
      width: 280px;
      background-color: #ffffff !important;
      /deep/.el-input__inner{
        border-radius: 0px;
        border-width: 0 0 1px 0;
      }
    }
    .div-login{
      width:300px !important;
      margin-left: 20px;
      height:50px;
      background:rgba(62,151,254,1);
      box-shadow:0px 6px 18px 0px rgba(62,151,254,0.36);
      border-radius:28px;
    }
  }
</style>
