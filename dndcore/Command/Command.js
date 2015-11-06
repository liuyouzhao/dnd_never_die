/*********
Command[实例化类]：
（1）前台层的事件传入内核层的中转分发的对象
（2）内核层发生的console输出事情，要经过转换，送给前台层
command_in = {
	"动作":{
		"发起者":{
			"刘胡笳",
		},
		"目标":{
			"王明建",
		},
		"行为":{
			"第一个行为":{
			
			},
			"第二个行为""{
			}
		},
	},
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

Command = Klass({
	initialize: function(data){
		this.data = data;
	},
});