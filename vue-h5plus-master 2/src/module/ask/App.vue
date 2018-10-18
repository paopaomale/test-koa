<template>
  <div id="ask_page">
    <div class="nav">
      <div :class="{'ask-nav-tab':true,'active':active=='1'}" @click="clickTab('1')">最新</div>
      <div :class="{'ask-nav-tab':true,'active':active=='2'}" @click="clickTab('2')">最热</div>
      <img @click="goAskQuestion" class="ask-question-img" src="../../common/img/question.jpeg" height="40px" width="45px">
    </div>
    <div class="page-tab-container">
     <mt-tab-container v-show="isLogin" v-model="active">
        <mt-tab-container-item id="1">
          <vue-better-scroll style="height:550px" class="wrapper" ref="scroll1"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start1Y)" @pullingDown="onPullingDown1" @pullingUp="onPullingUp1">
              <ul ref="list1" class="list-content">
                  <div class="ask-cell" v-for="item in items1" @click="goAskDetail(item)">
                    <div class="ask-cell-title">{{item.question}}</div>
                    <div class="ask-cell-join-number">{{item.userNum}}人参与讨论</div>
                    <div class="ask-cell-look-number">
                      <div class="acln-value">{{item.readTimes}}</div>
                      <div class="acln-info">阅读</div>
                    </div>
                  </div>
              </ul>
          </vue-better-scroll>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <vue-better-scroll style="height:550px" class="wrapper" ref="scroll2" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start2Y)" @pullingDown="onPullingDown2" @pullingUp="onPullingUp2">
            <ul ref="list2" class="list-content">
                  <div class="ask-cell" v-for="item in items2" @click="goAskDetail(item)">
                    <div class="ask-cell-title">{{item.question}}</div>
                    <div class="ask-cell-join-number">{{item.userNum}}人参与讨论</div>
                    <div class="ask-cell-look-number">
                      <div class="acln-value">{{item.readTimes}}</div>
                      <div class="acln-info">阅读</div>
                    </div>
                  </div>
              </ul>
          </vue-better-scroll>
        </mt-tab-container-item>
     </mt-tab-container>
     <div class="no-login-view" v-show="!isLogin">
       <div class="no-login-view-info">登陆后查看更多精彩内容~</div>
       <div class="no-login-view-button" @click="onGoLogin">立即登录</div>
     </div>
    </div>
  </div>
