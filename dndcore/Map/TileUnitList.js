/*********
TileUnitList类[静态类]：
1.地图地格上的所有单位表
2.保存所有的UnitOnTile
****/

/// Class Tile
/*TileUnitList = Klass({
	initialize: function(){
		this.list = [];
	},

	load: function(json){
		var gp = 0;
		for(var key in json){
			var arr = json[key];
			for(var i = 0; i < arr.length; i++){
				var unit = arr[i];
				var name = unit["单位名字"];
				var real_unit = _UnitsList.list[name];
				var uot = new UnitOnTile(real_unit, unit["初始位置"], gp);
				this.list.push(uot);
			}
			gp ++;
		}
	},

	getUnitByPosition: function(x, y){
		for (var i = 0; i < this.list.length; i++) {
			var ix = this.list[i].x;
			var iy = this.list[i].y;
			if(ix == x && iy == y){
				return this.list[i];
			}
		}
		return null;
	}
});

_TileUnitList = new TileUnitList();*/