$(document).ready(function () {
    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});


    var labId = parseInt(getQueryVariable('labId'));
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/laboratory/findById",
        dataType: "json",
        data: {"id": labId},
        type: "get",
        async: false,
        success: function (result) {
            data = result.data;
            $("input[ name = 'labName']").val(data.laboratory.labName);
            $("input[ name = 'company']").val(data.laboratory.company);
            $("input[ name = 'system']").val(sessionStorage.getItem("systemName"));
            $('#content').val(data.laboratory.content);
        }
    });
    $('#name').text(data.laboratory.labName);
    $('#company').text(data.laboratory.company);
    $('#systemName').text(data.laboratory.system.systemName);
    $('#job_expert').text(data.research_director);
    $('#research_director').text(data.job_expert);
    $('#content1').html(data.laboratory.content);


    if (sessionStorage.getItem("labId") == labId && rolesId.indexOf(5) != -1) {
        $('#ul').append("<li class=\"previous\">\n" +
            "                                        <a data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><div class=\"demo-icon\"><i class=\"fa fa-pencil\"></i>修改</div></a>\n" +
            "                                    </li>");
    }

//获取并发送修改信息
    $("#fix").click(function () {
        var laboratory = {
            "_method": "put",
            "id": labId,
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
                url: ipValue + '/laboratory/update',
                data: laboratory,
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            });
        }
    })

});

//获取url参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}








