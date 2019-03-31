<template >
  <div class="div-content">
    <div class="div-content-top"> 
        <div class="div-top-first">
          <el-input  v-model="form.search" placeholder="搜索昵称/手机号"></el-input>
        </div>   
        <div class="div-top-first second">
          <el-select v-model="form.roleType" placeholder="角色筛选">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>  
        <div class="div-top-first second">
          <el-date-picker
            v-model="operationDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>   
        <div class="div-top-first second">
          <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
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
          prop="rellName"
          label="真实姓名"
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          >
        </el-table-column>
        <el-table-column
          label="是否实名认证"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.isAuth == 0">未认证</span>
            <span v-else-if="scope.row.isAuth == 1">已认证通过</span>
            <span v-else>认证未通过</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="money"
          label="余额"
          >
        </el-table-column>
        <el-table-column
          prop="recordName"
          label="推荐人"
          >
        </el-table-column>
        <el-table-column
          prop="stuNum"
          label="团队人数"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          >
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <router-link :to="{path:'/userManagement/viewDetail', query: {id:scope.row.id}}" class="see">
              查看
            </router-link>
          </template>
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
import { getUserList } from '@/api/userManagement'
import { getuserRoleList } from '@/api/userManagement'
export default {
  data(){
    return{
      form:{
        id: null,
        page: 1,
        pageSize: 10,
        search: null,
        startTime: null,
        endTime: null,
        roleType: null
      }, 
      operationDate: null,
      options: [], //用户角色列表
      tableData: [], //用户列表
      total: 0,
    }
  },
  created() {
    this.getRoleList();
    this.getList();
  },
  methods:{
    //获取用户角色列表
    getRoleList() {
      getuserRoleList().then(res=>{
        const tem = res.data.result;
        const arry = [];
        for(let i in tem){
         arry.push({value:tem[i].roleName,label:tem[i].roleName});
        }
        this.options = arry;
      }).catch((error) => {
        console.log(error);
      })
    },
    //获取用户列表
    getList() {
      getUserList(this.form).then(res=>{
        const data = res.data;
        this.total = data.total;
        this.tableData = data.result;
        console.log(res)
      }).catch((error) => {
        console.log(error);
      })
    },
    //搜索
    search() {
      if (this.operationDate != null){
        const date = new Date(this.operationDate[0]);  
        const e = new Date(this.operationDate[1]);  
        this.form.startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
        this.form.endTime = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds();
      }else{
        this.form.startTime = null;
        this.form.endTime = null;
      }
      this.getList();
    },
    //重置
    reset() {
      this.form.search = null;
      this.operationDate = null;
      this.form.roleType = null;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getList();
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .div-content{
    padding:30px;
    .div-content-top{
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
  }
</style>

