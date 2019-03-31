<template >
  <div class="el-content">
    <div class="div-content-top"> 
        <div class="div-top-first second">
          <el-date-picker
            v-model="operationDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>   
        <div class="div-top-first">
          <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </div> 
        <div class="div-top-first">
          <el-button @click="reset()">重置</el-button>
        </div>
        
    </div>
    <div class="div-content-main">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="code"
          label="流水号"
          >
        </el-table-column>
        <el-table-column
          label="收益类型"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">推荐红包</span>
            <span v-else-if="scope.row.type == 2">销售提成</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="收益金额"
          >
        </el-table-column>
        <el-table-column
          prop="fromUserName"
          label="产生收益对象"
          >
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="更新时间">
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
          :total=total>
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>
<script>
import { getqueryAccountList } from '@/api/userManagement'
export default {
  data(){
    return{
      form: {
        id: null,
        page: 1,
        pageSize: 10,
        startTime: null,
        endTime: null,
      },
      operationDate: null,
      tableData: [],
      total: 0
    }
  },
  created() {
    this.form.id = localStorage.getItem('userId');
    this.getAccountList();
  },
  methods:{
    // 获取账单列表
    getAccountList() {
      getqueryAccountList(this.form).then(res => {
        const data = res.data;
        this.tableData = data.result;
        this.total = data.total;
        console.log(res)
      }).catch((error) => {
          console.log(error)
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
      this.getAccountList();
    },
    //重置
    reset() {
      this.operationDate = null;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getAccountList();
    },
    handleCurrentChange(val) {
      this.form.page = val;
      console.log(`当前页: ${val}`);
      this.getAccountList();
    }
  }
}
</script>


<style scoped rel="stylesheet/scss" lang="scss">
  .el-content{
    margin-top: 20px;
    .div-content-top{
      .div-top-first{
        display: -webkit-inline-box;
        .top-name{
          padding-top: 10px;
        }
      }
      .second{
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
      .block{
        margin-top: 30px;
      }
    }
  }
</style>