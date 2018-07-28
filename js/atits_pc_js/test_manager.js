$(document).ready(function () {


    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});

    if (rolesId.indexOf(3) != -1) {
        $('#kpqd').html('<button class="btn btn-success" data-toggle="modal" id="add"\n' +
            '                                                    data-target="#demo-lg-modal">\n' +
            '                                                <i class="demo-pli-plus"></i>添加\n' +
            '                                            </button>\n' +
            '                                            <button class="btn btn-danger" id="delete"><i class="demo-pli-cross"></i>删除\n' +
            '                                            </button>');
    }
    var dataUsers;
    var externalUsers;
    //获取考评人员名单
    $('#add').click(function () {
        $.ajax({
            crossDomain: true,
            url: ipValue + "/teststart/import_persons",
            dataType: "json",
            data: {"sysId": sessionStorage.getItem("systemId")},
            type: "get",
            async: false,
            success: function (result) {
                dataUsers = result.data.users;
                createDom(dataUsers);
            }
        })
        $.ajax({
            crossDomain: true,
            url: ipValue + "/teststart/import_persons",
            dataType: "json",
            data: {"sysId": null},
            type: "get",
            async: false,
            success: function (result) {
                externalUsers = result.data.users;
                createDom2(externalUsers);
            }
        })

    })

    function createDom2(ele) {
        var htmlStr = '';
        for (i = 0; i < ele.length; i++) {
            htmlStr += '<li class="checkbox">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="' + ele[i].id + '">\n' +
                '             <label for="demo-checkbox-11"> ' + ele[i].profile.name + '</label>\n' +
                '        </li>'
        }
        $('#tabs-box-2 #menu2 ').html(htmlStr);
    }

    function createDom(ele) {
        var htmlStr = '';
        for (i = 0; i < ele.length; i++) {
            htmlStr += '<li class="checkbox">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="' + ele[i].id + '">\n' +
                '             <label for="demo-checkbox-11"> ' + ele[i].profile.name + '</label>\n' +
                '        </li>'
        }
        $('#tabs-box-1 #menu ').html(htmlStr);
    }


    //发送考评启动添加数据内容
    $("#submit1").on('click', function () {
        var obj = {
            "year": '',
            "date": '',
            "address": '',
            "ids": ""
        };
        obj.year = $("input[ name = 'year']").val();
        obj.date = $("input[ name = 'date']").val();
        obj.address = $("input[ name = 'address']").val();
        var ids = [];
        $("input[name = 'users']:checked").each(function (i) {
            ids[i] = $(this).val();
        });
        obj.ids = ids;
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: ipValue + '/teststart/save',
            data: obj,
            async: false,
            traditional: true
        });
    })


//获取考评启动表单数据
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/teststart/findAll",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            data = result.data.testStarts
        }
    })


//删除
    $('#delete').click(function () {
        var a = $("#demo-custom-toolbar1").bootstrapTable('getSelections');
        var b = [];
        for (var i = 0; i < a.length; i++) {
            b[i] = a[i].id
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/teststart/deleteByIds',
            data: {_method: "DELETE", "idList": b},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })
    })


//设置table每列标题
    $('#demo-custom-toolbar1').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [{
            field: 'checked',
            checkbox: true,
        }, {
            field: 'year',
            align: 'center',
            title: '考评年度',
        }, {
            field: 'users',
            title: '考评人员',
            formatter: 'invoiceFormatter'
        }, {
            field: 'date',
            align: 'center',
            title: '考评日期'
        }, {
            field: 'address',
            align: 'center',
            title: '考评地点',
        }, {
            field: 'state',
            align: 'center',
            title: '状态',
            formatter: 'statusFormatter'
        }

        ]
    })

});


//超链接
function invoiceFormatter(value, row) {
    value = JSON.stringify(value)
    return "<a onclick='f(" + value + ")' class='btn-link' data-toggle='modal' data-target='#users' style='cursor:default'>" + "考评人员" + '</a>';
}

//向考评人员名单上写名字
function f(users) {
    var names1 = [];
    var names2 = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].system != null) {
            names1.push(users[i].profile.name);
        } else {
            names2.push(users[i].profile.name)
        }
    }
    $('#usersName').text(names1);
    $('#External').text(names2);
}

//状态
function statusFormatter(value, row) {
    var labelColor;
    var v;
    var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
    if (value == 0) {
        v = "待启动";
        labelColor = "warning";
        if (rolesId.indexOf(3) == -1) {
            return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
        }
    } else if (value == 1) {
        v = "已启动";
        labelColor = "success";
        if (rolesId.indexOf(3) == -1) {
            return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
        }
    } else if (value == 2) {
        v = "已结束";
        labelColor = "default"
        return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
    }
    return "<div class='label label-table label-" + labelColor + "'> <a onclick='updateState(" + value + "," + row.id + ")' data-toggle=\"modal\" data-target=\"#demo-sm-modal\" style='color: white'>" + v + "</a></div>";
}

//判断状态按钮，选择调用函数
function updateState(value, id) {
    if (value == 0) {
        $('#testStart1').text("是否启动考评");
        $
        $('#testStart2').html("<button class=\"btn btn-success-basic\" onclick=\"f1(" + id + ")\">确定</button>");
    } else if (value == 1) {
        $('#testStart1').text("是否结束考评");
        $('#testStart2').html("<button class=\"btn btn-success-basic\" onclick=\"f2(" + id + ")\">确定</button>");
    }
}

//待启动变为启动
function f1(id) {
    $.ajax({
        type: 'post',
        dataType: 'JSON',
        url: ipValue + '/teststart/updateState',
        data: {_method: "put", "id": id, "state": 1},
        async: false,
        success: function (data) {
            window.location.reload()
        },
        error: function () {
        }
    })
}

//启动变为结束
function f2(id) {
    $.ajax({
        type: 'post',
        dataType: 'JSON',
        url: ipValue + '/teststart/updateState',
        data: {_method: "put", "id": id, "state": 2},
        async: false,
        success: function () {
            window.location.reload()
        }
    })
}