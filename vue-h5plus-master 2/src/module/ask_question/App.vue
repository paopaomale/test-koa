<template>
  <div id="ask_question_page">
    <div class="nav">
      <header class="mint-header">
        <div class="mint-header-button is-left" @click="onCancel">取消</div> 
        <h1 class="mint-header-title">提问</h1> 
        <div class="mint-header-button is-right" @click="onCommit">发布</div>
      </header>
    </div>
    <div class="page-content">
      <mt-field class="question-input needsclick" label="" placeholder='请输入你的问题,并以"?"结尾' :attr="{ maxlength: 26 }" v-model="question"></mt-field>
      <mt-field class="question_info-textarea" label="" placeholder="请填写你的问题描述, 尽可能描述详细" type="textarea" rows="10" v-model="question_info"></mt-field>
    </div>
    <div class="upload-img-wrap">
      <img src="../../common/img/upload-img.jpeg" height="40px" width="45px">
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
       question: '',
       question_info: ''
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
       
      },
      onCancel() {
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      onCommit(){
        if(!this.question){
          Toast({
            message: '请输入你的问题'
          });
          return
        }
        if(!this.question_info){
          Toast({
            message: '请填写你的问题描述'
          });
          return
        }
        var uuid = this.$util.Cache.getItem('uuid');
        var obj = {
          "description": this.question_info,
          "question": this.question,
          "userUuid": uuid
        }
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.post('/qa/addQuestion',obj).then(res => {
          if(res.data.success){
            // Cache.set
            this.onCancel()
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
<style scope>
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
  }
  .mint-header .mint-header-button.is-left {
    line-height: 40px;
  }
  .upload-img-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
  }
</style>
<style>
  #ask_question_page .mint-header {
    background-color: #fff;
    color: #101010;
  }
  #ask_question_page .mint-header-title {
    font-size: 16px;
  }
  #ask_question_page .mint-header-button {
    font-size: 12px;
  }
  #ask_question_page input,#ask_question_page textarea {
    font-size: 14px;
  }
  #ask_question_page .question-input,#ask_question_page input {
    background-color: #F7F7F7;
  }
  #ask_question_page input::-webkit-input-placeholder,#ask_question_page textarea::-webkit-input-placeholder {
    color: #B0AEB0;
  }
  #ask_question_page .mint-cell-wrapper {
    background-position: top;
    padding-left: 23px;
  }
  #ask_question_page .mint-cell:last-child {
    background-image: none;
  }
  textarea,input {
    -webkit-user-modify: read-write-plaintext-only;
  }
  .mint-header .is-left .mint-button {
    width: 100%;
    text-align: left;
  }
/*  .mint-header .mint-button-text {
    width: 0;
    display: inline-block;
  }*/
      
  
</style>
