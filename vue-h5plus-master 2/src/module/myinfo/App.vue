<template>
  <div id="subs_page">
    <div class="nav">
      <header class="mint-header">
          <h1 class="mint-header-title">我的</h1> 
      </header>
    </div>
    <div class="page-content" v-show="isLogin">
      <div class="myinfo-head">
        <div class="myinfo-head-content">
          <div style="height:95px" @click="goPage('myinfo_edit.html')">
            <img class="mhc-head" src="../../common/img/myinfo/myinfo-1.jpg" width="52" height="52">
            <span class="mhc-head-text" >{{showPhone}}</span>
            <img class="mhc-head-icon" src="../../common/img/mhc-head-icon.jpg" width="20" height="20">
          </div>
          <div>
            <div style="display: inline-block;width: 50%;float: left;text-align:center">订阅的作者 <span>{{subAuthorLength === '' ? '--' : subAuthorLength}}</span></div>
            <div style="display: inline-block;width: 50%;float: left;text-align:center">粉丝 <span>{{subLength === '' ? '--' : subLength}}</span></div>
          </div>  
        </div>
        <div class="myinfo-head-content-bottom">
          <div class="mhcb-item" @click="goPage('myinfo_history.html')">
            <img class="mhcb-item-icon" src="../../common/img/myinfo/myinfo-1.jpg" width="30" height="30">
            <div class="mhcb-item-text">最近浏览</div>
          </div>
          <div class="mhcb-item" @click="goPage('myinfo_ask.html')">
            <img class="mhcb-item-icon" src="../../common/img/myinfo/myinfo-2.jpg" width="30" height="30">
            <div class="mhcb-item-text">我的问答</div>
          </div>
          <div class="mhcb-item" @click="goPage('home_message.html')">
            <img class="mhcb-item-icon" src="../../common/img/myinfo/myinfo-3.jpg" width="30" height="30">
            <div class="mhcb-item-text">我的消息</div>
          </div>
        </div>
      </div>
      <div>
        <mt-cell title="我的收藏" style="margin-top:5px" @click.native="goPage('myinfo_collection.html')">
          <img slot="icon" src="../../common/img/myinfo/myinfo-4.jpg" width="30" height="43">
        </mt-cell>
        <!-- <mt-cell title="我的订阅" @click="goPage('')">
          <img slot="icon" src="../../common/img/myinfo/myinfo-5.jpg" width="30" height="43">
        </mt-cell> -->

        <mt-cell title="我的粉丝" style="margin-top:5px" @click.native="goPage('myinfo_fans.html')">
          <img slot="icon" src="../../common/img/myinfo/myinfo-6.jpg" width="30" height="43">
        </mt-cell>
        <mt-cell title="我订阅的作者" @click.native="goPage('myinfo_follow.html')">
          <img slot="icon" src="../../common/img/myinfo/myinfo-7.jpg" width="30" height="43">
        </mt-cell>

        <div class="wrap">词条相关</div>

        <mt-cell title="收藏词条">
          <img slot="icon" src="../../common/img/myinfo/myinfo-8.jpg" width="30" height="43">
        </mt-cell>
        <mt-cell title="浏览历史">
          <img slot="icon" src="../../common/img/myinfo/myinfo-9.jpg" width="30" height="43">
        </mt-cell>

        <div class="wrap">其他</div>
        <mt-cell title="我的活动" @click.native="goPage('myinfo_active.html')">
          <img slot="icon" src="../../common/img/myinfo/myinfo-10.jpg" width="30" height="43">
        </mt-cell>
        <mt-cell title="设置" @click.native="goPage('setting.html')">
          <img slot="icon" src="../../common/img/myinfo/myinfo-11.jpg" width="30" height="43">
        </mt-cell>
      </div>
    </div>
    <div class="no-login-view" v-show="!isLogin">
       <div class="no-login-view-info">登陆后查看更多精彩内容~</div>
       <div class="no-login-view-button" @click="onGoLogin">立即登录</div>
     </div>
  </div>
