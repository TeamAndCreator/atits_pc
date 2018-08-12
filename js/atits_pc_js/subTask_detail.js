$(document).ready(function () {
    var id=parseInt(getQueryVariable('id'));
    var subTask;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/subTask/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            subTask=result.data.subTask;
        }
    });

    $('#title').text(subTask.title);
    $('#fatherTask').html("<a href='task_detail.html?id="+subTask.fatherTask.id+"'>"+subTask.fatherTask.title+"</a>");
    $('#startDate').text(subTask.startTime);
    $('#endDate').text(subTask.endTime);
    $('#user').text(subTask.bearer.profile.name);
    $('#date').text(subTask.date);
    $('#content').html(subTask.content);
    var files=subTask.files;
    var html="";
    for (var i=0;i<files.length;i++){
        html+="<small><a href='"+vr_path+"/"+subTask.files[i].path+subTask.files[i].name+"' download='"+subTask.files[i].title+"'>"+subTask.files[i].title+"</a></small><br>"
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








