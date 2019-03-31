<template >
  <div class="div-content">
    <div class="div-content-top"> 
        <div class="div-top-first">
          <el-input  v-model="name" placeholder="搜索角色名"></el-input>
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
        <div class="div-top-first second">
          <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </div> 
    </div>
    <div class="div-content-main">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
        <el-table-column
          prop="characterName"
          label="角色名称"
          >
        </el-table-column>
        <el-table-column
          prop="adminCode"
          label="角色编码"
          >
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="更新时间"
          >
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <span class="see" @click="seeAdmin = true">查看</span>
            <span class="span-delete">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          >
        </el-pagination>
      </div>
    </div>
    <!-- 新增管理员弹框-->
    <el-dialog  class="el-add-admin" title="新增管理员" :visible.sync="dialogFormVisible">
        <el-form :model="formAdmin">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input class="el-add-input" v-model="formAdmin.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户密码" :label-width="formLabelWidth">
                <el-input class="el-add-input" v-model="formAdmin.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select class="el-add-input" v-model="formAdmin.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" class="el-add-input" v-model="formAdmin.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
    </el-dialog>
    <!-- 查看管理员弹框-->
    <el-dialog  class="el-add-admin" title="查看管理员" :visible.sync="seeAdmin">
        <el-form :model="formSee">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input class="el-add-input" v-model="formSee.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户密码" :label-width="formLabelWidth">
                <el-input class="el-add-input" v-model="formSee.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select class="el-add-input" v-model="formSee.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" class="el-add-input" v-model="formSee.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="seeAdmin = false">取 消</el-button>
            <el-button type="primary" @click="seeAdmin = false">保 存</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCharacterList } from '@/api/admin';
export default {
  data(){
    return{
      name: '',
      operationDate: '',
      dialogFormVisible: false, //弹出添加管理员界面
      seeAdmin: false, //弹出查看管理员界面
      role: '',
      tableData: [{
          characterName: null,
          adminCode: null,
          modifyTime: null
        }],
      currentPage4: 4,
      formAdmin: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formSee: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '250px'
    }
  },
  created() {
    this.getCharacterList()
  },
  methods:{
    // 管理员角色列表
    getCharacterList() {
      getCharacterList().then(res => {
          const data = res.data;
          this.tableData = data.result;
          console.log(res)
      }).catch((error) => {
          console.log(error);
      })
    },
    //搜索
    search() {
      const name = this.name;
      const d = new Date(this.operationDate[0]);  
      const e = new Date(this.operationDate[1]);  
      const startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const endDate = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
      const role = this.role;
      console.log("this.startDate:",startDate,endDate);
      this.$message(endDate);
    },
    //重置
    reset() {
      this.name = null;
      this.operationDate = null;
      this.role = null;
    },
    addAdmin() {
        
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
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
      /deep/ tbody{
        td{
            width:26px;
            height:13px;
            font-size:13px;
            font-family:MicrosoftYaHei;
            color:rgba(102,102,102,1);
            line-height:13px;
        }
        .see{
            width:28px;
            height:14px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(62,151,254,1);
            line-height:14px;
        }
        .span-delete{
            width:28px;
            height:14px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,33,33,1);
            line-height:14px;
        }
        .span-delete:before
            { 
                content:"|";
                width:1px;
                height:14px;
                margin-right: 5px;
                color:rgba(216,216,216,1);
        }
      }
      .block{
        margin-top: 80px;
        text-align: center;
      }
    }
    .el-add-admin{
       /deep/ .el-dialog__header{
           background: rgba(248,248,248,1);
       } 
       .el-add-input{
           width: 300px;
       }
       .dialog-footer{
           text-align: center;
       }
    }
  }
</style>

