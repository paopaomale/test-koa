<template>
  <div id="expert_page">
    <div class="nav">
      <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div>
          <h1 class="mint-header-title">个人信息</h1> 
          <div class="mint-button mint-button--default" @click="onSave">
            <label class="mint-button-text" @click="editUserInfo">保存</label>
          </div>
      </header>
    </div>
    <div class="page-content">
      <div class="head-img-wrap">
        <img class="head-img" :src="userObj.avatarUrl" alt="">
        <div @click="changeImg">更换头像</div>
        <input ref="searchDom" type="file" style="display:none" accept="image/jpeg,image/png,image/gif">
      </div>
      <mt-field label="*用户名" :disabled="true" placeholder="" v-model="userObj.phoneNumber"></mt-field>
      <mt-field label="*手机号" :disabled="true" placeholder="" v-model="userObj.phoneNumber"></mt-field>
      <mt-field label="*昵称" placeholder="" v-model="userObj.nickName"></mt-field>
      <mt-field label="公司名" placeholder="" v-model="userObj.companyName"></mt-field>
      <mt-field label="职位" placeholder="" v-model="userObj.position"></mt-field>
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
  import lrz from 'lrz'


  export default {
    data() {
      return {
        userObj: {},
      }
    },
    // components: { VueBetterScroll },
    created() {
      plusReady(this.plusReady)
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      plusReady() {
       
      },
      changeImg(){
        // this.$refs.searchDom.click();
        this.$util.camera.getPicture( path => {
          this.updateImg(path);
        }, msg => {
          Toast('用户取消');
        })
      },
      updateImg(path){
        var me = this;
        lrz(path).then( function(rst){
            var formData = rst.formData;
            me.$util.Client.uploadImg({
              url: '/qa/uploadImg',
              formData: formData,
              success: function(res){
                if(res.data.success){
                  Toast('上传成功');
                } else {
                  Toast(res.data.msg);
                }
              },
              error: function(res){
                Toast('网络开小差');
              }
            })
        }).catch(function (err) {
          Toast('图片压缩失败');
        })

      },
      editUserInfo(){
        var me = this;
        var uuid = this.$util.Cache.getItem('uuid');
        this.userObj.userUuid = uuid;
        var data = {
          userUuid: uuid,
          avatarUrl: this.userObj.avatarUrl,
          companyName: this.userObj.companyName,
          nickName: this.userObj.nickName,
          position: this.userObj.position,
        }
        this.$util.Client.post({
          url: '/center/editUserInfo',
          params: data,
          success: function(res){
            Toast(res.data.msg);
          }
        })  
      },
      
      getUserInfo(){
        var me = this;
        var uuid = this.$util.Cache.getItem('uuid');
        this.$util.Client.get({
          url: '/user/getUserInfo/'+uuid,
          success: function(res){
            if(res.data.success){
              me.userObj = res.data.data;
            } 
          }
        })      

      },
      onBack(){
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      // filechange(event){
      //     var files = event.target.files, file;
      //     if (files && files.length > 0) {
      //         // 获取目前上传的文件
      //         file = files[0];// 文件大小校验的动作
      //         if(file.size > 1024 * 1024 * 2) {
      //             alert('图片大小不能超过 2MB!');
      //             return false;
      //         }
      //         // 获取 window 的 URL 工具
      //         var URL = window.URL || window.webkitURL;
      //         // 通过 file 生成目标 url
      //         var imgURL = URL.createObjectURL(file);
      //         //用attr将img的src属性改成获得的url
      //         // $("#img-change").attr("src",imgURL);
      //         this.userObj.avatarUrl = imgURL;
      //         // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
      //         // URL.revokeObjectURL(imgURL);
      //     }
      // },
      onSave(){
        console.log('save')
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
    .head-img-wrap{
      height: 125px;
      text-align: center;
      font-size: 14px;
      text-decoration: underline;
    }
    .head-img {
      width: 53px;
      height: 53px;
      margin: 20px auto 12px;
      display: inline-block;
    }
    .mint-button--default {
      height: 30px;
      line-height: 30px;
    }



</style>
<style>
  .mint-header-title {
    padding-left: 30px; 
  }
</style>