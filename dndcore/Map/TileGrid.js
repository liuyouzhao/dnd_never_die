/*********
TileGrid类[实例化类]：
1.地图的网格，包含一个二维数组管理
2.点在某一个网格内
鼠标拾取:
ix = (mouse_x/(g~3)*2 - 0.5*radio/(g~3)*2)/((g~3)*radio)
ix为奇:
iy = round(mouse_y / ((g~3)*radio)) + 1
ix为偶:
iy = rounc((mouse_y+((g~3)/2*radio))/((g~3)*radio)) + 1
****/

/// Class Tile
TileGrid = Klass({
	initialize: function(w, h, radio){
		this.array = [];
		this.width = w;
		this.height = h;
		this.radio = radio;
		for (var i = 0; i < h; i++) {
			this.array[i] = [];
			for (var j = 0; j < w; j++) {
				this.array[i][j] = new Tile(j, i, radio);
			}
		}
	},

	getTileAt: function(ix, iy){
		if(ix >= this.width || ix < 0 || iy >= this.height || iy < 0)
			return null;
		return this.array[iy][ix];
	},

	pickTile: function(px, py){
		var g3 = 1.732;
		var r = this.radio;
		var tx = parseInt(px/r);
		var g = parseInt((tx-1) / 3);
		var w = parseInt((tx-1) % 3);
		var ix = 0, iy = 0;
		if(w == 0){
			ix = (g)*2+1;
			iy = parseInt((py+g3*r/2) / (g3*r)) + (ix - 1)/2;
			iy = parseInt(iy);
		}
		else{
			tx = parseInt((px+0.5*r)/r);
			g = parseInt((tx+1) / 3);
			w = parseInt((tx-1) % 3);
			if(w == 2){
				ix = (g)*2;
				iy = parseInt(py / (g3*r)) + (ix - 1)/2 + 1;
				iy = parseInt(iy);
			}
			else{
				/*
				这里有问题，要处理更细微的情况，而不仅仅是一个方块
				*/
				return null;
			}
		}
		//var ix = w == 0 ? (g)*2+1 : 0;
		//var iy = 2;
		//var iy = ix % 2 == 0 ? parseInt((py+(g3)/2*r)/(g3*r)) :
		//					   parseInt(py / g3*r) + 1;
		return this.getTileAt(ix, iy);
	},

});
