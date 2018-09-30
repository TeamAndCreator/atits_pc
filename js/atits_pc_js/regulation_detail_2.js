$(document).ready(function () {
    var id = parseInt(getQueryVariable('id'));
    var regulation;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/regulation/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            regulation = result.data.regulation;
        }
    });
    //向页面写入详细数据
    $('#title').text(regulation.title);
    $('#systemName').text(regulation.system.systemName);
    $('#date').text(regulation.date);
    $('#content').html(regulation.content);
    $('#userName').html(regulation.user.profile.name);
    var files = regulation.files;

    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + regulation.files[i].path + regulation.files[i].name + "' download='" + regulation.files[i].title + "'>" + regulation.files[i].title + "</a></small><br>"
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