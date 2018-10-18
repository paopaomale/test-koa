<template>
  <div id="register_page">
     <div class="nav">
       <header class="mint-header">
         <div class="mint-header-button is-left" @click="onBack">
           <i class="mintui mintui-back"></i>
         </div> 
         <h1 class="mint-header-title">注册</h1> 
       </header>
     </div>
     <div class="page-content">
       <div class="register-content" v-show="step == 1">
        <img class="register-head-img" src="../../common/img/register-head.png" height="90px" width="90px">
         <mt-field class="name-input register-input needsclick" style="margin-bottom:10px;" label="" placeholder='昵称' :attr="{ maxlength: 10 }" v-model="name"></mt-field>
        <mt-field class="phone-input register-input needsclick" style="margin-bottom:10px;" label="" placeholder='手机号' :attr="{ maxlength: 12 }" v-model="phone"></mt-field>
        <mt-field class="code-input register-input needsclick" style="margin-bottom:30px;margin-left: 35.5px;" label="" placeholder='验证码' :attr="{ maxlength: 4 }" v-model="code">
        </mt-field>
        <img class="code-img" :src="codeImgUrl" @click="refreshCodeImg">
        <div class="register-btn" @click="onStep2">发送短信验证码</div>
       </div>
       <div class="register-content-1" v-show="step == 2">
         <div class="register-1-info"> 验证短信已发送到 {{phone}}</div>
         <mt-field class="name-input register-input needsclick" style="margin-bottom:30px;" label="" placeholder='输入验证码' :attr="{ maxlength: 6 }" v-model="checkCode"></mt-field>
        <div class="register-1-btn" @click="onStep3">下一步</div>

       </div>
       <div class="register-content-2" v-show="step == 3">
         <mt-field class="phone-input register-input needsclick" style="margin-top:18px;margin-bottom:12px;" label="" placeholder='输入密码' :attr="{ maxlength: 12 }" type="password" v-model="password"></mt-field>
         <mt-field class="phone-input register-input needsclick" style="margin-bottom:30px;" label="" placeholder='确认密码' :attr="{ maxlength: 12 }" type="password" v-model="passwordReal"></mt-field>
          <div class="register-2-btn" @click="onRegister">注册</div>
       </div>
       <div class="login-info" @click="onBack">已经有账号了？点击登录</div>
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

  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  export default {
    data() {
      return {
       name: '',
       phone: '',
       code: '',
       checkCode: '',
       checkCodeData: '',
       password: '',
       passwordReal: '',
       codeImgUrl: '',
       step: 1
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    mounted() {
      this.refreshCodeImg()
    },
    methods: {
      plusReady() {
       
      },
      refreshCodeImg(){
        this.codeImgUrl = this.$http.defaults.baseURL+'/user/getPicVerCode?'+Date.parse(new Date());
      },
      onBack(){
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      onStep2(){
        var me = this;
        if(!this.name){
          Toast({
            message: '请输入昵称'
          });
          return
        }
        if(!this.phone){
          Toast({
            message: '请输入手机号'
          });
          return
        }
        if(!this.code){
          Toast({
            message: '请输入验证码'
          });
          return
        }
        var obj = {
          "phoneNumber": this.phone,
          "picVerCode": this.code
        }

        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.post('/user/senVerCode',obj).then(res => {
          if(res.data.success){
            me.checkCodeData = res.data.data 
            me.step = 2;
          }
          Toast(res.data.msg);
        },res => {
          Toast('网络请求失败');
        }).finally( res => {
          Indicator.close()
        })
      },
      onStep3(){
        if(!this.checkCode){
          Toast({
            message: '请输入验证码'
          });
          return
        }
        this.step = 3;
      },
      onRegister(){
        var me = this;
        if(!this.password){
          Toast({
            message: '请输入密码'
          });
          return
        }
        if(!this.passwordReal){
          Toast({
            message: '请输入确认密码'
          });
          return
        }
        if(this.password != this.passwordReal){
          Toast({
            message: '两次输入不一致'
          });
          return
        }
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        var obj = {
          "password": this.password,
          "phoneNumber": this.phone,
          "verCode": this.checkCode
        }
        this.$http.post('/user/register',obj).then(res => {
          if(res.data.success){
            me.onBack()
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
  .register-content {
    display: block;
    margin: 32px auto 0;
    top: 62px;
    width: 279px;
    height: 428px;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 40px 40px 0px rgba(170, 170, 170, 0.43);
    border: 1px solid rgba(187, 187, 187, 1);
    position: relative;
  }
  .register-content-1,.register-content-2 {
    display: block;
    margin: 32px auto 0;
    top: 62px;
    width: 279px;
    height: 218px;
    line-height: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 40px 40px 0px rgba(170, 170, 170, 0.43);
    border: 1px solid rgba(187, 187, 187, 1);
    position: relative;
  }
  .register-1-info {
    width: 220px;
    height: 23px;
    line-height: 23px;
    color: rgba(16, 16, 16, 1);
    font-size: 12px;
    text-align: center;
    margin: auto;
    margin-top: 35px;
    margin-bottom: 18px;
  }
  .register-head-img {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .register-input {
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
  .code-input {
    width: 107px;
  }
  .register-btn,.register-1-btn,.register-2-btn {
    width: 208px;
    height: 46px;
    line-height: 46px;
    border-radius: 20px;
    background-color: rgba(255, 152, 0, 1);
    text-align: center;
    display: block;
    margin: auto;
    color: white;
  }
  .login-info {
    position: absolute;
    bottom: 27px;
    height: 23px;
    line-height: 23px;
    color: rgba(16, 16, 16, 0.3);
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
  .code-img {
    width: 111px;
    height: 42px;
    position: absolute;
    left: 149px;
    bottom: 102px;
  }
</style>
 <style>
  #register_page .mint-header {
    background-color: #fff;
    color: #101010;
  }
  #register_page .mint-header-title {
    font-size: 17px;
  }
  input::-webkit-input-placeholder {
    color:rgba(16, 16, 16, 0.3)
  }
  .page-content .mint-cell-wrapper {
    background-image: none;
  }
</style>
