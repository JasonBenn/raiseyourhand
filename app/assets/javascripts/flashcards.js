$(document).ready(function() {
  $('span').click(function() {
    $('.flashcards').css({'display':'block'});
    var contentId = $(this).data('content-id');
    loadQuiz(contentId);
  });
});

function loadQuiz(contentId) {
  $.get('/flashcards?content_id='+contentId, function(response) {
    $('#flashcards-data').remove();
    $('body').append(response);
    quizGame(contentId);
  });
};

function quizGame(contentId) {
  pauseVideo();
  var cards = $('#flashcards-data').data('flashcards');
  var counter = 0;
  $('#card').html(getCard(counter));
  counter++;
  hideBack();
  $('.show-back').show();

  $('.show-back').click(function() {
    showBack();
  });

  $('.next-card').click(function() {
    if (!endOfDeck()) {
      $('#card').html(getCard(counter));
      counter++
      $('.show-back').show();
    } else {
      $('#card').html("End of deck! Close window to move to next video!");
    };
    hideBack();
  });

  $('#flashcards-done').click(function() {
    $('.flashcards').css({'display':'none'});
    playVideo();
  });

  function getCard(i) {
    return  '<div id="front">' + 
              "<p>" + cards[i].front + "</p>" +
            '</div>' +
            '<hr>' +
            '<div id="back">' +
              "<p>" + cards[i].back + "</p>" +
            '</div>';
  };

  function hideBack() {
    $('#back').hide();
    $('.next-card').hide();
  };

  function showBack() {
    $('#back').show();
    $('.show-back').hide();
    $('.next-card').show();
  };

  function endOfDeck() {
    return (counter === cards.length);
  };
};
