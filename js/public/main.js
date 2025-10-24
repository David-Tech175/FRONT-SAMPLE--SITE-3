$(function () {
	$.validator.addMethod("alphaIntSpecialChar", function(value, element) {
		return this.optional(element) || value == value.match(/^(?:[a-zA-Z0-9:,!\*#&\(\)\. "'\r\n\r\n\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]|\u00A7|\u00B6)+$/);
	},"Input contains invalid characters");
	
	
	/* set default behavior */
	$.validator.messages.required = function(param,element) {
		return $.validator.format("{0} is required", element.title);
	}
	
	// jQuery Validate	
	$.validator.setDefaults({
		    errorPlacement: function(error, element) {
			      // if the input has a prepend or append element, put the validation msg after the parent div
		    	  if(element.parent().hasClass('input-append')) {
			        error.insertAfter(element.parent());
			      }else if(element.parent().parent().hasClass('input-append')){
			    	  error.insertAfter(element.parent().parent());
			      // else just place the validation message immediately after the input
			      }else if(element.parent().parent().parent().hasClass('input-append')){
			    	  error.insertAfter(element.parent().parent().parent());
				      // else just place the validation message immediately after the input
			      } else {
			    	  error.insertAfter(element);
			      }
		    },
		    errorElement: "span", // contain the error msg in a small tag

		    highlight: function(element) {
		    	$(element).closest('.form-group').removeClass('has-success');
		    	$(element).closest('.form-group').addClass('has-error'); // add the Bootstrap error class to the control group
		    },
		    success: function(element) {
		    	$(element).closest('span.error').removeClass('error');
		    	
		    	if(element.parent().hasClass('form-group')){
		  	      $(element).parent().closest('.form-group').removeClass('has-error'); // remove the Bootstrap error class from the control group
			      $(element).parent().closest('.form-group').addClass('has-success');	    		
		    	} else {
		  	      $(element).parent().find('.form-group').removeClass('has-error'); // remove the Bootstrap error class from the control group
			      $(element).parent().find('.form-group').addClass('has-success');	    		
		    	}

		    },
			onfocusout: function(element,event) {
				if(!$(element).hasClass('datepicker')) {
					//this.element(element);
				}
			}	    
		  });
//	$.validator.addMethod("number", function(value, element) {
//		return this.optional(element) || value == value.match(/^[0-9]+$/);
//		},"Input must contain only numbers");

    if ($.cookie("FVAP_desktop") == "true") {
        $("head").append('<meta name="viewport" content="width=1200, user-scalable=yes">');
        $(function () {
            if (window.screen.width < 850) {
                $("#mobile").css("display", "block")
            }
        })
    } else {
        $(function () {
            if (window.screen.width < 850) {
                $("#desktop").css("display", "block")
            }
        })
    }
    $(".navigation ul > li ul").mouseenter(function () {
        $(this).parent().addClass("hover")
    }).mouseleave(function () {
        $(this).parent().removeClass("hover")
    });
    var a = $("#jump-to");
    $(window).scroll(function () {
        var c = $(window).scrollTop();
        if (c > $("#header").height() + $("#menu").height()) {
            var b = (($(document).width() - $(".main-container").width()) / 2) + 10;
            a.css({
                position: "fixed",
                top: "10px"
            });
            a.css("right", b + "px")
        } else {
            a.css({
                position: "absolute",
                top: "10px",
                right: "5px"
            })
        }
    });
    $("#rule-4, #rule-5, #rule-6, #rule-7").each(function (b) {
        hideBlock4(b, this)
    });
    $("#rule-47, #rule-48, #rule-49, #rule-50").each(function (b) {
        hideBlock4(b, this)
    })
});

function hideBlock4(a, b) {
    if (a > 0) {
        $(b).html($(b).html().replace("Block 4: ", "<span>Block 4: </span>")).find("span").css("visibility", "hidden")
    }
}
$(function () {
	
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		$('.ios-alert').css('display', 'block');
	}
	
    $("#mobile-nav").click(function () {
        if ($("body").hasClass("expanded")) {
            $("body").removeClass("expanded");
            $("#sub-menu").removeClass("slide")
        } else {
            $("body").addClass("expanded")
        }
    });
    $("#back").click(function () {
        $("#sub-menu").toggleClass("slide")
    });
    $("#search-nav").click(function () {
        $("#search").toggleClass("expanded");
        $("#search-nav").toggleClass("expanded")
    });
    $(".mobile-overlay").click(function () {
        $("#mobile-nav").trigger("click")
    });
    $("#desktop").click(function () {
        $.cookie("FVAP_desktop", true, {
            path: "/"
        });
        location.reload(true)
    });
    $("#mobile").click(function () {
        $.cookie("FVAP_desktop", false, {
            path: "/"
        });
        location.reload(true)
    });
    $(".pagination").rPage();
    $(window).resize(function () {
        $(".navigation").hide();
        clearTimeout(this.id);
        this.id = setTimeout(b)
    });

    function b() {
        $(".navigation").show()
    }
    $(window).scroll(function () {
        if ($(window).width() < 480) {
            if ($(window).scrollTop() > $(document).height() - $("#footer").height()) {
                $("#breadcrumbs .social-media").fadeOut()
            } else {
                $("#breadcrumbs .social-media").fadeIn()
            }
        }
    });
    
    if (navigator.userAgent.match(/IEMobile\/10\.0/) && $.cookie("FVAP_desktop") != "true") {
        var a = document.createElement("style");
        a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.querySelector("head").appendChild(a)
    }
});

if (typeof jQuery != "undefined") {
    jQuery(document).ready(function (c) {
        var a = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
        var b = "";
        if (jQuery("base").attr("href") != undefined) {
            b = jQuery("base").attr("href")
        }
        jQuery("a").on("click", function (h) {
            var g = jQuery(this);
            var d = true;
            var e = (typeof (g.attr("href")) != "undefined") ? g.attr("href") : "";
            var f = e.match(document.domain.split(".").reverse()[1] + "." + document.domain.split(".").reverse()[0]);
            if (!e.match(/^javascript:/i)) {
                var j = [];
                j.value = 0, j.non_i = false;
                if (e.match(/^mailto\:/i)) {
                    j.category = "email";
                    j.action = "click";
                    j.label = e.replace(/^mailto\:/i, "");
                    j.loc = e
                } else {
                    if (e.match(a)) {
                        var i = (/[.]/.exec(e)) ? /[^.]+$/.exec(e) : undefined;
                        j.category = "download";
                        j.action = "click-" + i[0];
                        j.label = e.replace(/ /g, "-");
                        j.loc = b + e
                    } else {
                        if (e.match(/^https?\:/i) && !f) {
                            j.category = "external";
                            j.action = "click";
                            j.label = e.replace(/^https?\:\/\//i, "");
                            j.non_i = true;
                            j.loc = e
                        } else {
                            if (e.match(/^tel\:/i)) {
                                j.category = "telephone";
                                j.action = "click";
                                j.label = e.replace(/^tel\:/i, "");
                                j.loc = e
                            } else {
                                d = false
                            }
                        }
                    }
                } if (d) {
                 
                    ga('send', 'event', j.category.toLowerCase(), j.action.toLowerCase(), j.label.toLowerCase(), j.value, {'nonInteraction': j.non_i});

                    if (g.attr("target") == undefined || g.attr("target").toLowerCase() != "_blank") {
                        setTimeout(function () {
                            location.href = j.loc
                        }, 400);
                        return false
                    }
                }
                
            }
        })
    })
};

$(function() {
	$('.mailto-email').each(function() {
		$(this).wrapInner('<a href="mailto:' + $(this).html() + '" />');
	});

	$(".military-voter").click ( function(e){
		ga('set', 'dimension1', 'Military Voter');
	});
	$(".citizen-voter").click ( function() {
	    ga('set', 'dimension1', 'Overseas Voter');
	});
	$(".vao").click ( function() {
	    ga('set', 'dimension1', 'Voting Assistance Officer');
	});
	$(".eo").click ( function() {
	    ga('set', 'dimension1', 'Election Official');
	});
});

$(function() {
	$(".accordion-toggle-evag").click(function(){
		  if($(this).find('i:first').hasClass("fa-chevron-right")){
			  $(this).find('i:first').removeClass("fa-chevron-right");
			  $(this).find('i:first').addClass("fa-chevron-down");
		  }else{	
			  $(this).find('i:first').removeClass("fa-chevron-down");
			  $(this).find('i:first').addClass("fa-chevron-right");
		  }
	});
	
	$("span.candidate-name").each(function() {
		$(this).text(decodeHTMLEntities($(this).text()));
	});
	
});

function decodeHTMLEntities(text) {
	  return $("<textarea/>")
	    .html(text)
	    .text();
}

function validateRecaptcha() {
    var response = grecaptcha.getResponse();
    if (response.length === 0) {
        return showRecaptchaConfirm();
    } else {
    	return hideRecaptchaConfirm();
    }
}

function hideRecaptchaConfirm(){
	$("#recaptchaConfirm").hide();
	return true;
}

function showRecaptchaConfirm(){
	$("#recaptchaConfirm").show();
	return false;
}
function cleanUrl(url){
	var validateUrl = new RegExp(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/);
	
	if (url.match(validateUrl)) {
	    return url;
	} else {
	    console.log('Not a valid url')
		return url;
	}
}

function navigate(url){
	window.location.href = cleanUrl(url);
}

//Only doing this because of the false postives in the code scans

function validateForCo(url){
	window.location.href = cleanUrl(url);
}