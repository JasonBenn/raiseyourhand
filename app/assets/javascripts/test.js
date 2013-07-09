$(document).ready(function(){

$(".question-wrapper").on('click', function(e){
$(this).children(".lquestion").children('.lquestion-body').slideDown('fast');
});

$('.lquestion-body').on('click', function(e){
$(this).parent().parent().parent().siblings('.lanswer-container').slideToggle(500);
});

$('.chapter-view').submit(function(e){
	e.preventDefault();
	// alert("here");

var chapter = $('.chapter').val();
var second = $('#second').val();
var that = $('.lquestion-container.c'+chapter+'.m'+second)
var current = 
// alert(chapter);
// alert(second);

$('.lquestion-container').slideUp('fast');
$('.lanswer-container').slideUp('fast');
	that.children(".question-wrapper").children('.question-image').slideDown('fast')
that.slideDown('slow');
setTimeout(function() { showBody(that)}, 800); 
});

});

function showBody(that) {
that.children(".question-wrapper").children('.lquestion').children('.triangle-border').children('.lquestion-body').slideDown('fast');
};