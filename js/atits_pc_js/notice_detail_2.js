$(document).ready(function () {
    var id = parseInt(getQueryVariable('id'));
    var notice;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/notice/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            notice = result.data.notice;
        }
    });
    //向页面写入详细数据
    $('#title').text(notice.title);
    $('#systemName').text(notice.system.systemName);
    $('#date').text(notice.date);
    $('#content').html(notice.content);
    $('#userName').html(notice.user.profile.name);
    var files = notice.files;

    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + notice.files[i].path + notice.files[i].name + "' download='" + notice.files[i].title + "'>" + notice.files[i].title + "</a></small><br>"
        }
        $('#a').html(html)
    }
});

//获取url参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}