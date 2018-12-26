$(document).ready(function () {

    //tab选择
    var getIndexNum = sessionStorage.getItem("tabLiNum");
    $(".tab-hd li").eq(getIndexNum).addClass('active').siblings().removeClass('active');
    $(".tab-bd").eq(getIndexNum).addClass('in').siblings('.tab-bd').removeClass('in');
    $(".tab-bd").eq(getIndexNum).addClass('active').siblings('.tab-bd').removeClass('active');

    $(".tab-hd li").on('click',function(){

        $(this).addClass('active').siblings().removeClass('active');
        $(".tab-bd").eq($(this).index()).removeClass('in').siblings('.tab-bd').removeClass('in');
        $(".tab-bd").eq($(this).index()).removeClass('active').siblings('.tab-bd').removeClass('active');

        var indexNum = $(this).index(); //所点击li的索引值
        console.log("当前li的下标为：",indexNum); //打印索引值

        sessionStorage.setItem("tabLiNum",indexNum); //将(下标名称，索引值)存入session中
    });




    //日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});

    if (rolesId.indexOf(3) != -1 || rolesId.indexOf(1) != -1) {
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
        //获取本体系人员
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
        });
        //判断当前用户是否为体系办，是则显示外聘人员，否则不显示
        if (sessionStorage.getItem('systemId') == 1) {
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
        } else {
            $('#external_add li:eq(1)').remove();
        }

    });

    function createDom2(ele) {
        var htmlStr = '';
        for (i = 0; i < ele.length; i++) {
            htmlStr += '<li class="checkbox col-sm-3">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="' + ele[i].id + '">\n' +
                '             <label for="demo-checkbox-11"> ' + ele[i].profile.name + '</label>\n' +
                '        </li>'
        }
        $('#tabs-box-2 #menu2 ').html(htmlStr);
    }

    function createDom(ele) {
        var htmlStr = '';
        for (i = 0; i < ele.length; i++) {
            htmlStr += '<li class="checkbox col-sm-3">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="' + ele[i].id + '">\n' +
                '             <label for="demo-checkbox-11"> ' + ele[i].profile.name + '</label>\n' +
                '        </li>'
        }
        $('#tabs-box-1 #menu ').html(htmlStr);
    }


//发送考评启动添加数据内容
    $("#submit1").on('click', function () {
        if (sessionStorage.getItem('systemId') == 1) {
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
        } else {
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
        obj.year = $("#years option:selected").val();
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
    });

//两个权重设置修改模态框提交按钮
    $("#testWeight2_btn").click(function () {
        var testWeight = {
            "id": "",
            "g": "",
            "h": ""
        };
        testWeight.id = $("input[name='id2']").val();
        testWeight.g = $("input[name='g']").val();
        testWeight.h = $("input[name='h']").val();
        var sum = parseInt(testWeight.g) + parseInt(testWeight.h);
        if (sum != 100) {
            alert("请确保权重之和为100")
        } else {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/testweight/update',
                data: testWeight,
                async: false,
                traditional: true,
                success: function () {
                    alert("修改成功");
                    location.reload()
                }
            });
        }

    });
    $("#testWeight_btn").click(function () {
        var testWeight = {
            "id": "",
            "a": "",
            "b": "",
            "c": "",
            "d": "",
            "e": "",
            "f": ""
        };
        testWeight.id = $("input[name='id']").val();
        testWeight.a = $("input[name='a']").val();
        testWeight.b = $("input[name='b']").val();
        testWeight.c = $("input[name='c']").val();
        testWeight.d = $("input[name='d']").val();
        testWeight.e = $("input[name='e']").val();
        testWeight.f = $("input[name='f']").val();
        var sum1 = parseInt(testWeight.a) + parseInt(testWeight.b) + parseInt(testWeight.c);
        var sum2 = parseInt(testWeight.d) + parseInt(testWeight.e) + parseInt(testWeight.f);
        if (sum1 != 100 || sum2 != 100) {
            alert("请确保权重之和为100")
        } else {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/testweight/update',
                data: testWeight,
                async: false,
                traditional: true,
                success: function () {
                    alert("修改成功");
                    location.reload()
                }
            });
        }

    });

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
    });

