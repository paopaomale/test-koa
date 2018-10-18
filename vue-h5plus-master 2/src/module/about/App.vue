<template>
  <div id="feedback_page">
      <div class="nav">
        <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div> 
          <h1 class="mint-header-title">关于我们</h1> 
          <div class="mint-header-button is-right"></div>
        </header>
      </div>
      <div class="page-content">
        关于我们关于我们关于我们关于我们关于我们
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
       replayContent: '',
       contact: ''
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


</style>
<style>
    #feedback_page .mint-header-button.is-left {
      line-height: 30px;
    }
  #feedback_page .mint-header {
    background-color: white;
    color: black;
    font-size: 16px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
  }

</style>