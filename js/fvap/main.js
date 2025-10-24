$.fx.speeds._default = 250;
$.datepicker.setDefaults({
    showOn: 'both',
    buttonImage: baseResourceUrl + '/images/cal.png',
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: 'mm/dd/yy',
    onClose: function() { $(this).valid(); }
});

$(function() {
	doPoll();
    //default datatable settings: I wasn't able to find another reference to this anywhere, so I included it here. -Xyan 5/27/2015
    $.extend($.fn.dataTable.defaults, {
        //"scrollX":true,
        "stateSave": true,
        "stateDuration": -1
    });

    $('form').not('.no-cancel').filter(function() {
            var id = $(this).attr('id');
            return id && id.toLowerCase().indexOf('search') < 0;
        })
        // warning message when there are changes to the pages
        .on('change', 'select, input, textarea', function(event) {
            $(window).on('beforeunload.change', function(event) {
                // this is the message the browser will use to show the user
                return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
            });

            $(this).off(event);
        })
        .submit(function(event) {
            $(window).off('beforeunload.change');
        });

    $('input.datepicker').addClass("manualDate");
    $('input.datepicker').datepicker();

    //$('input.datetimepicker').addClass("manualDateTime");
    //$('input.datetimepicker').datetimepicker();

    $("#openDialog").dialog({
        autoOpen: false,
        height: 520,
        width: 800,
        show: "drop",
        hide: "drop",
        modal: true
    });

    $("#opener").click(function() {
        $("#openDialog").dialog("open");
        return false;
    });

    $("#confirmDialogTx").dialog({
        modal: true,
        bgiframe: true,
        width: 500,
        height: 200,
        autoOpen: false
    });

    $('input[type=submit][data-confirm]').click(function(event) {
        event.preventDefault();
        var $button = $(this);
        $button.prop('disabled', true);

        var $dialog = $('#dialog');

        if ($dialog.length < 1) {
            $dialog = $('<div id="dialog" />');
        }

        $dialog
            .attr('title', 'Confirm')
            .empty().append($button.data('confirm'))
            .dialog({
                modal: true,
                bgiframe: true,
                width: 500,
                height: 200,
                autoOpen: false
            })
            .dialog('option', 'buttons', {
                'Confirm': function(j) {
                    $(".evag-forms").addClass("hidden");
                    $(".linkRedAlert").removeClass("hidden");
                    
                    postEvag($button, 1);
                    setTimeout(function(){doPoll();},3000);
                    
                    $(this).dialog('close');
                },
                'Cancel': function() {
                    $button
                        .prop('disabled', false);
                    $(this).dialog('close');
                }
            })
            .dialog("open");
    });

    // * start generic delete confirmation features *
    // Generic delete confirmation dialog, the button must be a submit type.
    $('#confirmDelete').on('show.bs.modal', function(e) {
        $message = $(e.relatedTarget).attr('data-message');
        $(this).find('.modal-body p').text($message);
        $title = $(e.relatedTarget).attr('data-title');
        $(this).find('.modal-title').text($title);

        // Pass form reference to modal for submission on yes/ok
        var form = $(e.relatedTarget).closest('form');
        $(this).find('.modal-footer #confirm').data('form', form);
    });

    // Form confirm (yes/ok) handler, submits form
    $('#confirmDelete').find('.modal-footer #confirm').on('click', function() {
        $(this).data('form').submit();
    });
    // * end generic delete confirmation features * 

    $(".confirmDialog").click(function(e) {
        e.preventDefault();
        var form = $(this).closest("form");
        var input = document.createElement('INPUT');
        input.type = "hidden";
        input.name = "_delete";
        input.value = "delete";
        $("#confirmDialogTx").dialog('option', 'buttons', {
            "Confirm": function() {
                form.append(input);
                form.submit();
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        });
        $("#confirmDialogTx").dialog("open");
    });

    ///*--------- Max and Minimize Dashboard Widgets -------- */    
    //     if (!$('.widget-header').hasClass('no-min')){
    //       $(this).append('<button class="resize btn btn-primary"><span class="icon-minus"></span></button>');
    //     }

    $(".widget-header").each(function(index) {
        if (!$(this).hasClass('no-min')) {
            $(this).append('<button class="resize btn btn-primary"><span class="icon-minus"></span><span class="sr-only">Minimize widget</span></button>');
        }
    });

    $('.resize').click(function() {
        if ($(this).find('span').hasClass('icon-minus') == true) {
            $(this).find('span').removeClass('icon-minus').addClass('icon-plus');
            $(this).parent().next().hide();
        } else {
            $(this).find('span').removeClass('icon-plus').addClass('icon-minus');
            $(this).parent().next().show();
        }
    });

    $(".integerOnly").keyup(function() {

        // check if the user input the value for the go to page input element is an integer   
        if (!$.isNumeric($(this).val()) || $(this).val() <= 0) {
            //$(this).val(1);
            $('#goButton').attr("disabled", true);
        } else {
            $('#goButton').attr("disabled", false);
        }

    });




});


/* set default behavior */
$.validator.messages.required = function(param, element) {
    return $.validator.format("{0} is required", element.title);
}

// jQuery Validate  
$.validator.setDefaults({
    errorPlacement: function(error, element) {
        // if the input has a prepend or append element, put the validation msg after the parent div
        if (element.parent().hasClass('input-append')) {
            error.insertAfter(element.parent());
        } else if (element.parent().parent().hasClass('input-append')) {
            error.insertAfter(element.parent().parent());
            // else just place the validation message immediately after the input
        } else if (element.parent().parent().parent().hasClass('input-append')) {
            error.insertAfter(element.parent().parent().parent());
            // else just place the validation message immediately after the input
        } else {
            error.insertAfter(element);
        }
    },
    errorElement: "small", // contain the error msg in a small tag

    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success');
        $(element).closest('.form-group').addClass('has-error'); // add the Bootstrap error class to the control group
    },
    success: function(element) {

        if (element.parent().hasClass('form-group')) {
            $(element).parent().closest('.form-group').removeClass('has-error'); // remove the Bootstrap error class from the control group
            $(element).parent().closest('.form-group').addClass('has-success');
        } else {
            $(element).parent().find('.form-group').removeClass('has-error'); // remove the Bootstrap error class from the control group
            $(element).parent().find('.form-group').addClass('has-success');
        }

    },
    onfocusout: function(element, event) {
        if (!$(element).hasClass('datepicker')) {
            //this.element(element);
        }
    }
});

