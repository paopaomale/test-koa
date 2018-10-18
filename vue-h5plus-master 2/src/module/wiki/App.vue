<template>
  <div id="wiki_page">
      <div class="nav">
      <mt-header title="名宿百科">
      </mt-header>
      </div>
      <div class="page-content">
          <div class="encyclopedia-list-one">
            <div class="ELO-item" v-for="item in queryCategoryList" @click="goWikiList(item)">
              <img class="ELO-item-img" :src="item.categoryUrl">
              <div class="ELO-item-text">{{item.categoryName}}</div>
            </div>
          </div>
          <div class="encyclopedia-list-two">
            <div class="ELT-header">热词推荐</div>
            <div class="ELT-content">
                <div class="ELT-item" v-for="item in hotWordList" @click="goHotWordList(item)">{{item.title}}</div>
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
       queryCategoryList: [],
       hotWordList: [],
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    mounted() {
      this.getEncyHotWord()
    },
    methods: {
      plusReady() {
       
      },
      goHotWordList(item){
        var entryUuid = item.uuid;
        this.$util.Cache.setItem('entryUuid',entryUuid);

        let page = "wiki_detail.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      goWikiList(item){
        var categoryUuid = item.uuid;
        this.$util.Cache.setItem('categoryUuid',categoryUuid);
        
        let page = "wiki_list.html",
        ow = plus.webview.create(
          page,
          page
        );
        ow.show("pop-in");
      },
      getEncyHotWord(){
        var me = this;
        this.$http.get('/ency/queryCategory').then(res => {
          if(res.data.success){
            this.queryCategoryList = res.data.data;
          }
        }, res => {
          Toast('网络请求失败');
        })
        this.$http.get('/ency/hotWord').then(res => {
          if(res.data.success){
            this.hotWordList = res.data.data;
          }
        }, res => {
          this.hotWordList = [];
        })
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
      bottom: 0;
      overflow: scroll;
      background-color: #ebebeb;
    }
    .encyclopedia-list-one {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      background-color: white;
    }
    .ELO-item {
      width: 30%;
      height: 134px;
      border: 1px solid #e6e5e5;
      flex-grow: 1;
    }
    .ELO-item-img {
      width: 76px;
      height: 76px;
      border-radius: 38px;
      margin: auto;
      margin-top: 20px;
      display: block;
      overflow: hidden;
    }
    .ELO-item-text {
      color: #101010;
      font-size: 14px;
      text-align: center;
      height: 23px;
      line-height: 23px;
      margin-top: 6px;
    }
    .encyclopedia-list-two {
      margin-top: 11px;
      background-color: white;
    }
    .ELT-header {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .ELT-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .ELT-item {
      width: 30%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border: 1px solid #e6e5e5;
      flex-grow: 1;
      font-size: 16px;
    }
</style>
<style>
  #wiki_page .mint-header {
    background-color: #ffffff;
    color: #8E8E93;
    font-size: 16px;
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
      background-image: linear-gradient(0, #d9d9d9, #d9d9d9 0.5px, transparent 0.5px);
  }
</style>