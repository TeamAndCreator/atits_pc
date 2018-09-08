$(document).ready(function () {

    // SUMMERNOTE
    // =================================================================
    // Require Summernote
    // http://hackerwins.github.io/summernote/
    // =================================================================
    $('#demo-summernote, #demo-summernote-full-width').summernote({
        height: '230px'
    });


    // SUMMERNOTE AIR-MODE
    // =================================================================
    // Require Summernote
    // http://hackerwins.github.io/summernote/
    // =================================================================
    $('#demo-summernote-airmode').summernote({
        airMode: true
    });


    // SUMMERNOTE CLICK TO EDIT
    // =================================================================
    // Require Summernote
    // http://hackerwins.github.io/summernote/
    // =================================================================
    $('#demo-edit-text').on('click', function () {
        $('#demo-summernote-edit').summernote({focus: true});
    });


    $('#demo-save-text').on('click', function () {
        $('#demo-summernote-edit').summernote('destroy');
    });

   

    var systemId = parseInt(getQueryVariable('id'));
    var system;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/system/findById",
        dataType: "json",
        type: "get",
        async: false,
        data: {"id": systemId},
        success: function (result) {
            system = result.data.system;
            $("#content").html(system.content);
            $("#overView").html(system.overView);
            $("#system_detail_title").text(system.systemName)
        }
    });
    if ((sessionStorage.getItem("systemId") == systemId&&rolesId.indexOf(3)!=-1)||rolesId.indexOf(1)!=-1){
        $("#content_change").click(function () {
            $("#myLargeModalLabel").text("体系简介修改");
            $('#demo-summernote').summernote('code',system.content);
            $("#fix").unbind("click");
            $("#fix").click(function () {
                var content = $('#demo-summernote').summernote('code');
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: ipValue + '/system/content_change',
                    data: {_method: "put", "systemId": systemId, "content": content},
                    async: false,
                    success: function () {
                        window.location.reload();
                    }
                });
            })
        });
        $("#overView_change").click(function () {
            $("#myLargeModalLabel").text("产业概况修改");
            $('#demo-summernote').summernote('code',system.overView);
            $("#fix").unbind("click");
            $("#fix").click(function () {
                var overView = $('#demo-summernote').summernote('code');
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: ipValue + '/system/overView_change',
                    data: {_method: "put", "systemId": systemId, "overView": overView},
                    async: false,
                    success: function () {
                        window.location.reload();
                    }
                });
            })
        })
    } else {
        $("#content_change").remove();
        $("#overView_change").remove()
    }
    $.ajax({
        crossDomain: true,
        url: ipValue + "/system/findUsers",
        dataType: "json",
        type: "get",
        async: false,
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
    $.ajax({
        crossDomain: true,
        url: ipValue + "/laboratory/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        data: {"systemId": systemId},
        success: function (result) {
            var labs = result.data.laboratories;
            $('#demo-custom-toolbar').bootstrapTable({
                idField: 'id',
                data: labs,
                columns: [
                    {
                        field: 'laboratory.labName',
                        align: 'center',
                        title: '研究室名称',
                        formatter:'lab'
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
        }
    });

    $.ajax({
        crossDomain: true,
        url: ipValue + "/station/findAll1",
        dataType: "json",
        type: "get",
        async: false,
        data: {"systemId": systemId},
        success: function (result) {
            var stas = result.data.stations;
            $('#demo-custom-toolbar1').bootstrapTable({
                idField: 'id',
                data: stas,
                columns: [
                    {
                        field: 'station.staName',
                        align: 'center',
                        title: '综合实验站名称',
                        formatter:'sta'
                    }, {
                        field: 'station.company',
                        align: 'center',
                        title: '建设依托单位'
                    }, {
                        field: 'zr',
                        align: 'center',
                        title: '综合实验站站长'
                    }]
            });
        }
    });

});

function lab(value, row) {
    return "<a href='laboratory_detail.html?labId="+row.laboratory.id+"'>"+value+"</a>"
}

function sta(value, row) {
    return "<a href='station_detail.html?staId="+row.station.id+"'>"+value+"</a>"
}

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
