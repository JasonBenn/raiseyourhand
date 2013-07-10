$(document).ready(function() {
	$('.toggle-button').click(function() {
		$(this).prev().slideToggle();
	});
});