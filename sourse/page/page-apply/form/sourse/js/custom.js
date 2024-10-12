(function ($) {
	("use strict");
    function mb_append() {
        var selected_value = document.getElementById("course_list").value;
        if(selected_value !== ''){
            $(".empty_warning").slideUp();
            $(".empty_warning").remove();
            $('.selected_item').append('<div style="display:none;" class="form-group clone cloned"><select name="course_name[]"><option selected value="'+selected_value+'">'+selected_value+'</option></select><span class="btn btn-info remove_clone_btn">Remove</span></div>');
            $("#course_list").val('').change();
            $(".cloned").slideDown();
        } else {
            console.log("Course has been selected.");
        }
        
    }

    function mb_clone(container) {
        // Clone the last child of mb_clone_single class
        let first = container.children('.form-group').first();
        let last = container.children('.form-group').last();
        let clone = first.clone();
        $(clone).append('<span class="btn btn-info remove_clone_btn">Remove</span>');
		// Insert clone.
        clone.insertAfter(last);
    }

    function addClone( e ) {
		e.preventDefault();
		var container = $( this ).closest( '.column' );
        // mb_clone( container );
		mb_append();
    }

    function removeClone(e) {
        e.preventDefault();
        var mb_col = $(this).closest('.selected_item');
        if ($(mb_col).find('.cloned').length !== 1) { /* Check if the clone div is the only child exist. */
            $(this).parent().remove();
        } else {
            alert("Should have select one course");
        }
    }

    function fileToUploadcheck(e){
        var files = e.currentTarget.files; // puts all files into an array
        // call them as such; files[0].size will get you the file size of the 0th file
        for (var x in files) {
            var filesize = ((files[x].size/1024)).toFixed(0); // MB
            if (files[x].name != "item" && typeof files[x].name != "undefined") {
                if(filesize <= 500){
                    if (files[x].type == 'image/jpeg' || files[x].type == 'image/jpg' || files[x].type == 'image/png'){
                        $('.btn-submit').prop("disabled",false);
                        $(this).parent().find('.error-check').fadeIn().removeClass('alert-error').addClass('alert-success').text('Ok');
                    } else {
                        console.log(files[x].type);
                        $(this).parent().find('.error-check').fadeIn().removeClass('alert-success').addClass('alert-error').text('Image Type should be JPG/JPEG/PNG');
                    }
                    
                } else if (filesize > 500){
                    $('.btn-submit').prop("disabled",true);
                    $(this).parent().find('.error-check').fadeIn().removeClass('alert-success').addClass('alert-error').text('Required filezise should be less than 500KB');
                }
            }
        }
    }

//     $(document).on("click", '.clone_btn', addClone);
	$(document).on("change", "#course_list", addClone);
    $(document).on("click", '.remove_clone_btn', removeClone);
    
    $(document).on("change", '#fileToUpload', fileToUploadcheck);
    $(document).on("change", '#signature', fileToUploadcheck);

})(jQuery);