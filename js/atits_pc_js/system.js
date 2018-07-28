$(document).ready(function() {


//获取体系名单
    var data;
    $.ajax({
        crossDomain : true,
        url:"http://47.104.26.79:8080/atits_service/system/findAll",
        dataType:"json",
        type:"get",
        async:false,
        success:function (result) {
            data=result.data.systems
    }})


    $('#demo-custom-toolbar1').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [{
            field: 'id',
            align: 'center',
            title: 'id'
        }, {
            field: 'systemName',
            align: 'center',
            title: '体系名称',
        }, {
            field: 'date',
            align: 'center',
            title: '操作'
        }, 

        ]
    })

});


//超链接
function invoiceFormatter(value, row) {
    return '<a href="#" class="btn-link" >' + value + '</a>';
}

//状态
function statusFormatter(value, row) {
    var labelColor;
    var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
    if (value==1){
        value=="通过"
        labelColor = "success";
    } else {
        value=="未通过"
        labelColor = "warning";
    }
    return '<div class="label label-table label-'+ labelColor+'"> ' + value + '</div>';
}