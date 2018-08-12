$(document).ready(function () {
    var id=parseInt(getQueryVariable('id'));
    var report;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/report/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            report=result.data.report;
        }
    });

    $('#title').text(report.title);
    $('#systemName').text(report.system.systemName);
    $('#date').text(report.date);
    $('#content').html(report.content);
    var files=report.files;
    var html="";
    for (var i=0;i<files.length;i++){
        html+="<small><a href='"+vr_path+"/"+report.files[i].path+report.files[i].name+"' download='"+report.files[i].title+"'>"+report.files[i].title+"</a></small><br>"
    }
    $('#a').html(html)
});
//获取url参数
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}








