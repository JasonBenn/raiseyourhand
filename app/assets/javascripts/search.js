$(document).ready(function() {
  $('#search').keyup(function() {
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
    };
    if ($('#search').val().length === 0) {
      $.get('/lessons', function(response) {
        // TODO: this overwrites CSS. controller should return more specific piece of homepage.
        $('body').html(response);
      })
    }
  })
})