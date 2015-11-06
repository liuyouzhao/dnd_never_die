/*********
Attributes类集[实例化类]：
1.在UnitsList中属性部分，通过ID和一个unit实体对应起来，属性中的数据可以对应子属性
2.属性的改变，意味着整个游戏逻辑的改变，当属性变化了，游戏会发生更新，但是这些更新都是围绕unit来的
  当使用技能攻击一个单位，技能伤害和目标单位抗性在用World/Arbitrament.js的进行判定，其他影响也会进行相应的判定裁决
************/

/// Class Attribute
/// value: 作为值存在，类型任意
/// onSetCallback,onGetCallback主要作为单位自己判决自己的属性被改变后有何自发行为
/// 例如单位被裁决者判决为受到伤害为100，这时事件器将向ActionDispatcher发送[生命减少100]的Action，
/// 当处理到[生命减少100]的Action时，将进行对应unit的health属性的setValue设定，
/// 此时，实现了onSetCallback的Unit对应的Attribute本身知道了自己生命值为0，则需要向ActionDispatcher发送
/// [自己死亡]的Action，这时ActionProcess将Unit放入UnitsList的回收表中，那么活跃表中将不存在这个unit
/*Attribute = Klass({
	value: null,				// 类型不确定,不可以直接设置
	onSetCallback: null, 		// 当value被设置时出发
	onGetCallback: null,		// 当获得value前被出发

	initialize: function(val, onSet, onGet){
		/// nothing to do
		this.onSetCallback = function(val){
			onSet(val);
		}
		this.onGetCallback = function(val){
			onGet(val);
		}
		this.setValue(val);
	},

	setValue: function(val){
		this.value = val;
		this.onSetCallback(this.value);
	},

	getValue: function(){
		this.onGetCallback(this.value);
		return this.value;
	},
});*/

/// Class AttributesBase
/// 所有属性的基础类
/// 拥有所有unit公有的一些属性字段
/// 属性：speed  		移动速度
///       fullhealth	最大生命值
///       health 		当前生命值
///       godmod    	无敌的(不可攻击)
///       target    	目标
///		  destarea		目的地
///       damage    	伤害值(默认)
///		  crick 		致命率(默认)
///		  crickval      致命增值(默认)
///       defence       防御值(默认)

