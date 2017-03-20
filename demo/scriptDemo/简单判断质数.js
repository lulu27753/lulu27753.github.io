// 简单判断素数的方法，此方法未优化，不可判断太大的数据
// 包含a和b且都为整数，且a>1

function prime(a, b){
	var now  = [];
  	  	not = [];
  	
  	// 存取给定范围数字为数组
  	function array(min, max){
  		var arr = [];
  		for(var i = min; i <= max; i++){
  			arr.push(i);
  		};
  		return arr;
  	}
  	now = array(a, b);

  	for(var i = a; i <= b; i++){
        for(var j = 2; j < i; j++){
        	// 筛选所有合数，且不重复添加
            if(i % j == 0 ){
  	            if(not.indexOf(i) == -1){
	                not.push(i);
  	      	    }
            };
        };
    };

    // 取出数组1中不包含在数组2中的元素
  	function arrayDiff(arr1, arr2) {
    	var arr = [];
    	for(var i = 0; i < arr1.length; i++){
			if(arr2.indexOf(arr1[i]) == -1){
	        	arr.push(arr1[i]);
	    	}
    	}
    	return arr;
  	}

  	// 此处为取出除合数以外的数组，即所有质数
  	return arrayDiff(now, not);
};


// 判断单个整数是否为质数
function isPrime(a){
    if(a > 1 && a % 1 == 0) {
        var arr = [];
        for(var i = 2; i <= a/2; i++){
            if(a % i == 0){
                arr.push(i);
        }
    }    
    return arr.length ? false : true;
        } else {
        return false;
    }
};