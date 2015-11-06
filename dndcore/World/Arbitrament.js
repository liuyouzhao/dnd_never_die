/*********
Arbitrament类[静态类]：
1.所有游戏中攻击，魔法，防御等行为造成对单位Attribute的影响，还有技能的豁免与命中等等。
2.作为游戏规则的一部分，除了ActionDispatcher.js作为轮训动作分发器交给ActionProcess.js进行更新处理以外
  每一个动作造成的影响的规则也在这个类中定义出来
判决结果：
{
"passed":false,
"why":"躲闪",
"valueInt":0,
}

判定一个完整技能的流程：
JSON:{
	"技能名":"人间大炮",
	"技能描述":"人间大炮开火，对目标造成3d100+20的火焰伤害，和2d50+100的物理伤害",
	"耗时":"3000",
	///先判定命中
	"命中判定":{
		"目标属性否率":"dodge"
	}，

	/// 一旦命中，就遍历作用表进行值判定
	作用表:{
		"属性影响":{
					"数值":"3d100+20", //火焰伤害
					"影响":"health",
					"正反":-1,
					"值判决":{		   //没有判决因素（暂时没有火焰耐受性）
							 },
					},
		"属性影响":{
					"数值":"3d100+20", //物理伤害
					"影响":"health",
					"正反":-1,
					"值判决":{
								"发起者属性率增":"crick|crickval",
								"目标属性率减":"holdr|hold",
								"目标属性率减":"|defence",
							 },
					},
	}
}
************/



