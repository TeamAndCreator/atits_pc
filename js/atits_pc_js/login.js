

    // $(document).ready(function() {
    //     $("#login").click(function () {
    //         var param={
    //             "userName":$("#userName").val(),
    //             "password":$("#password").val()
    //         }
    //         $.ajax({
    //             crossDomain : true,
    //             url:"http://47.104.26.79:8080/atits_service/login/login",
    //             dataType:"json",
    //             data:param,
    //             type:"post",
    //             async:false,
    //             success:function (result) {
    //                 if (result.code == 100 ){
    //                     var roles=result.data.user.roles;
    //                     var rolesId=[];
    //                     for (var i = 0; i < roles.length;i++){
    //                         rolesId.push(roles[i].id)
    //                     }
    //                     rolesId=JSON.stringify(rolesId);
    //                     sessionStorage.setItem("rolesId",rolesId);
    //                     window.location.href = "index.html"
    //                 }else {
    //                     alert("账号或密码错误");
    //                 }
    //             }
    //         });
    //     })
    // })


    var code ;
    function createCode(){
        code = new Array();
        var codeLength = 4;
        var checkCode = document.getElementById("checkCode");
        checkCode.value = "";
        var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(var i=0;i<codeLength;i++) {
            var charIndex = Math.floor(Math.random()*32);
            code +=selectChar[charIndex];
        }
        checkCode.value = code;
    }


    function validate () {
        var inputCode = document.getElementById("yzm").value.toUpperCase();
        if(inputCode != code ){
            alert("验证码错误！");
        }else{
            logFun();
        }
    }
    function logFun(){
        var param={
            "userName":$("#userName").val(),
            "password":$("#password").val()
        }
        $.ajax({
            crossDomain : true,
            url:"http://47.104.26.79:8080/atits_service/login/login",
            dataType:"json",
            data:param,
            type:"post",
            async:false,
            success:function (result) {
                if (result.code == 100 ){
                    var systemId=result.data.user.system.id;
                    var roles=result.data.user.roles;
                    var rolesId=[];
                    for (var i = 0; i < roles.length;i++){
                        rolesId.push(roles[i].id)
                    }
                    rolesId=JSON.stringify(rolesId);
                    sessionStorage.setItem("systemId",systemId);
                    sessionStorage.setItem("rolesId",rolesId);
                    window.location.href = "index.html";
                }else {
                    alert("账号或密码错误");
                }
            }
        });
    }
