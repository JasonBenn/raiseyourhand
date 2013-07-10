$(document).ready(function() {
	$('.toggle-button').click(function() {
		if ($(this).attr('data-opened') == 'true'){
			$(this).css({'background-position':'0px 0px', 'bottom':'-9px'}).attr('data-opened', 'false');
		} else {
			$(this).css({'background-position':'0px -30px', 'bottom':'-6px'}).attr('data-opened', 'true');
		};
		$(this).closest('.lesson-group').children('.lesson-group-bottom').slideToggle();
	});
});