(function(window){
	function AjaxManager(){
		this.tasksArr=[];
	};
	AjaxManager.prototype.addTask = function(obj,sucfun,failfun){
		var task = function(){
			_sucfun = function (data){
				if(typeof sucfun == 'function'){
					sucfun(data)
				}
				task.status = true;
			};
			_failfun = function (data){
				if(typeof failfun == 'function'){
					failfun(data)
				}
				task.status = true;
			};
			obj.success = _sucfun;
			obj.error = _failfun;
			window.$.ajax(obj)
		};
		task.status = false;
		this.tasksArr.push(task);
	};
	AjaxManager.prototype.allTaskFinished = function(fun){
		var that = this;
		var allFinished = false;
		var watcher = window.setInterval(function(){
			for(var i = 0;i < that.tasksArr.length;i++){
				if(that.tasksArr[i].status == false){
					return false;
				}
			}
			that.tasksArr.length>0&&(typeof fun == "function")&&fun();
			window.clearInterval(watcher);
		},50)
	};
	AjaxManager.prototype.run = function(){
		for(var i = 0;i < this.tasksArr.length;i++){
			this.tasksArr[i]();
		}
	};
	window.AjaxManager = AjaxManager;
}(window))



// var a = new AjaxManager();


// a.allTaskFinished(function(){console.log('All Tasks is finished...')});


// a.addTask({//jQuery的ajax相关参数，不包括success，error
// 	url:"http://content.biedese.cn/content.webapi/content_source_query_jsonp?obj=%7B%22productCode%22%3A%22majiang%22%2C%22contentId%22%3A184401%7D",
// 	type:"GET",
// 	dataType:"jsonp"
// },function(data){//请求成功回调
// 	console.log(data)
// },function(){//请求失败回调
// 	console.log(arguments)
// });


// a.run();