$.validator.addMethod('person-name', function(name, element) {
    return this.optional(element) || /^[A-Za-z\']([A-Za-z\'\-\ \.]*[a-z\']*)?$/.test(name);
}, 'Name format is unrecognized');

$.validator.addMethod('dsn', function(number) {
    var dsns = {
        '312': '312 - CONUS',
        '314': '314 - Europe',
        '315': '315 - Pacific',
        '317': '317 - Alaska',
        '318': '318 - Central',
        '319': '319 - Canada',
        '715': '715 - Australia'
    };
    var b1 = number.replace(/\D/g, "").length == 10;
    var b2 = number.replace(/\D/g, "").length == 7;
    var b3 = /^(\(\d{3}\) ?|\d{3}[ \-])\d{3}[ \-]\d{4}$/.test(number);
    var b4 = /^\d{3}-\d{4}$/.test(number);
    var b5 = /^\d{10}$/.test(number);
    var b6 = /^\d{7}$/.test(number);
    return !number || (b2 && b4) || (b1 && b3) || b5 || b6;
}, 'Valid DSN is required 555-5555 or (555) 555-5555');

$.validator.addMethod('phoneWithExt', function(phoneNumber, element) {
    var b1 = phoneNumber.replace(/\D/g, "").length >= 10;
    var b2 = /^(\(\+\d+\) ?|\+\d+[ \-]?)?(\(\d+\) ?|\d+[ \-]?)*\d+( ?x\d{1,5})?$/.test(phoneNumber);
    return this.optional(element) || (phoneNumber && b1 && b2);
}, 'Valid phone number is required 555-555-5555 x55');

$.validator.addMethod("alpha", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z]+$/);
}, "Only letters are allowed in this field.");

$.validator.addMethod("alphaSpace", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z' ']+$/);
}, "Only letters are allowed in this field.");

$.validator.addMethod("alphaNumeric", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z0-9]+$/);
}, "Enter numbers and letter only.");

$.validator.addMethod("number", function(value, element) {
    return this.optional(element) || value == value.match(/^[0-9]+$/);
}, "Input must contain only numbers");

$.validator.addMethod("positiveNumber", function(value, element) {
    return this.optional(element) || value == value.match(/^[0-9]+$/);
}, "Input must contain only positive numbers or zero");

$.validator.addMethod("edipiNumber", function(value, element) {
    return this.optional(element) || value == value.match(/^\d{10}$/);
}, "Edipi must contain 10 digit number");

