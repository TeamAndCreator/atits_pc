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


    var id = parseInt(getQueryVariable('id'));
    var notice;
    var update_url="/notice/update";
    $.ajax({
        crossDomain: true,
        url: ipValue + "/notice/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            notice = result.data.notice;
            $('input[name="title"]').val(notice.title);
            $('#demo-summernote').summernote('code',notice.content);
            if (notice.files.length != 0) {
                $("#files_add").css("display","none");
                var str=[];
                for (var i=0; i < notice.files.length; i++) {
                    str[i]=notice.files[i].title
                }
                update_url="/notice/update1";
                $("#old_files_name").text(str.toString())
            }else {
                $("#old_files").css("display","none")
            }
        }
    });

    //删除文件按钮
    $("#old_files_change").click(function () {
        $("#old_files").css("display","none");
        $("#files_add").css("display","block");
        update_url="/notice/update";
        return false;
    });



    if (notice.user.id == sessionStorage.getItem("userId") || sessionStorage.getItem("userId") == 1) {
        $('#ul').append("<li class=\"previous\">\n" +
            "                                        <a data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><div class=\"demo-icon\"><i class=\"fa fa-pencil\"></i>修改</div></a>\n" +
            "                                    </li>");
    }
    $('input[name="system"]').val(sessionStorage.getItem("systemName"));

    //获取并发送修改表单
    $('#fix').click(function () {
        var formData = new FormData();
        var title = $('input[name="title"]').val();
        if (title == "") {
            alert("标题不能为空")
        } else {
            var content = $('#demo-summernote').summernote('code');
            formData.append("_method", "put");
            formData.append("id", notice.id);
            formData.append("title", title);
            formData.append("content", content);//具体内容
            formData.append("system.id", sessionStorage.getItem("systemId"));
            formData.append("user.id", sessionStorage.getItem("userId"));
            //将文件数组添加进来
            var multipartFiles = myDropzone.files;
            for (var i = 0; i < multipartFiles.length; i++) {
                formData.append("multipartFiles", myDropzone.files[i]);
            }
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + update_url,
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    window.location.reload();
                }
            });
        }
    });

    $('#title').text(notice.title);
    $('#systemName').text(notice.system.systemName);
    $('#date').text(notice.date);
    $('#content').html(notice.content);
    $('#userName').html(notice.user.profile.name);
    var files=notice.files;
    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + notice.files[i].path + notice.files[i].name + "' download='" + notice.files[i].title + "'>" + notice.files[i].title + "</a></small><br>"
        }
        $('#a').html(html)
    }
});
//获取url参数
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}









