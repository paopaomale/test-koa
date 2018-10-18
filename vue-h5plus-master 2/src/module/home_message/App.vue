<template>
  <div id="home_message_page">
    <div class="nav">
      <div class="mint-header-button is-left" @click="onBack">
        <i class="mintui mintui-back"></i>
      </div> 
      <div :class="{'ask-nav-tab':true,'active':active=='1'}" @click="clickTab('1')">提醒</div>
      <div :class="{'ask-nav-tab':true,'active':active=='2'}" @click="clickTab('2')">公告</div>
    </div>
    <div class="page-tab-container">
     <mt-tab-container v-show="isLogin" v-model="active" swipeable>
        <mt-tab-container-item id="1">
          <vue-better-scroll style="height:550px" class="wrapper" ref="scroll1"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start1Y)" @pullingDown="onPullingDown1" @pullingUp="onPullingUp1">
          <div class="MTCI-one" v-for="item in items1">
            <div class="MTCI-one-head">{{$moment(item.createTime).format('YYYY-MM-DD')}}</div>
            <div class="MTCI-one-content">
              <div class="MTCI-one-title">{{item.title}}</div>
              <div class="MTCI-one-detail">{{item.content}}</div>
            </div>
          </div>
          </vue-better-scroll>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <vue-better-scroll style="height:550px" class="wrapper" ref="scroll2"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start2Y)" @pullingDown="onPullingDown2" @pullingUp="onPullingUp2">
              <div class="MTCI-one" v-for="item in items2">
                <div class="MTCI-one-head">{{$moment(item.createTime).format('YYYY-MM-DD')}}</div>
                <div class="MTCI-one-content">
                  <!-- <div class="MTCI-one-title">{{item.content}}</div> -->
                  <div class="MTCI-one-detail">{{item.content}}</div>
                </div>
              </div>
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
    components: { VueBetterScroll },
    mounted () {
      var uuid = this.$util.Cache.getItem('uuid');
      if(uuid){
        this.onPullingDown1()
      }
    },
    methods: {
      plusReady() {
      },
      canBack(){
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      onBack() {
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      onGoLogin(){
        let page = "login.html",
          ow = plus.webview.create(
            page,
            page
          );
          ow.show("pop-in");
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
        this.$http.post(req.url,req.params).then(res => {
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
        var uuid = this.$util.Cache.getItem('uuid');
        // uuid = '88e22987-8dde-4240-ab53-0ce704a17692';
        this.getData({
          url: '/user/getRemind',
          params:{
            "page": {
              "currentPage": count1,
              "pageSize": pageSize
            },
            "uuid": uuid
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
          url: '/user/getPost',
          params:{
              "currentPage": count2,
              "pageSize": pageSize
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
        var uuid = this.$util.Cache.getItem('uuid');
        // uuid = '88e22987-8dde-4240-ab53-0ce704a17692';
        console.log('上拉加载')
        var me = this;
        this.getData({
          url: '/user/getRemind',
          params:{
            "page": {
              "currentPage": count1,
              "pageSize": pageSize
            },
            "uuid": uuid
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
          url: '/user/getPost',
          params:{
              "currentPage": count2,
              "pageSize": pageSize
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
  .mint-header-button.is-left {
    position: absolute;
    line-height: 30px;
    padding: 0 30px 0 10px;
  }
  .MTCI-one-head {
    height: 25px;
    line-height: 25px;
    background-color: rgba(232, 230, 232, 1);
    color: rgba(140, 140, 140, 1);
    font-size: 12px;
    padding-left: 15px;
  }
  .MTCI-one-content {
    height: auto;
    padding: 5px 16px;
    padding-left: 6px;
    margin-left: 10px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 1px, transparent 1px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 1px, transparent 1px);
  }
  .MTCI-one-title {
    height: 23px;
    line-height: 23px;
    color: rgba(190, 190, 190, 1);
    font-size: 10px;
    text-align: left;
  }
  .MTCI-one-detail {
    height: 19px;
    line-height: 19px;
    color: rgba(51, 51, 51, 1);
    font-size: 12px;
  }

</style>
<style>
  
  .page-tab-container {
    position: absolute;
    width: 100%;
    top:30px;
    bottom: 0;
  }
  .mint-tab-container {
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