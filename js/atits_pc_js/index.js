

//实现插件 + 实现轮播图功能


(function($){

    function slider(ele, option) {
        this.default = {
            curDisplay: 0,
            autoPlay: false,
            interval: 1500
        }
        this.opts = $.extend({}, this.default, option);
        this.wrap = ele;
        this.curDisplay = this.opts.curDisplay;
        this.autoPlay = this.opts.autoPlay;
        this.nowIndex = this.opts.curDisplay;
        this.interval = this.opts.interval;
        this.timer = null;
        this.$img = this.wrap.find('li');
        this.imgLen = this.$img.length;
        this.switch = true;
        this.init();
    }
    slider.prototype.init = function () {
        var self = this;
        self.initalCarousel();
        self.bindEvent();
    };
    slider.prototype.initalCarousel = function () {
        var self = this;
        var hLen = Math.floor(self.imgLen / 2);
        var lNum, rNum;
        for (var i = 0; i < hLen; i++) {
            lNum = self.curDisplay - i - 1;
            self.$img.eq(lNum).css({
                transform: 'translateX(' + (- 150 * (i + 1)) + 'px) translateZ(' + (100 - i * 50) + 'px) rotateY(30deg)'
            })
            rNum = self.curDisplay + i + 1;
            if (rNum > self.imgLen - 1) {
                rNum -= this.imgLen;
            }
            self.$img.eq(rNum).css({
                transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (100 - i * 50) + 'px) rotateY(-30deg)'
            });
            this.$img.removeClass('on');
        }
        self.$img.eq(self.curDisplay).css({
            transform: 'translateZ(300px)'
        }).addClass('on');
        this.wrap.on('transition', function () {
            self.switch = true;
        })
    };
    slider.prototype.bindEvent = function () {
        var self = this;
        self.$img.on('click', function (e) {
            if (self.switch && !$(this).hasClass('on')) {
                self.switch = false;
                self.nowIndex = $(this).index();
                self.moving(self.nowIndex);
            }
        }).hover(function () {
            clearInterval(self.timer);
        }, function () {
            self.timer = setInterval(function () {
                self.play();
            }, self.interval);
        });
        this.timer = setInterval(function () {
            self.play();
        }, this.interval);
    }
    slider.prototype.play = function () {
        if (this.autoPlay) {
            if (this.nowIndex == this.imgLen - 1) {
                this.nowIndex = 0;
            } else {
                this.nowIndex++;
            }
            this.moving(this.nowIndex);
        }
    };
    slider.prototype.moving = function (index) {
        this.curDisplay = index;
        this.initalCarousel();
    }
    $.fn.extend({
        slider: function (options) {
            new slider(this, options);
        }
    })
    
// 获取体系动态
    $.ajax({
        url: 'http://47.104.26.79:8080/atits_service/dynamic/findAll1',
        type: 'get',
        dataType: 'json',
        success: function(result) {
            //console.log(result);
            var dynamics = result.data.dynamics;
            var eleStr = '';
            $.each(dynamics, function(index, dynamic) {               
                eleStr +=  ' <li class="news-item "><a href="#" class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + dynamic.title +'</a><span class="pull-right">'+ dynamic.date + '</span></li>'
                $(eleStr).appendTo("#dynamic");
            
            });
        }
    });
//获取通知公告
$.ajax({
    url: 'http://47.104.26.79:8080/atits_service/notice/findAll1',
    type: 'get',
    dataType: 'json',
    success: function(result) {
        //console.log(result);
        var notices = result.data.notices;
        var eleStr = '';
        $.each(notices, function(index, notice) {
            eleStr +=  ' <li class="news-item "  > <a href="#"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 " >' + notice.title + '</a> <span class="pull-right" >'  +notice.date + ' </span></li>'
            $(eleStr).appendTo("#notice");
            console.log(eleStr)
        });
    }
});
//获取重大活动
var activityId = [];

$.ajax({
        url: 'http://47.104.26.79:8080/atits_service/activity/findAll1',
        type: 'get',
        dataType: 'json',
        success: function(result) {
            var activitys = result.data.activitys;
            var eleStr = '';
            console.log(result);
            $.each(activitys, function(index, activity) {
                eleStr +=  ' <li class="news-item "  ><a href="#"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + activity.title +'</a> <span class="pull-right"> '+ activity.date + '</span></li>'
                $(eleStr).appendTo("#activity");
                activityId.push(activity.id);               
            });
        }
    });
console.log(activityId);


 $('article').readmore({
    maxHeight: 220,
    speed: 700,
    moreLink: '<a HREF="#" style="text-align: center;color:#CC0033;font-size: larger">▼阅读更多</a>',
    lessLink: '<a HREF="#" style="text-align: center;color:#CC0033;font-size: larger">▲收起</a>',
    heightMargin: 16,
});

})(jQuery)


