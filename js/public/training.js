$(function(){
	$("ul.breadcrumb > li.home").addClass("last");
	$("ul.breadcrumb > li:not(.home):not(.active)").hide();
});