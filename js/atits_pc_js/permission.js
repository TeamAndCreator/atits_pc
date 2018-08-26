var rolesId=JSON.parse(sessionStorage.getItem("rolesId"));
$(document).ready(function() {

    if (rolesId == null) {
        window.location.href="login.html";
    }
    if(rolesId.indexOf(1)!=-1){
        $("li").css('display','block');
        $("#taskProgress").css('display','none')
    }
    if (rolesId.indexOf(3)!=-1||rolesId.indexOf(4)!=-1){
        $("#lab,#sta,#test,#person").css('display','block')
    }

    $(".mnp-name").text(sessionStorage.getItem("userName"))



})