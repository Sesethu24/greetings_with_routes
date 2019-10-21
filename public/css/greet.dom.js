document.addEventListener('DOMContentLoaded', function () {

  var error = document.getElementById('message');

  if (error.innerHTML !== '') {
    setTimeout(function () {
      error.innerHTML = '';
    }, 3000);

  }
});




