

(function ($) {
    "use strict";
    var input = $('.validate-input .input100');
    let data = ``;
    
    $('.validate-form').on('submit',function(e){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if(!check) {
            return false;
        }
        e.preventDefault();
        for(var i=0; i<input.length; i++) {
            data = data + `${$(input[i]).attr('name')}=${$(input[i]).val()}${i=== input.length -1 ? '' : '&'}`
        }
        fetch(`https://quirky-minsky-673bde.netlify.app/.netlify/functions/create?${data}`)
        .then(res => res.json())
        .then(data => {
          $('.container-login100-form-btn').css('display', 'none');
          $('.validate-input').css('display', 'none');
          $('.msg').css('display', 'block');
        });
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).val().trim() == '') {
            return false;
        }
        if(
            (($(input).attr('name')) === 'phone') && ($(input).val().length != 10)
        ) {
            return false;
        }
        if(
            (($(input).attr('name')) === 'state') &&
            (($(input).val()) === '-1')
        ) {
            return false;
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);