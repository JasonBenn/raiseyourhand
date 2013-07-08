$(document).ready(function() {
	$('#search').keyup(function() {
    search = $('#search').val();
    $.get('/search', { 'search': search }, function(response) {
      $('ul').remove();
      $('#results').empty()
      $.each(response, function(index, item) {
        $('#results').append('<p>' + item.title + '</p>')
      })
      console.log(response)
    })
  })
})