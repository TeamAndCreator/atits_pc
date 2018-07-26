$(document).ready(function() {



    // BOOTSTRAP DATEPICKER WITH AUTO CLOSE
    // =================================================================
    // Require Bootstrap Datepicker
    // http://eternicode.github.io/bootstrap-datepicker/
    // =================================================================
    $('#demo-dp-component .input-group.date').datepicker({autoclose:true});


  //获取考评人员名单

    var dataUsers;
    $.ajax({
        crossDomain : true,
        url:"http://47.104.26.79:8080/atits_service/teststart/import_persons",
        dataType:"json",
        data : {"sysId" : 2,"roleId":3},
        type:"get",
        async:false,
        success:function (result) {
        //   console.log(result);
            dataUsers=result.data.users;
            createDom(dataUsers);
        }})


    function createDom(ele){
        var htmlStr = '';
        for(i = 0; i < ele.length; i++){
            htmlStr += '<li class="checkbox">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="'+dataUsers[i].id+'">\n' +
                '             <label for="demo-checkbox-11"> '+ dataUsers[i].userName +'</label>\n' +
                '        </li>'
        }
        $('#tabs-box-1 #menu ').html(htmlStr);
      // console.log(usersId);
    }


 //发送考评启动添加数据内容
    $("#submit1").on('click',function() {
        var obj={
            "year" : '',
            "date":'',
            "address" : '',
            "ids":""
        };
        obj.year = $("input[ name = 'year']").val();
        obj.date = $("input[ name = 'date']").val();
        obj.address = $("input[ name = 'address']").val();
        var ids=[];
        $("input[name = 'users']:checked").each(function (i) {
            ids[i]=$(this).val();
        });
        obj.ids=ids;
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: 'http://47.104.26.79:8080/atits_service/teststart/save',
            data: obj,
            async: false,
            traditional: true
        });
    })



//获取考评启动表单数据
    var data;
    $.ajax({
        crossDomain : true,
        url:"http://47.104.26.79:8080/atits_service/teststart/findAll",
        dataType:"json",
        type:"get",
        async:false,
        success:function (result) {
            data=result.data.testStarts
    }})


    $('#demo-custom-toolbar1').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [{
            field: 'id',
            title: 'id'
        }, {
            field: 'year',
            align: 'center',
            title: '考评年度',
        }, {
            field: 'date',
            align: 'center',
            title: '考评日期'
        }, {
            field: 'address',
            align: 'center',
            title: '考评地点',
        },{
            field: 'state',
            align: 'center',
            title: '状态',
            formatter:'statusFormatter'
        }

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