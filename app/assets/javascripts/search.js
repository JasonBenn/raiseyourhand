$(document).ready(function() {
	$('#search').keyup(function() {
    $('.title').hide();
    $('#search').removeClass('search-big-mode')
    $('#search').addClass('search-small-mode')
    search = $('#search').val();
    $.get('/search', { 'search': search }, function(response) {
      $('#results').empty()
      $('#results').html(response)
    })
  })
})