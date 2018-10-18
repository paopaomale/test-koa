<template>
  <div id="replay_page">
      <div class="nav">
        <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div> 
          <h1 class="mint-header-title">回复</h1> 
          <div class="mint-header-button is-right" @click="onReplay">确定</div>
        </header>
      </div>
      <div class="page-content">
          <!-- <div class="replay-info">回复 【<span>范明春</span>】</div> -->
          <mt-field label="" placeholder="请输入您要回复的内容" type="textarea" rows="7" v-model="replayContent"></mt-field>
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


  export default {
    data() {
      return {
       replayContent: ''
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
       
      },
      onReplay(){
        var me = this;
        var articleUuid = this.$util.Cache.getItem('articleUuid');
        var uuid = this.$util.Cache.getItem('uuid');
        if(!this.replayContent){
          Toast({
            message: '请输入您要回复的内容'
          });
          return
        }
        var data = {
          "articleUuid": articleUuid,
          "content": this.replayContent,
          "userUuid": uuid
        };
        this.$util.Client.post({
          url: '/comment/addComment',
          params: data,
          success: function(res){
            Toast(res.data.msg);
            new Broadcast().send('update_commentList',{});
            me.onBack()
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
        
      },
      onBack(){
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
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
      background-color: #ebebeb;
    }

    .mint-header-button.is-left{
      /*position: absolute;
      padding-right: 30px;*/
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
    .replay-info {
      background-color: white;
      padding: 0 5px;
      font-size: 15px;
      color: black;
      margin-top: 10px;
      line-height: 30px;
    }

</style>
<style>
    #replay_page .mint-header-button.is-left {
      line-height: 30px;
    }
  #replay_page .mint-header {
    background-color: white;
    color: black;
    font-size: 16px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
  }
  #replay_page .textarea {
    font-size: 14px;
    height: 169px;
    border: 0;
    line-height: 14px;
    padding: 15px 10px 0 10px;
    outline: none;
    background: white;
    margin-bottom: 5px;
    resize: none;
  }
  #replay_page .mint-cell-wrapper {
    background-image: none;
  }
</style>