</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import Broadcast from 'common/js/ning/Broadcast.js'

  export default {
    data() {
      return {
        isLogin: false,
        myinfoObj: {},
        subAuthorLength: '',
        subLength: ''
      }
    },
    created() {
      plusReady(this.plusReady)
      new Broadcast().listen('login',data => {
        if(data.detail.isLogin){
          this.isLogin = true;
          this.getMyinfo()
        } else {
          this.isLogin = false;
        }
      })
      var uuid = this.$util.Cache.getItem('uuid');
      if(uuid){
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    mounted () {
      var uuid = this.$util.Cache.getItem('uuid');
      if(uuid){
        this.getMyinfo()
      }
    },
    methods: {
      plusReady() {
       
      },
      onCancel() {
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      goPage(page){
        let ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      onGoLogin(){
        let page = "login.html",
          ow = plus.webview.create(
            page,
            page
          );
          ow.show("pop-in");
      },
      getMyinfo(){
        var me = this;
        var uuid = this.$util.Cache.getItem('uuid');
        // var uuid = '55aaa849-c39c-4e93-97db-a1c03fcedc23'
        var url = '/user/getUserInfo/' + uuid;
        this.$util.Client.get({
          url: url,
          success: function(res){
            if(res.data.success){
              me.myinfoObj = res.data.data;
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
        var data = {
          "page": {
            "currentPage": 1,
            "pageSize": 1
          },
          "uuid": uuid
        }
        this.$util.Client.post({
          url: '/center/getSubAuthorList',
          params: data,
          success: function(res){
            if(res.data.success && res.data.data){
              me.subAuthorLength = res.data.data.total;
            } else {
              me.subAuthorLength = ''
            }
          },
          error: function(){
            me.subAuthorLength = ''
          }
        })

        this.$util.Client.post({
          url: '/center/getSubList',
          params: data,
          success: function(res){
            if(res.data.success && res.data.data){
              me.subLength = res.data.data.total;
            } else {
              me.subLength = ''
            }
          },
          error: function(){
            me.subLength = ''
          }
        })

        

      }
    },
    computed: {
      showPhone(){
        return this.myinfoObj.phoneNumber && this.myinfoObj.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      }
    },
    watch: {
       
    }
  }

</script>
<style scoped>
    .nav {
      position: absolute;
      top:0;
      width: 100%;
      height: 30px;
    }
    .page-content {
       position: absolute;
      width: 100%;
      top: 30px;
      bottom: 0;
      overflow: scroll;
      background: rgba(221, 221, 221, 1);
    }
    .mint-header {
      background-color: white;
      text-align: center;
      background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 1px, transparent 1px);
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 1px, transparent 1px);
      position: absolute;
      width: 100%;
      height: 30px;
      top:0;
      color: #000000;
    }
    .myinfo-head {
      height: 200px;
      background-color: white;
    }
    .myinfo-head-content {
      height: 125px;
    }
    .myinfo-head-content-bottom {
      height: 75px;
      padding-top: 10px;
      background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 1px, transparent 1px);
    }
    .mhcb-item {
      float: left;
      width: 33%;
      text-align: center;
    }
    .wrap {
      height: 30px;
      line-height: 30px;
      background-color: #d9d9d9;
      font-size: 14px;
      padding-left: 14px;
    }
    .mhc-head {
      margin-left: 27px;
      margin-top: 20px;
      float: left;
    }
    .mhc-head-text {
      margin-left: 10px;
      margin-top: 36px;
      float: left;
      width: 100px;
    }
    .mhc-head-icon {
      margin-left: 10px;
      margin-top: 35px;
      float: left;
    }
    .no-login-view {

  }
  .no-login-view-info {
    margin: auto;
    margin-top: 200px;
    width: 220px;
    height: 23px;
    line-height: 23px;
    color: rgba(146, 146, 151, 1);
    font-size: 16px;
    text-align: center;
  }
  .no-login-view-button {
    margin: auto;
    margin-top: 17px;
    width: 89px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    color: rgba(110, 109, 110, 1);
    font-size: 14px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
  }



</style>
<style>

</style>