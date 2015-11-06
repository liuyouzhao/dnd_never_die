/*********
Unit类[实例化类]：
1.单位类
2.行为取决于当前skill
3.skill队列最大长度是n，进入的skill将被逐一执行
4.有几大状态：[站桩],[站桩做事],[移动到],[跟随目标]
  暂时不支持[移动做事],以后可能会支持
5.(非常重要)当一个skill开始的时候，一切底层行为（移动改变坐标等）都由_ActionProcess起Timer统一处理

受控流程：
  		 属性被改变 ---> 是否有回调 ---> 调用回调     ---> 改变状态
  		  							---> 直接改变属性 
  		 -----------------------------------------------------------
  		 收到State改变 ---> 影响自动行为发起skill ---> 发起被改变的skill
actions_wait_queue队列：
		_____________________  ________________________
		|					| |		  |		  |		  |
		|	当前skill		| |	  1	  |	  2	  |	  3	  |
		|___________________| |_______|_______|_______|
		当前执行的skill被打断skill将不会被完成，
		新增加的skill将进入队列，1,2,3的顺序
		当前skill被打断后，1位置的skill将进入当前skill位置，队列的前移是延迟的
		当skill队列为空，即将重新回到站桩状态时，会询问一次AI
************/

/// Class Unit
/// actionQueueFull() skill队列是否满了
/// pushAction(act) 添加一个skill
/// popDoAction 拿出队列中的一个，变成当前skill
/// beginAction 开始执行当前skill
Unit = Klass(Base, {

	initialize: function(attr){
		Base.initialize.call(this);
		this.actions_wait_queue = [];				// 最大长度为n
		this.actions_num_max = 3;			// 最大长度为3，此时可以发起3个Action自动逐一执行
		this.cur_action = null;			// 当前的Action
		this.states = ["站桩", "站桩做事", "移动到", "跟随目标", "死亡"],	// 几大状态

		this.cur_state = 			"站桩",			// 当前状态
		this.attributes = attr;
		this.attributes.unit = this;
		this.out_unit = null;
		this.onAttributeChanged = null;
	},

	actionQueueFull: function(){
		return actions_wait_queue.length >= 3;
	},

	// 由用户或自动脚本调用push给单位技能行动
	pushAction: function(skill_name){
		// var push_ok = false;
		// var which = 0;
		if(this.actions_wait_queue.length > 3){
			return;
		}
		this.actions_wait_queue.push(skill_name);

		// for (var i = 0; i < this.actions_num_max; i++) {
		// 	if(this.actions_wait_queue[i] == null){
		// 		this.actions_wait_queue[i] = skill_name;
		// 		push_ok = true;
		// 		which = i;
		// 		break;
		// 	}
		// };
	},

	// 由系统的UnitSequence调用，公平的轮训每一个Unit的Skill行为执行
	popDoAction: function(name){
		if(this.cur_state != "站桩"){
			return;
		}
		if(this.actions_wait_queue.length > 0){
			this.cur_action = this.actions_wait_queue.shift();
			this.beginAction();
		}
		// if(this.actions_wait_queue[0] != null){
		// 	this.cur_action = this.actions_wait_queue[0];
		// 	this.beginAction();
		// }
		// for(var i = 0; i < this.actions_num_max; i ++){
		// 	this.actions_wait_queue[i] = this.actions_wait_queue[i + 1];
		// }
	},

	beginAction: function(){

		this.cur_action.onfinish = function(who){
			who.onActionFinished(this);
		}

		_ActionProcess.startAction(this.cur_action);
		this.cur_state = "站桩做事"
	},

	doAction: function(owner,target,skill_name){
		_ActionProcess.doAction(owner,target,skill_name);
	},

	onActionFinished: function(action){
		var h = this.attributes.getAttribute("生命值");
		h = h < 0 ? 0 : h;
		if(h == 0){
			console.error(this.attributes.getAttribute("名字") + " 倒下了...");
		}
		console.warn("");
	},

	getState: function(){
		return this.cur_state;
	},

	changeState: function(stat){
		if(this.attributes.getAttribute("生命值") <= 0){
			stat = "死亡";
		}
		if(this.cur_state == "站桩做事" && (stat != "站桩做事")){
			/// 输出被打断
		}
		this.cur_state = stat;
		return this.cur_state;
	},
});
