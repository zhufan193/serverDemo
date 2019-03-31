<template >
  <div class="div-content">
    <div class="div-back">
      <router-link :to="{path:'/userManagement/viewLists'}" class="el-button el-button--primary el-button--mini">返回上一级
      </router-link>
    </div>
    <div class="div-information">
      <div class="div-null"></div>
      <div class="div-first-info">
        基本信息：
      </div>
      <div class="div-name">
        <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
        <span>{{userInfo.username}}</span>
      </div>
      <div class="div-name">
        <span>手机号码：</span>
        <span>{{userInfo.phone}}</span>
      </div>
      <div class="div-name">
        <span>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
        <span>{{userInfo.roleType}}</span>
      </div>
      <div class="div-name">
        <span class="div-yue">余&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额：</span>
        <span class="div-money">{{userInfo.money}}元</span>
      </div>
      <div class="div-name">
        <span>注册时间：</span>
        <span>{{createTime}}</span>
      </div>
      <div class="div-address">
        <span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
        <span>{{userInfo.address}}</span>
      </div>
    </div>
    <div class="div-information">
      <div class="div-null"></div>
      <div class="div-first-info">
        实名认证：
      </div>
      <div v-if="userInfo.isAuth == 1" class="div-name">
        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
        <span>{{userInfo.rellName}}</span>
      </div>
      <div v-if="userInfo.isAuth == 1" class="div-name">
        <span>性别：</span>
        <span>{{userInfo.sex}}</span>
      </div>
      <div v-if="userInfo.isAuth == 1" class="div-name">
        <span>身份证号：</span>
        <span>{{userInfo.idCode}}</span>
      </div>
      <div v-if="userInfo.isAuth == 1" class="div-name">
        <span>认证说明：</span>
        <span>{{userInfo.idCode}}</span>
      </div>
      <div v-if="userInfo.isAuth != 1" class="div-name">
        <span class="div-authentication">暂未实名认证</span>
      </div>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">团队人数</el-menu-item>
      <el-menu-item index="2" style="margin-left: 20px;">收益明细</el-menu-item>
    </el-menu>
    <div v-if="activeIndex == 1" class="div-native">
      <div class="div-top-first">
        <el-input  v-model="form.search" placeholder="搜索昵称/手机号"></el-input>
      </div> 
      <div class="div-top-first second">
        <el-button type="primary" icon="el-icon-search" @click="getInvateList()">搜索</el-button>
      </div> 
      <div class="div-top-first second">
        <el-button @click="reset()">重置</el-button>
      </div>
      <div class="div-top-first num">
        <span>推广总人数：</span>
        <span>{{allnum}}人</span>
      </div>
    </div>
    <div v-if="activeIndex == 1" class="div-content-main">
      <el-table
        :data="result"
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
            <router-link :to="{path:'/userManagement/userDetailC', query: {id:scope.row.id}}" class="div-num">
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
    <income v-if="activeIndex == 2"></income>
  </div>
</template>
<script>
import  income  from './Income.vue';
import { getqueryInvateList } from '@/api/userManagement';
import { getqueryCountInvate } from '@/api/userManagement';
export default {
  data(){
    return{
      form: {
        id: null,
        page: 1,
        pageSize: 10,
        search: null,
        startTime: null,
        endTime: null
      },
      userInfo: {
      },
      createTime: null,
      authentication: false,
      activeIndex: '1',
      allnum: 0,
      result: [], //徒弟列表数据
      total: 0
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
        this.result = data.result;
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
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    },
    handleSelect(key, keyPath) {
      if(key == 2){
        localStorage.setItem('userId',this.form.id);
      }
      this.activeIndex = key;
    },
    //重置
    reset() {
      this.form.search = '';
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.getInvateList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.page = val;
      this.getInvateList();
    }
  },
  components: {
    income
  }
}
</script>


<style scoped rel="stylesheet/scss" lang="scss">
  .div-content{
    padding:30px 30px 30px 60px;
    margin: auto;
    .div-information{
      margin-top: 28px;
      .div-null{
          width:5px;
          height:16px;
          background:rgba(69,133,245,1);
          display: -webkit-inline-box;
        }
      .div-first-info{
          margin-left: 10px;
          width:80px;
          height:16px;
          font-size:16px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:16px;
          margin-top: -19px;
      }
      .div-name{
          margin-top: 11px;
          width: 23%;
          height:16px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          color:rgba(0,0,0,1);
          line-height:16px;
          display: -webkit-inline-box;
          .div-authentication{
            height:16px;
            font-size:16px;
            font-family:MicrosoftYaHei;
            color:rgba(194,194,194,1);
            line-height:16px;
            margin-left: 10px;
          }
          .div-yue{
            width:82px;
            height:16px;
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:16px;
          }
          .div-money{
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(245,166,35,1);
          }
      }
      .div-address{
        display:inline-block;
        height:16px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        color:rgba(0,0,0,1);
        line-height:16px;
      }
    }
    .el-menu-demo{
      border-bottom:0px;
      .el-menu-item{
        padding: 0px;
        
      }
    }
    .div-native{
      margin-top: 24px;
      height: 70px;
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
      }
      .num{
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:16px;
        width: 100%;
        text-align: -webkit-right;
        padding-right: 33px;
      }
    }
    .div-content-main{
      margin:auto;
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
