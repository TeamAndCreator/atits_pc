$(document).ready(function () {
    urlParam1 = ipValue + '/user/verifyPassword';
    urlParam2 = ipValue+ '/user/changePassword';
    var flag1,flag2,flag3;

    $("#oldPassword").blur(function () {
        var oldPsw = $("#oldPassword").val();
        $.ajax({
            url: urlParam1,
            type: 'post',
            dataType: 'json',
            async: false,
            data: {
                "userId": sessionStorage.getItem('userId'),
                "password": oldPsw,
            },
            success: function (result) {
                //console.log(11)
                if (result.code == 100) {
                    $("#tip1").html("<font color=\"#87b87f\" size=\"2\"> 密码正确 </font>");
                    flag1 = true;
                }
                if (result.code == 200) {
                    $("#tip1").html("<font color=\"red\" size=\"2\"> 密码错误 </font>");
                    flag1 = false;
                }
            },
            error: function(){
               // console.log(1111)
            } 
        })
    });

    $("#newPassword").blur(function () {
        var num = $("#newPassword").val().length;
        if (num < 8) {
            $("#tip2").html("<font color=\"red\" size=\"2\"> 密码太短</font>");
            flag2 = false;
        } else if (num > 18) {
            $("#tip2").html("<font color=\"red\" size=\"2\"> 密码太长</font>");
            flag2 = false;
        } else {
            $("#tip2").html("<font color=\"#87b87f\" size=\"2\"> 合格 </font>");
            flag2= true;
        }
    });

    $("#repeatPassword").blur(function () {
        var tmp = $("#newPassword").val();
        var num = $("#repeatPassword").val().length;
        if ($("#repeatPassword").val() != tmp) {
            $("#tip3").html("<font color=\"red\" size=\"2\">  密码错误 </font>");
            flag3 = false;
        } else {
            if (num >= 8 && num <= 18) {
                $("#tip3").html("<font color=\"#87b87f\" size=\"2\"> 合格 </font>");
                flag3 = true;
            } else {
                $("#tip3").html("<font color=\"red\" size=\"2\"> 不合格  </font>");
                flag3 = false;
            }
        }
    });

    $("#saveBtn").click(function () {
        var flag = true;
        var old = $("#oldPassword").val();
        var pass = $("#newPassword").val();
        var pass2 = $("#repeatPassword").val();
        var num1 = $("#newPassword").val().length;
        var num2 = $("#repeatPassword").val().length;
        if (num1 != num2 || num1 < 8 || num2 < 8 || num1 > 18 || num2 > 18 || pass != pass2) {
            flag = false;
        } else {
            flag = true;
        }
        if (flag&&flag1&&flag2&&flag3) {
            $.ajax({
                url: 'http://47.104.26.79:8080/atits_service/user/changePassword',
                type: 'post',
                dataType: 'json',
                async: false,
                traditional: true,
                data: {
                    _method: "put",
                    "userId": sessionStorage.getItem('userId'),
                    "password": pass,
                },
                success: function (result) {
                    if (result.code == 100) {
                        alert('密码修改成功！')
                        $("#oldPassword").val("");
                        $("#newPassword").val("");
                        $("#repeatPassword").val("");
                        $("#tip1").empty();
                        $("#tip2").empty();
                        $("#tip3").empty();
                        $("#tip4").delay(2000).hide(0);
                        window.location.href = "login.html"
                    } else {
                        alert('密码修改失败！')
                    }
                },
                error: function () {
                    alert('密码修改失败！')
                }
            });
        } else {
            alert('密码修改失败！')
        }
    });

    $('#close').click(function () {
       

    })
})