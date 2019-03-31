<template >
  <div class="div-content">
    <div class="div-content-top"> 
        <div class="div-top-first">
          <el-input class="div-el-input"  v-model="form.username" placeholder="搜索账户名"></el-input>
        </div>   
        <div class="div-top-first second">
          <el-select class="div-el-input" v-model="form.characterId" placeholder="角色筛选">
            <el-option
              v-for="item in roleList"
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
        <div class="div-top-first second">
          <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </div> 
    </div>
    <div class="div-content-main">
      <el-table
        :data="result"
        style="width: 100%"
        border>
        <el-table-column
          prop="username"
          label="账户名称"
          >
        </el-table-column>
        <el-table-column
          prop="characterName"
          label="角色"
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
            <span class="see" @click="toseeAdmin(scope.row)">查看</span>
            <span class="span-delete">删除</span>
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
    <!-- 新增管理员弹框-->
    <el-dialog  class="el-add-admin" title="新增管理员" :visible.sync="dialogFormVisible">
        <el-form :model="addAdmin">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input class="el-add-input" v-model="addAdmin.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户密码" :label-width="formLabelWidth">
                <el-input type="password" class="el-add-input" v-model="addAdmin.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select class="el-add-input" v-model="addAdmin.characterId" placeholder="请选择活动区域">
                    <el-option
                      v-for="item in roleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" class="el-add-input" v-model="addAdmin.detail" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="noSaveAddAdmin">取 消</el-button>
            <el-button type="primary" @click="saveAddAdmin">保 存</el-button>
        </div>
    </el-dialog>
    <!-- 查看管理员弹框-->
    <el-dialog  class="el-add-admin" title="查看管理员" :visible.sync="seeAdmin">
        <el-form :model="formSee">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input class="el-add-input" v-model="formSee.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户密码" :label-width="formLabelWidth">
                <el-input class="el-add-input password" v-model="formSee.password" autocomplete="off"></el-input>
                <el-button type="primary" class="resetPassw" @click="resetPassword">重置密码</el-button>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select class="el-add-input" v-model="formSee.characterId" placeholder="请选择活动区域">
                    <el-option
                      v-for="item in roleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <span class="el-add-input span" autocomplete="off">{{formSee.modifyTime}}</span>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" class="el-add-input" v-model="formSee.detail" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="seeAdmin = false">取 消</el-button>
            <el-button type="primary" @click="adminSee">保 存</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAdminList } from '@/api/admin';
import { getCharacterList } from '@/api/admin';
import { getaddAdmin } from '@/api/admin';
import { updateAdmin } from '@/api/admin';
export default {
  data(){
    return{
      form:{
        id: null,
        page: 1,
        pageSize: 10,
        username: null,
        startTime: null,
        endTime: null,
        characterId: null
      }, 
      operationDate: null,
      dialogFormVisible: false, //弹出添加管理员界面
      seeAdmin: false, //弹出查看管理员界面
      roleList: [{
        value: 1,
        label: "管理员"
      }],
      role: '',
      result: [],
      total:null,
      //新增管理员
      addAdmin: {
          username: null,
          password: null,
          characterId: null,
          detail: null
        },
      //修改/查看管理员
      formSee: {
        id: null,
        username: null,
        password: null,
        characterId: null,
        detail: null,
        modifyTime: null
      },
      formLabelWidth: '250px'
    }
  },
  created() {
    this.getCharacterList()
    this.getAdminList();
  },
  methods:{
    // 管理员账号列表
    getAdminList() {
      getAdminList(this.form).then(res => {
        const data = res.data;
        this.total = data.total;
        this.result = data.result;
        
        console.log(res)
      }).catch((error) => {
          console.log(error)
      })
    },
    // 管理员角色列表
    getCharacterList() {
      getCharacterList().then(res => {
          const data = res.data.result;
          const tem = [];
          for(let i in data) {
            tem.push({"value":data[i].id,"label":data[i].characterName});
          }
          this.roleList = tem;
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
      this.getAdminList();
    },
    //重置
    reset() {
      this.form.username = null;
      this.operationDate = null;
      this.form.characterId = null;
    },
    //查看
    toseeAdmin(row) {
      console.log("row:",row)
      this.formSee.id = row.id;
      this.formSee.username = row.username;
      this.formSee.password = row.password;
      this.formSee.characterId = row.characterId;
      this.formSee.detail = row.detail;
      this.formSee.modifyTime = row.modifyTime;
      this.seeAdmin = true
    },
    //查看中的重置密码
    resetPassword() {
      this.formSee.password = null;
    },
    //查看 保存
    adminSee() {
      if (!this.formSee.username){
        return this.$message.error('用户名不能为空');
      }
      if (!this.formSee.password){
        return this.$message.error('密码不能为空');
      }
      if (!this.formSee.characterId){
        return this.$message.error('角色不能为空');
      }
      const formSee= {
            id: this.formSee.id,
            username: this.formSee.username,
            password: this.formSee.password,
            characterId: this.formSee.characterId,
            detail: this.formSee.detail
          };
      updateAdmin(formSee).then(res => {
          this.getAdminList();
          console.log(res)
      }).catch((error) => {
          console.log(error)
      });
      this.seeAdmin = false
    },
    //取消新增管理员
    noSaveAddAdmin() {
      this.addAdmin.username = null;
      this.addAdmin.password = null;
      this.addAdmin.characterId = null;
      this.addAdmin.detail = null;
      this.dialogFormVisible = false;
    },
    // 新增管理员保存
    saveAddAdmin() {
      if(this.addAdmin.username == null){
         return this.$message.error('用户名不能为空');
      }
      if(this.addAdmin.password == null){
         return this.$message.error('密码不能为空');
      }
      if(this.addAdmin.characterId == null){
         return this.$message.error('角色不能为空');
      }
      getaddAdmin(this.addAdmin).then(res => {
        this.getAdminList();
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
      this.dialogFormVisible = false;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getAdminList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getAdminList();
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
        .div-el-input{
            /deep/.el-input__inner{
                width: 180px;
            }
        }
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
       .password{
         width: 208px;
         .resetPassw{
            width:77px;
            height:40px;
            background-color:rgba(62,151,254,1);
            border-radius:2px;
         }
       }
       .span{
         margin-left: 16px;
       }
       .dialog-footer{
           text-align: center;
       }
    }
  }
</style>

