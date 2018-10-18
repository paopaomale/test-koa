<template>
  <div id="subs_page">
    <div class="nav">
      <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div>
          <h1 class="mint-header-title">我的</h1> 
      </header>
    </div>
    <div class="page-content">
      <div>
        <mt-cell title="分享给好友">
          <span class="mint-checkbox"><input type="checkbox" class="mint-checkbox-input" value="值B"> <span class="mint-checkbox-core"></span></span>
          <img slot="icon" src="../../common/img/setting/setting-2.jpg" width="18" height="39">
        </mt-cell>
        <mt-cell title="意见反馈" is-link @click.native="goPage('feedback.html')">
          <img slot="icon" src="../../common/img/setting/setting-3.jpg" width="18" height="39">
        </mt-cell>
        <mt-cell title="关于我们" is-link @click.native="goPage('about.html')">
          <img slot="icon" src="../../common/img/setting/setting-4.jpg" width="18" height="39">
        </mt-cell>
      </div>
      <div @click="loginOut" style="text-align: center;background-color:white;height:36px;line-height:36px;margin-top:15px"> 
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import Broadcast from 'common/js/ning/Broadcast.js'
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
      
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
       
      },
      onBack(){
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
      loginOut(){
        MessageBox.confirm('是否确定注销当前用户?').then(action => {
          this.$util.Cache.setItem('uuid','');
          new Broadcast().send('login',{
            isLogin: false
          });
          this.onBack()
        });
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
    .mint-header-button.is-left{
      position: absolute;
      padding-right: 30px;
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



</style>
<style>

</style>