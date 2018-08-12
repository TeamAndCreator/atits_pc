$(document).ready(function () {
    var id=parseInt(getQueryVariable('id'));
    var harvest;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/harvest/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            harvest=result.data.harvest;
        }
    });

    $('#title').text(harvest.title);
    $('#systemName').text(harvest.system.systemName);
    $('#date').text(harvest.date);
    $('#content').html(harvest.content);
    var files=harvest.files;
    var html="";
    for (var i=0;i<files.length;i++){
        html+="<small><a href='"+vr_path+"/"+harvest.files[i].path+harvest.files[i].name+"' download='"+harvest.files[i].title+"'>"+harvest.files[i].title+"</a></small><br>"
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








