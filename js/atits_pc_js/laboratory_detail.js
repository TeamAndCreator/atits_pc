$(document).ready(function () {
    var labId=parseInt(getQueryVariable('labId'));
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/laboratory/findById",
        dataType: "json",
        data: {"id": labId},
        type: "get",
        async: false,
        success: function (result) {
            data=result.data;
        }
    });
    $('#name').text(data.laboratory.labName);
    $('#company').text(data.laboratory.company);
    $('#systemName').text(data.laboratory.system.systemName);
    $('#job_expert').text(data.job_expert);
    $('#research_director').text(data.research_director);
    $('#content').html(data.laboratory.content);

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