//获取考评启动表单数据
    var data;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/teststart/findAll",
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            data = result.data.testStarts;
            var old_years = [];
            var date = new Date();
            var current_year = date.getFullYear();
            var start_year = current_year - 10;
            var end_year = current_year + 10;
            for (var i = 0; i < data.length; i++) {
                if (data[i].system.id == sessionStorage.getItem("systemId")) {
                    old_years.push(parseInt(data[i].year))
                }
            }
            var obj = document.getElementById('years');
            for (var i = start_year; i <= end_year; i++) {
                if (old_years.indexOf(i) == -1)
                    obj.options.add(new Option(i, i));
            }
            $("#years option[value=" + current_year + "]").attr("selected", "selected");
        }
    });

//设置table每列标题
    $('#demo-custom-toolbar1').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [{
            field: 'system.id',
            checkbox: true,
            formatter: 'check'
        }, {
            field: 'year',
            align: 'center',
            sortable: 'true',
            title: '考评年度'
        }, {
            field: 'system',
            align: 'center',
            sortable: 'true',
            title: '所属体系',
            formatter: function (value, row, index) {
                return value.systemName
            }
        }, {
            field: 'users',
            align: 'center',
            title: '考评人员',
            sortable: 'true',
            formatter: 'invoiceFormatter'
        }, {
            field: 'date',
            align: 'center',
            sortable: 'true',
            title: '考评日期'
        }, {
            field: 'address',
            align: 'center',
            sortable: 'true',
            title: '考评地点'
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
    });

//获取testScore
    var testScore = "";
    $.ajax({
        crossDomain: true,
        url: ipValue + "/testscore/findByEvaluation",
        dataType: "json",
        data: {"evaluationId": sessionStorage.getItem('userId')},
        type: "get",
        async: false,
        success: function (result) {
            testScore = result.data.testScores;
        }
    });

    for (var i = 0; i < testScore.length; i++) {
        testScore[i].year = testScore[i].testStart.year;
        testScore[i].systemName = testScore[i].testStart.system.systemName;
        testScore[i].address = testScore[i].testStart.address;
        testScore[i].date = testScore[i].testStart.date;
        testScore[i].evaluationed = testScore[i].evaluationed.profile.name;
        testScore[i].evaluation = testScore[i].evaluation.profile.name;
        testScore[i].year = testScore[i].testStart.year;
    }
//设置testScore表格标题
    $('#testScore').bootstrapTable({
        idField: 'id',
        data: testScore,
        editable: true,
        columns: [
            {
                field: 'year',
                align: 'center',
                sortable: 'true',
                title: '考评年度'
            }, {
                field: 'systemName',
                align: 'center',
                sortable: 'true',
                title: '考评发起单位'
            }, {
                field: 'address',
                align: 'center',
                sortable: 'true',
                title: '考评地点'
            }, {
                field: 'date',
                align: 'center',
                sortable: 'true',
                title: '考评日期'
            }, {
                field: 'evaluationed',
                align: 'center',
                sortable: 'true',
                title: '被考评人员'
            }, {
                field: 'evaluation',
                align: 'center',
                sortable: 'true',
                title: '打分人员'
            }, {
                field: 'testStart.state',
                align: 'center',
                formatter: 'score',
                title: '打分'
            }, {
                field: 'time',
                align: 'center',
                sortable: 'true',
                title: '打分时间'
            }

        ]
    });

//发送打分数据
    $('#score-btn').click(function () {
        // var scoreValue={
        //     "id":"",
        //     "A1":"",
        //     "A2":"",
        //     "A3":"",
        //     "A4":"",
        //     "A5":"",
        //     "A6":"",
        // };
        id = parseInt($("input[name='score-id']").val());
        A1 = parseInt($("input[name='a1']").val());
        A2 = parseInt($("input[name='a2']").val());
        A3 = parseInt($("input[name='a3']").val());
        A4 = parseInt($("input[name='a4']").val());
        A5 = parseInt($("input[name='a5']").val());
        A6 = parseInt($("input[name='a6']").val());

        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/testscore/score',
            data: {_method: "put", "id": id, "A1": A1, "A2": A2, "A3": A3, "A4": A4, "A5": A5, "A6": A6},
            async: false,
            traditional: true,
            success: function (result) {
                alert("打分成功");
                location.reload()
            }
        });

    });

