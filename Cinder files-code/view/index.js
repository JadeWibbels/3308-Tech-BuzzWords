$(document).on('click', '.SignUp', function (e)
 {
 	var $input = $('#input');
  	var checked = $('#input').prop('checked');
  if (!checked)
   {
    $input.prop('checked', true); /*  this opens up sign up link */
   }
});

