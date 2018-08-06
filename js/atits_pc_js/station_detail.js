$(document).ready(function () {
    var staId=parseInt(getQueryVariable('staId'));
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/station/findById",
        dataType: "json",
        data: {"id": staId},
        type: "get",
        async: false,
        success: function (result) {
            data=result.data;
        }
    });
    $('#name').text(data.station.staName);
    $('#company').text(data.station.company);
    $('#systemName').text(data.station.system.systemName);
    $('#station_master').text(data.station_master);
    $('#content').html(data.station.content);

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