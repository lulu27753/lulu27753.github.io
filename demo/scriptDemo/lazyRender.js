// @copyright: https://github.com/hanzichi/hanzichi.github.io/blob/master/2016/bigrender/js/bigrender.js

(function (win, doc) {
	/* bind 兼容 */
	Function.prototype.bind = Function.prototype.bind || function (context) {
		var that = this;
		return function () {
			return that.apply(context, arguments);
		};
	};

	var LazyRender = {
		getElementsByClassName: function (cls) {
			if (doc.getElementsByName) {
				return doc.getElementsByClassName(cls);
			}

			var allTags = doc.getElementsByTagName('*'),
			    aCls = [],
			    reg = new RegExp('\\b' + cls + '\\b', 'i');
			for (var i = 0, tmp, len = allTags.length; i < len; i++) {
				(tmp = allTags[i]) && reg.test(tmp.className) && aCls.push(tmp);
			}

			return aCls;
		},
		addEvent: function (ele, type, fn) {
			ele.addEventListener ? ele.addEventListener(type, fn, false) : ele.attachEvent('on' + type, fn);
		},
		removeEvent: function (ele, type, fn) {
			ele.removeEventListener ? ele.removeEventListener(type, fn, false) : ele.detachEvent('on' + type, fn);
		},
		getPos: function (ele) {
			var pos = {
				x: 0,
				y: 0
			};
			while (ele.offsetParent) {
				pos.x += ele.offsetLeft;
				pos.y += ele.offsetTop;
				ele = ele.offsetParent;
			}

			return pos;
		},
		getViewport: function () {
			var html = doc.documentElement;

			return {
				width: !win.innerWidth ? html.clientWidth : win.innerWidth,
				height: !win.innerHeight ? html.clientHeight : win.innerHeight
			};
		},
		getScrollHeight: function () {
			var html = doc.documentElement,
				bd = doc.body;
			return Math.max(win.pageYOffset || 0, html.scrollTop, bd.scrollTop);
		},
		getEleSize: function (ele) {
			return {
				width: ele.offsetWidth,
				height: ele.offsetHeight
			};
		},

		render: {
			threshold: 0,	// {Number} 阀值，预加载高度，单位px
			eles: null,		// {Array} 需延迟加载的元素集合
			fn: null,		// {Function} scroll、resize、touchmove 所绑定的方法，等价于 pollTextareas()

			evalScripts: function (code) {
				var head = doc.getElementsByTagName('head')[0],
					script = doc.createElement('script');

				script.type = 'text/javascript';
				script.text = code;
				head.appendChild(script);
			},
			evalStyles: function (code) {
				var head = doc.getElementsByTagName('head')[0],
					style = doc.createElement('style');

				style.type = 'text/css';
				try {
					style.appendChild(doc.createTextNode(code));
				} catch (e) {
					style.styleSheets.cssText = code;
				}
				head.appendChild(style);
			},
			extractCode: function (str, isStyle) {
				var cata = isStyle ? 'style' : 'script',
					scriptFragment = '<' + cata + '[^>]*>([\\S\\s]*?)</' + cata + '\\s*>',		// 匹配style或script中的代码块
					matchAll = new RegExp(scriptFragment, 'img'),
					matchOne = new RegExp(scriptFragment, 'im'),
					matchResults = str.match(matchAll) || [],
					ret = [];

				for (var i = 0, len = matchResults.length; i < len; i++) {
					var temp = (matchResults[i].match(matchOne)) || ['', ''][1];
					if (temp) {
						ret.push(temp);
					}
				}

				return ret;
			},
			decodeHTML: function (str) {
				return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');	// 替换html代码中转义的'<>&'符号
			},
			insert: function (ele) {
				var parent = ele.parentNode,
					txt = this.decodeHTML(ele.innerHTML),
					matchStyles = this.extractCode(txt, true),
					matchScripts = this.extractCode(txt);

				parent.innerHTML = txt.replace(new RegExp('<script[^>]*>([\\S\\s]*?)</script\\s*>', 'img'), '')
									.replace(new RegExp('<style[^>]*>([\\S\\s]*?)</style\\s*>', 'img'), '');

				if (matchStyles.length) {
					for (var i = matchStyles.length; i--; ) {	// i此时会等于matchStyles.length - 1; 并且在等于0的时候停止循环
						this.evalStyles(matchStyles[i]);
					}
				}

				// 延迟时可设置loading效果
				parent.className = parent.className.replace('loading', '');

				if (matchScripts.length) {
					for (var i = 0, len = matchScripts.length; i < len; i++) {
						this.evalScripts(matchScripts[i]);
					}
				}
			},
			inView: function (ele) {
				var top = LazyRender.getPos(ele).y,
					viewVal = LazyRender.getViewport().height,
					scrollVal = LazyRender.getScrollHeight(),
					eleHeight = LazyRender.getEleSize(ele).height;

				if (top >= scrollVal - eleHeight - this.threshold && top <= scrollVal + viewVal + this.threshold) {
					return true;
				}

				return false;
			},
			pollTextareas: function () {
				// 若延迟加载元素全部加载完
				if (!this.eles.length) {
					LazyRender.removeEvent(win, 'scroll', this.fn);
					LazyRender.removeEvent(win, 'resize', this.fn);
					LazyRender.removeEvent(doc.body, 'touchMove', this.fn);
					return;
				}

				// 判断是否需要加载
				for (var i = this.eles.length; i--; ) {
					var ele = this.eles[i];

					if (!this.inView(ele))
						continue;

					this.insert(ele);
					this.eles.splice(i, 1);
				}
			},
			init: function (config) {
				var cls = config.cls;
				this.threshold = config.threshold || 0;

				this.eles = Array.prototype.slice.call(LazyRender.getElementsByClassName(cls));
				this.fn = this.pollTextareas.bind(this);

				this.fn();
				LazyRender.addEvent(win, 'scroll', this.fn);
				LazyRender.addEvent(win, 'resize', this.fn);
				LazyRender.addEvent(doc.body, 'touchMove', this.fn);
			}
		}
	};

	win['LazyRender'] = LazyRender;
})(window, document)