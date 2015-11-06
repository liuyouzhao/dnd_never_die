/// 对属性数值增加或减少的公有的方法
/// 属性加 string + int 
function _mhgame_attr_value_add(src, dst){
	if(typeof src == 'string'){
		// 2d3+4>2d6+8只管'>'左边的值
		if(src.match(">")){
			var arr1 = _mhgame_get_rate_value_array(src);
			var v1 = arr1[0][0];
			var v2 = arr1[0][1];
			var v3 = arr1[0][2] + dst;
			var m = v3 >= 0 ? "+" : "+(";
		    var n = v3 >= 0 ? "" : ")";
			return v1 + "d" + v2 + m + v3 + n + ">" + (src.split(">"))[1];
		}
		// 2d3+4
		else if(src.match("d")){
			var arr1 = _mhgame_get_d_value_array(src);
			var v1 = arr1[0];
			var v2 = arr1[1];
			var v3 = arr1[2] + dst;
			var m = v3 >= 0 ? "+" : "+(";
		    var n = v3 >= 0 ? "" : ")";
			return v1 + "d" + v2 + m + v3 + n;
		}
	}
	else{
		var result = src + dst;
		return result;
	}
}

/// 属性减
function _mhgame_attr_value_sub(src, dst){
	if(typeof src == 'string'){
		// 2d3+4>2d6+8只管'>'左边的值
		if(src.match(">")){
			var arr1 = _mhgame_get_rate_value_array(src);
			var arr_max = null;
			var v1 = arr1[0][0];
			var v2 = arr1[0][1];
			var v3 = arr1[0][2] - dst;
			var m = v3 >= 0 ? "+" : "+(";
		    var n = v3 >= 0 ? "" : ")";
			return v1 + "d" + v2 + m + v3 + n + ">" + (src.split(">"))[1];
		}
		// 2d3+4
		else if(src.match("d")){
			var arr1 = _mhgame_get_d_value_array(src);
			var arr_max = null;
			var v1 = arr1[0];
			var v2 = arr1[1];
			var v3 = arr1[2] - dst;
			var m = v3 >= 0 ? "+" : "+(";
		    var n = v3 >= 0 ? "" : ")";
			return v1 + "d" + v2 + m + v3 + n;
		}
	}
	else{
		var result = src - dst;
		return result;
	}
}

/// 属性数乘
function _mhgame_attr_value_mul(src, mul){
	if(typeof src == 'string'){
		// 2d3+4>2d6+8只管'>'左边的值
		if(src.match(">")){
			var arr1 = _mhgame_get_rate_value_array(src);
			var v1 = arr1[0][0];
			var v2 = arr1[0][1] * mul;
			v2 = parseInt(v2);
			var v3 = arr1[0][2];
			var m = v3 >= 0 ? "+" : "+(";
		    var n = v3 >= 0 ? "" : ")";
			return v1 + "d" + v2 + m + v3 + n + ">" + (src.split(">"))[1];
		}
		// 2d3+4
		else if(src.match("d")){
			var arr1 = _mhgame_get_d_value_array(src);
			var v1 = arr1[0];
			var v2 = arr1[1] * mul;
			v2 = parseInt(v2);
			var v3 = arr1[2];
			var m = v3 >= 0 ? "+" : "+(";
		    var n = v3 >= 0 ? "" : ")";
			return v1 + "d" + v2 + m + v3 + n;
		}
	}
	else{
		var result = src * mul;
		return result;
	}
}

/// 2d6+3得到其中[2,6,3]
function _mhgame_get_d_value_array(dval){
	var s = dval.split("+");
	var s1 = s[0];	// 2d6
	var s2 = s[1];	// 3

	var ss = s1.split("d");
	var ss1 = ss[0]; // 2
	var ss2 = ss[1]; // 6

	var n1 = parseInt(ss1);
	var n2 = parseInt(ss2);
	var n3 = parseInt(s2);
	return [n1,n2,n3];
}


/// 2d6+3>3d8+5得到其中[2,6,3]和[3,8,5]
function _mhgame_get_rate_value_array(dval){
	var s = dval.split(">");
	var s1 = s[0];
	var s2 = s[1];
	var a1 = _mhgame_get_d_value_array(s1);
	var a2 = _mhgame_get_d_value_array(s2);
	return [a1, a2];
}

function _mhgame_match_plus(value){
	for(var i = 0; i < value.length; i ++){
		if(value[i] == '+'){
			return true;
		}
	}
	return false;
}
function _mhgame_match_sub(value){
	for(var i = 0; i < value.length; i ++){
		if(value[i] == '-'){
			return true;
		}
	}
	return false;
}

/// 比较两个属性的大和小，返回-1左边的大，返回1右边的大，返回0相等，返回999无法比较
function _mhgame_left_right_compare(left, right){
	if(typeof left != "string" || typeof right != "string"){
		return 999;
	}
	
	if(left.match(">") && right.match(">")){
		var strleft = left.split(">")[0];
		var strright = right.split(">")[0];
		if(_mhgame_match_plus(strleft) && _mhgame_match_sub(strright)){
			return -1;
		}
		else if(_mhgame_match_sub(strleft) && _mhgame_match_plus(strright)){
			return 1;
		}
		var arrleft = _mhgame_get_rate_value_array(left);
		var arrright = _mhgame_get_rate_value_array(right);
		var valleft = arrleft[0][0]*arrleft[0][1]+arrleft[0][2];
		var valright = arrright[0][0]*arrright[0][1]+arrright[0][2];
		if(valleft > valright)
			return -1;
		else if(valleft < valright)
			return 1;
		else
			return 0;
	}
	else if(left.match("d") && right.match("d")){
		if(_mhgame_match_plus(left) && _mhgame_match_sub(right)){
			return -1;
		}
		else if(_mhgame_match_sub(left) && _mhgame_match_plus(right)){
			return 1;
		}
		var arrleft = _mhgame_get_d_value_array(left);
		var arrright = _mhgame_get_d_value_array(right);
		var valleft = arrleft[0]*arrleft[1]+arrleft[2];
		var valright = arrright[0]*arrright[1]+arrright[2];
		if(valleft > valright)
			return -1;
		else if(valleft < valright)
			return 1;
		else
			return 0;
	}
	return 0
}

//<mingjian date="2012-11-4">
//数组的几个扩展方法
/**
 * 返回(默认从第一个元素开始查找)指定元素的索引，如果不存在返回-1
 */
Array.prototype.indexOf = function(obj, idx){
	var from = idx === undefined ? 0 : (idx < 0 ? Math.max(0, this.length + idx) : idx);
	for(var i = from, l = this.length; i < l; i++){
		if(i in this && this[i] === obj){
			return i;
		}
	}
	return -1;
};
/**
 * 返回(默认从最后一个元素开始查找)指定元素的索引，如果不存在返回-1
 */
Array.prototype.lastIndexOf = function(obj, idx){
	var l = this.length, from = idx == null ? l - 1 : idx;
	if(from < 0){
		from = Math.max(0, l + from);
	}
	for(var i = from; i >= 0; i--){
		if(i in this && this[i] === obj){
			return i;
		}
	}
	return -1;
};
/**
 * 移除数组中的第i个对象
 */
Array.prototype.removeAt = function(i){
	this.splice(i, 1);
};
/**
 * 移除数组中的某个对象，没有找到则不会做事
 */
Array.prototype.remove = function(obj){
	var p = this.indexOf(obj);
	if(p != -1){
		this.removeAt(p);
	}
};
//</mingjian>