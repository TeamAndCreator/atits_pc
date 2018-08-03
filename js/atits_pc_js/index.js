

//实现插件 + 实现轮播图功能


(function($){
    //实现轮播功能
    function Slider(ele,opt){
        var d = {
            curDisplay : 0,
            autoPlay : true,
            interval : 2000
        };  //默认值
        this.opt = $.extend({},d,opt);//合并默认值和传进来的值，挂在全局上
        this.wrap = ele;
        this.curDisplay = this.opt.curDisplay;
        this.interval = this.opt.interval;
        this.autoPlay = this.opt.autoPlay;
        this.nowIndex = this.opt.curDisplay;
        this.timer = null;
        this.$img = this.wrap.find('img');
        this.imgLen = this.$img.length;
        this.nowIndex = 0;
        this.switch = true;
        this.init();
    }


    Slider.prototype.init = function(){
        var self = this;
        self.initMove();
        self.bindEvent();
    },

        Slider.prototype.initMove = function(){
            var self= this;
            var hLen = Math.floor(self.imgLen / 2);
            var lNum,rNum;
            for(var i=0; i <hLen ; i ++){
                lNum = self.curDisplay - i - 1;
                self.$img.eq(lNum).css({
                    transform :'translateX('+(-150)*(i + 1) +'px) translateZ('+ (200 - i * 100)+'px) rotateY(30deg)'
                })
                rNum = self.curDisplay - i + 1;
                if(rNum > self.imgLen - 1){
                    rNum -= this.imgLen;
                }
                self.$img.eq(rNum).css({
                    transform :'translateX('+ (150)*(i + 1) +'px) translateZ('+ (200 - i * 100)+'px) rotateY(-30deg)'
                });
                this.$img.removeClass('on');
            }
            self.$img.eq(self.curDisplay).css({
                transform : 'translateZ(300px)'
            }).addClass('on');
            this.wrap.on('transition',function(){
                self.switch = true;
            })

        },

        Slider.prototype.bindEvent = function(){
            var self= this;
            self.$img.on('click',function(e){

                if(self.switch && !$(this).hasClass('on')){
                    self.switch = false;
                    self.nowIndex = $(this).index();
                    self.moving(self.nowIndex);
                }

            }).hover(function(){
                clearInterval(self.timer);
            },function(){
                self.timer = setInterval(function(){
                    self.play();
                },self.interval);
            });
            this.timer = setInterval(function(){
                self.play();
            },this.interval)
        },


        //自动播放
        Slider.prototype.play = function()   {
            if(this.autoPlay){
                if(this.nowIndex == this.imgLen -1){
                    this.nowIndex =0;
                }else{
                    this.nowIndex ++;
                }
                this.moving(this.nowIndex);
            }
        },

        Slider.prototype.moving = function(index)   {
            this.curDisplay = index;
            this.initMove();

        },
        //扩展插件
        $.fn.extend({
            slider : function(options){
                new Slider(this,options);
            }
        })



    $('article').readmore({
        maxHeight: 308
    });

})(jQuery)


