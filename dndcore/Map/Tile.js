/*********
Tile类[实例化类]：
1.一个地格，是六边形地格，里面保存着这个地格的数据结构
2.六边形地格有自己的坐标系统，作为六边形网格二维数组中节点
3.地格中心位置，center_x，center_y
4.地格索引位置，index_x，index_y
5.radio六边形半径
center_x = index_x*radio*1.5;
center_y = radio*(g~3)*index_y + 0.5*(g~3)*radio - 0.5*(g~3)*radio*index_x
  		 = radio*(g~3)*(index_y + 0.5 - 0.5*index_x)
  0_____1
  /     \
5/       \2
 \       /
 4\_____/3

points[6]
****/

Point = Klass({
	initialize: function(x, y){
		this.x = x;
		this.y = y;
		this.unitOn = false;
	}
});

/// Class Tile
Tile = Klass({
	g3:1.732,
	initialize: function(ix, iy, radio){
		this.index_x = ix;
		this.index_y = iy;
		this.radio = radio;

		/// 计算真实位置
		this.center_x = parseInt(this.index_x*this.radio*1.5);
		this.center_y = parseInt(this.radio*(this.g3)*(this.index_y + 0.5 - 0.5*this.index_x));

		/// 计算六个点的位置
		this.points = [];
		var tmpx = this.center_x - this.radio*0.5;
		var tmpy = this.center_y - this.radio*this.g3*0.5;
		this.points[0] = new Point(tmpx, tmpy);

		tmpx = this.points[0].x + this.radio;
		tmpy = this.points[0].y;
		this.points[1] = new Point(tmpx, tmpy);

		tmpx = this.center_x + this.radio;
		tmpy = this.center_y;
		this.points[2] = new Point(tmpx, tmpy);

		tmpx = this.points[1].x;
		tmpy = this.center_y + this.radio*this.g3*0.5;
		this.points[3] = new Point(tmpx, tmpy);

		tmpx = this.points[0].x;
		tmpy = this.points[3].y;
		this.points[4] = new Point(tmpx, tmpy);

		tmpx = this.center_x - this.radio;
		tmpy = this.center_y;
		this.points[5] = new Point(tmpx, tmpy);
	},
});
