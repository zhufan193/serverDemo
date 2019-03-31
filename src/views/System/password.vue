<template >
  <div class="div-content" style="padding:30px;">
    <div class="div-content-main">
        <span class="div-span el-name">用户名</span>
        <span class="div-password">{{userName}}</span>
    </div>
    <div class="div-content-main">
        <span class="div-span">原密码</span>
      <el-input class="div-password" type="password"  v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
    </div>
    <div class="div-content-main">
      <span class="div-span">新密码</span>
      <el-input class="div-password" type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
    </div>
    <div class="div-content-main">
      <span class="div-sure-span div-pass">确认密码</span>
      <el-input class="div-password" type="password" v-model="form.rePassword" placeholder="请再次确认新密码" @blur="checkPassword()"></el-input>
    </div>
    <div class="div-button">
      <el-button type="primary" @click="restPassword()">确认</el-button>
    </div>
  </div>
</template>
<script>
import { updatePassword } from '@/api/system'
export default {
  data(){
    return{
      form:{
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      userName: '张三'
    }
  },
  created(){
   
  },
  methods:{
    checkPassword(){
     if(this.form.newPassword !== this.form.rePassword){
       this.form.rePassword = "";
       return this.$message.error('两次输入的密码不一致');
     }
    },
    //修改密码
    restPassword() {
      if (!this.form.oldPassword) {
        return this.$message.error('请输入原密码');
      }
      if (!this.form.newPassword) {
        return this.$message.error('请输入新密码');
      }
      if (!this.form.rePassword) {
        return this.$message.error('请再次确认新密码');
      }
      if(this.form.newPassword !== this.form.rePassword){
        this.form.rePassword = "";
        return this.$message.error('两次输入的密码不一致');
      }
      updatePassword(this.form).then(res=>{
        console.log(res)
      }).catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .div-content{
    width: 100%; 
    text-align: center;
    .div-content-main{
      margin-top: 30px;
      .div-span{
        width:48px;
        height:16px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        color:rgba(0,0,0,1);
        line-height:16px;
      }
      .el-name{
        margin-left: -16.8rem;
      }
      .div-pass{
        margin-left: -16px;
      }
      .div-password{
        width:300px;
        height:40px;
        margin-top: 10px;
        margin-left: 40px;
      }
    }
    .div-button{
      margin-top: 106px;
      .el-button{
        padding: 7px 24px;
      }
    }
  }
</style>