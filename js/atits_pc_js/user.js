$(document).ready(function () {
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
                field: 'profile.name',
                align: 'center',
                title: '姓名'
            },{
                field: 'system',
                align: 'center',
                title: '所属体系',
                formatter:'system'
            },{
                field: 'roles',
                align: 'center',
                title: '岗位',
                formatter:'roles'
            },{
                field: 'state',
                align: 'center',
                title: '状态',
                formatter:'state'
            }
        ]
    });




})
//设置岗位列
function roles(value, row) {
    var i;
    var str="";
    for (i=0;i<value.length;i++){
        if (i != (value.length-1)) {
            str+=value[i].description+","
        }else {
            str+=value[i].description;
        }
    }
    return str;
}
//设置体系列
function system(value, row) {
    if (value != null) {
        return value.systemName;
    }else {
        return "外聘人员";
    }
}
//设置状态
function state(value, row) {
    if (value == 1) {
        return "<div class='label label-table label-success'>已激活</div>"
    }else {
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







