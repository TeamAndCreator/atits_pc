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
    var report;
    $.ajax({
        crossDomain: true,
        url: ipValue + "/report/findById",
        dataType: "json",
        data: {"id": id},
        type: "get",
        async: false,
        success: function (result) {
            report=result.data.report;
        }
    });

    if (report.user.id == sessionStorage.getItem("userId") || sessionStorage.getItem("userId") == 1) {
        $('#ul').append("<li class=\"previous\">\n" +
            "                                        <a data-toggle=\"modal\" data-target=\"#demo-lg-modal\"><div class=\"demo-icon\"><i class=\"fa fa-pencil\"></i>修改</div></a>\n" +
            "                                    </li>");
    }
    $('input[name="system"]').val(sessionStorage.getItem("systemName"));

    //获取并发送修改表单
    $('#fix').click(function () {
        var formData = new FormData();
        var title = $('input[name="title"]').val();
        var content = $('#demo-summernote').summernote('code');
        formData.append("_method", "put");
        formData.append("id", report.id);
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
            url: ipValue + '/report/update',
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                window.location.reload();
            }
        });
    });

    $('#title').text(report.title);
    $('#systemName').text(report.system.systemName);
    $('#date').text(report.date);
    $('#content').html(report.content);
    $('#userName').html(report.user.profile.name);
    var files=report.files;
    if (files.length == 0) {
        $("#files").css("display", "none")
    } else {
        var html = "";
        for (var i = 0; i < files.length; i++) {
            html += "<small><a href='" + vr_path + "/" + report.files[i].path + report.files[i].name + "' download='" + report.files[i].title + "'>" + report.files[i].title + "</a></small><br>"
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








