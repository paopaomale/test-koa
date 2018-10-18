<template>
  <div id="index_page">
      <mt-tabbar v-model="activeIndex">
        <mt-tab-item id="0">
        <span class="icon fa fa-home" style="font-size:24px;display: block;"></span>
          <!-- <img slot="icon" src="./car1.png"> -->
          首页
        </mt-tab-item>
        <mt-tab-item id="1">
          <span class="icon fa fa-envelope" style="font-size:24px;display: block;"></span>
          <!-- <img slot="icon" src="./car1.png"> -->
          问答
        </mt-tab-item>
        <mt-tab-item id="2">
          <span class="icon fa fa-rss-square" style="font-size:24px;display: block;"></span>
          <!-- <img slot="icon" src="./car1.png"> -->
          订阅
        </mt-tab-item>
        <mt-tab-item id="3">
          <span class="icon fa fa-book" style="font-size:24px;display: block;"></span>
          <!-- <img slot="icon" src="./car1.png"> -->
          百科
        </mt-tab-item>
        <mt-tab-item id="4">
          <span class="icon fa fa-user" style="font-size:24px;display: block;"></span>
          <!-- <img slot="icon" src="./car1.png"> -->
          我的
        </mt-tab-item>
      </mt-tabbar>
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
        activeIndex: '0',
        activeTabIndex: '0',
        tabs: ['home.html','ask.html','subs.html','wiki.html','myinfo.html'],
        style: {
          top: '0',
          bottom: '44px'
        }
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
        this.cw = plus.webview.currentWebview()
        let that = this

        var tabsLength = this.tabs.length;
        for (var i = 0; i < tabsLength; i++) {
          var temp = {};
          var sub = plus.webview.create(this.tabs[i], this.tabs[i], this.style,{
            popGesture: "close"
          });
          if (i > 0) {
            sub.hide();
          }else{
            temp[this.tabs[i]] = "true";
            this.cw.show(this.tabs[i],'none')
          }
          this.cw.append(sub);
        }
      }
    },
    watch: {
        activeIndex: function () {
            //隐藏当前;
            plus.webview.hide(this.tabs[this.activeTabIndex]);
            //若为iOS平台或非首次显示，则直接显示
            plus.webview.show(this.tabs[this.activeIndex]);
            //更改当前活跃的选项卡
            this.activeTabIndex = this.activeIndex;
        }
    }
  }

</script>
<style scoped>
  .mint-tabbar {
    color: #FF9800;
    background-color: #F8F8F8;
    background-image:none;
  }
  .mint-tab-item {
    color: #101010;
    height: 36px;
    padding-bottom: 4px;
    padding-top: 4px;
  }
  .mint-tabbar>.mint-tab-item.is-selected {
    background-color: #F8F8F8;
    color: #FF9800;
  }
  
</style>
<style>
  #index_page .mint-tab-item-icon {
    margin: 0 auto 0;
  }
</style>