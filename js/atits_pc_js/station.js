$(document).ready(function () {

    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});

//判断用户角色，添加添加、删除按钮
    if (rolesId.indexOf(3) != -1 || rolesId.indexOf(4) != -1) {
        $('#row1').html("<button id=\"add_btn\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><i class=\"demo-pli-plus\"></i>添加</button>\n" +
            "                            <button onclick=\"delete1()\" data-toggle=\"modal\" data-target=\"#delete_modal\" class=\"btn btn-danger\"><i class=\"demo-pli-cross\"></i>删除</button>")
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
            stas = result.data.stations;
            for (var i = 0; i < stas.length; i++) {
                stas[i].station.zr=stas[i].zr[0];
                stas[i]=stas[i].station
            }
        }
    });

//设置表格每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: stas,
        columns: [{
            checkbox: true
        }, {
            field: 'system',
            align: 'center',
            title: '所属体系',
            formatter:function (value, row, index) {
                return value.systemName
            }
        }, {
            field: 'staName',
            align: 'center',
            title: '名称',
            formatter: 'detail'
        }, {
            field: 'zr',
            align: 'center',
            title: '实验站站长'
        }, {
            field: 'company',
            align: 'center',
            title: '建设依托单位'
        }, {
            field: 'state',
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
            "content": ""
        };
        station.staName = $("input[ name = 'staName']").val();
        if (station.staName == "") {
            alert("研究室名称不能为空")
        } else {
            station.company = $("input[ name = 'company']").val();
            station["system.id"] = sessionStorage.getItem('systemId');
            station.content = $('#content').val();
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/station/save',
                data: station,
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload();
                }
            });
        }
    });

//发送删除数据
    $('#delete_btn').click(function () {
        if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
            $("#delete_modal").modal('hide')
        } else {
            var a = $("#demo-custom-toolbar").bootstrapTable('getSelections');
            var idList = [];
            for (var i = 0; i < a.length; i++) {
                idList[i] = a[i].id;
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
        }
    })

});

//激活研究室
function state(value, row) {
    if (value == 1) {
        return "<div class='label label-table label-success'>已激活</div>";
    } else {
        if (rolesId.indexOf(1) != -1) {
            return "<div class='label label-table label-warning'> <a onclick='updateState(" + row.id + ")' data-toggle=\"modal\" data-target=\"#updateState\" style='color: white; cursor:default'>未激活</a></div>";
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
    return '<a href="station_detail.html?staId=' + row.id + '">' + value + '</a>'
}

//判断有没有选中需删除的项
function delete1() {
    if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
        $("#delete_h3").text("请至少选择一条");
    } else {
        $("#delete_h3").text("是否删除");
    }
}

















