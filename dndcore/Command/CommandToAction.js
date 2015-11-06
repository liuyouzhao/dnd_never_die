/*********
CommandToAction[静态类]：
（1) 由command的json转成action，push给对应unit
command_in = {
	"动作":{
		"发起者":{
			"刘胡笳",
		},
		"目标":{
			"王明建",
		},
		"行为":{
			"使用技能":"扔石头",	
		},
	},

	"动作":{
		"发起者":{
			"刘胡笳",
		},
		"目标":{
			"王明建",
		},
		"行为":{	
			"移动到":[0,0] 			//行为一次只能一个
		},
	},
	
	//// 属性改变一般是作弊或定制行为！
	"属性改变":{
		"目标":{
			"王明建",
		},
		"属性":"昏迷",
		"改变":{
			"值":false
		}
	},

	"属性改变":{
		"目标":{
			"王明建",
		},
		"属性":"生命值",
		"改变":{
			"增加":50
		}
	}
}

command_out = {
	"输出":{
		"单位":{
			"王明建",
		},
		"颜色":"#FF0000",
		"内容":"闪躲",
		"控制台":"王明建 闪躲了 扔石头攻击"
	},
}
************/

CommandToAction = Klass({
	initialize: function(){
	},

	/// go
	actionRun: function(json){
		for(var key in json){
			switch(key){
				case "动作":{

				}break;
			}
		}
	},
});

_CommandToAction = new CommandToAction();