</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import VueBetterScroll from 'vue2-better-scroll'
  import Broadcast from 'common/js/ning/Broadcast.js'
  // import Cache from 'common/js/Base/Cache.js'
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  let count1 = 1;
  let count2 = 1;
  let pageSize = 10;
  export default {
    data() {
      return {
        active: '1',
        isLogin: false,
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 40,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        start1Y: 0,  // 纵轴方向初始化位置
        scroll1ToX: 0,
        scroll1ToY: 0,
        scroll1ToTime: 700,
        items1: [],

        start2Y: 0,  // 纵轴方向初始化位置
        scroll2ToX: 0,
        scroll2ToY: 0,
        scroll2ToTime: 700,
        items2: [],
      }
    },
    components: { VueBetterScroll },
    created() {
      plusReady(this.plusReady)
      new Broadcast().listen('login',data => {
        if(data.detail.isLogin){
          this.isLogin = true;
          if(this.active == '1'){
            this.onPullingDown1()
          } else {
            this.onPullingDown2()
          }
        } else {
          this.isLogin = false;
        }
      })
      var uuid = this.$util.Cache.getItem('uuid');
      if(uuid){
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    mounted () {
      var uuid = this.$util.Cache.getItem('uuid');
      if(uuid){
        this.onPullingDown1()
      }
    },
    methods: {
      goAskQuestion() {
        var uuid = this.$util.Cache.getItem('uuid');
        if(!uuid){
          this.onGoLogin()
          return
        }
        let page = "ask_question.html",
          ow = plus.webview.create(
            page,
            page
          );
          ow.show("pop-in");
      },
      goAskDetail(item) {
        this.$util.Cache.setItem('askUuid',item.uuid);
        let page = "ask_detail.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      onGoLogin(){
        let page = "login.html",
          ow = plus.webview.create(
            page,
            page
          );
          ow.show("pop-in");
      },
      plusReady() {
    
      },
      clickTab(index) {
        this.active = index;
        if(index == '2' && this.items2.length == 0 && this.isLogin){
          this.onPullingDown2()
        } else if(index == '1' && this.items1.length == 0 && this.isLogin){
          this.onPullingDown1()
        }
      },
      // 滚动到页面顶部
      scroll1To () {
        this.$refs.scroll1.scrollTo(this.scroll1ToX, this.scroll1ToY, this.scroll1ToTime)
      },
      scroll2To () {
        this.$refs.scroll2.scrollTo(this.scroll2ToX, this.scroll2ToY, this.scroll2ToTime)
      },
      // 模拟数据请求
      getData (req) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.$http.post('/qa/queryList',req.params).then(res => {
          req.success(res)
        },res => {
          req.error(res)
        }).finally( res => {
          Indicator.close()
        })
      },
      onPullingDown1 () {
        // 模拟下拉刷新
        var me = this;
        count1 = 1
        this.getData({
          params:{
            "page": {
              "currentPage": count1,
              "pageSize": pageSize
            },
            "type": "1"
          },
          success: function(res){
            if(res.data.success){
              me.items1 = res.data.data.list;
              if(res.data.data.total > count1*pageSize){
                me.$refs.scroll1.forceUpdate(true)
              } else {
                me.$refs.scroll1.forceUpdate(false)
              }
              count1 ++;
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
      },
      onPullingDown2 () {
        // 模拟下拉刷新
        var me = this;
        count2 = 1
        this.getData({
          params:{
            "page": {
              "currentPage": count2,
              "pageSize": pageSize
            },
            "type": "2"
          },
          success: function(res){
            if(res.data.success){
              me.items2 = res.data.data.list;
              if(res.data.data.total > count2*pageSize){
                me.$refs.scroll2.forceUpdate(true)
              } else {
                me.$refs.scroll2.forceUpdate(false)
              }
              count2 ++;
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
      },
      onPullingUp1 () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        var me = this;
        this.getData({
          params:{
            "page": {
              "currentPage": count1,
              "pageSize": pageSize
            },
            "type": "1"
          },
          success: function(res){
            if(res.data.success){
              me.items1 = me.items1.concat(res.data.data.list)
              if(res.data.data.total > count1*pageSize){
                me.$refs.scroll1.forceUpdate(true)
              } else {
                me.$refs.scroll1.forceUpdate(false)
              }
              count1 ++;
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })

      },
      onPullingUp2 () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        var me = this;
        this.getData({
          params:{
            "page": {
              "currentPage": count2,
              "pageSize": pageSize
            },
            "type": "2"
          },
          success: function(res){
            if(res.data.success){
              me.items2 = me.items2.concat(res.data.data.list)
              if(res.data.data.total > count2*pageSize){
                me.$refs.scroll2.forceUpdate(true)
              } else {
                me.$refs.scroll2.forceUpdate(false)
              }
              count2 ++;
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
      }
    },
    watch: {
       
    }
  }

</script>
<style scoped>
  #ask_page {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .nav {
    background-color: #f8f8f8;
    text-align: center;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 1px, transparent 1px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 1px, transparent 1px);
    position: absolute;
    width: 100%;
    height: 30px;
    top:0;
  }
  .ask-nav-tab {
    width: 55px;
    height: 28px;
    color: #5A5A5A;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    display: inline-block;
  }
  .ask-nav-tab.active {
    color: #000000;
    border-bottom: 1px solid #828282;
    font-weight: bold;
  }

  .ask-question-img {
    position: absolute;
    width: 27px;
    height: 29px;
    right: 15px;
  }
  .page-tab-container {
    position: absolute;
    width: 100%;
    top:30px;
    bottom: 0;
  }
  .mint-tab-container {
    height: 100%;
  }

  .ask-cell {
    margin: 0 10px;
    height: 80px;
    padding-top: 13px;
    padding-right: 60px;
    position: relative;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
  }
  .ask-cell-title {
    height: 36px;
    font-size: 14px;
    height: 42px;
    color: #333;
    line-height: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  .ask-cell-join-number {
    font-size: 12px;
    color: #BEBEBE;
    height: 23px;
    line-height: 17px;
  }
  .ask-cell-look-number {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 0px;
    border-radius: 6px;
    background-color: rgba(244, 246, 248, 1);
    text-align: center;
  }
  .acln-value {
    height: 23px;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    font-size: 14px;
    margin-top: 6px;
  }
  .acln-info {
    height: 23px;
    line-height: 13px;
    color: rgba(190, 190, 190, 1);
    font-size: 9px;
  }
  ul {
    padding-left: 0;
  }
  .no-login-view {

  }
  .no-login-view-info {
    margin: auto;
    margin-top: 200px;
    width: 220px;
    height: 23px;
    line-height: 23px;
    color: rgba(146, 146, 151, 1);
    font-size: 16px;
    text-align: center;
  }
  .no-login-view-button {
    margin: auto;
    margin-top: 17px;
    width: 89px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    color: rgba(110, 109, 110, 1);
    font-size: 14px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
  }
</style>
<style>

</style>