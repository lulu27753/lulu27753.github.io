/**
 * 双击优化布局，仅供个人学习之便
 * 适用于 @阮一峰 ES6教程 http://es6.ruanyifeng.com
 * fiddler: 替换 EXACT:http://es6.disqus.com/embed.js 为 http://www.zhaoshibo.net/mydemo/demo/scriptDemo/shitForESRYF.js
 * 
 * @Date 2016.10.20
 * @Author cnzsb
 * @Email cnzsb@foxmail.com
 */

(function () {
	const shitSidebar = document.getElementById('sidebar')
	const shitContent = document.getElementById('content')
	const shitBtt = document.getElementById('back_to_top')
	const shitEd = document.getElementById('edit')
	const shitSidebarWidth = shitSidebar.clientWidth
	const shitContentWidth = shitContent.offsetWidth
	const shitContentPL = window.getComputedStyle(shitContent, null).paddingLeft

	shitSidebar.style.transition = 'all 0.2s ease-in'
	shitContent.style.transition = 'all 0.2s ease-in'
	shitBtt.style.transition = 'all 0.2s ease-in'
	shitBtt.style.right = '40%'
	shitBtt.style.top = '97%'
	shitEd.style.display = 'none'

	document.body.addEventListener('dblclick', () => {
		if (shitSidebar.style.opacity === '0') {
			shitSidebar.style.width = shitSidebarWidth + 'px'
			shitSidebar.style.top = 0
			shitSidebar.style.opacity = 1

			shitContent.style.width = shitContentWidth + 'px'
			shitContent.style.padding = 0
			shitContent.style.marginLeft = shitContentPL
		} else {
			shitSidebar.style.width = 0
			shitSidebar.style.opacity = 0
			
			shitContent.style.margin = '0 auto'
			shitContent.style.width = '80%'
			shitContent.style.paddingLeft = '10%'
			shitContent.style.paddingRight = '10%'
		}
	}, false)
})()