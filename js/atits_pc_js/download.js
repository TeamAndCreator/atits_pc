$(document).ready(function () {


    var data;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/files/findAll",
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                data = result.data.files;
                for (var i = 0; i < data.length; i++) {
                    data[i].files.systemName=data[i].systemName;
                    data[i].files.userName=data[i].userName;
                    data[i]=data[i].files
                }
            }

        });
//设置table每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [
            {
                field: 'title',
                align: 'center',
                sortable:'true',
                formatter: 'invoiceFormatter',
                title: '文件名'
            }, {
                field: 'userName',
                sortable:'true',
                title: '发布者'
            }, {
                field: 'systemName',
                sortable:'true',
                title: '所属体系'
            }, {
                field: 'fileType',
                align: 'center',
                sortable:'true',
                title: '文件类型'
            }, {
                field: 'date',
                align: 'center',
                sortable:'true',
                title: '上传日期'
            }

        ]
    });
});
//超链接
function invoiceFormatter(value, row) {
    return "<a href='"+vr_path+"/"+row.path+row.name+"' download='"+value+"'>"+value+"</a>";
}
