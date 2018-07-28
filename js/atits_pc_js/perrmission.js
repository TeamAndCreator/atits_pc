$(document).ready(function() {

    var ipValue="http://47.104.26.79:8080/atits_service";
    var rolesId=JSON.parse(sessionStorage.getItem("rolesId"));
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