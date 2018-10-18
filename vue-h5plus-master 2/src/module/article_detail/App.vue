<template>
  <div id="article_detail_page">
      <div class="page-content">
        <div class="page-content-title">标题：{{articleObj.title}}</div>
        <div class="page-content-title-bottom">
          <div class="PCTB-author">{{articleObj.author}}</div>
          <div class="PCTB-time">{{$moment(articleObj.createTime).format('YYYY年MM月DD日  HH:mm')}}</div>
          <div class="PCTB-original">原创</div>
        </div>
        <div class="page-content-abstract">
          概要：{{articleObj.introduction}}
        </div>
        <div class="page-content-html" v-html="articleObj.content"></div>
        <div class="page-content-bottom-info">
          本文由 {{articleObj.author}} 原创发布于不远游。未经许可，禁止转载。
        </div>
        <div class="page-content-bottom-statement">
          声明:本文观点仅代表作者观点，不代表不远游立场。
        </div>
        <div class="page-content-comment" v-if="commentList.length >0">
          <div class="PCC-head">评论</div>
          <div class="PCC-list">
            <div class="comment_list_wrap" v-for="item in commentList">
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
          <div class="PCC-bottom" @click="onReplay" v-if="commentList.length ==3">显示全部评论</div>
        </div>
      </div>
      <div class="page-bottom">
        <div class="page-bottom-back" @click="onBack"></div>
        <div class="page-bottom-replay" @click="onReplay">我也说两句...</div>
        <div class="page-bottom-fabulous"></div>
        <div class="page-bottom-collection" @click="onCollection"></div>
        <div class="page-bottom-share"></div>
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
  // import { Indicator } from 'mint-ui';

  export default {
    data() {
      return {
        articleObj: {},
        commentList: []
      }
    },
    created() {
      plusReady(this.plusReady)
      new Broadcast().listen('update_commentList',data => {
        this.getQueryComment()
      })
    },
    methods: {
      plusReady() {
       
      },
      onBack(){
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      onCollection(){
        var me = this;
        var articleUuid = this.articleObj.uuid
        var uuid = this.$util.Cache.getItem('uuid');
        var data = {
          "articleUuid": articleUuid,
          "collection": false,
          "type": '0',
          "userUuid": uuid
        };
        this.$util.Client.post({
          url: '/collection/toggle',
          params: data,
          success: function(res){
            if(res.data.success){
            } 
            Toast(res.data.msg);
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
      },
      onReplay(){
        let page = "comment.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      getQueryComment(){
        var me = this;
        var uuid = this.$util.Cache.getItem('uuid');
        var articleUuid = this.$util.Cache.getItem('articleUuid');
        var data1 ={
          "articleId": articleUuid,
          "page": {
            "currentPage": 1,
            "pageSize": 3
          }
        }
        this.$util.Client.post({
          url: '/comment/queryComment',
          params: data1,
          success: function(res){
            if(res.data.success){
              me.commentList = res.data.data.list;
            }
          }
        })
      },
      getArticleDetails(){
        var me = this;
        var uuid = this.$util.Cache.getItem('uuid');
        var articleUuid = this.$util.Cache.getItem('articleUuid');
        // var uuid = '88e22987-8dde-4240-ab53-0ce704a17692';
        // var articleUuid = 'd8bc73f4-8f37-11e8-808c-b025aa0fbc82';
        var obj ={
          "userUuid": uuid,
          "uuid": articleUuid
        }
        this.$util.Client.post({
          url: '/article/details',
          params: obj,
          success: function(res){
            if(res.data.success){
              me.articleObj = res.data.data;
            }
          }
        })

        
        // this.$http.post('/article/details',obj).then(res => {
        //   if(res.data.success){
        //     this.articleObj = res.data.data;
        //   }
        // })
      }
    },
    mounted() {
      this.getArticleDetails()
      this.getQueryComment()
    },
    watch: {
       
    }
  }

</script>
<style scope>
 .page-content {
     position: absolute;
    top: 0;
    bottom: 34px;
    overflow: scroll;
    padding: 0 19px 14px;
 }
 .page-content-title {
    padding-top: 30px;
    line-height: 20px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;

 }
 .page-content-title-bottom {
    height: 23px;
 }
 .PCTB-author {
    height: 17px;
    line-height: 17px;
    color: rgba(83, 144, 233, 1);
    font-size: 12px;
    text-align: left;
    display: inline-block;
    border-right: 1px solid #a5a0a0;
    padding-right: 8px;
 }
 .PCTB-time {
    height: 17px;
    line-height: 17px;
    color: rgba(146, 146, 151, 1);
    font-size: 12px;
    display: inline-block;
 }
 .PCTB-original {
    width: 33px;
    height: 17px;
    line-height: 17px;
    background-color: rgba(109, 162, 225, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 9px;
    text-align: center;
    display: inline-block;
 }
 .page-content-abstract {
    line-height: 34px;
    background-color: rgba(246, 246, 246, 1);
    color: rgba(16, 16, 16, 1);
    font-size: 11px;
    text-align: left;
    margin-top: 10px;
    padding: 8px;
    margin-bottom: 10px;
 }
 .page-content-html {

 }
 .page-content-bottom-info {
    height: 17px;
    line-height: 17px;
    color: rgba(16, 16, 16, 1);
    font-size: 12px;
    text-align: left;
    margin-top: 20px;
 }
 .page-content-bottom-statement {
  height: 23px;
  line-height: 13px;
  color: rgba(176, 174, 176, 1);
  font-size: 9px;
  text-align: left;
  margin-top: 5px;

 }
 .page-content-comment {

 }
 .PCC-head {
    width: 100%;
    height: 23px;
    line-height: 20px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
 }
 .PCC-list {

 }
 .PCCL-item {

 }
 .PCC-bottom {
    height: 30px;
    line-height: 30px;
    background-color: rgba(237, 237, 237, 1);
    color: rgba(146, 146, 151, 1);
    font-size: 12px;
    text-align: center;
 }

 .page-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 34px;
    border-top: 1px solid rgba(187, 187, 187, 1);
    padding-left: 35px;
    padding-right: 130px;
    box-sizing: border-box;
 }
 .page-bottom-back {
  width: 29px;
  height: 33px;
  background-image: url('../../common/img/back.jpeg');
  background-size: 29px;
  position: absolute;
  left: 0;
  top:0;
 }
 .page-bottom-replay {
    height: 25px;
    line-height: 25px;
    border-radius: 6px;
    background-color: rgba(239, 240, 245, 1);
    color: rgba(142, 142, 147, 1);
    font-size: 10px;
    text-align: center;
    margin-top: 4px;
 }
 .page-bottom-fabulous {
  width: 33px;
  height: 33px;
  background-image: url('../../common/img/fabulous.jpeg');
  background-size: 33px;
  position: absolute;
  right: 90px;
  top:0;
 }
 .page-bottom-collection {
  width: 33px;
  height: 33px;
  background-image: url('../../common/img/collection.jpeg');
  background-size: 33px;
  position: absolute;
  right: 50px;
  top:0;
 }
 .page-bottom-share {
  width: 33px;
  height: 33px;
  background-image: url('../../common/img/share.jpeg');
  background-size: 33px;
  position: absolute;
  right: 10px;
  top:0;
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
</style>
<style>
 
</style>
