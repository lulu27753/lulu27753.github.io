/*!
 *qSlider 简单的无限滚动轮播
 *@Date 2016年7月11日
 *@Author cnzsb
 *@Email cnzsb@foxmail.com
 **/

;((function ($, window, document, undefined) {
	function Slider(el, opts) {
		this.$el = $(el);
		this.opts = $.extend({}, Slider.DEFAULTS, opts),
		this.timer = null;

		this.init();
	};

	Slider.DEFAULTS = {
		speed: 500,
		interval: 3000,
		hover: true,
		hasDots: true,
		hasArrows: true
	};

	Slider.prototype.init = function () {
		var self = this,
			$el = this.$el,
			$lis = $el.find('li'),
			$dots = $el.siblings('.dots'),
			len = this.len = $lis.length,
			$img = $lis.find('img'),
			w = 1920;

		$img.eq(0).ready(function () {
			self.w = w = $(this).width();

			$lis.width(w);
			$el.css({
				width: w * len,
				position: 'relative',
				left: -w
			});

			self.play();
			self.hover();

			self.opts.hasDots && self.dots();
			self.opts.hasArrows && self.arrows();
		});
	};

	Slider.prototype.slide = function () {
		var self = this,
			$el = self.$el,
			$lis = $el.find('li'),
			$dots = $el.siblings('.dots'),
			$dot = $dots.find('.dot'),
			w = self.w,
			len = self.len,
			timer = self.timer;

		$el.animate({
			'left': '-=' + w
			}, self.opts.speed, function () {
				var curLeft = $el.offset().left,
					current = (-curLeft / w) - 1;

				if (curLeft <= -(w * (len - 1))) {
					$el.css('left', -w);
					current = 0;
				}

				$dot.eq(current).addClass('active').siblings().removeClass('active');
			});
	};

	Slider.prototype.play = function () {
		var self = this;
		self.timer = setTimeout(function () {
				self.slide();
				self.play();
		}, self.opts.interval);
	};

	Slider.prototype.dots = function () {
		var self = this,
			$el = self.$el,
			$dots = $el.siblings('.dots'),
			len = self.len,
			w = self.w,
			speed = self.opts.speed,
			timer = self.timer;

		$dots.on('click', function (e) {
			var $target = $(e.target),
				current = 0;

			if ($target.is('.dot') && !$target.is('.active')) {
				current = $target.html();

				$el.stop();
				clearTimeout(timer);

				$target.addClass('active').siblings().removeClass('active');
				$el.animate({'left': -(w * current)}, speed);

				!$el.is(':animated') && self.play();
			}
		});
	};

	Slider.prototype.arrows = function () {
		var self = this,
			$el = self.$el,
			$dot = $el.siblings('.dots').find('.dot'),
			$prev = $el.siblings('.prev'),
			$next = $el.siblings('.next'),
			w = self.w,
			len = self.len,
			speed = self.speed,
			timer = self.timer;

		$prev.on('click', function () {
			change('prev');
		});

		$next.on('click', function () {
			change();
		});

		function change(signal) {
			signal = signal === 'prev' ? -1 : 1;
			var curLeft = $el.offset().left,
				current = parseInt((-curLeft / w)) - 1 + signal,
				offset = curLeft - (w * signal),
				newCur = current;

			if (current < 0) {
				newCur = len - 3;
			} else if (current > len - 3) {
				newCur = 0;
			}

			$el.stop();
			clearTimeout(timer);

			$dot.eq(newCur).addClass('active').siblings().removeClass('active');
			$el.animate({'left': offset}, speed, function () {
				if (current > len - 3) {
					$el.css('left', -w)
				} else if (current < 0) {
					$el.css('left', -w * (len - 2));
				}
			});
			!$el.is(':animated') && self.play();
		}
	};

	Slider.prototype.hover = function () {
		var self = this;
		self.$el.on({
			'mouseenter': function () {
					clearTimeout(self.timer);
				},
			'mouseleave': function () {
					self.play();
				}
		});
	};

	$.fn.extend({
		qSlider: function (options) {
			return this.each(function() {
				new Slider(this, options);
			});
		}
	});
})(jQuery, window, document))