requirejs.config({
    paths: {
        jquery: '../../../js/jquery.min'
    }
});

// 方法3
requirejs(['jquery', 'backtop'], function ($, backtop) {
    // 方法3-2
    $('#backTop').backtop({
        mode: 'move'
    });

    // 方法3-1
    /*new backtop.BackTop ($('#backTop'), {
        mode: 'move'
    });*/
});

// 方法2
/*requirejs(['jquery', 'scrollto'], function ($, scrollto) {
    var scroll = new scrollto.ScrollTo();

    // 方法2-2
    $('#backTop').on('click', function () {
        scroll.move({
            'dest': '50px',
            'speed': '200'
        });
    });

    // 方法2-1
    // 在原型的move中没有使用call方法改变this指向时，需使用下面的方法
    // 调整this的指向，此时没有增加参数的判断，因此需要在new的时候添加参数，
    // 即：var scroll = new scrollto.ScrollTo({
            // 'dest': '50px',
            // 'speed': 0
        // })
    // $('#backTop').on('click', $.proxy(scroll.move, scroll));

    // 操作中发现以下
    // $('#backTop').on('click', scroll.move)和$('#backTop').on('click', function () { scroll.move(); })
    // 第二个可以正常执行。这里第二种相当于在#backTop的onclick函数中用了闭包，所以作用域不同了，
    // 而第一种相当于直接把move的方法函数传给了#backTop的onclick函数，那么其中的this指向就有问题了
});*/


// 方法1
/*requirejs(['jquery'], function ($) {
    $('#backTop').on('click', move);
    $(window).on('scroll', function () {
        checkPosition($(window).height() / 2);
    });

    checkPosition($(window).height() / 2);

    function move () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    }

    function go () {
        $('html, body').scrollTop(0);
    }

    function checkPosition(pos) {
        if ($(window).scrollTop() > pos) {
            $('#backTop').fadeIn();
        } else {
            $('#backTop').fadeOut();
        }
    }
});*/