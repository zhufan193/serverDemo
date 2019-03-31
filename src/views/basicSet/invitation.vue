<template>
    <div class="div-content">
       <el-form ref="form" :model="form" label-width="80px">
            <el-form-item class="el-open-money" label="开启红包">
                <el-switch class="el-first-open" v-model="form.enableRed"></el-switch>
            </el-form-item>
            <el-form-item class="el-money" label="红 包">
                <el-input :disabled="!form.enableRed"  class="el-content-input" placeholder="请输入红包金额" v-model="form.redPackage"></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item class="div-null">
            </el-form-item>
            <el-form-item class="el-open-money" label="开启分佣">
                <el-switch class="el-first-open" v-model="form.enableClass"></el-switch>
            </el-form-item>
            <el-form-item class="el-money" label="订单提成">
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入总分佣" v-model="form.classA1"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item class="el-money" label="一级分佣">
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入总分佣" v-model="form.classA1"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item class="el-money" label="二级分佣">
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入A级分佣" v-model="form.classA2"></el-input>
                <span>%</span>
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入B级分佣" v-model="form.classB2"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item class="el-money" label="三级分佣">
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入A级分佣" v-model="form.classA3"></el-input>
                <span>%</span>
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入B级分佣" v-model="form.classB3"></el-input>
                <span>%</span>
                <el-input :disabled="!form.enableClass" class="el-content-input" placeholder="请输入C级分佣" v-model="form.classC3"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item class="el-money" label="规则说明">
                <el-input :disabled="!form.enableClass" class="el-set" placeholder="请输入" type="textarea" v-model="form.invateDetail"></el-input>
            </el-form-item>
            <el-form-item class="el-money sure">
                <el-button class="el-button" type="primary" @click="onSubmit()">保存</el-button>
            </el-form-item>
       </el-form>
    </div>
</template>
<script>
import { getqueryInvateRule } from '@/api/system';
import { updateInvateRule } from '@/api/system';
  export default {
    data() {
      return {
        form: {
            id: 1,
            enableRed:null, //开启红包
            redPackage: null,
            enableClass: null, //开启分佣
            classA1: null,
            classA2: null,
            classB2: null,
            classA3: null,
            classB3: null,
            classC3: null,
            invateDetail: null
        }
      }
    },
    created() {
        this.getInvateRule();
    },
    methods: {
        //获取邀请规则配置
        getInvateRule() {
            getqueryInvateRule().then(res=>{
                const data = res.data.result;
                data.enableRed = data.enableRed == 1 ? true : false;
                data.enableClass = data.enableClass == 1 ? true : false;
                this.form = data;
                console.log(res)
            }).catch((error) => {
                console.log(error);
            })
        },
        onSubmit() {
            if(this.form.enableRed && !this.form.redPackage > 0 ){
                return this.$message.error('请输入红包金额');
            }
            console.log(this.form.enableClass)
            if(this.form.enableClass){
               if(!this.form.classA1 > 0) {
                   return this.$message.error('请输入订单提成');
               }
               if(!this.form.classA2 > 0){
                   return this.$message.error('请输入A级分佣二级');
               }
               if(!this.form.classB2 > 0){
                   return this.$message.error('请输入B级分佣二级');
               }
               const b = parseInt(this.form.classA2) + parseInt(this.form.classB2);
               if (b != parseInt(this.form.classA1)){
                  return this.$message.error('二级分佣总和应等于一级分佣'); 
               }
               if(!this.form.classA3 > 0){
                   return this.$message.error('请输入A级分佣三级');
               }
               if(!this.form.classB3 > 0){
                   return this.$message.error('请输入B级分佣三级');
               }
               if(!this.form.classC3 > 0){
                   return this.$message.error('请输入C级分佣三级');
               }
               const c = parseInt(this.form.classA3) + parseInt(this.form.classB3) + parseInt(this.form.classC3);
               console.log(this.form.classA3,this.form.classC3,this.form.classB3)
               if (c != parseInt(this.form.classA1)){
                  return this.$message.error('三级分佣总和应等于一级分佣'); 
               }
               if(!this.form.invateDetail.length > 0){
                  return this.$message.error('请输入规则说明');  
               }
            }
            const enableRed = this.form.enableRed == true ? 1 : 0;
            const enableClass = this.form.enableClass == true ? 1 : 0;
            const form={
                id: this.form.id,
                enableRed: enableRed, //开启红包
                redPackage: this.form.redPackage,
                enableClass: enableClass, //开启分佣
                classA1: this.form.classA1,
                classA2: this.form.classA2,
                classB2: this.form.classB2,
                classA3: this.form.classA3,
                classB3: this.form.classB3,
                classC3: this.form.classC3,
                invateDetail: this.form.invateDetail,
            }
            updateInvateRule(form).then(res=>{
                const data = res.data.result;
                this.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success'
                });
                this.getInvateRule();
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
        padding:30px;
        .el-open-money{
            width:64px;
            height:21px;
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:21px;
            .el-first-open{
                margin-left: 30px;
            }
        }
        .el-money{
            font-size:16px;
            font-family:MicrosoftYaHei;
            color:rgba(0,0,0,1);
            .el-content-input{
                width:200px;
                height:38px;
                margin-left: 30px;
            }
            .el-set{
                margin-left: 30px;
                width:874px;
            }
            .el-button{
                padding: 6px 24px !important;
            }
        }
        .sure{
            margin-left: -68px;
        }
        .div-null{
            margin:40px 60px 20px 10px;
            width:1300px;
            height:1px;
            background:rgba(216,216,216,1);
        }
        
    }
</style>

