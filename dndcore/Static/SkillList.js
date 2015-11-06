/*********
SkillList类[静态类]：
1.保存所有种类的技能
2.一次初始化后，就不要修改了，是游戏客观存在的所有技能查表
************/

/// Class SkillList
SkillList = Klass({
	skill_list: [],
	initialize: function(){

	},

	load: function(skills_list){
		for (var i = 0; i < skills_list.length; i++) {
			this.skill_list[skills_list[i]["技能名"]] = new Skill(skills_list[i]);
		};
		
	},
});

_SkillList = new SkillList();
