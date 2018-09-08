$(document).ready(function () {


//获取体系名单
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/system/findAll2",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            data = result.data.list
        }
    });

//设置体系表每列标题
    $('#systems').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [
            {
                checkbox:true
            }, {
                field: 'systemName',
                align: 'center',
                title: '体系名称',
                formatter:'sys'
            }, {
                field: 'sx',
                align: 'center',
                title: '首席',
            }, {
                field: 'fsx',
                align: 'center',
                title: '副首席',
            }

        ]
    })
//发送添加数据
    $('#add_btn').click(function () {
        var systemName = $('#systemName').val();
        if (systemName == "") {
            alert("体系名称不能为空")
        } else {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/system/save',
                data: {'systemName': systemName},
                async: false,
                traditional: true
            });
        }
    })
//发送删除数据
    $('#delete_btn').click(function () {
        var a = $("#systems").bootstrapTable('getSelections');
        var idList=[];
        for (var i = 0; i < a.length; i++) {
            idList[i]=a[i].systemId;
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/system/deleteByIds',
            data: {_method: "DELETE", "idList": idList},
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        })



    })

});
function sys(value, row) {
    return "<a href='system_detail.html?id="+row.systemId+"'>"+value+"</a>"
}


























