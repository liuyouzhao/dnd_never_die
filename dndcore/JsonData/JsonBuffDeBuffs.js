/*
JsonBuffDeBuffs文件：
1.增益，削弱模板

属性模板如下：
var example1 = {
	"名字":"剥夺五感",
	"类别":"削弱",
	"描述":"各种能力降低",
	"影响":{
		"属性名称": "伤害值",
		"方法":"减法",
		"数值":1d5,
	},

	"影响E":{
		"属性名称": "命中率",
		"方法":"乘减",
		"数值":0.3,
	},

	"影响EE":{
		"属性名称": "防御值",
		"方法":"减法",
		"数值":"1d4",
	},

	"影响EEE":{
		"属性名称": "格挡率",
		"方法":"乘减",
		"数值":0.5,
	},
	
	"持续时间":60000, //ms
};

var example2 = {
	"名字":"狂怒",
	"描述":"攻击相关属性加强",
	"类别":"增益",
	"影响":{
		"属性名称": "伤害值",
		"方法":"乘加",
		"数值":1.0,
	},

	"影响E":{
		"属性名称": "命中率",
		"方法":"加法",
		"数值":1d20,
	},

	"影响EE":{
		"属性名称": "暴击率",
		"方法":"乘加",
		"数值":0.3,
	},

	"持续时间":60000, //ms
};

*/

var debuff001 = {
	"名字":"剥夺五感",
	"描述":"各种能力降低",
	"类别":"削弱",
	"影响":{
		"属性名称": "伤害值",
		"方法":"减法",
		"数值":5,
	},

	"影响E":{
		"属性名称": "命中率",
		"方法":"乘减",
		"数值":0.3,
	},

	"影响EE":{
		"属性名称": "防御值",
		"方法":"减法",
		"数值":4,
	},

	"影响EEE":{
		"属性名称": "格挡率",
		"方法":"乘减",
		"数值":0.5,
	},
	
	"持续时间":15000, //ms
};

var buff001 = {
	"名字":"攻击增强",
	"描述":"攻击相关属性加强",
	"类别":"增益",
	"影响":{
		"属性名称": "伤害值",
		"方法":"乘加",
		"数值":1.0,
	},

	"影响E":{
		"属性名称": "命中率",
		"方法":"加法",
		"数值":"1d20+0",
	},

	"影响EE":{
		"属性名称": "暴击率",
		"方法":"乘加",
		"数值":0.3,
	},

	"持续时间":5000, //ms
};

var buff002 = {
	"名字":"恐惧",
	"描述":"进入恐惧状态",
	"类别":"削弱",
	"影响":{
		"属性名称": "恐惧",
		"方法":"改变",
		"数值":true,
	},
	"持续时间":6000, //ms
};

var buff003 = {
	"名字":"防御值大幅度提升",
	"描述":"防御值大幅度提升",
	"类别":"增益",
	"影响":{
		"属性名称": "防御值",
		"方法":"乘加",
		"数值":2,
	},
	"影响E":{
		"属性名称": "格挡率",
		"方法":"乘加",
		"数值":2,
	},
	"持续时间":12000, //ms
}