//个人得分表（体系办不用，外聘人员不用）
    if (sessionStorage.getItem("systemId") != 1 && sessionStorage.getItem("systemId") != null) {
        if (rolesId.indexOf(3) == -1) {
            $('#title').text("个人得分");
        }
//获取个人得分
        var testManage_person = "";
        $.ajax({
            crossDomain: true,
            url: ipValue + "/testmanage/findOwn",
            dataType: "json",
            data: {"userId": sessionStorage.getItem('userId')},
            type: "get",
            async: false,
            success: function (result) {
                testManage_person = result.data.testManages;
            }
        });
        for (var i = 0; i < testManage_person.length; i++) {
            testManage_person[i].year = testManage_person[i].testStart.year;
            testManage_person[i].systemName = testManage_person[i].testStart.system.systemName;
            testManage_person[i].date = testManage_person[i].testStart.date;
            testManage_person[i].address = testManage_person[i].testStart.address;
            testManage_person[i].name = testManage_person[i].scoreUser.profile.name;
        }
//设置个人得分标题
        $('#testManage_person').bootstrapTable({
            striped: true,
            pagination: true,
            pageSize: 10,
            pageList: [10, 25, 50],
            showColumns: true,
            search: true,
            showRefresh: false,
            showToggle: true,
            idField: 'id',
            data: testManage_person,
            editable: true,
            columns: [
                {
                    field: 'year',
                    align: 'center',
                    sortable: 'true',
                    title: '考评年度'
                }, {
                    field: 'systemName',
                    align: 'center',
                    sortable: 'true',
                    title: '考评发起单位'
                }, {
                    field: 'date',
                    align: 'center',
                    sortable: 'true',
                    title: '考评日期'
                }, {
                    field: 'address',
                    align: 'center',
                    sortable: 'true',
                    title: '考评地点'
                }, {
                    field: 'name',
                    align: 'center',
                    sortable: 'true',
                    title: '得分人'
                }, {
                    field: 'sum',
                    align: 'center',
                    sortable: 'true',
                    title: '综合得分',
                    formatter: 'xsd'
                }

            ]
        })
    }

//体系人员得分表（体系办、首席用）
    if (rolesId.indexOf(1) != -1 || rolesId.indexOf(3) != -1) {
//获取本体系所有得分
        var testManage_system;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/testmanage/findSystemTestManage",
            dataType: "json",
            data: {"systemId": sessionStorage.getItem('systemId')},
            type: "get",
            async: false,
            success: function (result) {
                testManage_system = result.data.testManages;
            }
        });
        for (var i = 0; i < testManage_system.length; i++) {
            testManage_system[i].year = testManage_system[i].testStart.year;
            testManage_system[i].systemName = testManage_system[i].testStart.system.systemName;
            testManage_system[i].date = testManage_system[i].testStart.date;
            testManage_system[i].address = testManage_system[i].testStart.address;
            testManage_system[i].name = testManage_system[i].scoreUser.profile.name;
        }
        $('#testManage_system').bootstrapTable({
            striped: true,
            pagination: true,
            pageSize: 10,
            pageList: [10, 25, 50],
            showColumns: true,
            search: true,
            showRefresh: false,
            toggle: true,
            showToggle: true,
            idField: 'id',
            data: testManage_system,
            editable: true,
            columns: [
                {
                    field: 'year',
                    align: 'center',
                    sortable: 'true',
                    title: '考评年度'
                }, {
                    field: 'systemName',
                    align: 'center',
                    sortable: 'true',
                    title: '考评发起单位'
                }, {
                    field: 'date',
                    align: 'center',
                    sortable: 'true',
                    title: '考评日期'
                }, {
                    field: 'address',
                    align: 'center',
                    sortable: 'true',
                    title: '考评地点'
                }, {
                    field: 'name',
                    align: 'center',
                    sortable: 'true',
                    title: '得分人'
                }, {
                    field: 'sum',
                    align: 'center',
                    sortable: 'true',
                    title: '综合得分',
                    formatter: 'xsd'
                }

            ]
        })

    }
});

