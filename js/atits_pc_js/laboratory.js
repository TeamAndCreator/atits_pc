$(document).ready(function () {

    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});


//判断用户角色，添加添加、删除按钮
    if (rolesId.indexOf(3) != -1 || rolesId.indexOf(4) != -1) {
        $('#row1').html('<button id="add_btn" class="btn btn-success" data-toggle="modal"\n' +
            '                                    data-target="#demo-lg-modal"><i class="demo-pli-plus"></i>添加\n' +
            '                            </button>\n' +
            '                            <button onclick="delete1()" data-toggle="modal" data-target="#delete_modal" class="btn btn-danger"><i class="demo-pli-cross"></i>删除\n' +
            '                            </button>')
        $("input[ name = 'system']").val(sessionStorage.getItem("systemName"));
    }
    var labs;
//获取数据
    $.ajax({
        crossDomain: true,
        url: ipValue + "/laboratory/findAll1",
        dataType: "json",
        data: {"systemId": sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            labs = result.data.laboratories;
            for (var i = 0; i < labs.length; i++) {
                labs[i].laboratory.zr=labs[i].zr[0];
                labs[i]=labs[i].laboratory
            }
        }
    });
//设置表格每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: labs,
        columns: [{
            checkbox: true
        }, {
            field: 'system',
            align: 'center',
            title: '所属体系',
            sortable:'true',
            formatter:function (value, row, index) {
                return value.systemName
            }
        }, {
            field: 'labName',
            align: 'center',
            title: '名称',
            sortable:'true',
            formatter: 'detail'
        }, {
            field: 'zr',
            align: 'center',
            sortable:'true',
            title: '研究室主任'
        }, {
            field: 'company',
            align: 'center',
            sortable:'true',
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
        var laboratory = {
            "labName": "",
            "company": "",
            "system.id": "",
            "content": ""
        };
        laboratory.labName = $("input[ name = 'labName']").val();
        if (laboratory.labName == "") {
            alert("研究室名称不能为空")
        } else {
            laboratory.company = $("input[ name = 'company']").val();
            laboratory["system.id"] = sessionStorage.getItem('systemId');
            laboratory.content = $('#content').val();
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/laboratory/save',
                data: laboratory,
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
                idList[i] = a[i].laboratory.id;
            }
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/laboratory/deleteByIds',
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
            url: ipValue + '/laboratory/updateState',
            data: {_method: "put", "labId": id},
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
    return '<a href="laboratory_detail.html?labId=' + row.id + '">' + value + '</a>'
}

//判断有没有选中需删除的项
function delete1() {
    if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
        $("#delete_h3").text("请至少选择一条");
    } else {
        $("#delete_h3").text("是否删除");
    }
}