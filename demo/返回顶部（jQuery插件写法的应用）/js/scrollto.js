define(['jquery'], function ($) {
    function ScrollTo (opts) {
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
        this.$el = $('html, body');
    }

    ScrollTo.prototype.move = function (){
        // 调整this的指向，并判断是否按照传入参数执行
        // 如果没有这里的this改变，则在事件绑定时会导致this指向错误，那么需要使用$.proxy()方法调整
        ScrollTo.call(this, arguments[0]);
        var opts = this.opts;
        if ($(window).scrollTop() != parseInt(opts.dest) && !this.$el.is(':animated')) {
            console.log(1);
            this.$el.animate({
                scrollTop: opts.dest
            }, opts.speed);
        }        
    };

    ScrollTo.prototype.go = function (){
        ScrollTo.call(this, arguments[0]);
        // console.log(this);
        var dest = this.opts.dest;
        this.$el.scrollTop(dest);
    };

    ScrollTo.DEFAULTS = {
        'dest': 0,
        'speed': '800'
    }

    return {
        ScrollTo: ScrollTo
    }
});