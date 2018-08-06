$(document).ready(function () {

    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});

//判断用户角色，添加添加、删除按钮
    if (rolesId.indexOf(3) != -1 || rolesId.indexOf(4) != -1) {
        $('#row1').html("<button id=\"add_btn\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><i class=\"demo-pli-plus\"></i>添加</button>\n" +
            "                            <button id=\"delete_btn\" class=\"btn btn-danger\"><i class=\"demo-pli-cross\"></i>删除</button>")
        $("input[ name = 'system']").val(sessionStorage.getItem("systemName"));
    }

//获取数据
    var stas;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/station/findAll1",
        dataType: "json",
        data: {"systemId": sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            stas = result.data.stations
        }
    });

//设置表格每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: stas,
        columns: [{
            checkbox: true
        }, {
            field: 'station.system.systemName',
            align: 'center',
            title: '所属体系'
        }, {
            field: 'station.staName',
            align: 'center',
            title: '名称',
            formatter:'detail'
        }, {
            field: 'zr',
            align: 'center',
            title: '研究室主任'
        }, {
            field: 'station.company',
            align: 'center',
            title: '建设依托单位'
        }, {
            field: 'station.time',
            align: 'center',
            title: '成立时间'
        }, {
            field: 'station.state',
            align: 'center',
            title: '状态',
            formatter: 'state'
        }
        ]
    });

//获取并发送添加数据
    $('#add').click(function () {
        var station = {
            "staName": "",
            "company": "",
            "system.id": "",
            "content":"",
            "time": ""
        }
        station.staName = $("input[ name = 'staName']").val();
        station.company = $("input[ name = 'company']").val();
        station["system.id"] = sessionStorage.getItem('systemId');
        station.time = $("input[ name = 'time']").val();
        station.content=$('#content').val();
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: ipValue + '/station/save',
            data: station,
            async: false,
            traditional: true
        });
    });

//发送删除数据
    $('#delete_btn').click(function () {
        var a = $("#demo-custom-toolbar").bootstrapTable('getSelections');
        var idList = [];
        for (var i = 0; i < a.length; i++) {
            idList[i]=a[i].station.id;
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/station/deleteByIds',
            data: {_method: "DELETE", "idList": idList},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })
    })

});

//激活研究室
function state(value, row) {
    if (value == 1) {
        return "<div class='label label-table label-success'>已激活</div>";
    } else {
        if (rolesId.indexOf(1) != -1) {
            return "<div class='label label-table label-warning'> <a onclick='updateState(" + row.station.id + ")' data-toggle=\"modal\" data-target=\"#updateState\" style='color: white; cursor:default'>未激活</a></div>";
        } else {
            return "<div class='label label-table label-warning'>未激活</div>";
        }
    }
}

function updateState(id) {
    $('#updateState_btn').click(function () {
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/station/updateState',
            data: {_method: "put", "staId": id},
            async: false,
            success: function (data) {
                window.location.reload()
            },
            error: function () {
            }
        })

    })
}

//跳转详情页
function detail(value, row) {
    return '<a href="station_detail.html?staId='+row.station.id+'">'+value+'</a>'
}



















