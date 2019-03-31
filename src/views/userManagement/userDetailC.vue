<template >
  <div class="div-content">
    <div class="div-back">
      <el-button class="el-button el-button--primary el-button--mini" @click="gotoback()">返回上一级</el-button>
    </div>
    <div class="div-information">
      <div class="div-top-main">
        <span>直接推广人：</span>
        <span>{{userInfo.username}}</span>
      </div>
      <div class="div-top-main">
        <span>手机号码：</span>
        <span>{{userInfo.phone}}</span>
      </div>
      <div class="div-top-main">
        <span>推广总人数：</span>
        <span>{{allnum}}人</span>
      </div>
    </div>

    <div class="div-native">
      <div class="div-top-first">
        <el-input  v-model="form.search" placeholder="搜索昵称/手机号"></el-input>
      </div> 
      <div class="div-top-first second">
        <el-button type="primary" icon="el-icon-search" @click="getInvateList()">搜索</el-button>
      </div> 
      <div class="div-top-first second">
        <el-button @click="reset()">重置</el-button>
      </div>
    </div>
    <div class="div-content-main">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
        <el-table-column
          prop="username"
          label="昵称"
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          >
        </el-table-column>
        <el-table-column
          label="直接推广人数"
          >
          <template slot-scope="scope">
            <router-link :to="{path:'/userManagement/userDetailD', query: {id:scope.row.id}}" class="div-num">
              {{ scope.row.stuNum }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyMoney"
          label="交易额"
          >
        </el-table-column>    
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=form.page
          :page-size=form.pageSize
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total=total
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getqueryInvateList } from '@/api/userManagement';
import { getqueryCountInvate } from '@/api/userManagement';
export default {
  data(){
    return{
      form: {
        id: null,
        page: 1,
        pageSize: 10,
        search: null
      },
      userInfo: {
        name: null,
        phone: null,
      },
      allnum: 0,
      tableData: [],
      total: null
    }
  },
  created() {
    this.form.id = this.$route.query.id;
    this.getInvateList();
    this.getqueryCountInvate();
  },
  methods: {
    //查询用户徒弟列表
    getInvateList() {
      getqueryInvateList(this.form).then(res => {
        const data = res.data;
        this.total = data.total;
        this.tableData = data.result;
        this.userInfo = data.userInfo;
        this.createTime = data.userInfo.createTime.substring(0, 10);
        console.log(res)
      }).catch((error) => {
          console.log(error)
      })
    },
    //查询某人邀请人数
    getqueryCountInvate() {
      const form = {
        id: this.form.id
      }
      getqueryCountInvate(form).then(res => {
        const num = res.data.result;
        this.allnum = num.count1 + num.count2 + num.count3;
      }).catch((error) => {
        console.log(error);
      });
    },
    //返回
    gotoback() {
      this.$router.go(-1)
    },
    //重置
    reset() {
      this.form.search = '';
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getInvateList();
    },
    handleCurrentChange(val) {
      this.form.page = val;
      console.log(`当前页: ${val}`);
      this.getInvateList();
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .div-content{
    padding:30px 30px 30px 60px;
    .div-information{
      margin-top: 28px;
      .div-top-main{
        display: -webkit-inline-box;
        width:300px;
        height:16px;
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:16px;
      }
    }
    .div-native{
      margin-top: 24px;
      .div-top-first{
        display: -webkit-inline-box;
        .top-name{
          padding-top: 10px;
          margin-right: 10px;
          span{
            color: #606266;
          }
        }
      }
      .second{
        margin-left: 10px;
        /deep/.el-range-separator{
            padding: 1px 0px;
            width: 6%;
        }
        /deep/.el-range-editor.el-input__inner{
            width: 250px;
        }
      }
      .num{
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:16px;
        margin-left: 1155px;
      }
    }
    .div-content-main{
      margin-top: 30px;
      text-align: center;
      /deep/ thead{
        th{
          background-color: #f0f0f0;
          text-align: center !important;
          width:56px;
          height:14px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(102,102,102,1);
          line-height:14px;
        }
        .gutter{
          display: -webkit-inline-box !important;
        }
      }
      .see{
        color: #409EFF;
      }
      .block{
        margin-top: 80px;
        text-align: center;
      }
    }
    .div-num{
      margin-left: 10px;font-family:MicrosoftYaHei;
      color:rgba(69,133,245,1);
    }
  }
</style>
