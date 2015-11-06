/*********
UnitsList类[单例]：
1.整个游戏中所有的Unit的保存表
2.是一个二维表，第一个唯度是分类，第二个唯度是ID名称
3.这个表和Globel中的对象查找器有映射关系，Globel可以通过UnitsList快速的查找到对象。
4.(重要!)每一个对象只需要保留关联其他对象的对象ID名称，而不需要引用其对象本身
************/

UnitsList = Klass({
	initialize: function(){
		this.list = [];
		this.out_list = [];
	},

	load: function(json, callback){
		var gp = 0;
		for(var key in json){
			var arr = json[key];
			for (var i = 0; i < arr.length; i++) {
				var unit = arr[i];
				var attri = unit["属性模版"];
				var name = unit["单位名字"];
				var uot = new UnitOnTile(name, attri, unit["初始位置"], gp);
				uot.setAttributeChangeCallback(callback);
				this.list[name] = uot.in_unit;
				uot.in_unit.attributes.setAttribute("名字", name);
				this.out_list.push(uot);
			}
			gp ++;
		}
	},

	getUnitByPosition: function(x, y){
		for (var i = 0; i < this.out_list.length; i++) {
			var ix = this.out_list[i].x;
			var iy = this.out_list[i].y;
			if(ix == x && iy == y){
				return this.out_list[i];
			}
		}
		return null;
	}
});
_UnitsList = new UnitsList();