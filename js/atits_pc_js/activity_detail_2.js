$(document).ready(function () {
    var id = parseInt(getQueryVariable('id'));
    var activity;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/activity/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            activity = result.data.activity;
        }
    });
    //向页面写入详细数据
    $('#title').text(activity.title);
    $('#systemName').text(activity.system.systemName);
    $('#date').text(activity.date);
    $('#content').html(activity.content);
    $('#userName').html(activity.user.profile.name);
    var files = activity.files;

    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + activity.files[i].path + activity.files[i].name + "' download='" + activity.files[i].title + "'>" + activity.files[i].title + "</a></small><br>"
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