$(document).ready(function() {
    if ($('#search').val().length > 2) {
      $('.title').hide();
      $('#search').removeClass('search-big-mode')
      $('#search').addClass('search-small-mode')
      search = $('#search').val();

      $.ajax('/search', {
        data: { 'search': search }, 
        success: function(response) {
          $('#results').empty()
          $('#results').html(response)
          $('#tabs').tabs();
        }
      });
  })
})