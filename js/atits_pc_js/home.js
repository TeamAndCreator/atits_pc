$(document).ready(function () {

    //轮播图
    var id = function (el) {
        return document.getElementById(el);
    },
        c = id('photo-list');
    if (c) {
        var ul = id('scroll'),
            lis = ul.getElementsByTagName('li'),
            itemCount = lis.length,
            width = lis[0].offsetWidth,
            marquee = function () {
                c.scrollLeft += 2;
                if (c.scrollLeft % width <= 1) {
                    ul.appendChild(ul.getElementsByTagName('li')[0]);
                    c.scrollLeft = 0;
                };
            },
            speed = 20;
        ul.style.width = width * itemCount + 'px';
        var timer = setInterval(marquee, speed);
        c.onmouseover = function () {
            clearInterval(timer);
        };
        c.onmouseout = function () {
            timer = setInterval(marquee, speed);
        };
    };


    //通知公告
    $.ajax({
        crossDomain: true,
        url: ipValue + "/notice/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            var notices = result.data.notices;
            $.each(notices, function (index, notice) {
                var liEle = ' <li><a href="notice_detail_2.html?id=' + notice.id +'"><span class="wz-l">' + notice.title + '</span><span class="wz-r"> ' + notice.date + '</span></a></li>';
                $(liEle).appendTo("#notice");
            });
        }

    });

    //规章制度
    $.ajax({
        crossDomain: true,
        url: ipValue + "/regulation/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            var regulations = result.data.regulations;
            $.each(regulations, function (index, regulation) {
                var liEle = ' <li><a href="regulation_detail_2.html?id=' + regulation.id + '"><span class="wz-l">' + regulation.title + '</span><span class="wz-r"> ' + regulation.date + '</span></a></li>';
                $(liEle).appendTo("#regulation");
            });
        }

    });
    //体系动态
    $.ajax({
        crossDomain: true,
        url: ipValue + "/dynamic/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            var dynamics = result.data.dynamics;    
            $.each(dynamics, function (index, dynamic) {
                var liEle = ' <li><a href="dynamic_detail_2.html?id=' + dynamic.id + '"><span class="wz-l">' + dynamic.title + '</span><span class="wz-r"> ' + dynamic.date + '</span></a></li>';
                $(liEle).appendTo("#dynamic");
            });
        }

    });

    //重大活动
    $.ajax({
        crossDomain: true,
        url: ipValue + "/activity/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            var activities = result.data.activitys;
            $.each(activities, function (index, activity) {
                var liEle = ' <li><a href="activity_detail_2.html?id=' + activity.id + '"><span class="wz-l">' + activity.title + '</span><span class="wz-r"> ' + activity.date + '</span></a></li>';
                $(liEle).appendTo("#activity");
            });
        }

    });

    //重大成果
    $.ajax({
        crossDomain: true,
        url: ipValue + "/harvest/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            var harvests = result.data.harvests;
            $.each(harvests, function (index, harvest) {
                var liEle = ' <li><a href="harvest_detail_2.html?id=' + harvest.id + '"><span class="wz-l">' + harvest.title + '</span><span class="wz-r"> ' + harvest.date + '</span></a></li>';
                $(liEle).appendTo("#harvest");
            });
        }

    });

    //重大文件报告
    $.ajax({
        crossDomain: true,
        url: ipValue + "/report/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            var reports = result.data.reports;
            
            $.each(reports, function (index, report) {
                var liEle = ' <li><a href="report_detail_2.html?id=' + report.id + '"><span class="wz-l">' + report.title + '</span><span class="wz-r"> ' + report.date + '</span></a></li>';
                $(liEle).appendTo("#report");
            });
        }

    });
    


})