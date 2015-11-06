/*********
Action[实例化类]：
1.Action包含[ID],[发起者],[目标],[目的地],[影响区域],[动作名字],[作用JSON序列],[Action时间]
2.一个Action建立，分发给对应的Unit，直到被完成。
3.如果一个Action有目标，那么它完成的时候会影响所有的目标，
  在一个Action结束的时候，要请求裁决器Arbitrament，根据[作用JSON序列]逐一判决，
  并对[目标]的属性直接影响
3.如果一个Action没有[目标]，但有[影响区域]，那么Action完成的时候，
  要请求Arbitrament通过影响区域找到对应的影响目标组，然后逐一进行（3）步骤
4.一个Action结束的影响，将被输出到整个游戏的控制台中

Action控制台模板：

[发起者] 对着 [目标] 释放了 [动作名字] | [成功/失败] [原因：被闪避、被抵抗..]
-------[发起者] 对 [目的地/目标名字] 进行 [action_kind] [value] 
-------[发起者] 对 [目的地/目标名字] 进行 [action_kind] [value]
-------.....
-------[发起者] 对 [目的地/目标名字] 进行 [action_kind] [value]

************/

Action = Klass({
	initialize: function(json_actions){
		this.owner = json_actions["owner"];			// 发起者ID
		this.target = json_actions["target"];		// 目标ID
		this.dest_land = json_actions["dest_land"];	// 目的地
		this.area = json_actions["area"];			// 影响区域
		this.skill = json_actions["skill"];			// 技能名字
		this.time = json_actions["time"];			// 执行时间
		this.onfinish = null;						// 完成后回调

		/// 在这里，我们用一个ready_time让process队列在执行的时候判断时候到了
		/// 该判决的时刻,如果没到，那么放在队列末尾
		this.ready_time = 0;				// 准备好的时间
	},
});