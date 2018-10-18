$(document).ready(function () {
    var systemId = parseInt(getQueryVariable('id'));
    var system;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/system/findById",
        dataType: "json",
        type: "get",
        data: {"id": systemId},
        success: function (result) {
            system = result.data.system;
            $("#content").html(system.content);
            $("#overView").html(system.overView);
            $("#system_detail_title").text(system.systemName)
        }
    });

    $.ajax({
        crossDomain: true,
        url: ipValue + "/system/findUsers",
        dataType: "json",
        type: "get",
        data: {"systemId": systemId},
        success: function (result) {
            if (result.data.chief != null) {
                $("#chief").html(result.data.chief.toString());
            }
            if (result.data.sub_chief != null) {
                $("#sub_chief").html(result.data.sub_chief.toString());
            }
            if (result.data.job_expert != null) {
                $("#job_expert").html(result.data.job_expert.toString());
            }
            if (result.data.research_director != null) {
                $("#research_director").html(result.data.research_director.toString());
            }
            if (result.data.station_master != null) {
                $("#station_master").html(result.data.station_master.toString())
            }
        }
    });
    var labs;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/laboratory/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        data: {"systemId": systemId},
        success: function (result) {
            labs = result.data.laboratories;
            $("#lab_number").text("共"+labs.length+"行")
        }
    });
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: labs,
        columns: [
            {
                field: 'laboratory.labName',
                align: 'center',
                title: '研究室名称'
            }, {
                field: 'laboratory.company',
                align: 'center',
                title: '建设依托单位'
            }, {
                field: 'zr',
                align: 'center',
                title: '研究室主任'
            }]
    });
    var stas;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/station/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        data: {"systemId": systemId},
        success: function (result) {
            stas = result.data.stations;
            $("#sta_number").text("共"+stas.length+"行")
        }
    });
    $('#demo-custom-toolbar1').bootstrapTable({
        idField: 'id',
        data: stas,
        columns: [
            {
                field: 'station.staName',
                align: 'center',
                title: '综合试验站名称'
            }, {
                field: 'station.company',
                align: 'center',
                title: '建设依托单位'
            }, {
                field: 'zr',
                align: 'center',
                title: '综合试验站站长'
            }]
    });



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