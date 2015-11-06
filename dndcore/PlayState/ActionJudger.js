/*********
ActionJudge类集[静态类]：
1.当一个ActionProcess被执行的时候，有两种可能，一种是直接改变unit的属性，另一种是改变unit的状态，
  但是其他属性有可能会防止当前的Action执行，
  例如：物体是无敌的，攻击的Action将无法发出，那么后续的unit的基础属性的target属性就不会变化
2.ActionJudge是区别于Arbitrament的，后者是Action发出后判决最终对属性的影响的，而前者是阻碍或放行一个Action
************/


ActionJudge = Klass({
	initialize: function(){
		/// nothing to do
	},
	/// 目标有效判定
	target_pass: function(owner, target, skill_name){
		var skill = _SkillList.skill_list[skill_name];
		if(skill){
			var hit_json = skill.data["无效判定"];
			for(var key in hit_json){
				var key2 = key.replaceAll("E", "");
				var val = hit_json[key];
				switch(key2){
					case "无效":{
						var attr_val = _UnitsList.list[target].attributes.getAttribute(val);
						if(attr_val){
							return false;
						}
					}break;
					case "等属性":{
						var seed = hit_json[key];
						for (var skey in seed) {
							var skey2 =skey.replaceAll("E", "");
							switch(skey2){
								case "无效":{
									var sval = seed[skey2];
									var tval = _UnitsList.list[target].attributes.getAttribute(sval);
									var oval = _UnitsList.list[owner].attributes.getAttribute(sval);
									return tval != oval;
								}
							}
						};
					}break;
					case "不等属性":{
						var seed = hit_json[key];
						for (var skey in seed) {
							var skey2 =skey.replaceAll("E", "");
							switch(skey2){
								case "无效":{
									var sval = seed[skey2];
									var tval = _UnitsList.list[target].attributes.getAttribute(sval);
									var oval = _UnitsList.list[owner].attributes.getAttribute(sval);
									return tval == oval;
								}
							}
						};
					}break;
				}
			}
			return true;
		}
		else{
			console.error("发生错误：不存在的技能[" + skill_name + "]");
			return false;
		}
	},

	/// 暂时写死，每次都通过
	pass: function(owner, target, skill_name){
		var skill = _SkillList.skill_list[skill_name];
		var passed = this.target_pass(owner, target, skill_name);
		if(!passed){
			return false;
		}
		if(_UnitsList.list[target].cur_state == "死亡"){
			return false;
		}
		return true;
	}
});

_ActionJudge = new ActionJudge();