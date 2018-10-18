<template>
  <div id="wiki_detail_page">
      <div class="nav">
        <div class="mint-header-button is-left" @click="onBack">
          <i class="mintui mintui-back"></i>
        </div>
        <div class="nav-menu">
          <div class="wiki-list-nav wiki-list-nav-1"></div>
          <div class="wiki-list-nav wiki-list-nav-2"></div>
          <div class="wiki-list-nav wiki-list-nav-3"></div>
          <div class="wiki-list-nav wiki-list-nav-4"></div>
          <div class="wiki-list-nav wiki-list-nav-5"></div>
        </div>
      </div>
      <div class="page-content">
        <div class="class-name">
          <span style="color: #1860ac;">{{wikiObj.title}}</span>
        </div>
        <div v-html="wikiObj.content"></div>
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
        wikiObj: {}
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
       
      },
      onBack() {
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      queryEntry(){
        var me = this;
        var entryUuid = this.$util.Cache.getItem('entryUuid');
        var userUuid = this.$util.Cache.getItem('uuid');

        this.$http.get('/ency/queryDetail/'+entryUuid+'/'+userUuid).then(res => {
          if(res.data.success){
            this.wikiObj = res.data.data;
          }
        })
      }
    },
    mounted() {
      this.queryEntry()
    },
    watch: {
       
    }
  }

</script>
<style scope>
  #wiki_list_page {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(180, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
  }
  .nav {
      position: absolute;
      top:0;
      width: 100%;
      height: 35px;
  }
  .page-content {
     position: absolute;
    width: 100%;
    top: 35px;
    bottom: 0;
    overflow: scroll;
    background-color: white;
  }
  .nav-menu {
    height: 100%;
    padding-left: 40px;
    display: flex;

  }
  .class-name {
    height: 29px;
    line-height: 29px;
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
    padding: 16px 0 18px 12px;
  }
  .wiki-list-nav {
    width: 32px;
    height: 32px;
    display: inline-block;
    background-size: 33px;
    flex-grow: 1;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 2px;
  }
  .wiki-list-nav-1 {
    background-image: url(../../common/img/wiki-list-nav-1.jpg);
  }
  .wiki-list-nav-2 {
    background-image: url(../../common/img/wiki-list-nav-2.jpg);
  }
  .wiki-list-nav-3 {
    background-image: url(../../common/img/wiki-list-nav-3.jpg);
  }
  .wiki-list-nav-4 {
    background-image: url(../../common/img/wiki-list-nav-4.jpg);
  }
  .wiki-list-nav-5 {
    background-image: url(../../common/img/wiki-list-nav-5.jpg);
  }
  .mint-header-button.is-left {
    position: absolute;
    line-height: 30px;
    padding: 0 30px 0 10px;
  }
</style>
<style>
 #wiki_detail_page .nav {
    background-color: #ffffff;
    color: #8E8E93;
    font-size: 16px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);

  }
  #wiki_detail_page .nav .mint-button--default {
    background-color: #ffffff;
    height: 34px;
    box-shadow: none;
    position: absolute;
    width: 40px;
    left: 0;
    top: 0;
  }

</style>
