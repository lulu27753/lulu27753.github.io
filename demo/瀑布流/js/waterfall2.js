/*
 * 瀑布流2（IE8以上）
 * @authors cnzsb
 * @date    2015-12-30 23:37:36
 */

$(function () {	
	randomPlace('#container', '.box');

	$(window).resize(function () {
		waterfall('#container', '.box');
	});

	// 模拟服务器发回的数据
	var dataInt = {'data':[{'src':'07.jpg'},{'src':'06.jpg'},{'src':'05.jpg'},{'src':'04.jpg'},{'src':'03.jpg'},{'src':'02.jpg'},{'src':'01.jpg'}]};

	$(window).scroll(function () {
		var $container = $('#container'),
			$lastBox = $container.find('.box').last(),
			lastBoxTop = $lastBox.outerHeight() / 4 + $lastBox.offset().top,
			viewTop = $(window).height() + $(window).scrollTop();

		if (lastBoxTop < viewTop) {
			$(dataInt.data).each(function () {
				var $nEle = $('<div class="box"><div class="pic"><img></div></div>').appendTo('#container'),
					$nImg = $nEle.find('img');
				// console.log(this.src);
				$nImg.attr('src', 'images/' + this.src);
			});

			waterfall('#container', '.box');
		}
	});
});

// 瀑布流，父容器及子元素格式均为选择器写法
function waterfall(parent, son) {
	var $container = $(parent),
		$box = $container.find(son),
		boxW = $box.eq(0).outerWidth(),
		cols = Math.floor($(window).width() / boxW),
		aBoxH = [];

	// 设置父容器居中
	$container.css({
		'width': boxW * cols,
		'margin': '0 auto'
	});	

	$box.each(function (i) {
		var $this = $(this);
		if (i < cols) {
			$this.css('position', '');
			aBoxH[i] = $this.outerHeight();
		} else {
			var aBoxMinH = Math.min.apply(null, aBoxH),
				aBoxMinIndex = $.inArray(aBoxMinH, aBoxH);
			// console.log(aBoxH);

			$this.css({
				'position': 'absolute',
				'top': aBoxMinH,
				'left': aBoxMinIndex * boxW
			});

			aBoxH[aBoxMinIndex] += $this.outerHeight();
		}
	});	
}

// 随机放置
function randomPlace(parent, son) {
	var $container = $(parent),
		$box = $container.find(son),
		boxW = $box.eq(0).outerWidth(),
		cols = Math.floor($(window).width() / boxW),
		aBoxH = [];

	// 设置父容器居中
	$container.css({
		'width': boxW * cols,
		'margin': '0 auto'
	});	

	// 初始随机排列在窗口中央
	$box.css('position', 'absolute')
		.each(function () {
			var $this = $(this);
			$this.css({
				'top': ($(window).height() - $this.outerHeight()) / 2,
				'left': ($(window).width() - $this.outerWidth()) / 2,
				'margin-top':  (Math.random() * 10 - 6) * 10,
				'margin-left': (Math.random() * 10 - 6) * 50
			});
		});

	// 一定时间后正常排列
	setTimeout(function () {
		$box.each(function (i) {
			var $this = $(this);
			if (i < cols) {
				aBoxH[i] = $this.outerHeight();
				$this.css('position', '').animate({'margin': '0'}, 500);
			} else {
				var aBoxMinH = Math.min.apply(null, aBoxH),
					aBoxMinIndex = $.inArray(aBoxMinH, aBoxH);
				// console.log(aBoxH);

				$this.css('position', 'absolute')
					.animate({
						'margin': '0',
						'top': aBoxMinH,
						'left': aBoxMinIndex * boxW
					}, 500);

				aBoxH[aBoxMinIndex] += $this.outerHeight();
			}
		});

		// 解决当前页面F5刷新后排列异常问题
		waterfall(parent, son);
	}, 1000);
}