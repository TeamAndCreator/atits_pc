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


    $('input[name="system"]').val(sessionStorage.getItem("systemName"));
    $('input[name="user"]').val(sessionStorage.getItem("userName"));

//添加添加删除框
    $('#txdt').html("<button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#demo-lg-modal\">\n" +
        "                               <i class=\"demo-pli-plus\"></i>添加</button>\n" +
        "                           <button class=\"btn btn-danger\" onclick=\"delete1()\" data-toggle=\"modal\" data-target=\"#delete_modal\"><i class=\"demo-pli-cross\"></i>删除</button>")

//日历
    $('#demo-dp-component .input-group.date').datepicker({autoclose: true});
    var data;
//根据不同角色，获取不同数据
    if (sessionStorage.getItem("systemId") == 1) {
        $.ajax({
            crossDomain: true,
            url: ipValue + "/dynamic/findForTXB",
            dataType: "json",
            type: "get",
            async: false,
            success: function (result) {
                data = result.data.dynamics
            }

        });
    } else if (rolesId.indexOf(3) != -1) {
        $.ajax({
            crossDomain: true,
            url: ipValue + "/dynamic/findForSX",
            dataType: "json",
            data: {"systemId": sessionStorage.getItem("systemId")},
            type: "get",
            async: false,
            success: function (result) {
                data = result.data.dynamics
            }

        });
    } else {
        $.ajax({
            crossDomain: true,
            url: ipValue + "/dynamic/findFor",
            dataType: "json",
            data: {"userId": sessionStorage.getItem("userId")},
            type: "get",
            async: false,
            success: function (result) {
                data = result.data.dynamics
            }

        });
    }
//设置table每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: data,
        columns: [{
            checkbox: true,
            formatter: 'check'
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
            field: 'date',
            align: 'center',
            title: '上传日期'
        }, {
            field: 'user.profile.name',
            title: '上传人员'
        }, {
            field: 'state',
            align: 'center',
            title: '状态',
            formatter: 'statusFormatter'
        }

        ]
    });
//获取并发送添加表单
    $('#add').click(function () {
        var formData = new FormData();
        var title = $('input[name="title"]').val();
        if (title == "") {
            alert("标题不能为空")
        } else {
            var content = $('#demo-summernote').summernote('code');
            formData.append("title", title);
            formData.append("content", content);//具体内容
            formData.append("system.id", sessionStorage.getItem("systemId"));
            formData.append("user.id", sessionStorage.getItem("userId"));
            if (rolesId.indexOf(1) != -1) {
                formData.append("state", 2);
            }
            //将文件数组添加进来
            var multipartFiles = myDropzone.files;
            for (var i = 0; i < multipartFiles.length; i++) {
                formData.append("multipartFiles", myDropzone.files[i]);
            }
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/dynamic/save',
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    window.location.reload();
                }
            });
        }

    });

//删除
    $('#delete_btn').click(function () {
        if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
            $("#delete_modal").modal('hide')
        } else {
            var a = $("#demo-custom-toolbar").bootstrapTable('getSelections');
            var b = [];
            for (var i = 0; i < a.length; i++) {
                b[i] = a[i].id
            }
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/dynamic/deleteByIds',
                data: {_method: "DELETE", "idList": b},
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload()
                }
            })
        }
    })

});

//checkbox
function check(value, row) {
    if (row.system.id == sessionStorage.getItem('systemId')) {
        if (rolesId.indexOf(1) != -1 || rolesId.indexOf(3) != -1) {
            return {
                disabled: false//设置可用
            }
        }
        if (sessionStorage.getItem("userId") == row.user.id) {
            return {
                disabled: false
            }
        }
    }
    return {
        disabled: true//设置不可用
    }
}

//超链接
function invoiceFormatter(value, row) {
    return '<a href="dynamic_detail.html?id=' + row.id + '" class="btn-link" >' + value + '</a>';
}

//状态
function statusFormatter(value, row) {
    var labelColor;
    var v;
    var icon = row.id % 2 === 0 ? 'fa-star' : 'fa-user';
    if (value == 0) {
        v = "待审核";
        labelColor = "warning"
        if (rolesId.indexOf(3) != -1) {
            return "<div class='label label-table label-" + labelColor + "'><a onclick='updateState(" + value + "," + row.id + ")' data-toggle=\"modal\" data-target=\"#demo-sm-modal\" style='color: white; cursor:default'>" + v + "</a></div>";
        } else {
            return '<div class="label label-table label-' + labelColor + '">' + v + '</div>';
        }
    } else if (value == 1) {
        v = "未通过";
        labelColor = "default";
        return '<div class="label label-table label-' + labelColor + '">' + v + '</div>';
    } else if (value == 2) {
        if (rolesId.indexOf(1) != -1) {
            v = "展示";
            labelColor = "primary";
            return "<div class='label label-table label-" + labelColor + "'><a onclick='updateState(" + value + "," + row.id + ")' data-toggle=\"modal\" data-target=\"#demo-sm-modal\" style='color: white; cursor:default'>" + v + "</a></div>";
        } else {
            v = "已通过";
            labelColor = "success"
            return '<div class="label label-table label-' + labelColor + '">' + v + '</div>';
        }
    } else if (value == 3) {
        v = "已展示";
        labelColor = "success";
        return '<div class="label label-table label-' + labelColor + '">' + v + '</div>';
    }
}

function updateState(value, dynamicId) {
    if (value == 0) {
        $('#sh').text("是否通过");
        $('#tg').click(function () {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/dynamic/updateState',
                data: {_method: "put", "id": dynamicId, "state": 2},
                async: false,
                success: function (data) {
                    window.location.reload()
                },
                error: function () {
                }
            })
        });
        $('#wtg').click(function () {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/dynamic/updateState',
                data: {_method: "put", "id": dynamicId, "state": 1},
                async: false,
                success: function (data) {
                    window.location.reload()
                },
                error: function () {
                }
            })
        })
    } else if (value == 2) {
        $('#sh').text("是否展示");
        $('#wtg').css('display', 'none');
        $('#tg').click(function () {
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/dynamic/updateState',
                data: {_method: "put", "id": dynamicId, "state": 3},
                async: false,
                success: function (data) {
                    window.location.reload()
                },
                error: function () {
                }
            })
        })
    }
}

//判断有没有选中需删除的项
function delete1() {
    if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
        $("#delete_h3").text("请至少选择一条");
    } else {
        $("#delete_h3").text("是否删除");
    }
}