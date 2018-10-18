<template>
  <div id="expert_recommend_page">
    <div class="nav">
      <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div>
          <h1 class="mint-header-title">文章收藏</h1> 
      </header>
    </div>
     <div class="old-share-content">
      <vue-better-scroll style="height:450px" class="wrapper" ref="scroll1"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start3Y)" @pullingDown="onPullingDown1" @pullingUp="onPullingUp1">
       <div class="recommend-ul">
         <div class="recommend-li" v-for="(item,index) in activeList">
            <div class="osl-left">
             <img class="osl-left-img" v-lazy="item.cover">
           </div>
           <div class="osl-right">
             <div class="osl-right-title">{{item.title}}</div>
           </div>
         </div>
       </div>
      </vue-better-scroll>
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
      onAuthorLiSub(item,hasJoin){
        // if(!this.diffSecFn()){
        //   return true
        // }
        var me = this;
        var authorUuid = item.uuid;
        var uuid = '';
        try {
          uuid = this.$util.Cache.getItem('uuid');
        }catch(err) {
        }
        if(uuid){
          this.getData1({
            url: '/author/toggleSub',
            params: {
              "authorUuid": authorUuid,
              "category": '0',
              "hasJoin": hasJoin,
              "userUuid": uuid
            },
            success: function(res){
              if(res && res.data && res.data.success){
                item.isSub = "true";
                Toast(res.data.msg);
              } else {
                Toast(res.data.msg);
              }
            },
            error: function(){
              Toast('网络请求失败');
            }
          })
        } else {
          this.onGoLogin()
        }
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
          uuid = this.$util.Cache.getItem('uuid');
        }catch(err) {
        }
        activeCount = 1;
        this.getData1({
          url: '/center/getCollectionList',
          params: {
            "page": {
              "currentPage": activeCount,
              "pageSize": pageSize
            },
            "uuid": uuid
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
          url: '/author/queryList',
          params: {
            "page": {
              "currentPage": activeCount,
              "pageSize": pageSize
            },
            "uuid": uuid
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
      }
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
      top:30px;
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

    .recommend-ul {
      /*padding: 0 10px;*/
    }

    .recommend-li {
      /*margin-top: 10px;*/
      background-color: white;
      position: relative;
      min-height: 100px;
      line-height: 20px;
      /*border-radius: 5px;*/
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    }
    .recommend-li-left {
      position: absolute;
      left: 7px;
      top: 8px;
      width: 50px;
      height: 50px;
    }
    .ELL-img {
      width: 45px;
      height: 45px;
      border-radius: 28px;
      overflow: hidden;
    }
    .recommend-li-center {
      padding-left: 60px;
      padding-right: 90px;
      padding-bottom: 10px;
    }
    .RLC-top {
      height: 23px;
      padding-top: 10px;
    }
    .RLC-top-name {
      height: 23px;
      line-height: 23px;
      color: rgba(110, 109, 110, 1);
      font-size: 12px;
      display: inline-block;
      float: left;
    }
    .RLC-top-author {
      width: 60px;
      height: 15px;
      margin-top: 4px;
      margin-left: 10px;
      line-height: 15px;
      border-radius: 10px;
      background-color: rgba(247, 222, 193, 1);
      color: rgba(255, 152, 0, 1);
      font-size: 8px;
      text-align: center;
      display: inline-block;
      float: left;
    }
    .RLC-center {
      height: 23px;
      line-height: 23px;
      color: rgba(146, 146, 151, 1);
      font-size: 10px;
      text-align: left;

    }
    .RLC-bottom {
      min-height: 18px;
      line-height: 15px;
      color: rgba(187, 187, 187, 1);
      font-size: 10px;
      text-align: left;

    }
    .recommend-li-right {
      width: 60px;
      height: 22px;
      line-height: 22px;
      border-radius: 6px;
      background-color: rgba(255, 152, 0, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 11px;
      text-align: center;
      position: absolute;
      right: 22px;
      top: 26px;
    }
    .recommend-li.active .recommend-li-right {
      background-color: rgba(207, 206, 204, 1);
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
 #expert_recommend_page .mint-swipe-items-wrap {
   height: 0;
   padding-top: 41.6%;
 }
 #expert_recommend_page .mint-swipe {
  margin-bottom: 8px;
  background-color: white;
 }
</style>