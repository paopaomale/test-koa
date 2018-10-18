<template>
  <div id="expert_recommend_page">
    <div class="nav">
      <header class="mint-header">
          <div class="mint-header-button is-left" @click="onBack">
            <i class="mintui mintui-back"></i>
          </div>
          <h1 class="mint-header-title">我订阅的作者</h1> 
      </header>
    </div>
     <div class="old-share-content">
      <vue-better-scroll style="height:450px" class="wrapper" ref="scroll1"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start3Y)" @pullingDown="onPullingDown1" @pullingUp="onPullingUp1">
       <div class="recommend-ul">
         <div class="recommend-li" v-for="(item,index) in activeList">
           <div class="recommend-li-left">
             <img class="ELL-img" :src="item.photoUrl">
           </div>
           <div class="recommend-li-center">
             <div class="RLC-top">
               <div class="RLC-top-name">{{item.name}}</div>
               <div class="RLC-top-author">{{item.name}}</div>
             </div>
           </div>
           <div class="recommend-li-right">
            <div v-if="item.isSub == 'false'" @click.stop="onAuthorLiSub(item,false)">+关注</div>
            <div v-else @click.stop="onAuthorLiSub(item,true)">已关注</div>
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
        debugger
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
          url: '/center/getSubAuthorList',
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
      min-height: 80px;
      line-height: 20px;
      /*border-radius: 5px;*/
      /*border-bottom: 1px solid black;*/
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    }
    .recommend-li-left {
      position: absolute;
      left: 9px;
      top: 20px;
      width: 36px;
      height: 36px;
    }
    .ELL-img {
      width: 36px;
      height: 36px;
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
      padding-top: 14px;
    }
    .RLC-top-name {
      height: 23px;
      line-height: 23px;
      color: black;
      font-size: 12px;
      display: inline-block;
      /*float: left;*/
      font-weight: 500;
    }
    .RLC-top-author {
      width: 100%;
      height: 15px;
      margin-top: 4px;
      /*margin-left: 10px;*/
      line-height: 15px;
      border-radius: 10px;
      /*background-color: rgba(247, 222, 193, 1);*/
      color: rgba(110, 109, 110, 1);
      font-size: 8px;
      /*text-align: center;*/
      display: block;
      /*float: left;*/
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
      font-size: 10px;
      text-align: center;
      position: absolute;
      width: 37px;
      height: 27px;
      line-height: 27px;
      border-radius: 6px;
      /* background-color: rgba(255, 152, 0, 1); */
      right: 22px;
      top: 25px;
      
      border: 1px solid #4981b4;
      color: #4981b4;
    }
    .recommend-li.active .recommend-li-right {
      /*background-color: rgba(207, 206, 204, 1);*/
      border: 1px solid #9e9e9e;
      color: #9e9e9e;
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