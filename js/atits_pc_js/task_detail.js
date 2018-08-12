$(document).ready(function () {
    var id=parseInt(getQueryVariable('id'));
    var task;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/task/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            task=result.data.task;
        }
    });

    $('#title').text(task.title);
    $('#systemName').text(task.system.systemName);
    $('#startDate').text(task.stratTime);
    $('#endDate').text(task.endTime);
    $('#user').text(task.user.profile.name);
    $('#date').text(task.date);
    $('#content').html(task.content);
    var files=task.files;
    var html="";
    for (var i=0;i<files.length;i++){
        html+="<small><a href='"+vr_path+"/"+task.files[i].path+task.files[i].name+"' download='"+task.files[i].title+"'>"+task.files[i].title+"</a></small><br>"
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








