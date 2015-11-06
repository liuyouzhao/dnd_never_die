/*********
UnitOnTile类[实例化类]：
1.地图地格上的一个单位
2.包装了Unit对象，但是加入移动元素，和地格对Unit中属性的影响
3.加入外联属性，作为打通地图显示和属性的API
****/

/// Class Tile
UnitOnTile = Klass({
	initialize: function(name, attri, pos, group){
		this.in_unit = new Unit(new UnitAttributes(attri));
		this.pos = pos;
		this.x = pos[0];
		this.y = pos[1];
		this.name = name;
		this.group = group;
		this.in_unit.attributes.setAttribute("所在组", group);
		this.in_unit.out_unit = this;
	},

	getAttribute: function(key){
		if(this.in_unit){
			return this.in_unit.attributes.getAttribute(key);
		}
	},

	moveTo: function(x, y){
		this.pos = [x, y];
		this.x = x;
		this.y = y;
	},

	getInsideUnit: function(){
		return this.in_unit;
	},

	setAttributeChangeCallback: function(callback){
		this.in_unit.onAttributeChanged = callback;
	}	

});
