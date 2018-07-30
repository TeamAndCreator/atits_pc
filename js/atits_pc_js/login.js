
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


    function keyEnter(e){
        var e = e||event;
        if(e.keyCode == 13){
            document.getElementsByName("submit")[0].click();
        }
    }
    document.onkeydown = keyEnter;



    function validate() {
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
            url:ipValue+"/login/login",
            dataType:"json",
            data:param,
            type:"post",
            async:false,
            success:function (result) {
                if (result.code == 100 ){
                    var systemId=result.data.user.system.id;
                    var roles=result.data.user.roles;
                    var systemName=result.data.user.system.systemName;
                    var rolesId=[];
                    for (var i = 0; i < roles.length;i++){
                        rolesId.push(roles[i].id)
                    }
                    rolesId=JSON.stringify(rolesId);
                    sessionStorage.setItem("systemId",systemId);
                    sessionStorage.setItem("rolesId",rolesId);
                    sessionStorage.setItem("systemName",systemName);
                    window.location.href = "index.html";
                }else {
                    alert("账号或密码错误");
                }
            }
        });
    }


    //判断用户名和密码是否为空
    function checkInCorrect()
    {
        if (document.getElementById('userName').value=="")
        {
            alert('请输入用户名！')
            document.getElementById('userName').focus();
            return false;
        }
        if (document.getElementById('password').value=="")
        {
            alert('请输入密码！')
            document.getElementById('password').focus();
            return false;
        }
        else
        {
            saveInfo();
            return true;
        }
    }


    saveInfo = function(){
        try{
            var isSave = document.getElementById('remember-password').checked;   //保存按键是否选中
            if (isSave) {
                var usernm = document.getElementById('userName').value;
                var userpsw = document.getElementById('password').value;
                if(usernm!="" && userpsw!=""){
                    SetCookie(usernm,userpsw);
                }
            }else {
                SetCookie("","");
            }
        }catch(e){

        }
    }

    function SetCookie(usernm,userpsw){
        var oDate = new Date();
        oDate.setTime(oDate.getTime() + 1866240000000);
        document.cookie ="username=" + usernm + "%%"+userpsw+";expires="+ oDate.toGMTString() ;
    }

    function GetCookie(){
        var nmpsd;
        var nm;
        var psd;
        var cookieString = new String(document.cookie);
        var cookieHeader = "username=";
        var beginPosition = cookieString.indexOf(cookieHeader);
        cookieString = cookieString.substring(beginPosition);
        var ends=cookieString.indexOf(";");
        if (ends!=-1){
            cookieString = cookieString.substring(0,ends);
        }
        if (beginPosition>-1){
            nmpsd = cookieString.substring(cookieHeader.length);
            if (nmpsd!=""){
                beginPosition = nmpsd.indexOf("%%");
                nm=nmpsd.substring(0,beginPosition);
                psd=nmpsd.substring(beginPosition+2);
                document.getElementById('userName').value=nm;
                document.getElementById('password').value=psd;
                if(nm!="" && psd!=""){
                    document.getElementById('remember-password').checked = true;
                }
            }
        }
    }

