$(document).ready(function () {
    if (rolesId.indexOf(1) != -1)
        $("#row1").html("<button id=\"demo-delete-row1\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><i class=\"demo-pli-plus\"></i>用户注册</button>");
    var users;
//获取本体系人员名单
    $.ajax({
        crossDomain: true,
        url: ipValue + "/user/findUsersBySystemId",
        dataType: "json",
        data: {"systemId": sessionStorage.getItem('systemId')},
        type: "get",
        async: false,
        success: function (result) {
            users = result.data.users;
        }
    });
//设置表格标题
    $('#users').bootstrapTable({
        idField: 'id',
        data: users,
        editable: true,
        columns: [
            {
                field: 'profile',
                align: 'center',
                title: '姓名',
                sortable: 'true',
                formatter: 'name'
            }, {
                field: 'system',
                align: 'center',
                title: '所属体系',
                sortable: 'true',
                formatter: 'system'
            }, {
                field: 'roles',
                align: 'center',
                title: '岗位',
                sortable: 'true',
                formatter: 'roles'
            }, {
                field: 'state',
                align: 'center',
                title: '状态',
                sortable: 'true',
                formatter: 'state'
            }
        ]
    });

//密码二次输入验证
    $("#password_confirm").blur(function () {
        var password = $("#password").val();
        var confirm_password = $("#password_confirm").val();
        if (confirm_password == password) {
            if (password.length != 0) {
                $("#tip").html("<font color=\"#87b87f\" size=\"2\"> 合格 </font>");
            } else {
                $("#tip").html("<font color=\"red\" size=\"2\"> 密码不能为空 </font>");
            }
        } else {
            $("#tip").html("<font color=\"red\" size=\"2\"> 两次输入密码不一致 </font>")
        }
    });
    $("#password").blur(function () {
        var password = $("#password").val();
        var confirm_password = $("#password_confirm").val();
        if (confirm_password == password) {
            if (password.length != 0)
                $("#tip").html("<font color=\"#87b87f\" size=\"2\"> 合格 </font>");
            else
                $("#tip").html("<font color=\"red\" size=\"2\"> 密码不能为空 </font>");
        }
        else
            $("#tip").html("<font color=\"red\" size=\"2\"> 两次输入密码不一致 </font>")

    });


//发送注册请求
    $('#add_btn').click(function () {
            var password = $("#password").val();
            var confirm_password = $("#password_confirm").val();
            var account = $("#account").val();
            if (account.length == 0) {
                alert("账号不能为空")
            } else if (password.length == 0) {
                alert("密码不能为空")
            } else if (confirm_password != password) {
                alert("两次密码输入不一致")
            } else {
                var user = {
                    "profile.name": $("#name").val(),
                    "userName": $("#account").val(),
                    "password": $("#password").val()
                };
                var roleIdList = [2];
                user["roleIdList"] = roleIdList;
                $.ajax({
                    type: 'post',
                    dataType: 'JSON',
                    url: ipValue + '/user/save',
                    data: user,
                    async: false,
                    traditional: true,
                    success: function () {
                        window.location.reload()
                    }
                });
            }
        }
    )


})
;

//设置岗位列
function roles(value, row) {
    var i;
    var str = "";
    for (i = 0; i < value.length; i++) {
        if (i != (value.length - 1)) {
            str += value[i].description + ","
        } else {
            str += value[i].description;
        }
    }
    return str;
}

//设置体系列
function system(value, row) {
    if (value != null) {
        return value.systemName;
    } else {
        return "外聘人员";
    }
}

//设置状态
function state(value, row) {
    if (value == 1) {
        return "<div class='label label-table label-success'>已激活</div>"
    } else {
        return "<div class='label label-table label-warning'><a onclick='updateState(" + row.id + ")' data-toggle=\"modal\" data-target=\"#updateState\" style='color: white; cursor:default'>未激活</a></div>"
    }
}

//激活账号
function updateState(userId) {
    $('#updateState_btn').click(function () {
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/user/updateState',
            data: {_method: "put", "userId": userId},
            async: false,
            success: function () {
                window.location.reload()
            }
        });
    })

}

//姓名超链接
function name(value, row) {
    return "<a href=personal_profile.html?id=" + row.id + ">" + value.name + "</a>"
}







