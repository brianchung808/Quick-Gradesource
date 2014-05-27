var storageArea = chrome.storage.sync;

var div = '#result';
var mean_div = '#mean';
var median_div = "#median";

function setClassInfo(description, url, secret_number) {
	var params = {};
	params[description] = [url, secret_number];

	storageArea.set(params);
}

$(function() {
	$('#add_class').on('click', function() {
		chrome.tabs.create({url: "options.html"});
	});

	storageArea.get(null, function(data) {
		var $dropdown = $('<select>');

		$dropdown.append($('<option>').attr({value: ''}).text('-- Select Class --'));

		for(var key in data) {
			var $option = $('<option>');
			$option.attr(
				{value: key}
			).text(key);

			$dropdown.append($option);
		}

		$('#classes').append($dropdown);

		$dropdown.on('change', function() {
			var _class = $(this).val();

			loadPage(_class);
			storageArea.get(_class, function(data) {

			});
		});
	});
});

function loadPage(description) {
	storageArea.get(description, function(items) {
		var url = items[description][0];
		var secret_number = items[description][1];

		getOverall(url, secret_number, div);
		getMeanMedian(url, mean_div, median_div);
	});
}

