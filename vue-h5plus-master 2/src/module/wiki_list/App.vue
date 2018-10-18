<template>
  <div id="wiki_list_page">
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
        <div class="class-name" @click="goWikiDetail(wikiObj)">
          类目：<span style="color: #1860ac;">{{wikiObj.title}}</span>
        </div>
        <div class="child-class" v-if="wikiObj.child && wikiObj.child.length >0">
          <div class="child-class-head">子类</div>
          <div class="child-class-item" v-for="item in wikiObj.child" @click="goWikiDetail(item)">
            <div class="child-class-item-head">*</div>
            <div class="child-class-item-content">{{item.title}}</div>
          </div>
        </div>
        <div class="entries">
          <div class="entries-head">条目</div>
          <div class="entries-item" v-for="item in queryCategoryList"  @click="reLoadData(item)">
            <div class="entries-item-head">*</div>
            <div class="entries-item-content">{{item.categoryName}}</div>
          </div>
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
  // import Cache from 'common/js/Base/Cache.js'
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  export default {
    data() {
      return {
        wikiObj: {},
        queryCategoryList: []
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
      reLoadData(item){
        var categoryUuid = this.$util.Cache.setItem('categoryUuid',item.uuid);
        this.getEncyHotWord();
      },
      goWikiDetail(item){
        var entryUuid = item.uuid;
        this.$util.Cache.setItem('entryUuid',entryUuid);

        let page = "wiki_detail.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      getEncyHotWord(){
        var categoryUuid = this.$util.Cache.getItem('categoryUuid');
        this.$http.get('/ency/queryEntry/'+categoryUuid).then(res => {
          if(res.data.success){
            this.wikiObj = res.data.data[0];
          }
        }, res => {
          Toast('网络请求失败');
        })
        this.$http.get('/ency/queryCategory').then(res => {
          if(res.data.success){
            this.queryCategoryList = res.data.data;
          }
        }, res => {
          
        })
      }
    },
    mounted() {
      this.getEncyHotWord()
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
  .mint-header-button.is-left {
    position: absolute;
    line-height: 30px;
    padding: 0 30px 0 10px;
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

  .class-name {
    height: 29px;
    line-height: 29px;
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
    padding: 16px 0 18px 12px;
  }
  .child-class {
    padding: 0 10px 6px 10px;
  }
  .child-class-head {
    height: 29px;
    line-height: 29px;
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
    padding: 2px 0 6px 30px;
  }
  .child-class-item {
    border-bottom: 1px solid #EBEBEB;
    padding-bottom: 6px;
  }
  .child-class-item-head {
    height: 25px;
    line-height: 25px;
    background-color: rgba(235, 235, 235, 1);
    padding-left: 16px;
  }
  .child-class-item-content {
    height: 23px;
    line-height: 23px;
    color: #1860ac;
    font-size: 14px;
    padding: 6px 0 0 18px;
  }
  .entries {
    padding: 0 10px 6px 10px;
  }
  .entries-head {
    height: 29px;
    line-height: 29px;
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
    padding: 2px 0 6px 30px;
  }
  .entries-item {
    padding-bottom: 6px;
  }
  .entries-item-head {
    height: 25px;
    line-height: 25px;
    background-color: rgba(235, 235, 235, 1);
    padding-left: 16px;
  }
  .entries-item-content {
    height: 23px;
    line-height: 23px;
    color: #1860ac;
    font-size: 14px;
    padding: 6px 0 0 18px;

  }
</style>
<style>
 #wiki_list_page .nav {
    background-color: #ffffff;
    color: #8E8E93;
    font-size: 16px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);

  }
  #wiki_list_page .nav .mint-button--default {
    background-color: #ffffff;
    height: 34px;
    box-shadow: none;
    position: absolute;
    width: 40px;
    left: 0;
    top: 0;
  }
</style>
