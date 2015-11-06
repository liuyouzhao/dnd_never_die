/*********
ActionProcess[静态类]：
一个Action的Json作用表实例
普通攻击
{
	"伤害目标":"0|2d6+3" //伤害类型|伤害值
}
攻击+削弱
{
	"伤害目标":"0|2d6+3" //伤害类型|伤害值
	"持续削弱":"dot_id"
}
治疗+增益
{
	"治疗目标":"3d4",
	"持续增益":"buf_id"
}

action_kind: ["移动","攻击目标","治疗目标","持续增益","持续削弱","增益消失","削弱消失"],
************/

ActionProcess = Klass({
	actions_queue: [],
	tick_time: 50,
	time_now: 0,

	initialize: function(){
		/// nothing to do
	},

	startAction: function(action){
		var owner = action.owner;
		var target = action.target;
		var skill_name = action.skill;

		/// 先判定目标有效性
		var ok = _ActionJudge.pass(owner, target, skill_name);
		if(!ok) {
			console.error("["+target+"] 不可能被释放 ["+skill_name+"]");
			return;
		}
		action.ready_time = this.time_now + parseInt(action.time);

		var me = this;
		function timer(owner, target, skill, action){
			return function(){
				var ok = _ActionJudge.pass(owner, target, skill_name);
				if(ok){
					me.doAction(owner, target, skill, action);
				}else{
					console.error("["+target+"] 不可能被释放 ["+skill_name+"]");
				}
			};
		}
		window.setTimeout(timer(owner, target, skill_name, action), action.time);
		//this.actions_queue.push(action);

		console.log("");
		console.log(owner + " 开始释放 " + skill_name + " " + action.time + "ms");
		console.log("");
	},

	doAction: function(owner, target, skill_name, action){
		var result = _Arbitrament.arbitrate(owner, target, skill_name);
		if(!(result["passed"])){
			_UnitsList.list[owner].changeState("站桩");
		}
		else{
			var state = _UnitsList.list[owner].changeState("站桩");
		}
		/// 完成后调用回调
		if(action.onfinish){
			action.onfinish(_UnitsList.list[action.owner]);
		}
	},

	start: function(){
		var me = this;
		window.setInterval(function(){
			me.processAction();
		}, this.tick_time);
	},

	processAction: function(){
		for(var i = 0; i < this.actions_queue.length; i ++){
			var action = this.actions_queue.shift();
			if(action && this.time_now >= action.ready_time) {
				this.doAction(action.owner, action.target, action.skill);
				/// 完成后调用回调
				if(action.onfinish){
					action.onfinish(_UnitsList.list[action.owner]);
				}
			}
			else if(action && this.time_now < action.ready_time){
				this.actions_queue.push(action);
			}
		}
		this.time_now += this.tick_time;
	}
});

_ActionProcess = new ActionProcess();