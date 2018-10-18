import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios'

var Client = {
	post(req){
		    Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        axios.post(req.url, req.params).then(res => {
          req.success && req.success(res)
        },res => {
          req.error && req.error(res)
        }).finally( res => {
          Indicator.close()
        })
	},
	get(req){
		    Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        axios.get(req.url).then(res => {
          req.success && req.success(res)
        },res => {
          req.error && req.error(res)
        }).finally( res => {
          Indicator.close()
        })
	},
  uploadImg(req){
      Indicator.open({
        text: '上传图片中...',
        spinnerType: 'fading-circle'
      })
      var config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      axios.post(req.url,req.formData,config).then(res=>{
          req.success && req.success(res)
        },res => {
          req.error && req.error(res)
        }).finally( res => {
           Indicator.close()
        });
  }

}
module.exports = Client