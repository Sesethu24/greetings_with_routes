document.addEventListener('DOMContentLoaded', function () {

  var error = document.querySelector('.message');

  if (error.innerHTML !== '') {
    setTimeout(function () {
      error.innerHTML = '';
    }, 3000);

  }
});




