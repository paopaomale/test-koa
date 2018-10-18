
import 'common/css/font-css.css'
import 'common/css/reset.css'
import 'mint-ui/lib/style.css'

import Vue from 'vue'
import Mint from 'mint-ui';
Vue.use(Mint)

import axios from 'axios'
window.Promise = require("bluebird");

import moment from 'moment'


import camera from 'common/js/util/camera.js'
import Cache from 'common/js/Base/Cache.js'
import Client from 'common/js/Base/Client.js'

Vue.prototype.$util = {}
Vue.prototype.$util.camera = camera;
Vue.prototype.$util.Cache = Cache;
Vue.prototype.$util.Client = Client;


axios.defaults.baseURL = 'http://47.97.219.181';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout =  8000;
Vue.prototype.$http = axios


Vue.prototype.$moment = moment


Vue.prototype.$afterTime = function(time) {
	var s = moment().diff(time,'s');
	if(s<=0){
		return ''
	}
	if(s <60){
		return s+'秒前'
	} else if(s < 3600){
		return parseInt(s/60)+'分钟前'
	} else if(s < 86400) {
		return parseInt(s/3600)+'小时前'
	} else {
		return parseInt(s/86400)+'天前'
	}
}




import FastClick from 'fastclick'

FastClick.attach(document.body)


//默认domReady事件
import domReady from './ready.js'
//默认plusReady事件
import plusReady from './plusReady.js'

module.exports = {
    domReady,
    plusReady
}