$.validator.addMethod("signedNumber", function(value, element) {
    return this.optional(element) || value == value.match(/^-?[0-9]+$/);
}, "Input must contain only signed numbers");

$.validator.addMethod("signedDecimalNumber", function(value, element) {
    return this.optional(element) || value == value.match(/^-?\d*\.{0,1}\d+$/);
}, "Input contains invalid characters");
//for longitude 
$.validator.addMethod('minStrict', function(value, element) {
    return this.optional(element) || (value == value.match(/^-?\d*\.{0,1}\d+$/) && value >= -180.0);
}, "Invalid Input/ Value must be greater than -180");

//for longitude
$.validator.addMethod('maxStrict', function(value, element) {
    return this.optional(element) || (value == value.match(/^-?\d*\.{0,1}\d+$/) && value <= 180.0);
}, "Invalid Input/ Value must be less than 180");

//for latitude
$.validator.addMethod('latitudeMinStrict', function(value, element) {
    return this.optional(element) || (value == value.match(/^-?\d*\.{0,1}\d+$/) && value >= -90.0);
}, "Invalid Input/ Value must be greater than -90");
//for latitude
$.validator.addMethod('latitudeMaxStrict', function(value, element) {

    return this.optional(element) || (value == value.match(/^-?\d*\.{0,1}\d+$/) && value <= 90.0);
}, "Invalid Input/ Value must be less than 90");

