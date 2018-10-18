<template>
  <div id="comment_page">
      <div class="nav">
        <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div> 
          <h1 class="mint-header-title">评论</h1> 
          <div class="mint-header-button is-right"></div>
        </header>
      </div>
      <div class="page-content">
          <div class="comment_list_wrap" v-for="item in comment_list">
            <div class="CLW_item">
              <div class="CLW_item-left">
                <img class="CLW_item-left-img" :src="item.avatarUrl" alt="">
              </div>
              <div class="CLW_item-right">
                <div class="CLWIR-top">
                  <div class="CLWIR-top-name">{{item.nickName}}</div>
                  <div class="CLWIR-top-time">{{item.createTime}}</div>
                  <div class="CLWIR-top-repaly">回复</div>
                </div>
                <div class="CLWIR-bottom">{{item.content}}</div>
              </div>
            </div>
          </div>
      </div>
      <div class="page-bottom" @click="goReplay">
        <div class="page-bottom-comment">我也说两句...</div>
        <div class="page-bottom-send">发送</div>
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
       comment_list: []
      }
    },
    created() {
      plusReady(this.plusReady)
      new Broadcast().listen('update_commentList',data => {
        this.getArticleDetails()
      })
    },
    mounted() {
        this.getArticleDetails()
    },
    methods: {
      plusReady() {
       
      },
      goReplay(){
        let page = "replay.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      getArticleDetails(){
        var me = this;
        var uuid = this.$util.Cache.getItem('uuid');
        var articleUuid = this.$util.Cache.getItem('articleUuid');
        // var uuid = '88e22987-8dde-4240-ab53-0ce704a17692';
        // var articleUuid = 'd8bc73f4-8f37-11e8-808c-b025aa0fbc82';
        var data1 ={
          "articleId": articleUuid,
          "page": {
            "currentPage": 1,
            "pageSize": 100
          }
        }
        this.$util.Client.post({
          url: '/comment/queryComment',
          params: data1,
          success: function(res){
            if(res.data.success){
              me.comment_list = res.data.data.list;
            }
          }
        })
      },
      onBack() {
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
      bottom: 35px;
      overflow: scroll;
      background-color: white;
    }
    .mint-header-button.is-left {
      line-height: 40px;
    }
    .page-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      margin-right: 80px;
      background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
      background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    }
    .CLW_item {
      height: auto;
      margin: 0 15px;
      background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
      position: relative;
    }
    .CLW_item-left {
      position: absolute;
      left: 6px;
      top: 10px;
      width: 36px;
      height: 36px;
    }
    .CLW_item-left-img {
      width: 34px;
      height: 34px;
      border-radius: 17px;
      overflow: hidden;
    }

    .CLW_item-right {
      padding-left: 49px;
    }
    .CLWIR-top {
      padding-top: 12px;
      height: 23px;
    }
    .CLWIR-top-name {
      display: inline-block;
      height: 100%;
      line-height: 20px;
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      text-align: center;
      float: left;
    }
    .CLWIR-top-time {
      display: inline-block;
      height: 100%;
      line-height: 20px;
      color: rgba(166, 166, 166, 1);
      font-size: 12px;
      text-align: center;
      float: left;
      margin-left: 8px;
    }
    .CLWIR-top-repaly {
      display: inline-block;
      float: right;
      margin-right: 8px;
      height: 100%;
      line-height: 16px;
      color: rgba(146, 146, 151, 1);
      font-size: 11px;
      text-align: center;
      padding: 0 10px;
    }
    .CLWIR-bottom {
      width: 100%;
      min-height: 32px;
      line-height: 16px;
      color: rgba(146, 146, 151, 1);
      font-size: 11px;
      text-align: left;
      margin-top: 6px;
      padding-bottom: 5px;
    }
    .page-bottom-comment {
      /* width: 100%; */
      height: 25px;
      line-height: 25px;
      border-radius: 6px;
      background-color: rgba(239, 240, 245, 1);
      color: rgba(142, 142, 147, 1);
      font-size: 10px;
      text-align: center;
      margin: 5px auto;
      display: block;
      margin-right: 90px;
      margin-left: 20px;
    }
    .page-bottom-send {
      width: 60px;
      height: 23px;
      line-height: 23px;
      border-radius: 4px;
      color: rgba(16, 16, 16, 1);
      font-size: 12px;
      text-align: center;
      border: 1px solid rgba(187, 187, 187, 1);
      color: #bbb;
      position: absolute;
      right: 10px;
      top: 6px;
    }
</style>
 <style>
  #comment_page .mint-header {
    background-color: #ffffff;
    color: #8E8E93;
    font-size: 16px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
  }
</style>
