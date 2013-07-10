$(document).ready(function() {
  $('.basic-container').on('keyup', '#search', function() {
    if ($('#search').val().length > 2) {
      $('.title').hide();
      $('#search').removeClass('search-big-mode')
      $('#search').addClass('search-small-mode')
      search = $('#search').val();

      $.ajax('/search', {
        data: { 'search': search }, 
        success: replaceWithResults
      });
    };

    if ($('#search').val().length === 0) {
      $.get('lessons/list', replaceWithResults);
    }
  })

  function replaceWithResults(serverResponse) {
    $('#results').empty();
    $('#results').html(serverResponse);
  };
})