///    	  dodge			闪躲概率(默认)
///    	  holdr			格挡概率(默认)
///    	  hold			格挡值(默认)
AttributesBase = Klass({

/*	nameid: 		new Attribute("12321", function(val){}, function(val){}),		// string
	speed: 			new Attribute(0, function(val){}, function(val){}),				// int
	fullhealth: 	new Attribute(1, function(val){}, function(val){}),				// int
	health: 		new Attribute(1, function(val){}, function(val){}),				// int
	godmod: 		new Attribute(true, function(val){}, function(val){}),			// bool
	target: 		new Attribute("", function(val){}, function(val){}),			// string
	destarea:       new Attribute(null, function(val){}, function(val){}),			// int array[x,y,x,y...]
	damage: 		new Attribute("0d0+0", function(val){}, function(val){}),		// string
	crick: 			new Attribute("0d0+0>0d0", function(val){}, function(val){}), 	// string
	crickval: 		new Attribute("0d0+0", function(val){}, function(val){}),		// string
	defence: 		new Attribute("0d0+0", function(val){}, function(val){}),		// string
	dodge:          new Attribute("0d0+0>0d0", function(val){}, function(val){}),	// string
	holdr:          new Attribute("0d0+0>0d0", function(val){}, function(val){}),	// string
	hold:           new Attribute("0d0+0", function(val){}, function(val){}),		// string
*/
	initialize: function(json_attr){
		this.data = json_attr;
		this.unit = null;
	},

	setAttributeByJson: function(json_attr){
		this.data = json_attr;
		this.unit = null;
	},

	// setAttributeChangeCallback: function(key, callback){
	// 	var value_obj = eval("this." + key);
	// 	value_obj.onSetCallback = callback;
	// },

	_attr_cal_after_bdlist: function(result, lname, key_eff){
		for (var i = 0; i < this.data[lname].length; i++) {
			var name = this.data[lname][i];
			for(var key in _BuffDeBuffList.list[name]){
				var dat = _BuffDeBuffList.list[name][key];
				var attr_name = dat["属性名称"];
				if(attr_name == key_eff){
					var key2 = key.replaceAll();
					if(key2 == "影响"){
						var method = dat["方法"];
						var val = dat["数值"];
						switch(method){
							case "减法":
								result = _mhgame_attr_value_sub(result, val);
								break;
							case "加发":
								result = _mhgame_attr_value_add(result, val);
								break;
							case "乘加":
								result = _mhgame_attr_value_mul(result, 1.0+val);
								ischanged = true;
								break;
							case "乘减":
								result = _mhgame_attr_value_mul(result, 1.0-val);
								break;
						}
					}
				}
			}
		}
		return result;
	},

	getOriginalAttri: function(key){
		return this.data[key];
	},

	/// ischanged=-1是削弱了，1是增强了的
	getAttribute: function(key){
		/// 遍历增益和削弱表，修改得的属性
		var result = this.data[key];
		var changed = false;
		result = this._attr_cal_after_bdlist(result, "增益表", key, changed);
		result = this._attr_cal_after_bdlist(result, "削弱表", key, changed);
		return result;
	},

	setAttribute: function(key, value){
		//上限模式
		var sx = this.data[key+"上限"];
		if(sx){
			if(value > sx){
				value = sx;
			}
		}
		if(this.data[key]){
			this.data[key] = value;
		}
	},



	changeAttributeBy: function(key, value){
		//上限模式
		var sx = this.getAttribute(key+"上限");
		var cur = this.data[key];
		if(sx && cur){
			if(cur + value > sx){
				value = 0;
			}
		}

		if(cur){
			this.data[key] += value;
			if(this.unit && this.unit.onAttributeChanged){
				this.unit.onAttributeChanged(this.unit.out_unit, value);
			}
		}
	},

	// buff或debuff对属性的修改
	buffChangeAttribute: function(buff_debuff){
		buff_debuff.clearChanged();
		var buff_debuff_json = buff_debuff.data;
		for (var key in buff_debuff_json) {
			var key2 = key.replaceAll("E", "");
			if(key2 == "影响"){
				var data = buff_debuff_json[key2];
				var attrname = data["属性名称"];
				var method = data["方法"];
				var val = data["数值"];
				if(method == "减法"){ //减去
					var after = _mhgame_attr_value_sub(this.data[attrname], val, null);
					if(after != this.data[attrname]){
						this.setAttribute(attrname, after);
						buff_debuff.addChanged(attrname, val);
					}
				}

				else if(method == "乘减"){
					var origin = this.data[attrname];
					var mulchanged = _mhgame_attr_value_mul(this.data[attrname], val, null);
					var after = _mhgame_attr_value_sub(this.data[attrname], mulchanged, null);
					if(after != this.data[attrname]){
						this.setAttribute(attrname, after);
						var changed = _mhgame_attr_value_sub(origin, after, null);
						buff_debuff.addChanged(attrname, changed);
					}
				}

				else if(method == "加法"){//加上
					var after = _mhgame_attr_value_add(this.data[attrname], val, null);
					if(after != this.data[attrname]){
						this.setAttribute(attrname, after);
						buff_debuff.addChanged(attrname, val);
					}
				}

				else if(ethod == "乘加"){
					var origin = this.data[attrname];
					var mulchanged = _mhgame_attr_value_mul(this.data[attrname], val, null);
					var after = _mhgame_attr_value_add(this.data[attrname], mulchanged, null);
					if(after != this.data[attrname]){
						this.setAttribute(attrname, after);
						var changed = _mhgame_attr_value_sub(after, origin, null);
						buff_debuff.addChanged(attrname, changed);
					}
				}
			}
		}
	},



	buffUnChangeAttribute: function(buff_debuff){
		var buff_debuff_json = buff_debuff.data;
		var buff_changed = buff_debuff.changed;
		for (var key in buff_debuff_json) {
			var key2 = key.replaceAll("E", "");
			if(key2 == "影响"){
				var data = buff_debuff_json[key2];
				var attrname = data["属性名称"];
				var method = data["方法"];
				var valover = buff_changed[attrname];
				if(method == "减法" || method == "乘减"){ //加回来
					var recover = _mhgame_attr_value_add(this.data[attrname], valover, null);
					this.setAttribute(attrname, recover);
				}

				else if(method == "加法" || method == "乘加"){//减回来
					var recover = _mhgame_attr_value_sub(this.data[attrname], valover, null);
					this.setAttribute(attrname, recover);
				}
			}
		}
	}
});



/// Class UnitAttributes
/// 角色单位属性，例如飞船、人物等，玩家直接操作的角色
/// buffs 				所有的增益效果的ID
/// dots 				所有的削弱效果的ID
/// group				阵营ID
UnitAttributes = Klass(AttributesBase, {
/*	buffs: 				new Attribute([], function(val){}, function(val){}), 			// array 保存字符串ID
	dots: 				new Attribute([], function(val){}, function(val){}), 			// array 保存字符串ID
	group: 				new Attribute(0, function(val){}, function(val){}),				// int
*/

	initialize: function(values){
		/// nothing to do but give values
		if(values){
			var va = clone(values);
			va["增益表"] = [];
			va["削弱表"] = [];
			va["续跳表"] = [];
			AttributesBase.initialize.call(this, va);
		}
	},
});