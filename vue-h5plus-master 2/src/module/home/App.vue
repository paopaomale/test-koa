<template>
  <div id="home_page">
    <div class="nav">
      <mt-navbar v-model="selected">
        <div class="no-far-play-icon"></div>
        <mt-tab-item id="1">活动</mt-tab-item>
        <mt-tab-item id="2">文章</mt-tab-item>
        <mt-tab-item id="3">话题</mt-tab-item>
        <img @click="goSearch" class="home-search-img" src="../../common/img/search.jpeg" height="35px" width="28px">
        <img @click="goMessage" class="home-message-img" src="../../common/img/message.jpeg" height="35px" width="28px">
      </mt-navbar>
    </div>
    <div class="page-content">
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
      <vue-better-scroll style="height:550px" class="wrapper" ref="scroll1"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start3Y)" @pullingDown="onPullingDown1" @pullingUp="onPullingUp1">
        <mt-swipe :auto="0">
          <mt-swipe-item class="article-swiper-item" v-for="item in adArr1">
            <img class="article-swiper-img" :src="item && item.picUrl">
            <span class="article-swiper-text">{{item && item.title}}</span>
          </mt-swipe-item>
        </mt-swipe>
        <div class="active-ul">
          <div class="active-li" v-for="item in activeList">
            <div class="active-li-img-wrap">
              <img class="active-li-img" :src="item.cover" alt="">
            </div>
            <div class="active-li-wrap">
              <div class="active-li-content">{{item.title}}</div>
              <div class="active-li-time">活动时间：{{item.startTime}}</div>
              <div class="active-li-join">
                <div v-if="item.hasJoin == 'true'" class="active-li-join-no">已参加</div>
                <div v-else-if="$moment().diff(item.endTime)>0" class="active-li-join-no">已结束</div>
                <div v-else @click="goJoin(item)" class="active-li-join-yes">立刻报名</div>
              </div>
            </div>
          </div>
        </div>
      </vue-better-scroll>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
      <vue-better-scroll style="height:550px" class="wrapper" ref="scroll2"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(start2Y)" @pullingDown="onPullingDown2" @pullingUp="onPullingUp2">
        <mt-swipe :auto="0">
          <mt-swipe-item class="article-swiper-item" v-for="item in adArr2">
            <img class="article-swiper-img" :src="item && item.picUrl">
            <span class="article-swiper-text">{{item && item.title}}</span>
          </mt-swipe-item>
        </mt-swipe>
        <div class="old-share">
          <div class="old-share-header" @click="onClickHead(1)">
            <span>老班分享</span> 
            <img class="os-right-nav" src="../../common/img/right-nav.jpg">
          </div>
          <div class="old-share-content">
            <div class="old-share-ul">
              <div class="old-share-li" v-for="item in list1" @click="goArticle(item)">
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
          </div>
        </div>

        <div class="activity-column">
          <div class="activity-column-header">活动</div>
          <div class="activity-column-content">
            <div class="active-ul">
              <div class="active-li" v-for="item in activeFirst">
                <div class="active-li-img-wrap">
                  <img class="active-li-img" :src="item.cover" alt="">
                </div>
                <div class="active-li-wrap">
                  <div class="active-li-content">{{item.title}}</div>
                  <div class="active-li-time">活动时间：{{item.startTime}}</div>
                  <div class="active-li-join">
                    <div v-if="item.hasJoin == 'true'" class="active-li-join-no">已参加</div>
                    <div v-else-if="$moment().diff(item.endTime)>0" class="active-li-join-no">已结束</div>
                    <div v-else @click="goJoin(item)" class="active-li-join-yes">立刻报名</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="expert-columns">
          <div class="old-share-header" @click="onClickHead(2)">
            <span>专家专栏</span> 
            <img class="os-right-nav" src="../../common/img/right-nav.jpg">
          </div>
          <div class="old-share-content">
            <div class="old-share-ul">
              <div class="old-share-li" v-for="item in list2" @click="goArticle(item)">
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
          </div>
        </div>

        <div class="author-recommend">
          <div class="author-recommend-header">专栏作者推荐</div>
          <vue-better-scroll style="width:100%" class="wrapper" ref="scroll11" direction="horizontal">
            <div class="author-recommend-ul" :style="{width: 122*(authorList.length+1)+'px'}">
              <div class="author-recommend-li" @click="onAuthorLi" v-for="(item,index) in authorList">
                  <img class="arl-img" :src='item.cover'>
                  <div class="arl-name">{{item.name}}</div>
                  <div class="arl-position">{{item.position}}</div>
                  <div class="arl-sub">
                    <div v-if="item.isSub == 'false'" @click.stop="onAuthorLiSub(item,false)">+订阅</div>
                    <div v-else @click.stop="onAuthorLiSub(item,false)">已订阅</div>
                  </div>
              </div>
              <div @click="onAuthorMore" style="float: right;" class="author-recommend-li">
                <img  style="width:110px;height:140px" src='../../common/img/author-more.jpg'>
              </div>
            </div>
          </vue-better-scroll>
            
        </div>


        <div class="famous-story">
          <div class="old-share-header" @click="onClickHead(3)">
            <span>名宿故事</span> 
            <img class="os-right-nav" src="../../common/img/right-nav.jpg">
          </div>
          <div class="old-share-content">
            <div class="old-share-ul">
              <div class="old-share-li" v-for="item in list3" @click="goArticle(item)">
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
          </div>
        </div>


        <div class="famous-story">
          <div class="old-share-header">
            <!-- <span>名宿故事</span>  -->
            <!-- <img class="os-right-nav" src="../../common/img/right-nav.jpg"> -->
          </div>
          <div class="old-share-content">
            <div class="old-share-ul">
              <div class="old-share-li" v-for="item in items2" @click="goArticle(item)">
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
          </div>
        </div>
        </vue-better-scroll>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="topic-wrap">
        <vue-better-scroll style="height:550px" class="wrapper" ref="scroll3" :startY="parseInt(start3Y)">
          <mt-cell :title="item.question" v-for="(item,n) in topicList">
            <span class="topic-cell-span" slot="icon" >{{n+1}}</span>
          </mt-cell>
        </vue-better-scroll>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>

  </div>