//判断考评有没有结束。并根据被考评人的角色，调用不同的函数在模态框中写上不同的打分项
function score(value, row, index) {
    var tempRow = {
        "id": row.id,
        "role": row.role,
        "a1": row.a1,
        "a2": row.a2,
        "a3": row.a3,
        "a4": row.a4,
        "a5": row.a5,
        "a6": row.a6
    };
    row = tempRow;
    if (value == 1) {
        if (row.role == 1) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-success'><a onclick='score1(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        } else if (row.role == 2) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-success'><a onclick='score1(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        } else if (row.role == 3) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-success'><a onclick='score2(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        } else if (row.role == 4) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-success'><a onclick='score3(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        }
    } else {
        if (row.role == 1) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-default'><a onclick='score1_1(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        } else if (row.role == 2) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-default'><a onclick='score1_1(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        } else if (row.role == 3) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-default'><a onclick='score2_1(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        } else if (row.role == 4) {
            row = JSON.stringify(row);
            return "<div class='label label-table label-default'><a onclick='score3_1(" + row + ")' class='btn-link' data-toggle='modal' data-target='#score' style='color: white; cursor:default'>" + "打分" + "</a></div>"
        }
    }
}

//给首席、副首席打分，设置打分项，考评已启动（可打分）
function score1(row) {
    $("input[name='a1'],input[name='a2'],input[name='a3'],input[name='a4'],input[name='a5'],input[name='a6']").removeAttr("disabled");
    $("input[name='a6']").css('display','block');
    $("#score-btn").css("display", "block");
    $("#a1").text("1．团队建设情况（15分）");
    $("#a2").text("2．支撑产业发展情况（50分)");
    $("#a3").text("3．应急事件处置及参与重大活动情况（10分）");
    $("#a4").text("4．经费使用情况（10分）");
    $("#a5").text("5．宣传推动情况（10分）");
    $("#a6").text("6．对接协作情况（5分）");
    $("input[name='score-id']").val(row.id);
    $("input[name='a1']").val(row.a1);
    $("input[name='a1']").attr('oninput', 'if(value>15)value=15;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a2']").val(row.a2);
    $("input[name='a2']").attr('oninput', 'if(value>50)value=50;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a3']").val(row.a3);
    $("input[name='a3']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a4']").val(row.a4);
    $("input[name='a4']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a5']").val(row.a5);
    $("input[name='a5']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a6']").val(row.a6);
    $("input[name='a6']").attr('oninput', 'if(value>5)value=5;if(value.length>1)value=value.slice(0,1);if(value<0)value=0');
}

//给首席、副首席打分，设置打分项，考评已启动（不可打分）
function score1_1(row) {
    $("input[name='a6']").css('display','block');
    $("#a1").text("1．团队建设情况（15分）");
    $("#a2").text("2．支撑产业发展情况（50分）");
    $("#a3").text("3．应急事件处置及参与重大活动情况（10分）");
    $("#a4").text("4．经费使用情况（10分）");
    $("#a5").text("5．宣传推动情况（10分）");
    $("#a6").text("6．对接协作情况（5分）");
    $("input[name='a1']").val(row.a1);
    $("input[name='a2']").val(row.a2);
    $("input[name='a3']").val(row.a3);
    $("input[name='a4']").val(row.a4);
    $("input[name='a5']").val(row.a5);
    $("input[name='a6']").val(row.a6);
    $("input[name='a1'],input[name='a2'],input[name='a3'],input[name='a4'],input[name='a5'],input[name='a6']").attr("disabled", "disabled");
    $("#score-btn").css("display", "none");
}

//给岗位专家打分，设置打分项，考评已启动（可打分）
function score2(row) {
    $("input[name='a1'],input[name='a2'],input[name='a3'],input[name='a4'],input[name='a5'],input[name='a6']").removeAttr("disabled");
    $("#score-btn").css("display", "block");
    $("#a1").text("1．任务完成情况（50分）");
    $("#a2").text("2．遵规守纪情况（20分）");
    $("#a3").text("3．经费使用情况（10分）");
    $("#a4").text("4．宣传推动情况（10分）");
    $("#a5").text("5．其他（10分）");
    $("#a6").text("");
    $("input[name='a6']").css('display', 'none');
    $("input[name='score-id']").val(row.id);
    $("input[name='a1']").val(row.a1);
    $("input[name='a1']").attr('oninput', 'if(value>50)value=50;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a2']").val(row.a2);
    $("input[name='a2']").attr('oninput', 'if(value>20)value=20;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a3']").val(row.a3);
    $("input[name='a3']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a4']").val(row.a4);
    $("input[name='a4']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a5']").val(row.a5);
    $("input[name='a5']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a6']").val(row.a6);
}

