(function($){
  
    urlParam1 = ipValue + '/user/findById';
    urlParam2 = ipValue + '/user/update';
    var userId = sessionStorage.getItem("userId");
    
 $.ajax({
         url: urlParam1,
         type: 'get',
         data:{ "userId" : userId } ,
         dataType: 'json',
         success: function(result){
             if(result.code == 100){
                  //console.log(JSON.stringify(result));
                  $('#name').val(JSON.stringify(result.data.user.profile.name).replace(/\"/g, ""));
                  $('#sex').val(JSON.stringify(result.data.user.profile.sex));
                  $('#birthdate').val(JSON.stringify(result.data.user.profile.birthdate));
                  $('#nation').val(JSON.stringify(result.data.user.profile.nation));
                  $('#address').val(JSON.stringify(result.data.user.profile.address));
                  $('#degree').val(JSON.stringify(result.data.user.profile.degree));
                  $('#school').val(JSON.stringify(result.data.user.profile.graduateInstitutions));
                  $('#graduation_date').val(JSON.stringify(result.data.user.profile.graduationDate));
                  $('#major').val(JSON.stringify(result.data.user.profile.major));
                  $('#professial').val(JSON.stringify(result.data.user.profile.undertake));
                  $('#administrative').val(JSON.stringify(result.data.user.profile.administrativeFunction));
                  $('#expertise').val(JSON.stringify(result.data.user.profile.professionalExpertise));                 
                  $('#account').val(JSON.stringify(result.data.user.userName).replace(/\"/g, ""));                   
                  $('#password').val(JSON.stringify(result.data.user.password));
                  $('#tixi_name').val(JSON.stringify(result.data.user.system.systemName).replace(/\"/g, ""));
                  $('#education').val(JSON.stringify(result.data.user.profile.education));
                  $('#ministeria').val(JSON.stringify(result.data.user.profile.ministerialExpert));
                  $('#provincial').val(JSON.stringify(result.data.user.profile.provincialExpert));
                  $('#postalcode').val(JSON.stringify(result.data.user.profile.postalCode));
                  $('#part_time').val(JSON.stringify(result.data.user.profile.professionalAffiliations));                                
                  $('#professial').val(JSON.stringify(result.data.user.profile.undertake));
                  $('#administrative').val(JSON.stringify(result.data.user.profile.administrativeFunction));        
                  $('#political').val(JSON.stringify(result.data.user.profile.politicsStatus));
                  $('#phone').val(JSON.stringify(result.data.user.profile.phoneNumber));
                  $('#telephone').val(JSON.stringify(result.data.user.profile.officePhone));
                  $('#email').val(JSON.stringify(result.data.user.profile.email));
                  $('#work_unit').val(JSON.stringify(result.data.user.profile.department));
             }

         }
 });

 $(document).on('click',"#update",function(){
      // alert(111);
       //console.log("表单数据为："+$("#my_form").serialize()+",下面发送put请求"); 
       $.ajax({
        url: urlParam2,  
        type:'PUT',     
        data:$('#my_form').serialize(),   
        dataType:'jsonp',
        success: function(result){
            if(result.code == 100){
                console.log('success')
            }
        }
       });
   })

 })(jQuery)  
   
 
  
