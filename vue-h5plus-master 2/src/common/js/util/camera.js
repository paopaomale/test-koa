var camera = {
	getPicture: function(success,error){
		var me = this;
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[  
	        {title:"拍照"},  
	        {title:"从相册中选择"}  
	    ]}, function(e){//1 是拍照  2 从相册中选择  
	        switch(e.index){  
	            case 1:me.appendByCamera(success,error);break;  
	            case 2:me.appendByGallery(success,error);break;  
	        }  
	    });
	},
	appendByCamera: function(success,error){
		plus.camera.getCamera().captureImage(function(e){
		    plus.io.resolveLocalFileSystemURL(e, function(entry) { 
			    var path = entry.toLocalURL(); 
			    success(path);
		    }, function(e) { 
		        error();
		    }); 
		},function(e){
			error(e)
		});    
	},
    // 从相册添加文件
    appendByGallery: function(success,error){
        plus.gallery.pick(function(path){
            success(path);
        },function(e){
        	error(e)
        });
    }
	
}

module.exports = camera