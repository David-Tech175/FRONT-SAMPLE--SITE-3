$(function(){
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		$('.ios-alert-wrapper').show();
	} else {
			$('.ios-alert-wrapper').hide();
	}
});
