$(document).ready(function () {

    var userId = parseInt(getQueryVariable('id'));
    var profileId = '';
    var sysId;
    urlParam1 = ipValue + '/user/findById';
    urlParam2 = ipValue + '/user/update';
    urlParam3 = ipValue + '/laboratory/findAll1';
    urlParam4 = ipValue + '/station/findAll1';
    urlParam5 = ipValue + '/user/update1';
    urlParam6 = ipValue + '/station/findAll1';


    //获取原始数据
    $.ajax({
        url: urlParam1,
        type: 'get',
        async: false,
        data: {"userId": userId},
        dataType: 'json',
        success: function (result) {
            if (result.code == 100) {
                // console.log(JSON.stringify(result));
                $('#name').val(JSON.stringify(result.data.user.profile.name).replace(/\"/g, ""));
                //性别
                var sex = result.data.user.profile.sex;
                $("#sex option[value='" + sex + "']").attr("selected", "selected");

                $('#birthdate').val(JSON.stringify(result.data.user.profile.birthdate).replace(/\"/g, ""));
                $('#nation').val(JSON.stringify(result.data.user.profile.nation).replace(/\"/g, ""));
                $('#address').val(JSON.stringify(result.data.user.profile.address).replace(/\"/g, ""));
                //学位
                var degree = result.data.user.profile.degree;
                $("#degree option[value='" + degree + "']").attr("selected", "selected");
                $('#school').val(JSON.stringify(result.data.user.profile.graduateInstitutions).replace(/\"/g, ""));
                $('#graduation_date').val(JSON.stringify(result.data.user.profile.graduationDate).replace(/\"/g, ""));
                $('#major').val(JSON.stringify(result.data.user.profile.major).replace(/\"/g, ""));
                $('#professial').val(JSON.stringify(result.data.user.profile.undertake).replace(/\"/g, ""));
                $('#administrative').val(JSON.stringify(result.data.user.profile.administrativeFunction).replace(/\"/g, ""));
                $('#expertise').val(JSON.stringify(result.data.user.profile.professionalExpertise).replace(/\"/g, ""));
                //文化程度
                var education=result.data.user.profile.education;
                $("#education option[value='" + education + "']").attr("selected", "selected");


                //部级专家
                var mini = result.data.user.profile.ministerialExpert;
                $("#ministeria option[value='" + mini + "']").attr("selected", "selected");
                //省级专家
                var provincial = result.data.user.profile.provincialExpert;
                $("#provincial option[value='" + provincial + "']").attr("selected", "selected");

                $('#postalcode').val(JSON.stringify(result.data.user.profile.postalCode).replace(/\"/g, ""));
                $('#part_time').val(JSON.stringify(result.data.user.profile.professionalAffiliations).replace(/\"/g, ""));
                $('#professial').val(JSON.stringify(result.data.user.profile.undertake).replace(/\"/g, ""));
                $('#administrative').val(JSON.stringify(result.data.user.profile.administrativeFunction).replace(/\"/g, ""));
                //政治面貌
                var political = result.data.user.profile.politicsStatus;
                $("#political option[value='" + political + "']").attr("selected", "selected");
                $('#phone').val(JSON.stringify(result.data.user.profile.phoneNumber).replace(/\"/g, ""));
                $('#telephone').val(JSON.stringify(result.data.user.profile.officePhone).replace(/\"/g, ""));
                $('#email').val(JSON.stringify(result.data.user.profile.email).replace(/\"/g, ""));
                $('#work_unit').val(JSON.stringify(result.data.user.profile.department).replace(/\"/g, ""));
                $('#account').val(JSON.stringify(result.data.user.userName).replace(/\"/g, ""));

                if (sessionStorage.getItem("userId") == 1) {
                    //获取此人的权限数组
                    var roleIds=[];
                    for (var i = 0; i < result.data.user.roles.length; i++) {
                        roleIds[i]=result.data.user.roles[i].id
                    }
                    //所属体系名称
                    if (result.data.user.system != null) {//如果此人有体系
                        $("#title input[value='2']").prop('disabled', 'disabled');
                        sysId = JSON.stringify(result.data.user.system.id);
                        //设置显示体系名称下拉框
                        $("#systemName option[value='" + sysId + "']").attr("selected", "selected");
                        //如果此人不是首席
                        if (roleIds.indexOf(3)==-1) {
                            //判断当前体系是否有首席。
                            $.ajax({
                                url: ipValue + "/system/findUsersInRole",
                                type: 'get',
                                data: {"systemId": sysId, "roleId": 3},
                                dataType: 'json',
                                success: function (result) {
                                    var sx = result.data.users;
                                    //如果当前体系有首席
                                    if (sx.length != 0) {
                                        $("#title input[value='3']").prop('disabled', 'true')
                                    }
                                    //如果没有，CheckBox不用加属性
                                }
                            })
                        }
                        //如果此人是首席，下方代码中会选中。
                        //如果此人不是副首席
                        if (roleIds.indexOf(2)==-1) {
                            //判断当前体系是否有副首席。
                            $.ajax({
                                url: ipValue + "/system/findUsersInRole",
                                type: 'get',
                                data: {"systemId": sysId, "roleId": 4},
                                dataType: 'json',
                                success: function (result) {
                                    var fsx = result.data.users;
                                    //如果当前体系有副首席，CheckBox不可用
                                    if (fsx.length != 0) {
                                        $("#title input[value='4']").prop('disabled', 'true')
                                    }
                                    //如果没有，CheckBox不用加属性
                                }
                            })
                        }
                        //如果此人是副首席，下方会选中
                    } else {//如果此人无体系
                        $("#systemName option[value=0]").html("无");
                        $("#title input[value='3']").prop('disabled', 'true');
                        $("#title input[value='4']").prop('disabled', 'true');
                        $("#title input[value='5']").prop('disabled', 'true');
                        $("#title input[value='6']").prop('disabled', 'true');
                        $("#title input[value='7']").prop('disabled', 'true');
                    }
                    //当体系下拉框改变时
                    $("#systemName").change(function () {
                        if ($('option:selected', '#systemName').val()==0) {
                            $("#title input[value='2']").prop('disabled', 'disabled');
                            $("#title input[value='3']").prop('disabled', 'disabled');
                            $("#title input[value='4']").prop('disabled', 'disabled');
                            $("#title input[value='5']").prop('disabled', 'disabled');
                            $("#title input[value='6']").prop('disabled', 'disabled');
                            $("#title input[value='7']").prop('disabled', 'disabled');

                            $("#title input[value='2']").prop('checked', 'true');
                            $("#title input[value='3']").removeAttr("checked");
                            $("#title input[value='4']").removeAttr("checked");
                            $("#title input[value='5']").removeAttr("checked");
                            $("#title input[value='6']").removeAttr("checked");
                            $("#title input[value='7']").removeAttr("checked");
                        }else {
                            $("#title input[value='2']").prop('disabled', 'disabled');
                            $("#title input[value='3']").removeAttr("disabled");
                            $("#title input[value='4']").removeAttr("disabled");
                            $("#title input[value='5']").prop('disabled', 'disabled');
                            $("#title input[value='6']").removeAttr("disabled");
                            $("#title input[value='7']").prop('disabled', 'disabled');

                            $("#title input[value='2']").removeAttr("checked");
                            $("#title input[value='3']").removeAttr("checked");
                            $("#title input[value='4']").removeAttr("checked");
                            $("#title input[value='5']").removeAttr("checked");
                            $("#title input[value='6']").removeAttr("checked");
                            $("#title input[value='7']").removeAttr("checked");
                            //发送ajax验证所选体系是否有首席和副首席
                            //首席
                            $.ajax({
                                url: ipValue + "/system/findUsersInRole",
                                type: 'get',
                                data: {"systemId": $('option:selected', '#systemName').val(), "roleId": 3},
                                dataType: 'json',
                                success: function (result) {
                                    var sx = result.data.users;
                                    //如果当前体系有首席，CheckBox不可用
                                    if (sx.length != 0) {
                                        $("#title input[value='3']").prop('disabled', 'true')
                                    }
                                    //如果没有，CheckBox不用加属性
                                }
                            });
                            //副首席
                            $.ajax({
                                url: ipValue + "/system/findUsersInRole",
                                type: 'get',
                                data: {"systemId": $('option:selected', '#systemName').val(), "roleId": 4},
                                dataType: 'json',
                                success: function (result) {
                                    var fsx = result.data.users;
                                    //如果当前体系有副首席，CheckBox不可用
                                    if (fsx.length != 0) {
                                        $("#title input[value='4']").prop('disabled', 'true')
                                    }
                                    //如果没有，CheckBox不用加属性
                                }
                            })
                        }
                    });





                    //功能研究室
                    if (result.data.user.laboratory != null) {//如果此人有研究室
                        var laboratory = result.data.user.laboratory;
                        $.ajax({
                            url: urlParam3,
                            type: 'get',
                            data: {"systemId": result.data.user.system.id},
                            dataType: 'json',
                            success: function (result) {
                                if (result.code == 100) {
                                    //   console.log(JSON.stringify(result));
                                    // console.log(JSON.stringify(result.data.laboratories.length));
                                    var labLength = JSON.stringify(result.data.laboratories.length);
                                    var htmlStr = '<option value= "0">无</option>';
                                    for (var i = 0; i < labLength; i++) {
                                        htmlStr += ' <option value=' + JSON.stringify(result.data.laboratories[i].laboratory.id) + '>' + JSON.stringify(result.data.laboratories[i].laboratory.labName).replace(/\"/g, "") + '</option>';
                                    }
                                    $('#laboratoryName').append(htmlStr);
                                    $("#laboratoryName option[value='" + laboratory.id + "']").attr("selected", "selected")
                                }
                            }
                        });
                        //判断此用户是否是研究室主任
                        if (roleIds.indexOf(5)==-1){//不是
                            //查询该用户所在研究室是否有研究室主任
                            $.ajax({
                                url: ipValue+"/laboratory/findUserInRole2",
                                type: 'get',
                                data: {"laboratoryId": laboratory.id,roleId:5},
                                dataType: 'json',
                                success: function (result) {
                                    var users=result.data.users;
                                    //如果有
                                    if (users.length != 0) {
                                        $("#title input[value='5']").prop('disabled', 'true')
                                    }
                                    //如果没有，CheckBox不用添加属性。
                                }
                            })
                        }
                        //如果此人是研究室主任，下方会选中，不用对CheckBox添加属性
                    } else {//如果此人没有研究室
                        $("#title input[value='5']").prop('disabled', 'true');
                        if (result.data.user.system == null || result.data.user.system.id == 1) {
                            var htmlStr = '<option value= "0">无</option>';
                            $('#laboratoryName').append(htmlStr);
                            $("#laboratoryName option[value=0]").html("无")
                        } else {
                            $.ajax({
                                url: urlParam3,
                                type: 'get',
                                data: {"systemId": result.data.user.system.id},
                                dataType: 'json',
                                success: function (result) {
                                    if (result.code == 100) {
                                        //   console.log(JSON.stringify(result));
                                        // console.log(JSON.stringify(result.data.laboratories.length));
                                        var labLength = JSON.stringify(result.data.laboratories.length);
                                        var htmlStr = '<option value= "0">无</option>';
                                        for (var i = 0; i < labLength; i++) {
                                            htmlStr += ' <option value=' + JSON.stringify(result.data.laboratories[i].laboratory.id) + '>' + JSON.stringify(result.data.laboratories[i].laboratory.labName).replace(/\"/g, "") + '</option>';
                                        }
                                        $('#laboratoryName').append(htmlStr);
                                        $("#laboratoryName option[value='0']").attr("selected", "selected")
                                    }
                                }
                            });
                        }
                    }
                    //当研究室改变时，判断选后的研究室是否有研究室主任
                    $("#laboratoryName").change(function () {
                        if ($('option:selected', '#laboratoryName').val() != 0) {//选择的不是无
                            $.ajax({
                                url: ipValue + "/laboratory/findUserInRole2",
                                type: 'get',
                                data: {"laboratoryId": $('option:selected', '#laboratoryName').val(), roleId: 5},
                                dataType: 'json',
                                success: function (result) {
                                    var users = result.data.users;
                                    if (users.length != 0) {//如果有，CheckBox不可用。
                                        $("#title input[value='5']").prop('disabled', 'true');
                                    }else {//如果没有，CheckBox可用。
                                        $("#title input[value='5']").removeAttr('disabled');
                                    }
                                    $("#title input[value='5']").removeAttr("checked");
                                }
                            })
                        }else {//选择的是无
                            $("#title input[value='5']").prop('disabled', 'true');
                            $("#title input[value='5']").removeAttr("checked");
                        }
                    });




                    //综合试验站
                    if (result.data.user.station != null) {//如果此人有试验站
                        var station = result.data.user.station;
                        $.ajax({
                            url: urlParam4,
                            type: 'get',
                            data: {"systemId": result.data.user.system.id},
                            dataType: 'json',
                            success: function (result) {
                                if (result.code == 100) {
                                    var staLength = JSON.stringify(result.data.stations.length);
                                    var htmlStr = '<option value= "0">无</option>';
                                    for (var i = 0; i < staLength; i++) {
                                        htmlStr += ' <option value=' + JSON.stringify(result.data.stations[i].station.id) + '>' + JSON.stringify(result.data.stations[i].station.staName).replace(/\"/g, "") + '</option>';
                                    }
                                    $('#stationName').append(htmlStr);
                                    $("#stationName option[value='" + station.id + "']").attr("selected", "selected")
                                }
                            }
                        });
                        //判断此用户是否是试验站站长
                        if (roleIds.indexOf(7)==-1){//不是
                            //查询该用户所在试验站是否有试验站站长
                            $.ajax({
                                url: ipValue+"/station/findUserInRole2",
                                type: 'get',
                                data: {"stationId": station.id,roleId:7},
                                dataType: 'json',
                                success: function (result) {
                                    var users=result.data.users;
                                    //如果有
                                    if (users.length != 0) {
                                        $("#title input[value='7']").prop('disabled', 'true')
                                    }
                                    //如果没有，CheckBox不用添加属性。
                                }
                            })
                        }
                        //如果此人是试验站站长，下方会选中，不用对CheckBox添加属性
                    } else {//如果此人没有试验站
                    $("#title input[value='7']").prop('disabled', 'true');
                        if (result.data.user.system == null || result.data.user.system.id == 1) {
                            var htmlStr = '<option value= "0">无</option>';
                            $('#stationName').append(htmlStr);
                            $("#stationName option[value=0]").html("无")
                        } else {
                            $.ajax({
                                url: urlParam4,
                                type: 'get',
                                data: {"systemId": result.data.user.system.id},
                                dataType: 'json',
                                success: function (result) {
                                    if (result.code == 100) {
                                        var staLength = JSON.stringify(result.data.stations.length);
                                        var htmlStr = '<option value= "0">无</option>';
                                        for (var i = 0; i < staLength; i++) {
                                            htmlStr += ' <option value=' + JSON.stringify(result.data.stations[i].station.id) + '>' + JSON.stringify(result.data.stations[i].station.staName).replace(/\"/g, "") + '</option>';
                                        }
                                        $('#stationName').append(htmlStr);
                                        $("#stationName option[value='0']").attr("selected", "selected")
                                    }
                                }
                            });
                        }
                    }
                    //当试验站改变时，判断选后的试验站是否有试验站站长
                    $("#stationName").change(function () {
                        if ($('option:selected', '#stationName').val() != 0) {//选择的不是无
                            $.ajax({
                                url: ipValue + "/station/findUserInRole2",
                                type: 'get',
                                data: {"stationId": $('option:selected', '#stationName').val(), roleId: 7},
                                dataType: 'json',
                                success: function (result) {
                                    var users = result.data.users;
                                    if (users.length != 0) {//如果有，CheckBox不可用。
                                        $("#title input[value='7']").prop('disabled', 'true');
                                    }else {//如果没有，CheckBox可用。
                                        $("#title input[value='7']").removeAttr('disabled');
                                    }
                                    $("#title input[value='7']").removeAttr("checked");
                                }
                            })
                        }else {//选择的是无
                            $("#title input[value='7']").prop('disabled', 'true');
                            $("#title input[value='7']").removeAttr("checked");
                        }
                    });







                    //岗位CheckBox设置
                    for (var i = 0; i < result.data.user.roles.length; i++) {
                        var gw = JSON.stringify(result.data.user.roles[i].id);
                        $("#title input[value='" + gw + "']").prop('checked', 'true')
                    }

                } else {
                    if (result.data.user.system != null) {
                        //体系名称
                        $('#systemName option[value=0]').html(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
                    } else {
                        $('#systemName option[value=0]').html("无")
                    }
                    $('#systemName').attr("disabled", "true");
                    //岗位
                    $("input[name='job']").attr('disabled', 'disabled');
                    for (var i = 0; i < result.data.user.roles.length; i++) {
                        var gw = JSON.stringify(result.data.user.roles[i].id);
                        $("#title input[value='" + gw + "']").prop('checked', 'true')
                    }
                    //功能研究室
                    if (result.data.user.laboratory == null) {
                        console.log("labnull")
                        $('#laboratoryName').html('<option value= "0">无</option>');
                    } else {
                        console.log("lab")
                        $('#laboratoryName').html('<option value= "0">'+result.data.user.laboratory.labName+'</option>')
                    }
                    $('#laboratoryName').attr("disabled", "true");
                    //综合试验站
                    if (result.data.user.station == null) {
                        console.log("stanull")
                        $('#stationName').html('<option value= "0">无</option>')
                    } else {
                        console.log("sta")
                        $('#stationName').html('<option value= "0">'+result.data.user.station.staName+'</option>')
                    }
                    $('#stationName').attr("disabled", "true");

                }
                profileId = JSON.stringify(result.data.user.profile.id);
                return profileId;
            }
        }
    });

    //根据体系所属名称显示相应的综合试验站和功能研究室
    $('#systemName').change(function () {
        $('#laboratoryName option').remove();    
        $('#stationName option').remove();
        var sysId = ($('option:selected', '#systemName').index());
        if (sysId == 1) {
            $('#stationName').html('<option value= "0">无</option>');
            $('#laboratoryName').html('<option value= "0">无</option>');
        } else {
            $.ajax({
                url: urlParam3,
                type: 'get',
                data: {"systemId": sysId},
                dataType: 'json',
                success: function (result) {
                    if (result.code == 100) {
                        var labLength = JSON.stringify(result.data.laboratories.length);
                        var htmlStr = '<option value= "0">无</option>';
                        for (var i = 0; i < labLength; i++) {
                            htmlStr += ' <option value=' + JSON.stringify(result.data.laboratories[i].laboratory.id) + '>' + JSON.stringify(result.data.laboratories[i].laboratory.labName).replace(/\"/g, "") + '</option>';
                        }
                        $('#laboratoryName').append(htmlStr);
                    }
                }
            });

            $.ajax({
                url: urlParam4,
                type: 'get',
                data: {"systemId": sysId},
                dataType: 'json',
                success: function (result) {
                    if (result.code == 100) {
                        var staLength = JSON.stringify(result.data.stations.length);
                        var htmlStr = '<option value= "0">无</option>';
                        for (var i = 0; i < staLength; i++) {
                            htmlStr += ' <option value=' + JSON.stringify(result.data.stations[i].station.id) + '>' + JSON.stringify(result.data.stations[i].station.staName).replace(/\"/g, "") + '</option>';
                        }
                        $('#stationName').append(htmlStr);
                    }
                }
            })
        }
    });

//修改按钮
    $("#add").click(function () {




//岗位
        var roleIds = [];
        $("input[name='job']:checked").each(function (i) {
            roleIds[i] = $(this).val();
        });


//user
        var user = {
            "_method": "put",
            "id": userId,
            "userName": $("#account").val(),
            "profile.id": profileId,
            "profile.name": $('#name').val(),
            "profile.phoneNumber": $('#phone').val(),
            "profile.officePhone": $('#telephone').val(),
            "profile.email": $('#email').val(),
            "profile.department": $('#work_unit').val(),
            "profile.sex": parseInt($('#sex').val()),
            "profile.nation": $('#nation').val(),
            "profile.birthdate": $('#birthdate').val(),
            "profile.politicsStatus": parseInt($('#political').val()),
            "profile.education": parseInt($('#education').val()),
            "profile.degree": parseInt($('#degree').val()),
            "profile.graduateInstitutions": $('#school').val(),
            "profile.graduationDate": $('#graduation_date').val(),
            "profile.major": $('#major').val(),
            "profile.undertake": $('#professial').val(),
            "profile.administrativeFunction": $('#administrative').val(),
            "profile.ministerialExpert": parseInt($('#ministeria').val()),
            "profile.provincialExpert": parseInt($('#provincial').val()),
            "profile.postalCode": $('#postalcode').val(),
            "profile.address": $('#address').val(),
            "profile.professionalAffiliations": $('#part_time').val(),
            "profile.professionalExpertise": $('#expertise').val()
        };
        user["roleIds"]=roleIds;
        if ($("#systemName option:selected").val() == 0) {
        } else {
            user["system.id"] = $("#systemName option:selected").val();
            if ($("#laboratoryName option:selected").val() == 0) {
                if ($("#stationName option:selected").val() == 0) {
                } else {
                    user["station.id"] = $("#stationName option:selected").val();
                }
            } else {
                user["laboratory.id"] = $("#laboratoryName option:selected").val();
                if ($("#stationName option:selected").val() == 0) {
                } else {
                    user["station.id"] = $("#stationName option:selected").val();
                }
            }
        }
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/user/update1',
            data: user,
            async: false,
            traditional: true,
            success: function () {
                window.location.reload()
            }
        });
    });
//密码初始化
    if (sessionStorage.getItem("userId") != 1) {
        $("#passWord_reset_div").css("display","none")
    }else {
        $("#passWord_reset_button").val("密码初始化")
        $("#passWord_reset").click(function () {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/user/changePassword',
                data: {_method: "put","userId":userId,"password":"123456"},
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            });
        })
    }

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