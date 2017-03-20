// 2015年12月21日
// 输出以“*”表示出的钻石形状的字符串
// http://www.codewars.com/kata/5503013e34137eeeaa001648/train/javascript

// 方法一
function _diamond(n){
	if(n < 0 || n % 2 == 0) {
		return null;
	} else {
		// 给定钻石n即为数组长度
		var diams = [],
			len = diams.length = n,
			mid = (len - 1) / 2;
		diams[mid] = n;
		// console.log(mid);
		// 钻石前半段各自数量
		for (var i = mid - 1; i >= 0; i--) {
			n -= 2;
			diams[i] = n;
			// console.log(i + ': ' + n);
		}
		n = diams[mid];		// 重置n
		// 钻石后半段各自数量
		for (var i = mid + 1; i < len; i++) {
			n -= 2;
			diams[i] = n;
			// console.log(i + ': ' + n);
		}
		// console.log(diams);		// 此时已知钻石各段应显示*的长度，即diams

		// 列举每一段钻石数组的长度为一个单独数组
		var str = [],
			strArr = [];
		for (var i = 0; i < len; i++) {
			// 得出当前字符串的空格数目
			var spaces = (len - diams[i]) / 2;
			str.length = spaces + diams[i];
			// console.log(str.length);
			// console.log(i + ': ' + spaces);
			for (var j = 0; j < str.length; j++) {
				if (j < spaces) {
					// str[j] = '';
					str[j] = ' ';
					// console.log(j + ': ' + spaces);
				} else if (j >= spaces) {
					str[j] = '*';
					// console.log(j + ': ' + spaces);
				}
			}
			// 为当前字符串添加换行符
			str[spaces + diams[i] - 1] += '\n';
			// console.log(i + ': ' + str);
			// 把当前字符串数组重新转换为字符串并存入新的数组
			strArr.push(str.join(''));
		}
		// 返回当前数组为钻石形式，取消数组的默认分隔符“,”
		// console.log(strArr.join('').toString());
		return strArr.join('').toString();
	}
}

// 方法二
function diamond(n) {
	if(n < 0 || n % 2 == 0) {
		return null;
	}
	var spaces = 0,
		sides = '',
		diam = lines(spaces, n);
	while (spaces < n) {
		spaces += 2;
		sides = lines(spaces / 2, n - spaces);
		diam = sides + diam + sides;
	}
	return diam;
}

function strArr(str, num) {
	return new Array(num + 1).join(str);
}
function lines(spaces, stars) {
	return strArr(' ', spaces) + strArr('*', stars) + '\n';
}