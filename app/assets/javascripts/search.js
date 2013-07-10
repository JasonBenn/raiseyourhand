$(document).ready(function() {
  var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $('.basic-container').on('keyup', '#search', function() {
    delay(function(){
      if ($('#search').val().length > 0) {
        $('.title').hide();
        $('#search').removeClass('search-big-mode')
        $('#search').addClass('search-small-mode')
        search = $('#search').val();

        $.get('/search', { 'search': search }, replaceWithResults);
      };

      if ($('#search').val().length === 0) {
        $.post('lessons/list', replaceWithResults);
      }
    }, 200);
  })


  function replaceWithResults(serverResponse) {
    $('#results').empty();
    $('#results').html(serverResponse);
  };
})