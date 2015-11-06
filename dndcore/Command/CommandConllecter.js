/*********
CommandConllecter[静态类]：
（1）前台层的事件传入内核层的中转分发的中转站
（2）内核层发生的console输出事情，要经过转换，送给前台层
************/

CommandConllecter = Klass({
	outcallback:null,
	initialize: function(){
	},

	cmdin: function(json){
		_CommandToAction.actionRun(json);
	},

	cmdout: function(json){
		if(outcallback){
			outcallback(json);
		}
	}
});

_CommandConllecter = new CommandConllecter();