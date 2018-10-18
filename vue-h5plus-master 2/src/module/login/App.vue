<template>
  <div id="login_page">
     <div class="nav">
        <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div> 
          <h1 class="mint-header-title">登录</h1> 
        </header>
    </div>
    <div class="page-content">
      <div class="login-content">
        <img class="login-head-img" src="../../common/img/login-head.jpg" height="90px" width="90px">
        <mt-field class="phone-input login-input needsclick" style="margin-bottom:10px;" label="" placeholder='手机号' :attr="{ maxlength: 12 }" v-model="phone"></mt-field>
        <mt-field class="password-input login-input needsclick" type="password" label="" placeholder='密码' :attr="{ maxlength: 15 }" v-model="password"></mt-field>
        <div class="login-btn" @click="onLogin">登录</div>
      </div>
      <div @click="goRegister" class="register-info">新用户？点击这里注册</div>
    </div>
  </div>
</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import Broadcast from 'common/js/ning/Broadcast.js'
  // import Cache from 'common/js/Base/Cache.js'

  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  export default {
    data() {
      return {
       phone: '',
       password: ''
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
      goRegister(){
        let page = "register.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      onLogin(){
        var me = this;
        if(!this.phone){
          Toast({
            message: '请输入手机号'
          });
          return
        }
        if(!this.password){
          Toast({
            message: '请输入密码'
          });
          return
        }
        var obj = {
          "password": this.password,
          "phoneNumber": this.phone
        }

        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.post('/user/login',obj).then(res => {
          if(res.data.success){
            // Cache.set
            me.$util.Cache.setItem('uuid',res.data.data);

            new Broadcast().send('login',{
              isLogin: true
            });
            this.onBack()
          }
          Toast(res.data.msg);
        },res => {
          Toast('网络请求失败');
        }).finally( res => {
          Indicator.close()
        })
      }
    },
    watch: {
       
    }
  }

</script>
<style>
  .nav {
      position: absolute;
      top:0;
      width: 100%;
      height: 40px;
  }
  .page-content {
     position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    overflow: scroll;
    background-color: white;
  }
  .mint-header-button.is-left{
    position: absolute;
    padding-right: 30px;
  }
  .login-content {
    display: block;
    margin: 62px auto 0;
    top: 62px;
    width: 279px;
    height: 404px;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 40px 40px 0px rgba(170, 170, 170, 0.43);
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .login-head-img {
    margin-top: 41px;
    margin-bottom: 29px;
  }
  .register-info {
    position: absolute;
    bottom: 27px;
    height: 23px;
    line-height: 23px;
    color: rgba(16, 16, 16, 0.3);
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
  .login-input {
    width: 208px;
    height: 46px;
    line-height: 20px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 0.5);
    display: block;
    margin: auto;
    color: #BBBBBB;

  }
  .login-btn {
    width: 208px;
    height: 46px;
    line-height: 46px;
    border-radius: 20px;
    background-color: rgba(255, 152, 0, 1);
    text-align: center;
    display: block;
    margin: auto;
    color: white;
    margin-top: 54px;
  }

</style>
 <style>
  #login_page .mint-header {
    background-color: #fff;
    color: #101010;
  }
  #login_page .mint-header-title {
    font-size: 17px;
  }
  input::-webkit-input-placeholder {
    color:rgba(16, 16, 16, 0.3)
  }

</style>


