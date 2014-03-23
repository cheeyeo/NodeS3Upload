function s3_upload(){
    var s3upload = new S3Upload({
        file_dom_selector: '#files',
        s3_sign_put_url: '/sign_s3',
        onProgress: function(percent, message) {
            $('#status').html('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            $('#status').html('Upload completed. Uploaded to: '+ public_url);
            $("#avatar_url").val(public_url);
            $("#preview").html('<img src="'+public_url+'" style="width:300px;" />');
        },
        onError: function(status) {
            $('#status').html('Upload error: ' + status);
        }
    });
}

$(function(){
    $('#files').on("change", s3_upload);
});