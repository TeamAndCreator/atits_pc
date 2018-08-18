

//实现插件 + 实现轮播图功能


(function($){
     //轮播图
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
    


// 通知公告 ----- 根据不同角色，获取不同数据
if (sessionStorage.getItem("systemId") == 1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/notice/findForTXB",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,      
        success: function (result) {
            var notices = result.data.notices;
            $.each(notices, function(index, notice) {
                var liEle =' <li class=" list-group-item"  ><a href="javascript:void(0)" onclick="noticeDetail('+notice.id+')" class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + notice.title +'</a> <span class="pull-right"> '+ notice.date + '</span></li>'
                $(liEle).appendTo("#notice");
            });
        }

    });
} else if (rolesId.indexOf(3) != -1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/notice/findForSX",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var notices = result.data.notices;
            $.each(notices, function(index, notice) {
                var liEle =' <li class="list-group-item "><a href="javascript:void(0)" onclick="noticeDetail('+notice.id+')" class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + notice.title +'</a> <span class="pull-right"> '+ notice.date + '</span></li>'
                $(liEle).appendTo("#notice");
            });
        }

    });
} else {
    $.ajax({
        crossDomain: true,
        url: param + "/notice/findFor",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var notices = result.data.notices;
            $.each(notices, function(index, notice) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="noticeDetail('+notice.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + notice.title +'</a> <span class="pull-right"> '+ notice.date + '</span></li>'
                $(liEle).appendTo("#notice");
            });
        }

    });
}
// 体系动态 ----- 根据不同角色，获取不同数据
if (sessionStorage.getItem("systemId") == 1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/dynamic/findForTXB",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,      
        success: function (result) {
            var dynamics = result.data.dynamics;
            $.each(dynamics, function(index, dynamic) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="dynamicDetail('+dynamic.id+')" class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + dynamic.title +'</a> <span class="pull-right"> '+ dynamic.date + '</span></li>'
                $(liEle).appendTo("#dynamic");
            });
        }

    });
} else if (rolesId.indexOf(3) != -1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/dynamic/findForSX",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var dynamics = result.data.dynamics;
            $.each(dynamics, function(index, dynamic) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="dynamicDetail('+dynamic.id+')" class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + dynamic.title +'</a> <span class="pull-right"> '+ dynamic.date + '</span></li>'
                $(liEle).appendTo("#dynamic");
            });
        }

    });
} else {
    $.ajax({
        crossDomain: true,
        url: param + "/dynamic/findFor",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var dynamics = result.data.dynamics;
            $.each(dynamics, function(index, dynamic) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="dynamicDetail('+dynamic.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + dynamic.title +'</a> <span class="pull-right"> '+ dynamic.date + '</span></li>'
                $(liEle).appendTo("#dynamic");
            });
        }

    });
}
// 重大活动 ----- 根据不同角色，获取不同数据
if (sessionStorage.getItem("systemId") == 1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/activity/findForTXB",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,      
        success: function (result) {
            var activities = result.data.activities;
            $.each(activities, function(index, activity) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="activityDetail('+activity.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + activity.title +'</a> <span class="pull-right"> '+ activity.date + '</span></li>'
                $(liEle).appendTo("#activity");
            });
        }

    });
} else if (rolesId.indexOf(3) != -1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/activity/findForSX",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
          var activities = result.data.activities;
          $.each(activities, function(index, activity) {
            var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="activityDetail('+activity.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + activity.title +'</a> <span class="pull-right"> '+ activity.date + '</span></li>'
            $(liEle).appendTo("#activity");
          });
        }

    });
} else {
    $.ajax({
        crossDomain: true,
        url: param + "/activity/findFor",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
          var activities = result.data.activities;
          $.each(activities, function(index, activity) {
            var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="activityDetail('+activity.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + activity.title +'</a> <span class="pull-right"> '+ activity.date + '</span></li>'
            $(liEle).appendTo("#activity");
          });
        }

    });
}

