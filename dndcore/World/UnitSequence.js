/*********
UnitSequence类[单例]：
1.游戏中所有单位的skill队列轮训pop
2.每个n秒轮训一次，暂时写死为1秒
************/

UnitSequence = Klass({
	initialize: function(){
	},

	start: function(){
		var me = this;
		this.timer = window.setInterval(function(){
			me.loopPopUnitSkill();
		}, 50);
	},

	stop: function(){
		window.clearInterval(this.timer);
	},

	loopPopUnitSkill: function(){
		var hash = _UnitsList.list;
		for (var key in hash) {
			var cur = hash[key];
			if(cur && cur.popDoAction){
				cur.popDoAction(key);
			}
		};
	},
});

_UnitSequence = new UnitSequence();