//给岗位专家打分，设置打分项，考评已启动（不可打分）
function score2_1(row) {
    $("#a1").text("1．任务完成情况（50分）");
    $("#a2").text("2．遵规守纪情况（20分）");
    $("#a3").text("3．经费使用情况（10分）");
    $("#a4").text("4．宣传推动情况（10分）");
    $("#a5").text("5．其他（10分）");
    $("#a6").text("");
    $("input[name='a1']").val(row.a1);
    $("input[name='a2']").val(row.a2);
    $("input[name='a3']").val(row.a3);
    $("input[name='a4']").val(row.a4);
    $("input[name='a5']").val(row.a5);
    $("input[name='a6']").val(row.a6);
    $("input[name='a6']").css('display', 'none');
    $("input[name='a1'],input[name='a2'],input[name='a3'],input[name='a4'],input[name='a5']").attr("disabled", "disabled");
    $("#score-btn").css("display", "none");
}

//给试验站站长打分，设置打分项，考评已启动（可打分）
function score3(row) {
    $("input[name='a1'],input[name='a2'],input[name='a3'],input[name='a4'],input[name='a5'],input[name='a6']").removeAttr("disabled");
    $("input[name='a6']").css('display','block');
    $("#score-btn").css("display", "block");
    $("#a1").text("1．任务完成情况（50分）");
    $("#a2").text("2．遵规守纪情况（20分）");
    $("#a3").text("3．经费使用情况（10分）");
    $("#a4").text("4．宣传推动情况（10分）");
    $("#a5").text("5．争取支持情况（5分）");
    $("#a6").text("6．其他（5分）");
    $("input[name='score-id']").val(row.id);
    $("input[name='a1']").val(row.a1);
    $("input[name='a1']").attr('oninput', 'if(value>50)value=50;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a2']").val(row.a2);
    $("input[name='a2']").attr('oninput', 'if(value>20)value=20;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a3']").val(row.a3);
    $("input[name='a3']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a4']").val(row.a4);
    $("input[name='a4']").attr('oninput', 'if(value>10)value=10;if(value.length>2)value=value.slice(0,2);if(value<0)value=0');
    $("input[name='a5']").val(row.a5);
    $("input[name='a5']").attr('oninput', 'if(value>5)value=5;if(value.length>1)value=value.slice(0,1);if(value<0)value=0');
    $("input[name='a6']").val(row.a6);
    $("input[name='a6']").attr('oninput', 'if(value>5)value=5;if(value.length>1)value=value.slice(0,1);if(value<0)value=0');
}

//给试验站站长打分，设置打分项，考评已启动（不可打分）
function score3_1(row) {
    $("input[name='a6']").css('display','block');
    $("#a1").text("1．任务完成情况（50分）");
    $("#a2").text("2．遵规守纪情况（20分）");
    $("#a3").text("3．经费使用情况（10分）");
    $("#a4").text("4．宣传推动情况（10分）");
    $("#a5").text("5．争取支持情况（5分）");
    $("#a6").text("6．其他（5分）");
    $("input[name='a1']").val(row.a1);
    $("input[name='a2']").val(row.a2);
    $("input[name='a3']").val(row.a3);
    $("input[name='a4']").val(row.a4);
    $("input[name='a5']").val(row.a5);
    $("input[name='a6']").val(row.a6);
    $("input[name='a1'],input[name='a2'],input[name='a3'],input[name='a4'],input[name='a5'],input[name='a6']").attr("disabled", "disabled");
    $("#score-btn").css("display", "none");
}

//考评启动表checkbox可用权限判断
function check(value, row) {
    if (row.system.id == sessionStorage.getItem('systemId')) {
        if (rolesId.indexOf(1) != -1 || rolesId.indexOf(3) != -1) {
            return {
                disabled: false//设置可用
            }
        }
    }
    return {
        disabled: true//设置不可用
    }
}

