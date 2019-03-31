<template >
  <div>
    <div class="div-content">
        <div class="div-image">
          <img class="pic-loginSuccess"  src="@/assets/home_images/first.png" alt="">
        </div>
        <div class="div-num">
          <div class="div-num-first">{{onlineNum}}</div>
          <div class="div-num-second">在线人数（人）</div>
        </div>
    </div>
    <div class="div-content">
        <div class="div-image">
          <img class="pic-loginSuccess"  src="@/assets/home_images/second.png" alt="">
        </div>
        <div class="div-num">
          <div class="div-num-first">{{registNum}}</div>
          <div class="div-num-second third">注册人数（人）</div>
        </div>
    </div>
    <div class="div-content">
        <div class="div-image">
          <img class="pic-loginSuccess"  src="@/assets/home_images/third.png" alt="">
        </div>
        <div class="div-num">
          <div class="div-num-first">{{onlineNum}}</div>
          <div class="div-num-second third">交易笔数（笔）</div>
        </div>
    </div>
  </div>
</template>
<script>
import { getIndexCount } from '@/api/home';
export default {  
  data(){
    return{
      onlineNum:'',
      registNum: '',
      onlineNum: '',
    }
  },
  created() {
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      getIndexCount().then(res => {
        const data = res.data.result;
        this.onlineNum = data.onlineNum;
        this.registNum = data.registNum;
        this.onlineNum = data.onlineNum;
      }).catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>


<style scoped rel="stylesheet/scss" lang="scss">
  .div-content{
    width:310px;
    height:180px;
    margin-left: 40px;
    margin-top: 180px;
    border:1px solid rgba(242,242,242,1);
    display: -webkit-inline-box;
    .div-image{
      margin-left: 40px;
      margin-top: 56px;
      display: -webkit-inline-box;
    }
    .div-num{
      margin-top: 56px;
      margin-left: 20px;
      .div-num-first{
        width:94px;
        height:40px;
        font-size:40px;
        font-family:MicrosoftYaHei;
        color:rgba(0,0,0,1);
        line-height:40px;
      }
      .div-num-second{
        width:112px;
        height:21px;
        font-size:16px;
        font-family:MicrosoftYaHei;
        color:rgba(153,153,153,1);
        line-height:21px;
      }
      .third{
        //margin-left: 10px;
      }
    }
  }
</style>
