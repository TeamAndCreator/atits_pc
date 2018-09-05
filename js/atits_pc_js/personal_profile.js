$(document).ready(function () {
  
    urlParam = ipValue + '/user/findById';
    var userId = parseInt(getQueryVariable('id'));
    if (userId == sessionStorage.getItem("userId") || rolesId.indexOf(1) != -1) {
        $("#personal_add").attr("href", "personal_add.html?id=" +userId)
    } else {
        $("#personal_add").css('display','none');
    }
    
 $.ajax({
         url: urlParam,
         type: 'get',
         data:{ "userId" : userId } ,
         dataType: 'json',
         success: function(result){
             if(result.code == 100){
                  $('#username').html(JSON.stringify(result.data.user.profile.name).replace(/\"/g, ""));
                  $('#sex').html(JSON.stringify(result.data.user.profile.sex));
                  $('#birthday').html(JSON.stringify(result.data.user.profile.birthdate));
                  $('#nation').html(JSON.stringify(result.data.user.profile.nation));
                  $('#address').html(JSON.stringify(result.data.user.profile.address));
                  $('#degree').html(JSON.stringify(result.data.user.profile.degree));
                  $('#school').html(JSON.stringify(result.data.user.profile.graduateInstitutions));
                  $('#graduation_date').html(JSON.stringify(result.data.user.profile.graduationDate));
                  $('#major').html(JSON.stringify(result.data.user.profile.major));
                  $('#professial').html(JSON.stringify(result.data.user.profile.undertake));
                  $('#administrative').html(JSON.stringify(result.data.user.profile.administrativeFunction));
                  $('#title').html(JSON.stringify(result.data.user.roles[0].description).replace(/\"/g, ""));
                  $('#account').html(JSON.stringify(result.data.user.userName).replace(/\"/g, ""));                   
                  $('#password').html(JSON.stringify(result.data.user.password));
                 if (result.data.user.system != null) {
                     $('#tixi_name').html(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
                 }else{
                    $('#tixi_name').html("无");
                 }
                  $('#education').html(JSON.stringify(result.data.user.profile.education));
                  $('#ministeria').html(JSON.stringify(result.data.user.profile.ministerialExpert));
                  $('#provincial').html(JSON.stringify(result.data.user.profile.provincialExpert));
                  $('#postalcode').html(JSON.stringify(result.data.user.profile.postalCode));
                  $('#part_time').html(JSON.stringify(result.data.user.profile.professionalAffiliations));              
                  $('#expertise').html(JSON.stringify(result.data.user.profile.professionalExpertise));
                  $('#professial').html(JSON.stringify(result.data.user.profile.undertake));
                  $('#administrative').html(JSON.stringify(result.data.user.profile.administrativeFunction));
                  $('#title').html(JSON.stringify(result.data.user.profile.job));
                  $('#political').html(JSON.stringify(result.data.user.profile.politicsStatus));
                  $('#phone').html(JSON.stringify(result.data.user.profile.phoneNumber));
                  $('#telephone').html(JSON.stringify(result.data.user.profile.officePhone));
                  $('#email').html(JSON.stringify(result.data.user.profile.email));
                  $('#work_unit').html(JSON.stringify(result.data.user.profile.department));
                  if(JSON.stringify(result.data.user.laboratory) == 'null'){
                        $('#laboratoryName').html('无');
                  }else{
                      $('#laboratoryName').html(JSON.stringify(result.data.user.laboratory.labName).replace(/\"/g, ""));
                  }
                  //console.log(JSON.stringify(result.data.user.station))
                  if(JSON.stringify(result.data.user.station) == 'null'){
                      $('#stationName').html('无')
                  }else{
                      $('#stationName').html(JSON.stringify(result.data.user.station.staName).replace(/\"/g, ""));
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