$(document).ready(function () {

    urlParam = ipValue + '/user/findById';
    var userId = parseInt(getQueryVariable('id'));
    if (userId == sessionStorage.getItem("userId") || rolesId.indexOf(1) != -1) {
        $("#personal_add").attr("href", "personal_add.html?id=" + userId)
    } else {
        $("#personal_add").css('display', 'none');
    }

    $.ajax({
        url: urlParam,
        type: 'get',
        data: {"userId": userId},
        dataType: 'json',
        success: function (result) {
            if (result.code == 100) {
                $('#username').html(result.data.user.profile.name);
                switch (parseInt(result.data.user.profile.sex)) {
                    case 0:
                        $('#sex').html("男");
                        break;
                    case 1:
                        $('#sex').html("女");
                        break;
                }
                $('#birthday').html(result.data.user.profile.birthdate);
                $('#nation').html(result.data.user.profile.nation);
                $('#address').html(result.data.user.profile.address);
                switch (parseInt(result.data.user.profile.degree)) {
                    case 0:
                        $('#degree').html("其他");
                        break;
                    case 1:
                        $('#degree').html("学士");
                        break;
                    case 2:
                        $('#degree').html("硕士");
                        break;
                    case 3:
                        $('#degree').html("博士");
                        break;
                }
                $('#school').html(result.data.user.profile.graduateInstitutions);
                $('#graduation_date').html(result.data.user.profile.graduationDate);
                $('#major').html(result.data.user.profile.major);
                $('#professial').html(result.data.user.profile.undertake);
                $('#administrative').html(result.data.user.profile.administrativeFunction);
                var str=[];
                for (var i=0;i<result.data.user.roles.length;i++){
                    str[i]=result.data.user.roles[i].description
                }
                $('#title').html(str.toString());
                $('#account').html(result.data.user.userName);
                $('#password').html(result.data.user.password);
                if (result.data.user.system != null) {
                    $('#tixi_name').html(result.data.user.system.systemName);
                } else {
                    $('#tixi_name').html("无");
                }
                switch (parseInt(result.data.user.profile.education)) {
                    case 0:
                        $('#education').html("其他");
                        break;
                    case 1:
                        $('#education').html("初中");
                        break;
                    case 2:
                        $('#education').html("高中");
                        break;
                    case 3:
                        $('#education').html("大学");
                        break;
                    case 4:
                        $('#education').html("硕士");
                        break;
                    case 5:
                        $('#education').html("博士");
                        break;
                }
                switch (parseInt(result.data.user.profile.ministerialExpert)) {
                    case 0:
                        $('#ministeria').html("否");
                        break;
                    case 1:
                        $('#ministeria').html("是");
                        break;
                }
                switch (parseInt(result.data.user.profile.provincialExpert)) {
                    case 0:
                        $('#provincial').html("否");
                        break;
                    case 1:
                        $('#provincial').html("是");
                        break;
                }
                $('#postalcode').html(result.data.user.profile.postalCode);
                $('#part_time').html(result.data.user.profile.professionalAffiliations);
                $('#expertise').html(result.data.user.profile.professionalExpertise);
                $('#professial').html(result.data.user.profile.undertake);
                $('#administrative').html(result.data.user.profile.administrativeFunction);
                $('#title').html(result.data.user.profile.job);
                switch (parseInt(result.data.user.profile.politicsStatus)) {
                    case 0:
                        $('#political').html("其他");
                        break;
                    case 1:
                        $('#political').html("团员");
                        break;
                    case 2:
                        $('#political').html("党员");
                        break;
                }
                $('#phone').html(result.data.user.profile.phoneNumber);
                $('#telephone').html(result.data.user.profile.officePhone);
                $('#email').html(result.data.user.profile.email);
                $('#work_unit').html(result.data.user.profile.department);
                if (JSON.stringify(result.data.user.laboratory) == 'null') {
                    $('#laboratoryName').html('无');
                } else {
                    $('#laboratoryName').html(result.data.user.laboratory.labName);
                }
                //console.log(JSON.stringify(result.data.user.station))
                if (JSON.stringify(result.data.user.station) == 'null') {
                    $('#stationName').html('无')
                } else {
                    $('#stationName').html(result.data.user.station.staName);
                }

            }

        }
    });
})


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