//规章制度
if (sessionStorage.getItem("systemId") == 1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/regulation/findForTXB",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,      
        success: function (result) {
            var regulations = result.data.others;
            $.each(regulations , function(index, regulation) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="regulationDetail('+regulation.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + regulation.title +'</a> <span class="pull-right"> '+ regulation.date + '</span></li>'
                $(liEle).appendTo("#regulation");
            });
        }

    });
} else if (rolesId.indexOf(3) != -1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/regulation/findForSX",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var regulations = result.data.others;
            $.each(regulations , function(index, regulation) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="regulationDetail('+regulation.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + regulation.title +'</a> <span class="pull-right"> '+ regulation.date + '</span></li>'
                $(liEle).appendTo("#regulation");
            });
        }

    });
} else {
    $.ajax({
        crossDomain: true,
        url: param + "/regulation/findFor",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
          var regulations = result.data.others;
          $.each(regulations , function(index, regulation) {
            var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="regulationDetail('+regulation.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + regulation.title +'</a> <span class="pull-right"> '+ regulation.date + '</span></li>'
            $(liEle).appendTo("#regulation");
        });
        }

    });
}

//重大成果
if (sessionStorage.getItem("systemId") == 1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/harvest/findForTXB",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,      
        success: function (result) {
            var harvests = result.data.harvests;
            $.each(harvests , function(index, harvest) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="harvestDetail('+harvest.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + harvest.title +'</a> <span class="pull-right"> '+ harvest.date + '</span></li>'
                $(liEle).appendTo("#harvest");
            });
        }

    });
} else if (rolesId.indexOf(3) != -1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/harvest/findForSX",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var harvests = result.data.harvests;
            $.each(harvests , function(index, harvest) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="harvestDetail('+harvest.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + harvest.title +'</a> <span class="pull-right"> '+ harvest.date + '</span></li>'
                $(liEle).appendTo("#harvest");
            });
        }

    });
} else {
    $.ajax({
        crossDomain: true,
        url: param + "/harvest/findFor",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var harvests = result.data.harvests;
            $.each(harvests , function(index, harvest) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="harvestDetail('+harvest.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + harvest.title +'</a> <span class="pull-right"> '+ harvest.date + '</span></li>'
                $(liEle).appendTo("#harvest");
            });
        }

    });
}

//重大文件报告
if (sessionStorage.getItem("systemId") == 1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/report/findForTXB",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,      
        success: function (result) {
            var reports = result.data.reports;
            $.each(reports , function(index, report) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="reportDetail('+report.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + report.title +'</a> <span class="pull-right"> '+ report.date + '</span></li>'
                $(liEle).appendTo("#report");
            });
        }

    });
} else if (rolesId.indexOf(3) != -1) {
    $.ajax({
        crossDomain: true,
        url: ipValue + "/report/findForSX",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var reports = result.data.reports;
            $.each(reports , function(index, report) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="reportDetail('+report.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + report.title +'</a> <span class="pull-right"> '+ report.date + '</span></li>'
                $(liEle).appendTo("#report");
            });
        }

    });
} else {
    $.ajax({
        crossDomain: true,
        url: param + "/report/findFor",
        dataType: "json",
        data:{"systemId":sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            var reports = result.data.reports;
            $.each(reports , function(index, report) {
                var liEle =' <li class="list-group-item "  ><a href="javascript:void(0)" onclick="reportDetail('+report.id+')"  class="right" style="display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#758697 ">' + report.title +'</a> <span class="pull-right"> '+ report.date + '</span></li>'
                $(liEle).appendTo("#report");
            });
        }

    });
}


//阅读更多
 $('article').readmore({
    maxHeight: 220,
    speed: 700,
    moreLink: '<a HREF="#" style="text-align: center;color:#CC0033;font-size: larger">▼阅读更多</a>',
    lessLink: '<a HREF="#" style="text-align: center;color:#CC0033;font-size: larger">▲收起</a>',
    heightMargin: 16,
});


//实现分页

     
    


})(jQuery)

//通知公告
function noticeDetail(notice_id){
     sessionStorage.setItem("notice_id",notice_id)
     window.open('././notice_detail.html')
}

//重大活动
function activityDetail(activity_id){
    sessionStorage.setItem("activity_id",activity_id)
    window.open('././activity_detail.html')
}
//体系动态
function dynamicDetail(dynamic_id){
    sessionStorage.setItem("dynamic_id",dynamic_id)
    window.open('././dynamic_detail.html')
}
//规章制度
function regulationDetail(regulation_id){
    sessionStorage.setItem("regulation_id",regulation_id)
    window.open('././regulation_detail.html')
}

//重大成果
function harvestDetail(harvest_id){
   sessionStorage.setItem("harvest_id",harvest_id)
   window.open('././harvest_detail.html')
}
//重大文件报告
function reportDetail(report_id){
   sessionStorage.setItem("report_id",report_id)
   window.open('././report_detail.html')
}