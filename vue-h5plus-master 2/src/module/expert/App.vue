<template>
  <div id="expert_page">
    <div class="nav">
      <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div>
          <h1 class="mint-header-title">{{categoryText}}</h1> 
      </header>
    </div>
    <div class="page-content">
     <div class="old-share-content">
      <vue-better-scroll style="height:450px" class="wrapper" ref="scroll1"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start3Y)" @pullingDown="onPullingDown1" @pullingUp="onPullingUp1">
       <!--  -->
        <mt-swipe :auto="0" :showIndicators="false">
            <mt-swipe-item class="article-swiper-item">
              <img class="article-swiper-img" src="https://free.modao.cc/uploads3/images/1384/13849646/raw_1509334055.png">
            </mt-swipe-item>
          </mt-swipe>
        <div class="old-share-ul">
         <div class="old-share-li" v-for="item in activeList">
           <div class="osl-left">
             <img class="osl-left-img" v-lazy="item.cover">
             <span class="osl-left-time">{{$afterTime(item.createTime)}}</span>
           </div>
           <div class="osl-right">
             <div class="osl-right-title">{{item.title}}</div>
             <div class="osl-right-author">{{item.author}}</div>
             <div class="osl-right-number">{{item.readCapacity}}</div>
           </div>
         </div>
        </div>
       <!-- </div> -->
      </vue-better-scroll>
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

  let activeCount = 1;
  let pageSize = 10;

  export default {
    data() {
      return {
        category: 1,
        categoryText: '老帮分享',
        activeList: [],
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
      }
    },
    components: { VueBetterScroll },
    created() {
      plusReady(this.plusReady)
      this.category = this.$util.Cache.getItem('category');

      if(this.category == '1'){
        this.categoryText = '老帮分享'
      } else if(this.category == '2'){
        this.categoryText = '专家专栏'
      } else if(this.category == '3'){
        this.categoryText = '民俗故事'
      }
    },
    mounted() {
        this.onPullingDown1()
    },
    methods: {
      plusReady() {
       
      },
      onBack(){
        var ws=plus.webview.currentWebview();
        plus.webview.close(ws);
      },
      scroll1To () {
        this.$refs.scroll1.scrollTo(this.scroll1ToX, this.scroll1ToY, this.scroll1ToTime)
      },
      getData1 (req) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.$http.post(req.url, req.params).then(res => {
          req.success(res)
        },res => {
          req.error(res)
        }).finally( res => {
          Indicator.close()
        })
      },
      onPullingDown1 () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        var me = this;
        var uuid = '';
        try {
          var uuid = this.$util.Cache.getItem('uuid');
        }catch(err) {
        }
        activeCount = 1;
        this.getData1({
          url: '/article/select',
          params:{
            "category": me.category,
            "page": {
              "currentPage": activeCount,
              "pageSize": pageSize
            }
          },
          success: function(res){
            if(res.data.success){
              me.activeList = res.data.data.list;
              if(res.data.data.total > activeCount*pageSize){
                me.$refs.scroll1.forceUpdate(true)
              } else {
                me.$refs.scroll1.forceUpdate(false)
              }
              activeCount ++;
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
        var uuid = '';
        try {
          uuid = this.$util.Cache.getItem('uuid');
        }catch(err) {
        }

        this.getData1({
          url: '/article/select',
          params:{
            "category": me.category,
            "page": {
              "currentPage": activeCount,
              "pageSize": pageSize
            }
          },
          success: function(res){
            if(res.data.success){
              me.activeList = me.activeList.concat(res.data.data.list)
              if(res.data.data.total > activeCount*pageSize){
                me.$refs.scroll1.forceUpdate(true)
              } else {
                me.$refs.scroll1.forceUpdate(false)
              }
              activeCount ++;
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
      },
    },
    watch: {
       
    }
  }

</script>
<style scoped>
    .nav {
      position: absolute;
      top:0;
      width: 100%;
      height: 30px;
    }
    .page-content {
       position: absolute;
      width: 100%;
      top: 30px;
      bottom: 0;
      overflow: scroll;
    }
    .mint-header-button.is-left{
      position: absolute;
      padding-right: 30px;
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

    .old-share-content {
      position: absolute;
      width: 100%;
      top:0;
      bottom: 0;
      background-color: #E7EAF1;
      overflow: hidden;
    }


    .article-swiper-item {
      width: 100%;
      padding-top: 41.67%;
      height: 0;
      top: 0;
    }
    .article-swiper-img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
    }

   .old-share-li {
    position: relative;
    height: 114px;
    background-color: white;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
   }
  .osl-left {
      position: absolute;
      width: 127px;
      height: 82px;
      left: 10px;
      top: 15px;
  }
  .osl-left-img {
    width: 100%;
    height: 100%;
  }
  .osl-left-time {
    font-size: 12px;
    color: white;
    height: 18px;
    line-height: 18px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100%;
    bottom: 0;
    text-indent: 4px;
  }
  .osl-right { 
    padding: 21px 21px 0 150px;
  }
  .osl-right-title {
    height: 64px;
    font-size: 12px;
    color: #424242;
  }
  .osl-right-author {
    font-size: 12px;
    float: left;
    color: #c3c3c3;
  }
  .osl-right-number {
    font-size: 12px;
    float: right;
    color: #c3c3c3;
  }
</style>
<style>
 #expert_page .mint-swipe-items-wrap {
   height: 0;
   padding-top: 41.6%;
 }
 #expert_page .mint-swipe {
  margin-bottom: 8px;
  background-color: white;
 }
</style>