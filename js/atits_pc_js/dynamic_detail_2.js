$(document).ready(function () {
    var id = parseInt(getQueryVariable('id'));
    var dynamic;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/dynamic/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            dynamic = result.data.dynamic;
        }
    });
    //向页面写入详细数据
    $('#title').text(dynamic.title);
    $('#systemName').text(dynamic.system.systemName);
    $('#date').text(dynamic.date);
    $('#content').html(dynamic.content);
    $('#userName').html(dynamic.user.profile.name);
    var files = dynamic.files;

    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + dynamic.files[i].path + dynamic.files[i].name + "' download='" + dynamic.files[i].title + "'>" + dynamic.files[i].title + "</a></small><br>"
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