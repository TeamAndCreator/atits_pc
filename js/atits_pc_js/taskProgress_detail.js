$(document).ready(function () {
    var id=parseInt(getQueryVariable('id'));
    var taskProgress;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/taskProgress/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            taskProgress=result.data.taskProgress;
        }
    });

    $('#title').text(taskProgress.title);
    $('#subTask').html("<a href='subTask_detail.html?id="+taskProgress.subTask.id+"'>"+taskProgress.subTask.title+"</a>");
    $('#user').text(taskProgress.subTask.bearer.profile.name);
    $('#date').text(taskProgress.date);
    $('#content').html(taskProgress.content);
    var files=taskProgress.files;
    var html="";
    for (var i=0;i<files.length;i++){
        html+="<small><a href='"+vr_path+"/"+taskProgress.files[i].path+taskProgress.files[i].name+"' download='"+taskProgress.files[i].title+"'>"+taskProgress.files[i].title+"</a></small><br>"
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