Arbitrament = Klass({
	initialize: function(){
		/// nothing to do
	},

	/// 裁决
	arbitrate: function(owner, target, skill_name){
		/// 一个完整动作输出开始
		if(target){
			console.warn("["+owner+"] 对着 ["+target+"] 释放了 ["+skill_name+"]");
		}
		else if(dest){
			console.log("["+owner+"] 向 ["+dest+"] 移动");
			_UnitsList.list[owner].changeState("移动到"); 
		}
		else
			console.log("["+owner+"] 发生了错误，"+owner+" 错误的行动？");
		var result = this.hit_arbi(owner, target, skill_name);
		if(result["passed"]){
			this.action_arbi(owner, target, skill_name);
			return {"passed":true};
		}
		else{
			console.warn("-------["+skill_name+"] " + "失败 " + "由于 ["+result["why"]+"]");
			return result;
		}
	},

	/// 命中判定
	hit_arbi: function(owner, target, skill_name){
		var skill = _SkillList.skill_list[skill_name];
		if(skill){
			var hit_json = skill.data["命中判定"];
			for(var key in hit_json){
				var val = hit_json[key];
				switch(key){
					case "目标属性是":{
					}break;
					case "目标属性否":{
					}break;
					case "目标属性是率":{
					}break;
					case "目标属性否率":{
						var attr_val = _UnitsList.list[target].attributes.getAttribute(val);
						if(this.rate_go(attr_val, val)){
							return {"passed":false,"why":val};
						}
					}break;
					case "目标增益是":{
					}break;
					case "目标增益否":{
					}break;
					case "目标增益是率":{
					}break;
					case "目标增益否率":{
					}break;
					case "目标削弱是":{
					}break;
					case "目标削弱是率":{
					}break;
					case "目标削弱否率":{
					}break;
					case "目标削弱否":{
					}break;
					case "目标状态是":{
					}break;
					case "目标状态否":{
					}break;
					case "目标状态是率":{
					}break;
					case "目标状态否率":{
					}break;
					case "发起者属性是":{
					}break;
					case "发起者属性否":{
					}break;
					case "发起者属性是率":{
						var attr_val = _UnitsList.list[target].attributes.getAttribute(val);
						if(!this.rate_go(attr_val, val)){
							return {"passed":false,"why":val};
						}
					}break;
					case "发起者属性否率":{
					}break;
					case "发起者增益是":{
					}break;
					case "发起者增益否":{
					}break;
					case "发起者增益是率":{
					}break;
					case "发起者增益否率":{
					}break;
					case "发起者削弱是":{
					}break;
					case "发起者削弱是率":{
					}break;
					case "发起者削弱否率":{
					}break;
					case "发起者削弱否":{
					}break;
					case "发起者状态是":{
					}break;
					case "发起者状态否":{
					}break;
					case "发起者状态是率":{
					}break;
					case "发起者状态否率":{
					}break;
				}
			}
			return {"passed":true};
		}
		else{
			console.error("发生错误：不存在的技能[" + skill_name + "]");
		}
	},

	/// 行动值判决
	action_arbi: function(owner, target, skill_name, value_log_addon){
		var skill = _SkillList.skill_list[skill_name];
		if(skill){
			var act_json = skill.data["作用表"];
			for (var key in act_json) {
				var act_name = key;
				act_name = act_name.replaceAll("E", "");
				if(act_name == "属性影响"){

					var attr_be_change = act_json[key]["影响"];
					var direct = act_json[key]["正反"];
					var dam = act_json[key]["数值"];
					// 立即判决值
					var dam_val = this.dice_go(dam);
					var act_arbi_list = act_json[key]["值判决"];

					var logout_addon = "";
					var value_log_addon = "";
					var result = this.valuelist_arbi(act_arbi_list, dam_val, owner, target, logout_addon, value_log_addon);
					var dam_val = result["dam_val"];
					logout_addon = result["logout_addon"];
					value_log_addon = result["value_log_addon"];

					///立即生效
					var final_value_given = dam_val*direct;
					_UnitsList.list[target].attributes.changeAttributeBy(attr_be_change, final_value_given);
					var attr_last = _UnitsList.list[target].attributes.getAttribute(attr_be_change);
					///输出
					console.error("-------"+act_name+":"+attr_be_change+" "+final_value_given + " " + logout_addon + " " + value_log_addon);
				}
				else if(act_name == "增益削弱"){
					var bd_name = act_json[key];
					var bd_json = _BuffDeBuffList.list[bd_name];
					var bd_time = bd_json["持续时间"];
					var bd = new BuffDeBuff(bd_json, bd_time, _UnitsList.list[target], target);
					_BuffSequence.start(bd);
				}
				else if(act_name == "续跳"){
					var bd_name = act_json[key];
					var bd_json = _DotsList.list[bd_name];
					var time_run = bd_json["持续时间"];
					var time_dot = bd_json["间隔"];
					var dot = new Dot(bd_json, time_run, time_dot, owner, _UnitsList.list[target], target);
					_DotSequence.start(dot);
				}
			}
		}
	},

	/// 值裁决表，裁决
	valuelist_arbi: function(act_arbi_list, dam_val, owner, target, logout_addon, value_log_addon){
		for (var key2 in act_arbi_list) {
			var value_str = act_arbi_list[key2];
			var temp = value_str.split("|");
			var rate_name = temp[0];
			var val_name = temp[1];
			key2 = key2.replaceAll("E", "");
			switch(key2){
				case "目标属性率增":{
				}break;
				case "目标属性率减":{
					var is_pass = false;
					if(rate_name.length > 0){
						var attr_rate_val = _UnitsList.list[target].attributes.getAttribute(rate_name);
						///立即判定
						is_pass = this.rate_go(attr_rate_val);
					}
					// 判定成功
					if((is_pass || rate_name.length <= 0) && val_name.length > 0){
						var attr_val_str = _UnitsList.list[target].attributes.getAttribute(val_name);
						var attr_val_val = 0;
						if(typeof attr_val_str == "string"){
							attr_val_val = this.dice_go(attr_val_str);
						}
						else {
							attr_val_val = attr_val_str;
						}
						
						dam_val -= attr_val_val;
						dam_val = dam_val < 0 ? 0 : dam_val;
						/// 输出用
						value_log_addon = value_log_addon + " " + val_name + "-" +attr_val_val;
					}
					// 输出用
					if(is_pass){
						logout_addon = logout_addon + "被'" + rate_name + "'";
					}
				}break;
				case "目标增益率增":{
				}break;
				case "目标增益率减":{
				}break;
				case "目标削弱率增":{
				}break;
				case "目标削弱率减":{
				}break;
				case "目标状态率增":{
				}break;
				case "目标状态率减":{
				}break;
				case "发起者属性率增":{
					var is_pass = false;
					if(rate_name.length > 0){
						var attr_rate_val = _UnitsList.list[owner].attributes.getAttribute(rate_name);
						///立即判定
						is_pass = this.rate_go(attr_rate_val);
					}
					// 判定成功
					if((is_pass || rate_name.length <= 0) && val_name.length > 0){
						var attr_val_str = _UnitsList.list[owner].attributes.getAttribute(val_name);
						var attr_val_val = this.dice_go(attr_val_str);
						dam_val += attr_val_val;
						/// 输出用
						value_log_addon = value_log_addon + " " + val_name + "+" +attr_val_val;
					}

					// 输出用
					if(is_pass){
						logout_addon = logout_addon + "'" + rate_name + "!'";
					}
				}break;
				case "发起者属性率减":{
					var is_pass = false;
					if(rate_name.length > 0){
						var attr_rate_val = _UnitsList.list[owner].attributes.getAttribute(rate_name);
						///立即判定
						is_pass = this.rate_go(attr_rate_val);
					}
					// 判定成功
					if((is_pass || rate_name.length <= 0) && val_name.length > 0){
						var attr_val_str = _UnitsList.list[owner].attributes.getAttribute(val_name);
						var attr_val_val = 0;
						if(typeof attr_val_str == "string"){
							attr_val_val = this.dice_go(attr_val_str);
						}
						else {
							attr_val_val = attr_val_str;
						}
						
						dam_val -= attr_val_val;
						dam_val = dam_val < 0 ? 0 : dam_val;
						/// 输出用
						value_log_addon = value_log_addon + " " + val_name + "-" +attr_val_val;
					}
					// 输出用
					if(is_pass){
						logout_addon = logout_addon + "被 '" + rate_name + "' 削弱";
					}
				}break;
				case "发起者增益率增":{
				}break;
				case "发起者增益率减":{
				}break;
				case "发起者削弱率增":{
				}break;
				case "发起者削弱率减":{
				}break;
				case "发起者状态率增":{
				}break;
				case "发起者状态率减":{
				}break;
			}
		}
		return {
			"dam_val":dam_val,
			"logout_addon":logout_addon,
			"value_log_addon":value_log_addon
		};
	},


	/// 伤害判决
	damage_arbi: function(dam, cric, def, hold, holdr){
		// 得到基础攻击值
		var dam_value = dice_go(dam);

		// 判定并加上当前crick
		var cric_ar = cric.split("|");
		var mul = parseInt(cric_ar[1]);
		var rate = cric_ar[0];
		var is_crick = rate_go(rate);
		dam_value = is_crick ? dam_value*mul : dam_value;

		// 得到防御值
		var def_value = dice_go(def);

		// 是否扛
		var is_hold = rate_go(holdr);

		var final_damage = is_hold ? (dam_value - def_value - is_hold) : (dam_value - def_value);
		final_damage = final_damage < 0 ? 0 : final_damage;

		return {
			"passed":true,
			"valueInt":final_damage
		};
	},

	/// 

	/// 移动判决
	move_arbi: function(){
		return true;
	},

	rate_go: function(value, logout){
		var temp = value.split(">");
		var c1 = temp[0];
		var c2 = temp[1];
		var cv1 = this.dice_go(c1);
		var cv2 = this.dice_go(c2);
		if(logout){
			var pass = cv1 >= cv2 ? "成功!" : "失败!";
			console.warn("-------" + logout + " 概率判定: " + cv1 +" >= " + cv2 + "吗？" + pass);
		}
		return cv1 >= cv2;
	},

	dice_go: function(value){
		try{
			var temp1 = value.split("d");
			var temp2 = temp1[1].split("+");
			var num_str = temp1[0];
			var face_str = temp2[0];
			var addon_str = temp2[1];

			var num = parseInt(num_str);
			var face = parseInt(face_str);
			addon_str = addon_str.replace("(", "");
			addon_str = addon_str.replace(")", "");
			var addon = parseInt(addon_str);

			var finalvalue = 0;
			for(var i = 0; i < num; i ++){
				finalvalue += parseInt(Math.random()*face+1); 
			}
			finalvalue += addon;

			return finalvalue;
		}
		catch(exc){
			console.error(exc);
		}
	},
});

_Arbitrament = new Arbitrament();