</template>
<script>
  import { domReady, plusReady } from "common/js/ning/index.js";

  import VueBetterScroll from 'vue2-better-scroll'
  import Broadcast from 'common/js/ning/Broadcast.js'
  // import Cache from 'common/js/Base/Cache.js'
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

let activeCount = 1;
let topicCount = 1;
let pageSize = 10;

let count2 = 1;


export default {
  data() {
    return {
      diffSec: '',
      selected: '2',
      // 广告列表1
      adArr1: [],
      // 广告列表2
      adArr2: [],
      // 最新话题列表
      topicList: [],
      // 文章列表1 2 3
      list1: [],
      list2: [],
      list3: [],

      // 活动first 和 活动列表
      activeFirst: {},
      activeList: [],

      // 专家作者推荐
      authorList: [],

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

      start2Y: 0,  // 纵轴方向初始化位置
      scroll2ToX: 0,
      scroll2ToY: 0,
      scroll2ToTime: 700,
      items2: [],

      start3Y: 0,  // 纵轴方向初始化位置
      scroll3ToX: 0,
      scroll3ToY: 0,
      scroll3ToTime: 700,
    };
  },
  components: { VueBetterScroll },
  created() {
    var me = this;
    this.ready();
    plusReady(this.plusReady);
    this.$http.get('/ad/queryAd/2').then(res => {
      if(res.data.success == true){
        this.adArr2 = res.data.data;
      }
    })
    this.$http.get('/ad/queryAd/1').then(res => {
      if(res.data.success == true){
        this.adArr1 = res.data.data;
      }
    })
 
  },
  mounted() {
      this.onPullingDown2()
  },
  methods: {
    ready() {
    },
    plusReady() {
      this.cw = plus.webview.currentWebview();
    },
    goSearch(){
      let page = "comment.html",
      ow = plus.webview.create(
        page,
        page
      );
      ow.show("pop-in");
    },
    goArticle(item){
      this.$util.Cache.setItem('articleUuid',item.uuid);
      let page = "article_detail.html",
      ow = plus.webview.create(
        page,
        page
      );
      ow.show("pop-in");
    },
    onAuthorLi(e){
      e.stopPropagation();
      if(!this.diffSecFn()){
        return true
      }
      console.log('11111')
    },
    onAuthorLiSub(item,hasJoin){
      if(!this.diffSecFn()){
        return true
      }
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
    onGoLogin(){
      let page = "login.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
    },
    diffSecFn(){
      if(!this.diffSec){
        this.diffSec = this.$moment().valueOf();
        return true
      }
      if(this.$moment().valueOf() - this.diffSec < 200){
        this.diffSec = this.$moment().valueOf();
        return false
      }
      this.diffSec = this.$moment().valueOf();
      return true
    },
    onAuthorMore(e){
      e.stopPropagation();
      if(!this.diffSecFn()){
        return true
      }
      let page = "expert_recommend.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
    },
    onClickHead(type){
        this.$util.Cache.setItem('category',type);
        let page = "expert.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
    },
    goJoin(item){
      var me = this;
      var activityUuid = item.uuid;
      var uuid = '';
      try {
        uuid = this.$util.Cache.getItem('uuid');
      }catch(err) {
      }
      if(uuid){
        this.getData1({
          url: '/activity/toggleJoin',
          params: {
            "activityUuid": activityUuid,
            "hasJoin": false,
            "userUuid": uuid
          },
          success: function(res){
            if(res && res.data && res.data.success){
              item.hasJoin = "true";
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
    goMessage() {
      let page = "home_message.html",
      ow = plus.webview.create(
        page,
        page
      );
      ow.show("pop-in");
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
          uuid = this.$util.Cache.getItem('uuid');
        }catch(err) {
        }
        activeCount = 1;
        this.getData1({
          url: '/activity/queryAll',
          params:{
            "page": {
              "currentPage": activeCount,
              "pageSize": pageSize
            },
            "userUuid": uuid
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
          params:{
            "page": {
              "currentPage": activeCount,
              "pageSize": pageSize
            },
            "userUuid": uuid
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
      scroll2To () {
        this.$refs.scroll2.scrollTo(this.scroll2ToX, this.scroll2ToY, this.scroll2ToTime)
      },
      getData2 () {
        var me = this;
        var obj1 = {
          "category": "1",
          "page": {
            "currentPage": 1,
            "pageSize": 2
          }
        }
        this.$http.post('/article/select',obj1).then(res => {
          if(res.data.success && res.data.data.list && res.data.data.list.length){
            this.list1 = res.data.data.list;
          } else {
            this.list1 = [];
          }
        },res => {
          this.list1 = [];
        })

        var obj2 = {
          "category": "2",
          "page": {
            "currentPage": 1,
            "pageSize": 2
          }
        }
        this.$http.post('/article/select',obj2).then(res => {
          if(res.data.success && res.data.data.list && res.data.data.list.length){
            this.list2 = res.data.data.list;
          } else {
            this.list2 = [];
          }
        },res => {
          this.list2 = [];
        })

        var obj3 = {
          "category": "3",
          "page": {
            "currentPage": 1,
            "pageSize": 2
          }
        }
        this.$http.post('/article/select',obj3).then(res => {
          if(res.data.success && res.data.data.list && res.data.data.list.length){
            this.list3 = res.data.data.list;
          } else {
            this.list3 = [];
          }
        },res => {
          this.list3 = [];
        })
        try {
          var uuid = this.$util.Cache.getItem('uuid');
        }catch(err) {
        }
        var objActive = {
          "page": {
            "currentPage": 1,
            "pageSize": 1
          },
          "userUuid": uuid
        }
        this.$http.post('/activity/queryAll',objActive).then(res => {
          if(res.data.success && res.data.data.list && res.data.data.list.length){
            this.activeFirst = res.data.data.list;
          } else {
            this.activeFirst = [];
          }
        },res => {
            this.activeFirst = [];
        })

        count2 = 1;
        var objAuthorList = {
          "page": {
            "currentPage": 1,
            "pageSize": 5
          },
          "userUuid": uuid
        }
        this.$http.post('/author/queryList',objAuthorList).then(res => {
          if(res.data.success && res.data.data.list && res.data.data.list.length){
            this.authorList = res.data.data.list;
          } else {
            this.authorList = [];
          }
        },res => {
            this.authorList = [];
        })

        var obj22 = {
          "category": "2",
          "page": {
            "currentPage": count2,
            "pageSize": pageSize
          }
        }
        this.getData22({
          url: '/article/select',
          params: obj22,
          success: function(res){
            me.item2 = res.data.data.list;
            if(res.data.data.total > count2*pageSize){
              me.$refs.scroll2.forceUpdate(true)
            } else {
              me.$refs.scroll2.forceUpdate(false)
            }
            count2 ++;
          },
          error: function(){
             Toast('网络请求失败');
          }
        })
      },
      getData22 (req) {
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
      onPullingDown2 () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        this.getData2()
        
      },
       onPullingUp2 () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        var me = this;
        var obj22 = {
          "category": "2",
          "page": {
            "currentPage": 1,
            "pageSize": 2
          }
        }
        this.getData22({
          url: '/article/select',
          params: obj22,
          success: function(res){
            me.items2 = me.items2.concat(res.data.data.list)
            if(res.data.data.total > count2*pageSize){
              me.$refs.scroll2.forceUpdate(true)
            } else {
              me.$refs.scroll2.forceUpdate(false)
            }
            count2 ++;
          },
          error: function(){
             Toast('网络请求失败');
          }
        })
      },

       scroll3To () {
        this.$refs.scroll3.scrollTo(this.scroll3ToX, this.scroll3ToY, this.scroll3ToTime)
      },
      getData3 (req) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.$http.get(req.url).then(res => {
          req.success(res)
        },res => {
          req.error(res)
        }).finally( res => {
          Indicator.close()
        })
      },
      onPullingDown3() {
        var me = this;
        this.getData3({
          url: '/qa/getTopic',
          success: function(res){
            if(res.data.success){
              me.topicList = res.data.data;
              me.$refs.scroll3.forceUpdate(true)
            }
          },
          error: function(){
            Toast('网络请求失败');
          }
        })
      }

  },
  watch: {
   selected: function () {
    if(this.selected == 3 && this.topicList.length == 0){
      this.onPullingDown3()
    } else if(this.selected == 1 && this.activeList.length == 0){
      this.onPullingDown1()
    }
   }
  }
};
</script>
<style scoped>
    /*nav*/
    .nav {
       position: absolute;
       top:0;
       width: 100%;
      height: 36px;
    }
    .page-content {
       position: absolute;
      width: 100%;
      top: 36px;
      bottom: 0;
      overflow: scroll;
    }
    .mint-navbar {
      height: 36px;
      background-color: #F8F8F8;
      justify-content: center;
    }
    .mint-navbar .mint-tab-item {
      color: #5d5d5d;
      font-size: 12px;
      width: 44px;
      display: inline-block;
      flex: none;
    }
    .mint-navbar .mint-tab-item.is-selected {
      color: #000;
      border-bottom: 1px solid #949494;
      margin-bottom: 3px;
    }
    .mint-navbar .mint-tab-item {
      padding: 14px 0 8px;
      margin: 0 3px;
    }
    .no-far-play-icon {
      position: absolute;
      left: 15px;
      top: 8px;
      width: 70px;
      height: 19.5px;
      background-image: url(../../common/img/no-far-play.png);
      background-size: 70px;
    }


    /* two */
    .mint-swipe {
      padding-bottom: 41.67%;
      height: 0;
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
    .article-swiper-text {
      position: absolute;
      left: 4px;
      bottom: 16px;
      z-index: 10;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .old-share,.expert-columns,.activity-column,.famous-story,.author-recommend {
     margin-top: 5px; 
     background-color: white;   
   }

   .old-share-li {
    position: relative;
    height: 114px;
    background-color: white;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
    background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
   }
   .old-share-header,.activity-column-header,.author-recommend-header {
      position: relative;
      height: 27px;
      font-size: 12px;
      color: #282828;
      margin: 0 9px;
      padding-left: 9px;
      vertical-align: middle;
      line-height: 27px;
      font-weight: bold;
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
    /* three */
    
    .mint-cell {
      height: 40px;
      min-height: 40px;
    }
    .topic-cell-span {
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      text-align: center;
      font-size: 14px;
      color: #9EAAB7;
    }
    .topic-wrap:nth-child(1) .topic-cell-span {
      color: #FF3D00;
    }
    .topic-wrap:nth-child(2) .topic-cell-span {
      color: #FF3D00;
    }
    .topic-wrap:nth-child(3) .topic-cell-span {
      color: #FAC87D;
    }

    .mint-cell-text {
      color: #101010;
      font-size: 14px;
    }
    .home-search-img {
      position: absolute;
      right: 34px;
    }
    .home-message-img {
      position: absolute;
      right: 6px;
    }

    /*活动列表*/
    .active-ul {

    }
    
    .active-li {
      position: relative;
      padding-top: 50%;
      background-color: white;
      margin-top: 7px;
    }
    .active-li-img-wrap {
      padding-top: 50%;
      position: absolute;
      height: 0;
      top: 0;
      width: 100%;
      overflow: hidden;
    }
    .active-li-img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .active-li-wrap {
      width: 100%;
      height: 70px;
      line-height: 20px;
      text-align: center;
    }

    .active-li-content {
        width: 327px;
        height: 35px;
        line-height: 17px;
        color: rgba(51, 51, 51, 1);
        font-size: 12px;
        text-align: left;
        margin: 0px 15px 6px 18px;
        padding-top: 8px;
    }

    .active-li-time {
      width: 240px;
      height: 18px;
      line-height: 18px;
      color: rgba(196, 194, 196, 1);
      font-size: 10px;
      text-align: left;
      margin-left: 9px;
    }

    .active-li-join {
      width: 70px;
      height: 24px;
      line-height: 24px;
      border-radius: 10px;
      background-color: rgba(255, 152, 0, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 11px;
      text-align: center;
      position: absolute;
      bottom: 6px;
      right: 15px;
    }

    .active-li-join-yes {

    }
    
    .active-li-join-no {
      background-color: rgba(229, 229, 229, 1);
      color: rgba(190, 190, 190, 1);
    }
    .author-recommend-ul {
      padding: 15px 0 15px 10px;
    }

    .author-recommend-li {
      width: 110px;
      height:140px;
      display: inline-block;
      margin: 0 5px;
      border: 1px solid #e1e1e1;
    }
    .arl-img {
      margin: 8px auto 10px;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      display: block;
    }
    .arl-name {
      text-align: center;
      font-size: 11px;
      margin-top: 11px;
      margin-bottom: 10px;
    }
    .arl-position {
      text-align: center;
      font-size: 10px;
      margin-bottom: 14px;
    }
    .arl-sub {
      width: 72px;
      height: 21px;
      font-size: 10px;
      color: #78a8d9;
      border: 1px solid #78a8d9;
      border-radius: 5px;
      line-height: 20px;
      text-align: center;
      margin: auto;
    }
    .os-right-nav {
      position: absolute;
      width: 26px;
      height: 26px;
      top:0;
      right: 0;
    }
</style>
<style>
    #home_page .mint-swipe-items-wrap {
      height: 0;
      padding-top: 41.6%;
    }
    #home_page .mint-tab-container {
      background-color: #eee;
    }
    #home_page .author-recommend .scroll-content{
      display: inline-block;
    }
</style>


