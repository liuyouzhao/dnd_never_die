/*********
UnitSequence类[单例]：
1.游戏中所有单位的skill队列轮训pop
2.每个n秒轮训一次，暂时写死为1秒
************/

DotSequence = Klass({
	hash: {},
	initialize: function(){
	},

	start: function(dot){
		var key = dot.target_name + dot.getName();
		//如果有的话，拿走，重来
		var old = this.hash[key];
		if(old){
			old.end();
		}
		this.hash[key] = dot;
		//<mingjian date="2012-11-4">
		//[TODO]应该将下面这段代码重构到BuffDeBuff::begin方法中
		//</mingjian>
		// 这里需要优化
		function dotEffect(dot){
			return function(){
				var act_arbi_list = dot.data["作用表"]["属性影响"]["值判决"];
				var dam_str = dot.data["作用表"]["属性影响"]["数值"];
				var direct = dot.data["作用表"]["属性影响"]["正反"];
				var attr_be_change = dot.data["作用表"]["属性影响"]["影响"];
				var act_name = dot.data["名字"];
				var dam_val = _Arbitrament.dice_go(dam_str);
				var logout_addon = "";
				var value_log_addon = "";
				var owner = dot.owner;
				var result = _Arbitrament.valuelist_arbi(act_arbi_list, dam_val, owner, dot.target_name, logout_addon, value_log_addon);
				dam_val = result["dam_val"];
				logout_addon = result["logout_addon"];
				value_log_addon = result["value_log_addon"];
				var final_value_given = dam_val*direct;
				_UnitsList.list[dot.target_name].attributes.changeAttributeBy(attr_be_change, final_value_given);
				var attr_last = _UnitsList.list[dot.target_name].attributes.getAttribute(attr_be_change);
				///输出
				console.error(dot.target_name + " " + act_name+":"+attr_be_change+" "+final_value_given + 
					" " + logout_addon + " " + value_log_addon);
			};
		}

		function timerOver(dot){
			return function(){
				dot.end();
			};
		}
		dot.interval = window.setInterval(dotEffect(dot), dot.time_dot);
		dot.timer = window.setTimeout(timerOver(dot), dot.time_run);
		dot.begin();
	}
});

_DotSequence = new DotSequence();