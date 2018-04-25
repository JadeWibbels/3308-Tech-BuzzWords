$(document).on('click', '.SignUp', function (e) {
  var $input = $('#input');
  var checked = $('#input').prop('checked');
  if (!checked) {
    $input.prop('checked', true);
  }
});

$(document).on('submit', 'form', function (e) {
  e.preventDefault();
});