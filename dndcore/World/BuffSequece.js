/*********
BuffSequence类[单例]：
1.游戏中所有单位的身上的Buff都通过这个BuffSequence计时
************/

BuffSequence = Klass({
	hash: {},
	initialize: function(){
	},

	start: function(buffdebuff){
		var key = buffdebuff.target_name + buffdebuff.getName();
		//如果有的话，拿走，重来
		var old = this.hash[key];
		if(old){
			old.end();
		}
		this.hash[key] = buffdebuff;
		buffdebuff.begin();
	}
});

_BuffSequence = new BuffSequence();