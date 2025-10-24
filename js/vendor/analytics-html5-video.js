/**
 * Capture video events to Google Analytics 
 *
 * Source: https://gist.github.com/placeless/6067714
 *
 * Usage:
 */
document.addEventListener('DOMContentLoaded', init, false);
var videoId = document.getElementById('video-id');
var videoTitle = videoId.getAttribute('title');
 
function init () {
	videoId.addEventListener('ended', videoEnd, false);
	videoId.addEventListener('timeupdate', videoTimeUpdate, false);
	videoId.addEventListener('play', videoPlay, false);
	videoId.addEventListener('pause', videoPause, false);
	
	//sessionStorage doesn't hold booleans, only strings
	sessionStorage.setItem("isTrue", 1);
	sessionStorage.setItem("isFalse", 0);

	//stores whether percentage updates have been sent. Defaults to false
	sessionStorage.setItem('twentyfivePercentSent', 0);
	sessionStorage.setItem('fiftyPercentSent', 0);
	sessionStorage.setItem('seventyfivePercentSent', 0);

}

function setKeyFrames (duration) {
	var quarter = (duration / 4).toFixed(0);
	sessionStorage.setItem('twentyfivePercent', quarter);
	sessionStorage.setItem('fiftyPercent', (quarter * 2).toFixed(0));
	sessionStorage.setItem('seventyfivePercent', (quarter * 3).toFixed(0));

}

function videoTimeUpdate () {
	
	var curTime = videoId.currentTime.toFixed(1);
	
	var isTrue = sessionStorage.getItem("isTrue");
	var isFalse = sessionStorage.getItem("isFalse");

	var twentyfivePercent = parseInt(sessionStorage.getItem('twentyfivePercent'));
	var fiftyPercent = parseInt(sessionStorage.getItem('fiftyPercent'));
	var seventyfivePercent = parseInt(sessionStorage.getItem('seventyfivePercent'));

	//flags to check whether the updates were sent
	var twentyfivePercentSent = sessionStorage.getItem('twentyfivePercentSent');
	var fiftyPercentSent = sessionStorage.getItem('fiftyPercentSent');
	var seventyfivePercentSent = sessionStorage.getItem('seventyfivePercentSent');
	
	if (twentyfivePercentSent == isFalse && curTime >= twentyfivePercent && curTime < fiftyPercent){
		ga('send', 'event', 'video', '25% video played', videoTitle);
		sessionStorage.setItem('twentyfivePercent', null);
		sessionStorage.setItem('twentyfivePercentSent', isTrue);

	}else if (fiftyPercentSent == isFalse && curTime >= fiftyPercent && curTime < seventyfivePercent){
		ga('send', 'event', 'video', '50% video played', videoTitle);
		sessionStorage.setItem('fiftyPercent', null);
		sessionStorage.setItem('fiftyPercentSent', isTrue);

	}else if (seventyfivePercentSent == isFalse &&  curTime >= seventyfivePercent){
		ga('send', 'event', 'video', '75% video played', videoTitle);
		sessionStorage.setItem('seventyfivePercent', null);
		sessionStorage.setItem('seventyfivePercentSent', isTrue);

	}
}

function videoEnd () {
	ga('send', 'event', 'video', '100% video played', videoTitle);
}

function videoPlay () {
	ga('send', 'event', 'video', 'video played', videoTitle);
	setKeyFrames(this.duration);
}

function videoPause () {
	ga('send', 'event', 'video', 'video paused', videoTitle);
}
