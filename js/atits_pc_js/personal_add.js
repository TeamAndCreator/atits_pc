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
                    //所属体系名称
                    if (result.data.user.system != null) {
                        sysId = JSON.stringify(result.data.user.system.id);
                        $("#systemName option[value='" + sysId + "']").attr("selected", "selected")
                    } else {
                        $("#systemName option[value=0]").html("无")
                    }
                    //console.log($('option:selected', '#systemName').index())
                    //功能研究室
                    if (result.data.user.laboratory != null) {
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
                    } else {
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
                    //综合实验站
                    if (result.data.user.station != null) {
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
                    } else {
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
                    //岗位专家
                    for (var i = 0; i < result.data.user.roles.length; i++) {
                        var gw = JSON.stringify(result.data.user.roles[i].id);
                        $("#title input[value='" + gw + "']").prop('checked', 'true')
                    }


                    $("input[name='job']").attr("disabled") == false;
                } else {
                    if (result.data.user.system != null) {
                        //体系名称
                        $('#systemName option[value=0]').html(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
                    } else {
                        $('#systemName option[value=0]').html("无")
                    }
                    ;
                    $('#systemName').attr("disabled", "true");
                    //岗位
                    $("input[name='job']").attr('disabled', 'disabled');
                    var gw = JSON.stringify(result.data.user.roles[0].id);
                    $("#title input[value='" + gw + "']").prop('checked', 'true');
                    //功能研究室
                    if (JSON.stringify(result.data.user.laboratory) == 'null') {
                        $('#laboratoryName option[value=0]').html('无');
                    } else {
                        $('#laboratoryName option[value=0]').html(JSON.stringify(result.data.user.laboratory.labName).replace(/\"/g, ""));
                    }
                    $('#laboratoryName').attr("disabled", "true");
                    //综合试验站
                    if (JSON.stringify(result.data.user.station) == 'null') {
                        $('#stationName option[value=0]').html('无')
                    } else {
                        $('#stationName option[value=0]').html(JSON.stringify(result.data.user.station.staName).replace(/\"/g, ""));
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

        // var profileId = sessionStorage.getItem("proId");
        //     $.ajax({
        //         url: urlParam5,
        //         type: 'get',
        //         data: {
        //             "profile.id":profileId,
        //             "name":$('#name').val(),
        //             "phoneNumber":$('#phone').val(),
        //             "officePhone":$('#telephone').val(),
        //             "email":$('#email').val(),
        //             "department":$('#work_unit').val(),
        //             "sex":$('#sex').val(),
        //             "nation":$('#nation').val(),
        //             "birthdate":$('#birthdate').val(),
        //             "politicsStatus":$('#political').val(),
        //             "education":$('#education').val(),
        //             "degree":$('#degree').val(),
        //             "graduateInstitutions":$('#school').val(),
        //             "graduationDate":$('#graduation_date').val(),
        //             "major":$('#major').val(),
        //             "undertake":$('#professial').val(),
        //             "administrativeFunction":$('#administrative').val(),
        //             "ministerialExpert":$('#ministeria').val(),
        //             "provincialExpert":$('#provincial').val(),
        //             "postalCode":$('#postalcode').val(),
        //             "address":$('#address').val(),
        //             "professionalAffiliations":$('#part_time').val(),
        //             "professionalExpertise":$('#expertise').val(),
        //         },
        //         dataType: 'json',
        //         success:function(result){
        //             console.log(result);
        //         }
        //     })
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