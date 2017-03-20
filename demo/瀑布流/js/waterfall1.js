/**
 * 瀑布流(IE8以上)
 * @authors cnszb
 * @date    2015-12-29 14:45:45
 */

window.onload = function () {
	waterfall('#container', '.box');

	// 自适应窗口
	window.onresize = function () {
		waterfall('#container', '.box');
	};

	// 模拟服务器发回的数据
	var dataInt = {'data':[{'src':'07.jpg'},{'src':'06.jpg'},{'src':'05.jpg'},{'src':'04.jpg'},{'src':'03.jpg'},{'src':'02.jpg'},{'src':'01.jpg'}]};

	// 滚动时判断是否需要加载服务器发回的更多图片
	window.onscroll = function () {
		var container = document.querySelector('#container'),
			box = container.querySelectorAll('.box'),
			lastBox = box[box.length - 1],
			lastBoxTop = lastBox.offsetHeight / 4 + lastBox.offsetTop,		// 盒子自身高度的1/4 + 到父容器顶部距离
			scrTop = document.documentElement.scrollTop || document.body.scrollTop,		// body兼容手机端
			viewTop = document.documentElement.clientHeight + scrTop;		// 视窗高 + 滚动距离

		if(lastBoxTop < viewTop) {
			var dataLen = dataInt.data.length;
			for(var i = 0; i < dataLen; i++){
				var nBox = document.createElement('div'),
					nPic = document.createElement('div'),
					nImg = document.createElement('img');
				nBox.className = 'box';
				container.appendChild(nBox);
				nPic.className = 'pic';
				nBox.appendChild(nPic);
				nPic.appendChild(nImg);
				nImg.src = 'images/' + dataInt.data[i].src;
			}

			waterfall('#container', '.box');
		}
	};
};


// 父容器parent,子容器son，采用选择器写法
function waterfall(parent, son) {
	var container = document.querySelector(parent),
		box = container.querySelectorAll(son),
		BoxW = box[0].offsetWidth,		// 单个图片容器宽度
		cols = Math.floor(document.documentElement.clientWidth / BoxW),		// 当前视窗下可容纳列数
		aBoxH = [];

	// 设置父容器宽度及居中
	container.style.cssText = 'width:' + BoxW * cols + 'px; margin-left: auto; margin-right: auto;';

	for (var i = 0; i < box.length; i++) {
		if (i < cols) {
			// 动态改变窗口时先清除定位
			box[i].style.position = '';
			// 存取首行每个盒子的高度
			aBoxH[i] = box[i].offsetHeight;
		} else {
			// 获取最小的高度及其索引
			var aBoxMinH = Math.min.apply(null, aBoxH),
				aBoxMinIndex = inArray(aBoxMinH, aBoxH);
			box[i].style.position = 'absolute';
			box[i].style.top = aBoxMinH + 'px';
			box[i].style.left = box[aBoxMinIndex].offsetLeft + 'px';

			// 改变数组中的最小高度
			aBoxH[aBoxMinIndex] += box[i].offsetHeight;
		}
	}
}

// 获取数组arr中的val值的索引
function inArray(val, arr) {
	for (var i in arr) {
		if (val == arr[i]) {
			return i;
		}
	}
}