$.validator.addMethod("alphaIntSpecialChar", function(value, element) {
	return this.optional(element) || value == value.match(/^(?:[a-zA-Z0-9:,!\*#&\(\)\. "'-]|\u00A7|\u00B6)+$/);
},"Input contains invalid characters");

$.validator.addMethod("alphaIntSpecialCharInstallation", function(value, element) {
	return this.optional(element) || value == value.match(/^(?:[a-zA-Z0-9:,!\*#&\(\)\/\. "'-]|\u00A7|\u00B6)+$/);
},"Input contains invalid characters");

$.validator.addMethod("levelOfEffort", function(value, element) {
    return this.optional(element) || value == value.match(/^(?:(?:(?:[0-9]*)\.?[0-9]+)|(?:[0-9]))+\s*[mhdwMHDW]$/);
}, "Input is not formatted correctly.");

$.validator.addMethod("levelOfEffortUpdate", function(value, element) {
    return this.optional(element) || value == value.match(/^(?:\-?(?:(?:(?:[0-9]*)\.?[0-9]+)|(?:[0-9]))+)|0\s*[mhdwMHDW]$/);
}, "Input is not formatted correctly.");

$.validator.addMethod("future", function(value, element) {
    return this.optional(element) || new Date(value) > new Date();
}, "Date must be a future date");

$.validator.addMethod("pastDate", function(value, element) {
    return this.optional(element) || new Date(value) < new Date();
}, "Date must be a past date");

jQuery.validator.addMethod("zipcode-plus-4", function(value, element) {
    return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
}, "Please provide a valid zipcode.");

$.validator.addMethod("manualDate", function(value, element) {
    return this.optional(element) || /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/.test(value);
}, "Dates must be of the format MM/DD/YYYY. e.g. 02/28/2013");

$.validator.addMethod("manualDateTime", function(value, element) {
    return this.optional(element) || /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2} ([0-1][0-9]:[0-5][0-9]:[0-5][0-9]) (AM|PM))$/.test(value);
}, "Dates must be of the format MM/DD/YYYY HH:mm:SS (AM or PM). e.g. 02/28/2016 12:00:00 AM");

var sessionTimeout = function(timeoutSeconds, keepAliveUrl, logoutUrl) {
    var remainingSeconds = 60;
    var message = 'Your session will time out in about ' + remainingSeconds + ' seconds';
    var timer;
    var message;
    var $dialog;

    var restartTimer = function() {

        //  keep the server-side session alive
        if (timer) {
            $.get(keepAliveUrl);
        }

        clearTimeout(timer);
        clearTimeout(message);
        message = setTimeout(function() {
            $dialog.dialog('open');
        }, (timeoutSeconds - remainingSeconds) * 1000);
        timer = setTimeout(function() {
            window.onbeforeunload = null;
            window.location = logoutUrl;
        }, (timeoutSeconds * 1000));
    };

    $dialog = $('<div></div>')
        .html(message)
        .dialog({
            autoOpen: false,
            closeOnEscape: false,
            draggable: false,
            width: 460,
            minHeight: 50,
            modal: true,
            buttons: {
                "I'm still here": function() {

                    $(this).dialog('close');
                }
            },
            resizable: false,
            open: function() {
                $('body').css('overflow', 'hidden');
            },
            close: function() {
                restartTimer();
                $('body').css('overflow', 'auto');
            }
        });


    restartTimer();
};

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function commaSeparatedNumber(selector) {

    $(selector).keyup(function(event) {
        var $this = $(this);

        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
        }
        
        if (event.which == 9) {
            $this.select();
        } else if (!$this.val()) {
        	$this.val(0);
        } else {
            var num = parseInt($this.val().replace(/\D/g, "")).toString();
            $this.val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
        }
    });
}

/* AJAX Prefilter that adds a CSRF token to POST requests */
$(function() {
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        var tokenVal;

        if (options.type == 'POST' || options.type == 'post' || originalOptions.type == 'POST' || originalOptions.type == 'post') {
            tokenVal = $('meta[name="CSRFToken"]').attr('content');

            if (tokenVal) {
                jqXHR.setRequestHeader('CSRFToken', tokenVal);
            }
        }
    });
});

function goToPage(curPage, jumpToPageVal, totalPages, pageParamName) {
    var curUrl = window.location.href;
    var curlOrig = curUrl.split("&");
    var jumpPage = jumpToPageVal;
    //for the state profile 
    if (curUrl.indexOf('?id') > -1) {

        jumpToPageVal = jumpToPageVal.replace('#localOffices', '');

        jumpToPageVal = jumpToPageVal.replace('#localOfficials', '');

        curUrl = curlOrig[0];

    }
    var pageParamNameRegEx = curUrl.split("=");
    var p = pageParamName;

    if (jumpToPageVal == curPage) {
        return;
    }
    if (jumpToPageVal <= 0) {
        alert('Minimum page is 1' + totalPages);

    } else if (jumpToPageVal > totalPages) {
        alert('Max page is ' + totalPages);

    } else if (curUrl.indexOf(pageParamName) > -1) {

        curUrl = curUrl.replace(RegExp('(' + pageParamName + '=)' + '[^\&|\#]+'), '$1' + jumpPage);
		navigate(curUrl);

    } else if (curUrl.indexOf('?') > -1) {
        navigate(curUrl + '&' + pageParamName + '=' + jumpPage);
    } else {
        navigate(curUrl + '?' + pageParamName + '=' + jumpPage);

    }
}

$(function() {

    $('textarea').each(function() {
        autosize(this);
    });

    //Create active button tabs
    $(".btn-group.tabs .btn").click(function() {
        $(this).parent().find(".btn").removeClass("active");
        $(this).addClass("active");
    });

    /*
    $(".btn-group .btn").click(function(){
      $(this).parent().find(".btn").removeClass("active");
      $(this).addClass("active");
    });*/

    $(".menu-toggle").click(function() {

        //Change Menu state
        $("html").toggleClass("menu-hide");

        if ($("html").hasClass("menu-hide")) {
            $.cookie("portal_menu", false, { path: "/" });
        } else {
            $.cookie("portal_menu", true, { path: "/" });
        }
    });

    //i-button code
    $(".i-button").popover({ html: false, trigger: 'hover' });

    //clock icon code
    $(".icon_clock").popover({ html: true, trigger: 'hover' });

    //Menu Code
    $(".sub-menu a.toggle").click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass("show");

    });

});

$(function(){
	$(".go-back").addClass("buttons")
	.prepend('<div class="btn btn-default" onclick="window.history.back()">Back</div>');
	
	$("span.name").each(function() {
		$(this).text(decodeHTMLEntities($(this).text()));
	});
});

function decodeHTMLEntities(text) {
	  return $("<textarea/>")
	    .html(text)
	    .text();
}

function postEvag($button, i){
	var partUrl = $button.data('part'+i+'-url');
	
	if (partUrl) {
		$.post(partUrl, function(result) {
			postEvag($button, i+1);
		});
	}else{
		$button[0].form.submit();
	}
}

function doPoll(){
	var endpoint = $("#evag-status-url").val();
	
    $.getJSON(endpoint, function(result) {
        if(result.publishing){
			$("#evag-progress").text(result.message);
			setTimeout(function(){doPoll();},1000);
		}else{
			$("#evag-progress").text("eVAG Generation Complete");
		}
        	
    });
}

function cleanUrl(url){
	var validateUrl = new RegExp(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)

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