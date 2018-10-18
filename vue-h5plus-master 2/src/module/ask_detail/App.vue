<template>
  <div id="article_detail_page">
      <div class="page-content">
        <div class="page-content-title">{{articleObj.question}}</div>
      <!--   -->
    <!--     <div class="page-content-abstract">
          {{articleObj.description}}
        </div> -->
        <div class="page-content-html" v-html="articleObj.description"></div>
        <div class="page-content-title-bottom">
          <div class="PCTB-author">{{articleObj.author?articleObj.author:'name'}}</div>
          <!-- <div class="PCTB-author">第三</div> -->
          <div class="PCTB-time">{{$moment(articleObj.createTime).format('YYYY-MM-DD')}}</div>
          <!-- <div class="PCTB-original">原创</div> -->
        </div> 
      <!--   <div class="page-content-comment">
          <div class="PCC-head">评论</div>
          <div class="PCC-list">
            <div class="PCCL-item">
              如果你无法简洁的表达你的想法，那只说明你还不够了解它。
            </div>
            <div class="PCCL-item">
              如果你无法简洁的表达你的想法，那只说明你还不够了解它。
            </div>
            <div class="PCCL-item">
              如果你无法简洁的表达你的想法，那只说明你还不够了解它。
            </div>
          </div>
          <div class="PCC-bottom" @click="onReplay">显示全部评论</div>
        </div> -->
      </div>
      <div class="page-bottom">
        <div class="page-bottom-back" @click="onBack"></div>
        <div class="page-bottom-replay" @click="onReplay">我也说两句...</div>
        <div class="page-bottom-fabulous"></div>
        <div class="page-bottom-collection"></div>
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

  export default {
    data() {
      return {
        articleObj: {},
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
      onReplay(){
        let page = "comment.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      getArticleDetails(){
        var uuid = this.$util.Cache.getItem('uuid');
        var articleUuid = this.$util.Cache.getItem('askUuid');
        // var uuid = '88e22987-8dde-4240-ab53-0ce704a17692';
        // var articleUuid = 'd8bc73f4-8f37-11e8-808c-b025aa0fbc82';
        var obj ={
          "userUuid": uuid,
          "uuid": articleUuid
        }
        this.$http.post('/qa/queryDetails/'+articleUuid).then(res => {
          if(res.data.success){
            this.articleObj = res.data.data;
          }
        })
      }
    },
    mounted() {
      this.getArticleDetails()
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
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 16px;

 }
 .page-content-title-bottom {
    height: 23px;
    margin-top: 30px;
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
</style>
<style>
 
</style>
