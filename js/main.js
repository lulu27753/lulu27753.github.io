/**
 * @authors cnzsb
 * @date    2015-12-02 16:43:20
 */

$(function () {
	var $demos = $('#content').find('a'),
		demoslen = $demos.length,
		$newest2 = $('#newest2'),
		reg = new RegExp('^demo\\/(.*)\\.html$', 'i');
		 console.log(reg.exec($demos.attr('href'))[1]);

		$demos.each (function (i) {
			var $this = $(this),
				num = demoslen - i + '. ',
				hasName = !!$this.html(),
				demoname = $this.html() || reg.exec($this.attr('href'))[1];
			// console.log(demoname);
			// num = num < 10 ? '&nbsp;&nbsp;' + num : num;

			// 给当前demo添加新窗口打开
			$this.attr('target', '_blank');


			if (hasName) {
				$this.html(num + demoname + '<br />');
				if (i === 0) {
					$newest2.attr('href', $this.attr('href'))
						.html(demoname);
				}
				return
			}

			// 筛选文件夹类的项目
			var r = new RegExp('(^.*)\\/(.*$)'),
				isFile = r.exec(demoname);
			if (isFile != null) {
				demoname = isFile[2] == 'index' ? isFile[1] : isFile[1] + '-' + isFile[2];
			}

			$this.html(num + demoname + '<br />');

			// 最近的Demo
			if (i === 0) {
				$newest2.attr('href', reg.exec($this.attr('href'))[0])
					.html(demoname);
			}
		});
});