// Form-File-Upload.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -


$(document).ready(function () {

    // DROPZONE.JS
    // =================================================================
    // Require Dropzone
    // http://www.dropzonejs.com/
    // =================================================================
    Dropzone.options.demoDropzone = { // The camelized version of the ID of the form element
        // The configuration we've talked about above
        autoProcessQueue: false,
        //uploadMultiple: true,
        //parallelUploads: 25,
        //maxFiles: 25,

        // The setting up of the dropzone
        init: function () {
            var myDropzone = this;
            //  Here's the change from enyo's tutorial...
            //  $("#submit-all").click(function (e) {
            //  e.preventDefault();
            //  e.stopPropagation();
            //  myDropzone.processQueue();
            //
            //}
            //    );

        }

    }


    // DROPZONE.JS WITH BOOTSTRAP'S THEME
    // =================================================================
    // Require Dropzone
    // http://www.dropzonejs.com/
    // =================================================================
    // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
    var previewNode = document.querySelector("#dz-template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var uplodaBtn = $('#dz-upload-btn');
    var removeBtn = $('#dz-remove-btn');
    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        url: "/target-url", // Set the url
        thumbnailWidth: 50,
        thumbnailHeight: 50,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#dz-previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });


    myDropzone.on("addedfile", function (file) {
        // Hookup the button
        uplodaBtn.prop('disabled', false);
        removeBtn.prop('disabled', false);
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
        $("#dz-total-progress .progress-bar").css({'width': progress + "%"});
    });

    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#dz-total-progress").style.opacity = "1";
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function (progress) {
        document.querySelector("#dz-total-progress").style.opacity = "0";
    });


    // Setup the buttons for all transfers
    uplodaBtn.on('click', function () {
        //Upload all files
        //myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    });

    removeBtn.on('click', function () {
        myDropzone.removeAllFiles(true);
        uplodaBtn.prop('disabled', true);
        removeBtn.prop('disabled', true);
    });


    // SUMMERNOTE
    // =================================================================
    // Require Summernote
    // http://hackerwins.github.io/summernote/
    // =================================================================
    $('#demo-summernote, #demo-summernote-full-width').summernote({
        height: '230px'
    });


    // SUMMERNOTE AIR-MODE
    // =================================================================
    // Require Summernote
    // http://hackerwins.github.io/summernote/
    // =================================================================
    $('#demo-summernote-airmode').summernote({
        airMode: true
    });


    // SUMMERNOTE CLICK TO EDIT
    // =================================================================
    // Require Summernote
    // http://hackerwins.github.io/summernote/
    // =================================================================
    $('#demo-edit-text').on('click', function () {
        $('#demo-summernote-edit').summernote({focus: true});
    });


    $('#demo-save-text').on('click', function () {
        $('#demo-summernote-edit').summernote('destroy');
    });


//判断当前用户角色，决定是否添加添加删除框
    if (rolesId.indexOf(1) != -1) {//设置体系办的页面
        $('#z').css('display', 'none');
        $('#fgzrw').html("<button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#demo-lg-modal\">\n" +
            "                               <i class=\"demo-pli-plus\"></i>添加</button>\n" +
            "                           <button class=\"btn btn-danger\" id='delete'><i class=\"demo-pli-cross\"></i>删除</button>")
        var tasks;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/task/findAll",
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                tasks = result.data.tasks
            }
        });
        $('#demo-custom-toolbar').bootstrapTable({
            idField: 'id',
            data: tasks,
            columns: [{
                checkbox: true,
            }, {
                field: 'system.systemName',
                align: 'center',
                title: '所属体系',
            }, {
                field: 'title',
                align: 'center',
                formatter: 'invoiceFormatter',
                title: '标题'
            }, {
                field: 'user.profile.name',
                title: '责任人'
            }, {
                field: 'stratTime',
                align: 'center',
                title: '起始时间'
            }, {
                field: 'endTime',
                align: 'center',
                title: '结束时间'
            }, {
                field: 'date',
                align: 'center',
                title: '上传日期'
            }
            ]
        });

        //获取本体系人员
        var dataUsers;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/teststart/import_persons",
            dataType: "json",
            data: {"sysId": sessionStorage.getItem("systemId")},
            type: "get",
            async: false,
            success: function (result) {
                dataUsers = result.data.users;
            }
        });
        //向责任人上写名字
        var htmlStr = '';
        for (i = 0; i < dataUsers.length; i++) {
            htmlStr += '<li class="checkbox">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="' + dataUsers[i].id + '">\n' +
                '             <label for="demo-checkbox-11"> ' + dataUsers[i].profile.name + '</label>\n' +
                '        </li>'
        }
        $('#menu').html(htmlStr);
        //只能选一个责任人
        $('#menu').find('input[type="checkbox"]').bind('click', function(){
            $('#menu').find('input[type="checkbox"]').not(this).attr("checked", false);
        });
        //(父任务)获取并发送添加表单
        $('#add').click(function () {
            var formData = new FormData();
            var title = $('input[name="title"]').val();
            var content = $('#demo-summernote').summernote('code');
            var systemId=$("#select option:selected").val();
            var userId=$("input[name = 'users']:checked").val();
            var stratTime = $('input[name="stratTime"]').val();
            var endTime = $('input[name="endTime"]').val();
            formData.append("title", title);
            formData.append("content", content);//具体内容
            formData.append("system.id",systemId);
            formData.append("user.id", userId);
            formData.append("stratTime", stratTime);
            formData.append("endTime", endTime);
            //将文件数组添加进来
            var multipartFiles = myDropzone.files;
            for (var i = 0; i < multipartFiles.length; i++) {
                formData.append("multipartFiles", myDropzone.files[i]);
            }

            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/task/save',
                data: formData,
                contentType: false,
                processData: false,
                success:function () {
                    window.location.reload();
                }
            });


        });
        //(父任务)删除
        $('#delete').click(function () {
            var a = $("#demo-custom-toolbar").bootstrapTable('getSelections');
            var b = [];
            for (var i = 0; i < a.length; i++) {
                b[i] = a[i].id
            }
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/task/deleteByIds',
                data: {_method: "DELETE", "idList": b},
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            })
        })
    } else if (rolesId.indexOf(3) != -1) {//设置首席的页面
        $('#zgzrw').html("<button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#demo-lg-modal\">\n" +
            "                               <i class=\"demo-pli-plus\"></i>添加</button>\n" +
            "                           <button class=\"btn btn-danger\" id='delete1'><i class=\"demo-pli-cross\"></i>删除</button>")
        //获取父任务数据
        var ftasks;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/task/findAll",
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                ftasks = result.data.tasks
            }
        });
        //父任务填表
        $('#demo-custom-toolbar').bootstrapTable({
            idField: 'id',
            data: ftasks,
            columns: [{
                checkbox: true,
            }, {
                field: 'system.systemName',
                align: 'center',
                title: '所属体系'
            }, {
                field: 'title',
                align: 'center',
                formatter: 'invoiceFormatter',
                title: '标题'
            }, {
                field: 'user.profile.name',
                title: '责任人'
            }, {
                field: 'stratTime',
                align: 'center',
                title: '起始时间'
            }, {
                field: 'endTime',
                align: 'center',
                title: '结束时间'
            }, {
                field: 'date',
                align: 'center',
                title: '上传日期'
            }
            ]
        });
        //获取子任务数据
        var ztasks;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/subTask/findBySystemId",
            data:{"systemId":sessionStorage.getItem("systemId")},
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                ztasks = result.data.subTasks
            }
        });
        //子任务填表
        $('#demo-custom-toolbar1').bootstrapTable({
            idField: 'id',
            data: ztasks,
            columns: [{
                checkbox: true,
            }, {
                field: 'fatherTask.title',
                align: 'center',
                title: '父任务',
                formatter:'fatherTask'
            }, {
                field: 'title',
                align: 'center',
                formatter: 'subTask',
                title: '标题'
            }, {
                field: 'bearer.profile.name',
                title: '责任人'
            }, {
                field: 'startTime',
                align: 'center',
                title: '起始时间'
            }, {
                field: 'endTime',
                align: 'center',
                title: '结束时间'
            }, {
                field: 'date',
                align: 'center',
                title: '上传日期'
            }
            ]
        });
        //写入父任务
        var ftasks2;
        var html2='';
        $.ajax({
            crossDomain: true,
            url: ipValue + "/task/findBySysId",
            data:{"sysId":sessionStorage.getItem("systemId")},
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                ftasks2 = result.data.tasks
            }
        });
        for (var i = 0; i < ftasks2.length; i++) {
            html2+="<option value="+ftasks2[i].id+">"+ftasks2[i].title+"</option>"
        }
        $('#frwlab').text("父任务");
        $('#select').html(html2)
        //写入责任人
        var bearers;
        var html3='';
        $.ajax({
            crossDomain: true,
            url: ipValue + "/user/findUserInSystem",
            data:{"systemId":sessionStorage.getItem("systemId")},
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                bearers = result.data.users
            }
        });
        for (var i = 0; i < bearers.length; i++) {
            html3+='<li class="checkbox">\n' +
                '   <input class="magic-checkbox" type="checkbox" name="users" value="' + bearers[i].id + '">\n' +
                '             <label for="demo-checkbox-11"> ' + bearers[i].profile.name + '</label>\n' +
                '        </li>';
        }
        $('#menu').html(html3)
        //只能选一个责任人
        $('#menu').find('input[type="checkbox"]').bind('click', function(){
            $('#menu').find('input[type="checkbox"]').not(this).attr("checked", false);
        });
        //(子任务)获取并发送添加表单
        $('#add').click(function () {
            var formData = new FormData();
            var title = $('input[name="title"]').val();
            var content = $('#demo-summernote').summernote('code');
            var fatherTaskId=$("#select option:selected").val();
            var bearerId=$("input[name = 'users']:checked").val();
            var stratTime = $('input[name="stratTime"]').val();
            var endTime = $('input[name="endTime"]').val();
            var systemId=sessionStorage.getItem("systemId");
            formData.append("title", title);
            formData.append("content", content);//具体内容
            formData.append("fatherTask.id",fatherTaskId);
            formData.append("bearer.id", bearerId);
            formData.append("startTime", stratTime);
            formData.append("endTime", endTime);
            formData.append("bearer.system.id", systemId);
            //将文件数组添加进来
            var multipartFiles = myDropzone.files;
            for (var i = 0; i < multipartFiles.length; i++) {
                formData.append("multipartFiles", myDropzone.files[i]);
            }

            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/subTask/save',
                data: formData,
                contentType: false,
                processData: false,
                success:function () {
                    window.location.reload();
                }
            });


        });
        //(子任务)删除
        $('#delete1').click(function () {
            var a = $("#demo-custom-toolbar1").bootstrapTable('getSelections');
            var b = [];
            for (var i = 0; i < a.length; i++) {
                b[i] = a[i].id
            }
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/subTask/deleteByIds',
                data: {_method: "DELETE", "idList": b},
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            })
        })
    } else {
        $('#f').css('display', 'none');
        //获取子任务数据
        var ztasks1;
        $.ajax({
            crossDomain: true,
            url: ipValue + "/subTask/findByBearerId",
            data:{"bearerId":sessionStorage.getItem("userId")},
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                ztasks1 = result.data.subTasks
            }
        });
        //子任务填表
        $('#demo-custom-toolbar1').bootstrapTable({
            idField: 'id',
            data: ztasks1,
            columns: [{
                checkbox: true,
            }, {
                field: 'fatherTask.title',
                align: 'center',
                title: '父任务',
                formatter:'fatherTask'
            }, {
                field: 'title',
                align: 'center',
                formatter: 'subTask',
                title: '标题'
            }, {
                field: 'bearer.profile.name',
                title: '责任人'
            }, {
                field: 'startTime',
                align: 'center',
                title: '起始时间'
            }, {
                field: 'endTime',
                align: 'center',
                title: '结束时间'
            }, {
                field: 'date',
                align: 'center',
                title: '上传日期'
            }
            ]
        });
    }

//日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});
    $('#demo-dp-component1 .input-group.date').datepicker({autoclose: true});
    $('#demo-dp-component2 .input-group.date').datepicker({autoclose: true});
    $('#demo-dp-component3 .input-group.date').datepicker({autoclose: true});

});
//超链接(子任务)
function subTask(value, row) {
    return '<a href="subTask_detail.html?id='+row.id+'"class="btn-link" >' + value + '</a>'
}

//超链接(子任务表中的父任务)
function fatherTask(value, row) {
    return '<a href="task_detail.html?id=' + row.fatherTask.id + '" class="btn-link" >' + value + '</a>';
}

//超链接(父任务)
function invoiceFormatter(value, row) {
    return '<a href="task_detail.html?id=' + row.id + '" class="btn-link" >' + value + '</a>';
}