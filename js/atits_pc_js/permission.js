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
        $("#lab,#sta,#person").css('display','block')
    }
    if (sessionStorage.getItem("systemId") == null) {
        $("#mainnav-menu").html("<li>\n" +
            "                                        <a href=\"index.html\">\n" +
            "                                            <i class=\"demo-psi-home\"></i>\n" +
            "                                            <span class=\"menu-title\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>平台首页</strong>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n" +
            "                                        </a>\n" +
            "                                    </li>\n" +
            "                                    <li id=\"test\">\n" +
            "                                        <a href=\"test_manager.html\">\n" +
            "                                            <i class=\"fa fa-magnet\"></i>\n" +
            "                                            <span class=\"menu-title\">\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>考评管理</strong>\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n" +
            "                                        </a>\n" +
            "                                    </li>")
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

    $("#personal_profile").attr("href", "personal_profile.html?id=" + sessionStorage.getItem("userId"));
    
    $("#resetPassWord").attr("href", "resetPassword.html");
    $("#logiout").click(function () {
            sessionStorage.clear();
            window.location.href="login.html";
        }
    )


})