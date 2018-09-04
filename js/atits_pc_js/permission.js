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

    $(".mnp-name").text(sessionStorage.getItem("userName"));

    if (rolesId.indexOf(3)!=-1){
        $("#sys_control").attr("href","system_detail.html?id="+sessionStorage.getItem("systemId"))
    } else {
        $("#sys_control").remove()
    }

    if(sessionStorage.getItem("labId")!=null&&rolesId.indexOf(5)!=-1){
        $("#lab_control").attr("href","laboratory_detail.html?labId="+sessionStorage.getItem("labId"))
    }else {
        $("#lab_control").remove()
    }

    if(sessionStorage.getItem("staId")!=null&&rolesId.indexOf(7)!=-1){
        $("#sta_control").attr("href","station_detail.html?staId="+sessionStorage.getItem("staId"))
    }else {
        $("#sta_control").remove()
    }

    $("#logiout").click(function () {
            sessionStorage.clear();
            window.location.href="login.html";
        }
    )


})