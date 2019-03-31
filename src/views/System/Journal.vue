<template >
  <div class="div-content" style="padding:30px;">
    <div class="div-content-top"> 
        <div class="div-top-first">
          <el-input  v-model="form.username" placeholder="搜索操作人"></el-input>
        </div>   
        <div class="div-top-first second">
          <el-input  v-model="form.search" placeholder="模块名称筛选"></el-input>
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
          <el-button type="primary" @click="search()">搜索</el-button>
        </div> 
        <div class="div-top-first second">
          <el-button @click="reset()">重置</el-button>
        </div>
        <div class="div-top-first second">
          <el-button type="primary" @click="deleteAll()">批量删除</el-button>
        </div> 
    </div>
    <div class="div-content-main">
      <el-table
        :data="result"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%;"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="method"
          label="模块名称"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="操作时间"
          >
        </el-table-column>
        <el-table-column
          prop="content"
          label="操作内容"
          >
        </el-table-column>
        <el-table-column
          prop="username"
          label="操作人"
          >
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            @click.native.prevent="deleteAll(scope.row.id)"
            type="text"
            size="small">
            删除
            </el-button>
          </template>

        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=this.form.page
          :page-size=this.form.pageSize
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total=this.total
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getoperateLog } from '@/api/system';
import { deleteOperateLog } from '@/api/system';
export default {
  data(){
    return{
        form: {
          id: null,
          page: 1,
          pageSize: 10,
          search: null,
          username: null,
          startTime: null,
          endTime: null
        },
        operationDate: null,
        options: [{
          value: '1',
          label: '黄金糕'
        }],
        result: [{
            id:1,
            method: '管理员',
            content: '',
            username: '张三',
            time: '2016-05-02',
            roleType: '管理员',
        }],
        multipleSelection: [],
        total: null,
        ids: {
          
        }
    }
  },
  created(){
    this.getoperateLog();
  },
  methods:{
    // 获取日志列表
    getoperateLog() {
      getoperateLog(this.form).then(res => {
        const data = res.data;
        this.total = data.total;
        this.result = data.result;
        console.log(res)
      }).catch((error)=> {
          console.log(error);
      });
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
      this.getoperateLog();
    },
    //重置
    reset() {
      this.form.search = null;
      this.operationDate = null;
      this.form.username = null;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getoperateLog();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getoperateLog();
      console.log(`当前页: ${this.form.page}`);
    },
    deleteData(id) {
      
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("this.multipleSelection:",this.multipleSelection);
    },
    //批量删除
    deleteAll(id) {
       const tem = this.multipleSelection;
       const arr = []; //用来装批量删除的id
       for(var a in tem) {
           arr.push(tem[a].id);
       }
       const c = arr.join(",");
       const ids= id > 0 ? {ids:id} : {ids:c};
       deleteOperateLog(ids).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getoperateLog();
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
        width:28px;
        height:14px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(255,33,33,1);
        line-height:14px;
      }
      .see:hover{
        cursor: pointer;
      }
      .block{
        margin-top: 80px;
        text-align: center;
      }
    }
  }
</style>

