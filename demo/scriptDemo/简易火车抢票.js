var search = document.querySelector('#query_ticket'),
	trainInfos = document.querySelectorAll('#queryLeftTable tr'),		// 列车信息栏
	canOrder = [],
	trains = [],
	interval = 2000;		// 默认2s进行一次查询，可修改

function ticket(train, i) {
	// 1商务座 2特等座 3一等座 4二等座 5高级软卧 6软卧 7硬卧 8软座 9硬座 10无座
	// 此处为硬座, 可根据需求更改，用"||"表现不佳，故更改为单类型席别抢票
	return train[i].querySelectorAll('td')[9];
}

(function timer(){
	setTimeout(function(){
		search.click();
		for (var i = 0; i < trainInfos.length; i++) {
			/* 筛选可预订列车*/
			if(!!trainInfos[i].childNodes.length && trainInfos[i].lastChild.childNodes[0].nodeType != 3) {
				canOrder[i] = trainInfos[i];
			};
		};
		// BUG：控制台无法动态刷新
		// console.log(trainInfos);
		if(canOrder.length != 0){
			// clearTimeout(t);
			// console.log(canOrder.length);
			// 筛选指定席别有票的列车
			for (var i = 0; i < canOrder.length; i++) {
				if(ticket(canOrder, i).innerHTML != ('无' && '-')) {
					trains[i] = ticket(canOrder, i);
					trains[i].innerHTML = trains[i].innerHTML == '有' ? 9999 : trains[i].innerHTML;
				}
			};
			trains.sort(function (a, b) {
				return a < b;
			});
			// 仅对指定席别票数最多的车次点击预订
			// console.log(trains[0]);
			trains[0].parentNode.lastChild.firstChild.click();
		} else {
			timer();
		}
	}, interval);
})()