//权重设置权限判断
function test_weight(value, row) {
    value = JSON.stringify(value);
    if (row.system.id == 1) {
        if (rolesId.indexOf(1) != -1) {
            if (row.state == 0 || row.state == 1) {
                return "<a onclick='testWeightTable(" + value + ")' class='btn-link' data-toggle='modal' data-target='#testWeight' style='cursor:default'>" + "权重设置" + "</a>";
            } else {
                return "<a onclick='testWeightTable2(" + value + ")' class='btn-link' data-toggle='modal' data-target='#testWeight' style='cursor:default'>" + "权重设置" + "</a>";
            }
        } else {
            return "<a onclick='testWeightTable2(" + value + ")' class='btn-link' data-toggle='modal' data-target='#testWeight' style='cursor:default'>" + "权重设置" + "</a>";
        }
    } else {
        if (row.system.id == sessionStorage.getItem('systemId') && rolesId.indexOf(3) != -1) {
            if (row.state == 0 || row.state == 1) {
                return "<a onclick='testWeightTable3(" + value + ")' class='btn-link' data-toggle='modal' data-target='#testWeight2' style='cursor:default'>" + "权重设置" + "</a>";
            } else {
                return "<a onclick='testWeightTable4(" + value + ")' class='btn-link' data-toggle='modal' data-target='#testWeight2' style='cursor:default'>" + "权重设置" + "</a>";
            }
        } else {
            return "<a onclick='testWeightTable4(" + value + ")' class='btn-link' data-toggle='modal' data-target='#testWeight2' style='cursor:default'>" + "权重设置" + "</a>";
        }
    }
}

//四种权重设置的权限
function testWeightTable(value) {
    $("input[name='a'],input[name='b'],input[name='c'],input[name='d'],input[name='e'],input[name='f']").removeAttr("disabled");
    $("#testWeight_btn").css('display', 'inline-block');
    $("input[name='id']").val(value.id);
    $("input[name='a']").val(value.a);
    $("input[name='b']").val(value.b);
    $("input[name='c']").val(value.c);
    $("input[name='d']").val(value.d);
    $("input[name='e']").val(value.e);
    $("input[name='f']").val(value.f);

}

function testWeightTable2(value) {
    $("input[name='a'],input[name='b'],input[name='c'],input[name='d'],input[name='e'],input[name='f']").attr("disabled", "disabled");
    $("input[name='a']").val(value.a);
    $("input[name='b']").val(value.b);
    $("input[name='c']").val(value.c);
    $("input[name='d']").val(value.d);
    $("input[name='e']").val(value.e);
    $("input[name='f']").val(value.f);
    $("#testWeight_btn").css('display', 'none')
}

function testWeightTable3(value) {
    $("input[name='g'],input[name='h']").removeAttr("disabled");
    $("#testWeight2_btn").css('display', 'inline-block');
    $("input[name='id2']").val(value.id);
    $("input[name='g']").val(value.g);
    $("input[name='h']").val(value.h);
}

function testWeightTable4(value) {
    $("input[name='g'],input[name='h']").attr("disabled", "disabled");
    $("input[name='g']").val(value.g);
    $("input[name='h']").val(value.h);
    $("#testWeight2_btn").css('display', 'none')
}


//考评人员超链接
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
        if (row.system.id == sessionStorage.getItem('systemId')) {
            if (rolesId.indexOf(3) != -1 || rolesId.indexOf(1) != -1) {
                return "<div class='label label-table label-" + labelColor + "'> <a onclick='updateState(" + value + "," + row.id + ")' data-toggle=\"modal\" data-target=\"#demo-sm-modal\" style='color: white; cursor:default'>" + v + "</a></div>";
            } else {
                return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
            }
        } else {
            return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
        }
    } else if (value == 1) {
        v = "已启动";
        labelColor = "success";
        if (row.system.id == sessionStorage.getItem('systemId')) {
            if (rolesId.indexOf(3) != -1 || rolesId.indexOf(1) != -1) {
                return "<div class='label label-table label-" + labelColor + "'> <a onclick='updateState(" + value + "," + row.id + ")' data-toggle=\"modal\" data-target=\"#demo-sm-modal\" style='color: white; cursor:default'>" + v + "</a></div>";
            } else {
                return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
            }
        } else {
            return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
        }
    } else if (value == 2) {
        v = "已结束";
        labelColor = "default"
        return "<div class='label label-table label-" + labelColor + "'>" + v + "</div>";
    }
}

//判断状态按钮，选择调用函数
function updateState(value, id) {
    if (value == 0) {
        $('#testStart1').text("是否启动考评");
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

//取小数点后两位
function xsd(value) {
    return value.toFixed(2)
}