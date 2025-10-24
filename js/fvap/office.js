var initPage = function() {
	jurisdictionSelect(jurisdictionUrl);
}

var jurisdictionSelect = function(url) {		
	$('#state').change(function() {
		populateJurisdictions(url)
	});
}

function populateJurisdictions(url) {
	$.getJSON(url, {
		stateId : $('#state').val(),
		ajax : 'true'
	}, function(data) {
		var html = '<option value="">&nbsp;</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">'
					+ data[i].value + '</option>';
		}
		html += '</option>';

		$('#jurisdiction').html(html);
	});
}

