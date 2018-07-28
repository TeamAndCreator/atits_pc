var rolesId=JSON.parse(sessionStorage.getItem("rolesId"));
$(document).ready(function() {

    if (rolesId == null) {
        window.location.href="login.html";
    }
    if(rolesId.indexOf(1)!=-1){
        $("li").css('display','block')
    }
    if (rolesId.indexOf(3)!=-1){
        $("#lab,#sta,#test").css('display','block')

    }


})