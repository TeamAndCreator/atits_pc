$(document).ready(function () {
    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});


    var staId = parseInt(getQueryVariable('staId'));
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/station/findById",
        dataType: "json",
        data: {"id": staId},
        type: "get",
        async: false,
        success: function (result) {
            data = result.data;
            $("input[ name = 'staName']").val(data.station.staName);
            $("input[ name = 'company']").val(data.station.company);
            $("input[ name = 'time']").val(data.station.time);
            $("input[ name = 'system']").val(sessionStorage.getItem("systemName"));
            $('#content').val(data.station.content);
        }
    });
    $("#time").text(data.station.time);
    $('#name').text(data.station.staName);
    $('#company').text(data.station.company);
    $('#systemName').text(data.station.system.systemName);
    $('#station_master').text(data.station_master);
    $('#content1').html(data.station.content);


    if (sessionStorage.getItem("staId") == staId && rolesId.indexOf(7) != -1) {
        $('#ul').append("<li class=\"previous\">\n" +
            "                                        <a data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><div class=\"demo-icon\"><i class=\"fa fa-pencil\"></i>修改</div></a>\n" +
            "                                    </li>");
    }

//获取并发送修改信息
    $("#fix").click(function () {
        var station = {
            "_method": "put",
            "id": staId,
            "staName": "",
            "company": "",
            "system.id": "",
            "content": "",
            "time": ""
        };
        station.staName = $("input[ name = 'staName']").val();
        if (station.staName == "") {
            alert("实验站名称不能为空 ")
        } else {
            station.company = $("input[ name = 'company']").val();
            station["system.id"] = sessionStorage.getItem('systemId');
            station.time = $("input[ name = 'time']").val();
            station.content = $('#content').val();
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/station/update',
                data: station,
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