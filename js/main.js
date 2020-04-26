

(function ($) {
    "use strict";
    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit',function(){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;

        $('#conact_response').text('');
                var data = {
                    "name": $('#name').val(),
                    "phone_number": $('#phone_number').val(),
                    "state_code": $('#state_list').val()
                }

                console.log("You clicked contact button");
                $.ajax({type: 'POST',
                    url: 'register_contact',
                    data: JSON.stringify(data),
                    success: function(data) {
                        $('#conact_response').text('Contact is added/updated for notifications');
                    },
                    error: function(data) {
                       console.log("data : ", data.responseJSON);
                       var message = data.responseJSON.message;

                       if (data.responseJSON.key) {
                          message = data.responseJSON.key + " "+message;
                       }

                       $('#conact_response').text(message);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        if($(input).val().trim() == '') {
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