$(document).ready(function() {
  $('.vote').click(function(click) {
    click.stopPropagation();
    click.preventDefault();
    var link = $(this);
    var data = $(this).attr('href');
    $.post(data, function(response) {
      link.siblings('span').html(response.votes_count);
    });
  });
});
