$(document).on('click', '.SignUp', function (e)
 {
 	var $input = $('#input');
  	var checked = $('#input').prop('checked');
  if (!checked)
   {
    $input.prop('checked', true); /*  this opens up sign up link */
   }
});

$(document).on('submit', 'form', function (e)
 {
  e.preventDefault();
  console.log($('#email').val())
  if($('#email').val() != "" && $('#pass').val() != "") {
  	window.open("file:///Users/Rosa/Desktop/3308-Tech-BuzzWords/LogInPage/Log_In.html");
  }
   
  });
