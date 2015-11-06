/*********
BuffDot类[实例化类]：
1.一些技能可以造成组合属性削弱效果，例如移动速度和攻击速度降低等，这些组合效果被称为一个DeBuff
2.一些技能可以为友方提供组合增强效果，例如移动速度和攻击力增加，这些组合效果被称为一个Buff
3.一些技能可以每隔一段时间，都造成对属性的正向或负向增长，叫做Dot

4.增益，削弱模板

属性模板如下：
var example1 = {
	"名称":"剥夺五感",
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
	"名称":"狂怒",
	"描述":"攻击相关属性加强",
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

/// Class Buff/DeBuff
BuffDeBuff = Klass({
	initialize: function(dat, time_run, unit, target_name){
		/// nothing to do
		this.data = dat;
		this.time_run = time_run;
		this.unit = unit;
		this.type = dat["类别"];
		this.changed = {};
		this.timer = null;
		this.target_name = target_name;
	},

	getName: function(){
		return this.data["名字"];
	},

	timeout: function(time_now){
		if(this.time_begin + this.time_run >= time_now){
			this.end();
		}
	},

	begin: function(){
		var me = this;
		this.timer = window.setTimeout(function(){
			me.end();
		}, this.time_run);
		var bflist = this.unit.attributes.getAttribute(this.type + "表");
		bflist.push(this.data["名字"]);
	},

	end: function(){
		//<mingjian date="2012-11-4">
		//[TODO]splice方法的this.data参数有问题
		//</mingjian>
		var bflist = this.unit.attributes.getAttribute(this.type + "表");
		bflist.remove(this.data["名字"]);
		window.clearTimeout(this.timer);
	},

	clearChanged: function(){
		//<mingjian date="2012-11-4">
		//[TODO]这里其实只是为了清空一个哈希表，为了保持原来哈希的可能的引用关系，建议这样子清空
		/*
		for(var k in this.changed){
			delete this.changed[k];
		}
		*/
		//</mingjian>
		this.changed = {};
	},

	addChanged: function(key, val){
		this.changed[key] = val;
	}
	
});

