$(document).ready(function () {
    var id = parseInt(getQueryVariable('id'));
    var harvest;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/harvest/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            harvest = result.data.harvest;
        }
    });
    //向页面写入详细数据
    $('#title').text(harvest.title);
    $('#systemName').text(harvest.system.systemName);
    $('#date').text(harvest.date);
    $('#content').html(harvest.content);
    $('#userName').html(harvest.user.profile.name);
    var files = harvest.files;

    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + harvest.files[i].path + harvest.files[i].name + "' download='" + harvest.files[i].title + "'>" + harvest.files[i].title + "</a></small><br>"
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