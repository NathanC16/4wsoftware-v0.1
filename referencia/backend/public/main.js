(function ($) {
  "use strict";

  // Focus input
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() !== "") {
        $(this).addClass('has-val');
      } else {
        $(this).removeClass('has-val');
      }
    });
  });

  // Validate
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (!validate(input[i])) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    const value = $(input).val().trim();
    const isEmail = $(input).attr('type') === 'email' || $(input).attr('name') === 'email';

    if (isEmail) {
      const regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
      return regex.test(value);
    }

    return value !== '';
  }

  function showValidate(input) {
    $(input).parent().addClass('alert-validate');
  }

  function hideValidate(input) {
    $(input).parent().removeClass('alert-validate');
  }

  // Show password toggle
  var showPass = 0;
  $('.btn-show-pass').on('click', function () {
    const input = $(this).next('input');
    const isPassword = input.attr('type') === 'password';

    input.attr('type', isPassword ? 'text' : 'password');
    $(this).toggleClass('active');
    showPass = isPassword ? 1 : 0;
  });

})(jQuery);
