$(document).ready(function () {


    var data;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/files/findAll",
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                data = result.data.files
            }

        });
//设置table每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [
            {
                field: 'files.title',
                align: 'center',
                formatter: 'invoiceFormatter',
                title: '文件名'
            }, {
                field: 'userName',
                title: '发布者'
            }, {
                field: 'systemName',
                title: '所属体系'
            }, {
                field: 'files.fileType',
                align: 'center',
                title: '文件类型'
            }, {
                field: 'files.date',
                align: 'center',
                title: '上传日期'
            }

        ]
    });
});
//超链接
function invoiceFormatter(value, row) {
    return "<a href='"+vr_path+"/"+row.files.path+row.files.name+"' download='"+value+"'>"+value+"</a>";
}
