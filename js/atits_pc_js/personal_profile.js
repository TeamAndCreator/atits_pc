(function($){
  
    urlParam = ipValue + '/user/findById';
    var userId = sessionStorage.getItem("userId");
    
 $.ajax({
         url: urlParam,
         type: 'get',
         data:{ "userId" : userId } ,
         dataType: 'json',
         success: function(result){
             if(result.code == 100){
                 // console.log(JSON.stringify(result));
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
                  $('#tixi_name').html(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
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
             }

         }
 });
 })(jQuery)
