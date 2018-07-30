$(document).ready(function () {


    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});

    if (rolesId.indexOf(3) != -1||rolesId.indexOf(1)!=-1) {
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
        var systemName = sessionStorage.getItem('systemName');
        $("input[ name = 'system']").val(systemName);
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
        if(sessionStorage.getItem('systemId')==1){
            var obj = {
                "year": '',
                "date": '',
                "address": '',
                "system.id": sessionStorage.getItem("systemId"),
                "testWeight.a": 40,
                "testWeight.b": 30,
                "testWeight.c": 30,
                "testWeight.d": 40,
                "testWeight.e": 30,
                "testWeight.f": 30,
                "ids": ""
            };
        }else {
            var obj = {
                "year": '',
                "date": '',
                "address": '',
                "system.id": sessionStorage.getItem("systemId"),
                "testWeight.g": 60,
                "testWeight.h": 40,
                "ids": ""
            };
        }
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

    //两个权重设置修改模态框提交按钮
    $("#testWeight2_btn").click(function () {
        var testWeight={
            "id":"",
            "g":"",
            "h":""
        };
        testWeight.id=$("input[name='id2']").val();
        testWeight.g=$("input[name='g']").val();
        testWeight.h=$("input[name='h']").val();
        var sum=parseInt(testWeight.g) + parseInt(testWeight.h);
        if (sum!= 100) {
            alert("请确保权重之和为100")
        }else {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/testweight/update',
                data: testWeight,
                async: false,
                traditional: true,
                success:function () {
                    alert("修改成功");
                    location.reload()
                }
            });
        }

    });
    $("#testWeight_btn").click(function () {
        var testWeight={
            "id":"",
            "a":"",
            "b":"",
            "c":"",
            "d":"",
            "e":"",
            "f":""
        };
        testWeight.id=$("input[name='id']").val();
        testWeight.a=$("input[name='a']").val();
        testWeight.b=$("input[name='b']").val();
        testWeight.c=$("input[name='c']").val();
        testWeight.d=$("input[name='d']").val();
        testWeight.e=$("input[name='e']").val();
        testWeight.f=$("input[name='f']").val();
        var sum1=parseInt(testWeight.a) + parseInt(testWeight.b)+parseInt(testWeight.c);
        var sum2=parseInt(testWeight.d) + parseInt(testWeight.e)+parseInt(testWeight.f);
        if (sum1!= 100||sum2!=100) {
            alert("请确保权重之和为100")
        }else {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/testweight/update',
                data: testWeight,
                async: false,
                traditional: true,
                success:function () {
                    alert("修改成功");
                    location.reload()
                }
            });
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

//设置table每列标题
    $('#demo-custom-toolbar1').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [{
            field: 'checked',
            checkbox: true
        }, {
            field: 'year',
            align: 'center',
            title: '考评年度'
        }, {
            field: 'system.systemName',
            align: 'center',
            title: '所属体系'
        }
            , {
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
                field: 'testWeight',
                align: 'center',
                title: '权重设置',
                formatter: 'test_weight'

            }, {
                field: 'state',
                align: 'center',
                title: '状态',
                formatter: 'statusFormatter'
            }

        ]
    })


});

//权重设置权限判断
function test_weight(value, row) {
    value=JSON.stringify(value);
    if (row.system.id == 1) {
        if (rolesId.indexOf(1)!=-1){
            return "<a onclick='testWeightTable("+value+")' class='btn-link' data-toggle='modal' data-target='#testWeight' style='cursor:default'>" + "权重设置" + "</a>";
        }else {
            return "<a onclick='testWeightTable2("+value+")' class='btn-link' data-toggle='modal' data-target='#testWeight' style='cursor:default'>" + "权重设置" + "</a>";
        }
    }else {
        if(row.system.id==sessionStorage.getItem('systemId')&&rolesId.indexOf(3)!=-1){
            return "<a onclick='testWeightTable3("+value+")' class='btn-link' data-toggle='modal' data-target='#testWeight2' style='cursor:default'>" + "权重设置" + "</a>";
        }else {
            return "<a onclick='testWeightTable4("+value+")' class='btn-link' data-toggle='modal' data-target='#testWeight2' style='cursor:default'>" + "权重设置" + "</a>";
        }
    }
}

//四种权重设置的权限
function testWeightTable(value) {
    $("input[name='id']").val(value.id);
    $("input[name='a']").val(value.a);
    $("input[name='b']").val(value.b);
    $("input[name='c']").val(value.c);
    $("input[name='d']").val(value.d);
    $("input[name='e']").val(value.e);
    $("input[name='f']").val(value.f);

}
function testWeightTable2(value) {
    $("input[name='a'],input[name='b'],input[name='c'],input[name='d'],input[name='e'],input[name='f']").attr("disabled","disabled");
    $("input[name='a']").val(value.a);
    $("input[name='b']").val(value.b);
    $("input[name='c']").val(value.c);
    $("input[name='d']").val(value.d);
    $("input[name='e']").val(value.e);
    $("input[name='f']").val(value.f);
    $("#testWeight_btn").css('display','none')
}
function testWeightTable3(value) {
    $("input[name='id2']").val(value.id)
    $("input[name='g']").val(value.g);
    $("input[name='h']").val(value.h);
}
function testWeightTable4(value) {
    $("input[name='g'],input[name='h']").attr("disabled","disabled");
    $("input[name='g']").val(value.g);
    $("input[name='h']").val(value.h);
    $("#testWeight2_btn").css('display','none')
}


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