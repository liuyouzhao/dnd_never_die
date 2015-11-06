/*********
Base类[实例化类]：
1.一切单位的内联属性都在这里
2.内联属性只关系到Action的执行状态，与绘图无关
************/

/// Class Base
Base = Klass({
	initialize: function(){
		/// nothing to do		
		this.map_position_x = 0; 	///在地图上的X点坐标，不等于绘制位置
		this.map_position_y = 0;  	///在地图上的Y点坐标，不等于绘制位置
		this.attack_distance = 10; 	///攻击可行范围
		this.direct_angle = 0.0; 	///面朝方向
	},
});
