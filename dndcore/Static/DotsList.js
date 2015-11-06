/*********
DotsList类[静态类]：
1.保存所有种类的续跳
2.一次初始化后，就不要修改了，是游戏客观存在的所有技能查表
************/

/// Class DotsList
DotsList = Klass({
	list: [],
	initialize: function(){

	},

	load: function(json_list){
		for (var i = 0; i < json_list.length; i++) {
			this.list[json_list[i]["名字"]] = json_list[i];
		};
		
	},
});

_DotsList = new DotsList();
