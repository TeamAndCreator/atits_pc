$(document).ready(function () {
   
    var userId = sessionStorage.getItem("userId");
    var profileId = '';
    var sysId;
    urlParam1 = ipValue + '/user/findById';
    urlParam2 = ipValue + '/user/update';
    urlParam3 = ipValue + '/laboratory/findAll1';
    urlParam4 = ipValue + '/station/findAll1';
   
    
    //获取原始数据
    $.ajax({
        url: urlParam1,
        type: 'get',
        async:false,
        data: { "userId": userId },
        dataType: 'json',
        success: function (result) {
            if (result.code == 100) {               
               // console.log(JSON.stringify(result));               
                $('#name').val(JSON.stringify(result.data.user.profile.name).replace(/\"/g, ""));               
                //性别
                $('#sex option[value=0]').html(JSON.stringify(result.data.user.profile.sex));
                var sex = JSON.stringify(result.data.user.profile.sex);
                $("#sex option[value='" + sex + "']").attr("selected", "selected"),
        
                $('#birthdate').val(JSON.stringify(result.data.user.profile.birthdate));
                $('#nation').val(JSON.stringify(result.data.user.profile.nation));
                $('#address').val(JSON.stringify(result.data.user.profile.address));
                //学位
                $('#degree option[value=0]').html(JSON.stringify(result.data.user.profile.degree));
                var degree = JSON.stringify(result.data.user.profile.degree);
                $('#school').val(JSON.stringify(result.data.user.profile.graduateInstitutions));
                $('#graduation_date').val(JSON.stringify(result.data.user.profile.graduationDate));
                $('#major').val(JSON.stringify(result.data.user.profile.major));
                $('#professial').val(JSON.stringify(result.data.user.profile.undertake));
                $('#administrative').val(JSON.stringify(result.data.user.profile.administrativeFunction));
                $('#expertise').val(JSON.stringify(result.data.user.profile.professionalExpertise));
                 //文化程度
                 $('#education option[value=0]').html(JSON.stringify(result.data.user.profile.education));

                 //部级专家
                 $('#ministeria option[value=0]').html(JSON.stringify(result.data.user.profile.ministerialExpert));
                 var mini = JSON.stringify(result.data.user.profile.ministerialExpert);
                 $("#ministeria option[value='" + mini + "']").attr("selected", "selected");
                 //省级专家
                 $('#provincial option[value=0]').html(JSON.stringify(result.data.user.profile.provincialExpert));
                 var provincial = JSON.stringify(result.data.user.profile.provincialExpert);
                 $("#ministeria option[value='" + provincial + "']").attr("selected", "selected");
 
                 $('#postalcode').val(JSON.stringify(result.data.user.profile.postalCode));
                 $('#part_time').val(JSON.stringify(result.data.user.profile.professionalAffiliations));
                 $('#professial').val(JSON.stringify(result.data.user.profile.undertake));
                 $('#administrative').val(JSON.stringify(result.data.user.profile.administrativeFunction));
                 //政治面貌
                 var political = JSON.stringify(result.data.user.profile.politicsStatus);
                 $('#political option[value=0]').html(JSON.stringify(result.data.user.profile.politicsStatus));
                 $("#political option[value='" + political + "']").attr("selected", "selected");
                 $('#phone').val(JSON.stringify(result.data.user.profile.phoneNumber));
                 $('#telephone').val(JSON.stringify(result.data.user.profile.officePhone));
                 $('#email').val(JSON.stringify(result.data.user.profile.email));
                 $('#work_unit').val(JSON.stringify(result.data.user.profile.department));



                $('#account').val(JSON.stringify(result.data.user.userName).replace(/\"/g, ""));
                              
                if (userId == 1) {
                    //所属体系名称
                    sysId = JSON.stringify(result.data.user.system.id);
                    $("#systemName option[value='" + sysId + "']").attr("selected", "selected")
                    //console.log($('option:selected', '#systemName').index())
                    //功能研究室
                    $('#laboratoryName option[value=0]').html(JSON.stringify(result.data.user.laboratory).replace(/\"/g, ""));
                    //综合试验站
                    $('#stationName option[value=0]').html(JSON.stringify(result.data.user.station).replace(/\"/g, ""));
                    systemId = JSON.stringify(result.data.user.system.id);
                    //岗位专家
                    $("input[name='job']").attr("disabled") == false;
                } else {
                    //体系名称
                    $('#systemName option[value=0]').html(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
                    $('#systemName').attr("disabled", "true")
                    //岗位
                    $("input[name='job']").attr('disabled', 'disabled');
                    var gw = JSON.stringify(result.data.user.roles[0].description).replace(/\"/g, "");
                    $("#title input[value='" + gw + "']").prop('checked', 'true')
                    //功能研究室
                   // console.log(JSON.stringify(result.data.user.laboratory))
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
        var sysId = ($('option:selected', '#systemName').index())       
        $.ajax({
            url: urlParam3,
            type: 'get',
            data: { "systemId": sysId },
            dataType: 'json',
            success: function (result) {
                if (result.code == 100) {
                    //   console.log(JSON.stringify(result));
                    // console.log(JSON.stringify(result.data.laboratories.length));
                    var labLength = JSON.stringify(result.data.laboratories.length);
                    var htmlStr = '';
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
            data: { "systemId": sysId },
            dataType: 'json',
            success: function (result) {
                if (result.code == 100) {
                    console.log(JSON.stringify(result));
                    console.log(JSON.stringify(result.data.stations.length));
                    var staLength = JSON.stringify(result.data.stations.length);
                    var htmlStr = '';
                    for (var i = 0; i < staLength; i++) {
                        htmlStr += ' <option value=' + JSON.stringify(result.data.stations[i].station.id) + '>' + JSON.stringify(result.data.stations[i].station.staName).replace(/\"/g, "") + '</option>';
                    }
                    $('#stationName').append(htmlStr);
                }
            }
        })

    });

    
   

});


   
