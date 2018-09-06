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
                              
                if (sessionStorage.getItem("userId") == 1) {
                    //所属体系名称
                    if(result.data.user.system!=null){
                        sysId = JSON.stringify(result.data.user.system.id);
                        $("#systemName option[value='" + sysId + "']").attr("selected", "selected")
                    }else{
                        $("#systemName option[value=0]").html("无")
                    }
                    //console.log($('option:selected', '#systemName').index())
                    if(result.data.user.laboratory!=null){
                        //功能研究室
                        $('#laboratoryName option[value=0]').html(JSON.stringify(result.data.user.laboratory.labName).replace(/\"/g, ""));
                    }else{
                        $("#laboratoryName option[value=0]").html("无")
                    }
                    if(result.data.user.station!=null){
                        //综合试验站
                        $('#stationName option[value=0]').html(JSON.stringify(result.data.user.station.staName).replace(/\"/g, ""));
                    }else{
                        $('#stationName option[value=0]').html("无")
                    }
                    //岗位专家
                    for( var i = 0; i < result.data.user.roles.length;i++){
                        var gw = JSON.stringify(result.data.user.roles[i].id);
                        $("#title input[value='" + gw + "']").prop('checked', 'true')
                    }
                    
                    
                    $("input[name='job']").attr("disabled") == false;
                } else {
                    if(result.data.system!=null){
                        //体系名称
                        $('#systemName option[value=0]').html(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
                    }else{
                        $('#systemName option[value=0]').html("无")
                    };
                    $('#systemName').attr("disabled", "true")
                    //岗位
                    $("input[name='job']").attr('disabled', 'disabled');
                    var gw = JSON.stringify(result.data.user.roles[0].id);
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
        $('#laboratoryName option').remove();    
        $('#laboratoryName').append('<option value= "null">无</option>')
        $('#stationName option').remove();
        $('#stationName').append('<option value= "null">无</option>')
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


    $("#add").click(function (){




//岗位
        var roles = [];
                $("#title input[type='checkbox']:checked").each(function(i,ele){
                     var obj = {
                        "id": '',
                        "name": '',
                        "description": '',
                    };
                    obj.id = ele.value;
                    switch (parseInt(ele.value)){
                        case 2:
                            obj.name = 'expert';
                            obj.description = '行业主管人员';
                            
                            break;
                        case 3:
                            obj.name = 'shouxi';
                            obj.description = '首席专家';
                            break;
                        case 4:
                            obj.name = 'fu_shouxi';
                            obj.description = '副首席专家';
                            break;
                        case 5:
                            obj.name = 'master';
                            obj.description = '研究室主任';
                            break;
                        case 6:
                            obj.name = 'manager';
                            obj.description = '岗位专家';
                            break;
                        case 7:
                            obj.name = 'zhanzhang';
                            obj.description = '综合实验室站长';
                            break;
                    }
                     roles.push(obj)
                });
        

//user
        var user={
            "id":userId,
            "userName":$("#account").val(),
            "roles":roles,
            "profile":{
                "id":profileId,
                "name":$('#name').val(),
                "phoneNumber":$('#phone').val(),
                "officePhone":$('#telephone').val(),
                "email":$('#email').val(),
                "department":$('#work_unit').val(),
                "sex":$('#sex').val(),
                "nation":$('#nation').val(),
                "birthdate":$('#birthdate').val(),
                "politicsStatus":$('#political').val(),
                "education":$('#education').val(),
                "degree":$('#degree').val(),
                "graduateInstitutions":$('#school').val(),
                "graduationDate":$('#graduation_date').val(),
                "major":$('#major').val(),
                "undertake":$('#professial').val(),
                "administrativeFunction":$('#administrative').val(),
                "ministerialExpert":$('#ministeria').val(),
                "provincialExpert":$('#provincial').val(),
                "postalCode":$('#postalcode').val(),
                "address":$('#address').val(),
                "professionalAffiliations":$('#part_time').val(),
                "professionalExpertise":$('#expertise').val(),
            }
        }
        if($("#systemName option:selected").val()==null){
        }else{
            user["system.id"]=$("#systemName option:selected").val()
            if($("#laboratoryName option:selected").val()== 0){
                
            }else{
                user["laboratory.id"]=$("#laboratoryName option:selected").val();
            }
            if($("#stationName option:selected").val()== 0){
                
            }else{
                user["station.id"]=$("#stationName option:selected").val();
            }
        }
        console.log(user)
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: ipValue + '/user/update1',
            data: {_method: "put", "user": user},
            async: false,
            success: function (result) {
                console.log(result)
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